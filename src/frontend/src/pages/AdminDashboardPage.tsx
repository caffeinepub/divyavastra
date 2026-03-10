import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link, useNavigate } from "@tanstack/react-router";
import { Loader2, LogOut, Pencil, Plus, Trash2 } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { Product } from "../backend";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useDeleteProduct, useIsAdmin, useProducts } from "../hooks/useQueries";

function formatPrice(price: bigint): string {
  return `₹${Number(price).toLocaleString("en-IN")}`;
}

const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { clear } = useInternetIdentity();
  const { data: isAdmin, isLoading: checkingAdmin } = useIsAdmin();
  const { data: products = [], isLoading } = useProducts();
  const { mutate: deleteProduct, isPending: deleting } = useDeleteProduct();
  const [deletingId, setDeletingId] = useState<bigint | null>(null);

  useEffect(() => {
    if (!checkingAdmin && !isAdmin) {
      navigate({ to: "/admin" });
    }
  }, [isAdmin, checkingAdmin, navigate]);

  const handleDelete = (id: bigint) => {
    setDeletingId(id);
    deleteProduct(id, {
      onSuccess: () => {
        toast.success("Product deleted successfully");
        setDeletingId(null);
      },
      onError: () => {
        toast.error("Failed to delete product");
        setDeletingId(null);
      },
    });
  };

  const handleLogout = () => {
    clear();
    navigate({ to: "/admin" });
  };

  if (checkingAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-saffron" />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{ background: "oklch(0.97 0.015 75)" }}
    >
      {/* Admin Header */}
      <header
        className="border-b border-saffron/20 py-4 px-6"
        style={{
          background:
            "linear-gradient(90deg, oklch(0.22 0.07 25), oklch(0.28 0.09 25))",
        }}
      >
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🪷</span>
            <div>
              <h1
                className="font-heading text-lg font-bold"
                style={{ color: "oklch(0.90 0.10 70)" }}
              >
                Admin Dashboard
              </h1>
              <p
                className="font-body text-xs"
                style={{ color: "oklch(0.65 0.08 60)" }}
              >
                Vrindavan Devotee Collection
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="font-body text-sm px-4 py-1.5 rounded-full border transition-colors"
              style={{
                borderColor: "oklch(0.62 0.16 55 / 0.5)",
                color: "oklch(0.75 0.12 65)",
              }}
            >
              View Store
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-white/60 hover:text-white hover:bg-white/10"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Products", value: products.length, icon: "🪷" },
            {
              label: "In Stock",
              value: products.filter((p) => p.inStock).length,
              icon: "✅",
            },
            {
              label: "Out of Stock",
              value: products.filter((p) => !p.inStock).length,
              icon: "⚠️",
            },
            {
              label: "Categories",
              value: new Set(products.map((p) => p.category)).size,
              icon: "📂",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl p-5 devotional-card text-center"
            >
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="font-heading text-2xl font-bold text-saffron">
                {stat.value}
              </div>
              <div className="font-body text-xs text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Products Table */}
        <div className="rounded-2xl overflow-hidden ornamental-border">
          <div
            className="px-6 py-4 flex items-center justify-between"
            style={{
              background:
                "linear-gradient(90deg, oklch(0.99 0.008 72), oklch(0.97 0.015 68))",
            }}
          >
            <h2 className="font-heading text-xl font-bold text-maroon">
              Products
            </h2>
            <Link to="/admin/product/new">
              <Button
                data-ocid="admin.add_product_button"
                className="font-body font-semibold text-white rounded-lg"
                style={{ background: "oklch(0.62 0.16 55)" }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Product
              </Button>
            </Link>
          </div>

          {isLoading ? (
            <div
              className="flex items-center justify-center py-16"
              data-ocid="admin.product_table"
            >
              <Loader2 className="h-8 w-8 animate-spin text-saffron" />
            </div>
          ) : (
            <Table data-ocid="admin.product_table">
              <TableHeader>
                <TableRow
                  style={{
                    background: "oklch(0.94 0.025 68)",
                  }}
                >
                  <TableHead className="font-heading text-maroon">
                    Product
                  </TableHead>
                  <TableHead className="font-heading text-maroon">
                    Category
                  </TableHead>
                  <TableHead className="font-heading text-maroon">
                    Price
                  </TableHead>
                  <TableHead className="font-heading text-maroon">
                    Status
                  </TableHead>
                  <TableHead className="font-heading text-maroon text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center py-12"
                      data-ocid="admin.product_table.empty_state"
                    >
                      <span className="text-4xl block mb-3">🪷</span>
                      <p className="font-body text-muted-foreground">
                        No products yet. Add your first product!
                      </p>
                    </TableCell>
                  </TableRow>
                ) : (
                  products.map((product: Product, i) => (
                    <TableRow
                      key={product.id.toString()}
                      data-ocid={`products.item.${i + 1}`}
                      className="hover:bg-saffron/5 transition-colors"
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div
                            className="w-12 h-12 rounded-lg flex items-center justify-center overflow-hidden"
                            style={{ background: "oklch(0.94 0.04 70)" }}
                          >
                            {product.imageId ? (
                              <img
                                src={product.imageId}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="text-xl">🪷</span>
                            )}
                          </div>
                          <div>
                            <p className="font-heading font-semibold text-maroon text-sm">
                              {product.name}
                            </p>
                            <p className="font-body text-xs text-muted-foreground truncate max-w-[180px]">
                              {product.description}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className="font-body text-xs"
                        >
                          {product.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="font-heading font-bold text-saffron">
                          {formatPrice(product.price)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`text-xs font-body ${
                            product.inStock
                              ? "bg-green-100 text-green-800 hover:bg-green-100"
                              : "bg-red-100 text-red-800 hover:bg-red-100"
                          }`}
                        >
                          {product.inStock ? "In Stock" : "Out of Stock"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to="/admin/product/$id"
                            params={{ id: product.id.toString() }}
                          >
                            <Button
                              variant="ghost"
                              size="sm"
                              data-ocid={`product.edit_button.${i + 1}`}
                              className="text-saffron hover:text-maroon hover:bg-saffron/10"
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </Link>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                data-ocid={`product.delete_button.${i + 1}`}
                                className="text-red-400 hover:text-red-600 hover:bg-red-50"
                                disabled={deleting && deletingId === product.id}
                              >
                                {deleting && deletingId === product.id ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <Trash2 className="h-4 w-4" />
                                )}
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle className="font-heading">
                                  Delete Product?
                                </AlertDialogTitle>
                                <AlertDialogDescription className="font-body">
                                  Are you sure you want to delete "
                                  {product.name}"? This cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel
                                  className="font-body"
                                  data-ocid="product.cancel_button"
                                >
                                  Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction
                                  className="font-body bg-red-600 hover:bg-red-700"
                                  data-ocid="product.confirm_button"
                                  onClick={() => handleDelete(product.id)}
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboardPage;
