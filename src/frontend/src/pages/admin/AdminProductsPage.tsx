import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { generateId, getProducts, saveProducts } from "@/lib/store";
import type { Product } from "@/lib/store";
import { Pencil, Trash2 } from "lucide-react";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const PREDEFINED_CATEGORIES = [
  "Gopi Dresses",
  "Bagalbandi",
  "Dhoti Sets",
  "Devotee Couple Sets",
  "New Arrivals",
  "Other",
];

type FormState = {
  name: string;
  category: string;
  customCategory: string;
  description: string;
  price: number;
  mainImage: string;
  gallery1: string;
  gallery2: string;
  gallery3: string;
  gallery4: string;
  inStock: boolean;
};

const EMPTY_FORM: FormState = {
  name: "",
  category: "",
  customCategory: "",
  description: "",
  price: 0,
  mainImage: "",
  gallery1: "",
  gallery2: "",
  gallery3: "",
  gallery4: "",
  inStock: true,
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>(() => getProducts());
  const [formOpen, setFormOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const openAdd = () => {
    setEditProduct(null);
    setForm(EMPTY_FORM);
    setFormOpen(true);
  };

  const openEdit = (product: Product) => {
    setEditProduct(product);
    const isPredefined = PREDEFINED_CATEGORIES.slice(0, -1).includes(
      product.category,
    );
    const imgs =
      product.images && product.images.length > 0
        ? product.images
        : product.imageUrl
          ? [product.imageUrl]
          : [];
    setForm({
      name: product.name,
      category: isPredefined ? product.category : "Other",
      customCategory: isPredefined ? "" : product.category,
      description: product.description,
      price: product.price,
      mainImage: imgs[0] || "",
      gallery1: imgs[1] || "",
      gallery2: imgs[2] || "",
      gallery3: imgs[3] || "",
      gallery4: imgs[4] || "",
      inStock: product.inStock,
    });
    setFormOpen(true);
  };

  const handleSave = () => {
    const finalCategory =
      form.category === "Other" ? form.customCategory : form.category;
    if (!form.name || !finalCategory || form.price <= 0) {
      toast.error("Please fill in name, category, and a valid price.");
      return;
    }
    const allImages = [
      form.mainImage,
      form.gallery1,
      form.gallery2,
      form.gallery3,
      form.gallery4,
    ].filter((url) => url.trim() !== "");

    const productData: Omit<Product, "id"> = {
      name: form.name,
      category: finalCategory,
      description: form.description,
      price: form.price,
      imageUrl: allImages[0] || "",
      images: allImages,
      inStock: form.inStock,
    };

    let updated: Product[];
    if (editProduct) {
      updated = products.map((p) =>
        p.id === editProduct.id ? { id: editProduct.id, ...productData } : p,
      );
    } else {
      updated = [...products, { id: generateId(), ...productData }];
    }
    saveProducts(updated);
    setProducts(updated);
    setFormOpen(false);
    toast.success(editProduct ? "Product updated!" : "Product added!");
  };

  const handleDelete = () => {
    if (!deleteId) return;
    const updated = products.filter((p) => p.id !== deleteId);
    saveProducts(updated);
    setProducts(updated);
    setDeleteId(null);
    toast.success("Product deleted.");
  };

  const field =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-xl font-semibold">Products</h1>
        <Button
          data-ocid="admin.product.add.button"
          onClick={openAdd}
          size="sm"
          className="bg-gold text-primary-foreground hover:bg-gold/90 gap-1.5"
        >
          <Plus size={14} />
          Add Product
        </Button>
      </div>

      {products.length === 0 ? (
        <div
          data-ocid="admin.products.empty_state"
          className="text-center py-16 text-muted-foreground text-sm"
        >
          No products yet. Add your first product!
        </div>
      ) : (
        <div className="border border-border rounded-lg overflow-hidden bg-card">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-muted/30">
              <tr>
                <th className="text-left px-4 py-2.5 text-xs text-muted-foreground font-medium">
                  Name
                </th>
                <th className="text-left px-4 py-2.5 text-xs text-muted-foreground font-medium hidden sm:table-cell">
                  Category
                </th>
                <th className="text-left px-4 py-2.5 text-xs text-muted-foreground font-medium">
                  Price (₹)
                </th>
                <th className="text-left px-4 py-2.5 text-xs text-muted-foreground font-medium hidden sm:table-cell">
                  Photos
                </th>
                <th className="text-left px-4 py-2.5 text-xs text-muted-foreground font-medium hidden sm:table-cell">
                  Stock
                </th>
                <th className="text-right px-4 py-2.5 text-xs text-muted-foreground font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((p, i) => (
                <tr
                  key={p.id}
                  data-ocid={`admin.products.row.item.${i + 1}`}
                  className="border-b border-border last:border-0"
                >
                  <td className="px-4 py-3">
                    <div className="font-medium text-xs">{p.name}</div>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground hidden sm:table-cell">
                    {p.category}
                  </td>
                  <td className="px-4 py-3 text-xs">
                    ₹{p.price.toLocaleString("en-IN")}
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground hidden sm:table-cell">
                    {p.images?.length || 0} photo
                    {(p.images?.length || 0) !== 1 ? "s" : ""}
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span
                      className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${
                        p.inStock
                          ? "bg-green-50 text-green-700"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      {p.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button
                        data-ocid={`admin.product.edit.button.${i + 1}`}
                        variant="ghost"
                        size="sm"
                        onClick={() => openEdit(p)}
                        className="h-7 w-7 p-0 hover:text-gold"
                      >
                        <Pencil size={13} />
                      </Button>
                      <Button
                        data-ocid={`admin.product.delete.button.${i + 1}`}
                        variant="ghost"
                        size="sm"
                        onClick={() => setDeleteId(p.id)}
                        className="h-7 w-7 p-0 hover:text-destructive"
                      >
                        <Trash2 size={13} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent
          className="max-w-md max-h-[90vh] overflow-y-auto"
          data-ocid="admin.product.dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-heading">
              {editProduct ? "Edit Product" : "Add New Product"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Product Name */}
            <div className="space-y-1">
              <Label className="text-xs font-medium">Product Name *</Label>
              <Input
                data-ocid="admin.product.name.input"
                value={form.name}
                onChange={field("name")}
                placeholder="e.g. Devotee Couple Set 1"
                className="h-9"
              />
            </div>

            {/* Price */}
            <div className="space-y-1">
              <Label className="text-xs font-medium">Price (₹) *</Label>
              <Input
                data-ocid="admin.product.price.input"
                type="number"
                value={form.price || ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, price: Number(e.target.value) }))
                }
                placeholder="e.g. 6500"
                className="h-9"
              />
            </div>

            {/* Category */}
            <div className="space-y-1">
              <Label className="text-xs font-medium">Category *</Label>
              <Select
                value={form.category}
                onValueChange={(v) =>
                  setForm((f) => ({ ...f, category: v, customCategory: "" }))
                }
              >
                <SelectTrigger
                  className="h-9"
                  data-ocid="admin.product.category.select"
                >
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {PREDEFINED_CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.category === "Other" && (
                <Input
                  value={form.customCategory}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, customCategory: e.target.value }))
                  }
                  placeholder="Enter custom category"
                  className="h-9 mt-2"
                />
              )}
            </div>

            {/* Main Image URL */}
            <div className="space-y-1">
              <Label className="text-xs font-medium">Main Image URL</Label>
              <Input
                data-ocid="admin.product.main_image.input"
                value={form.mainImage}
                onChange={field("mainImage")}
                placeholder="https://ibb.co/... (main photo)"
                className="h-9 text-xs"
              />
            </div>

            {/* Gallery Images */}
            <div className="space-y-2">
              <Label className="text-xs font-medium">
                Gallery Images (optional)
              </Label>
              <Input
                data-ocid="admin.product.gallery1.input"
                value={form.gallery1}
                onChange={field("gallery1")}
                placeholder="Gallery Image 1 URL"
                className="h-9 text-xs"
              />
              <Input
                data-ocid="admin.product.gallery2.input"
                value={form.gallery2}
                onChange={field("gallery2")}
                placeholder="Gallery Image 2 URL"
                className="h-9 text-xs"
              />
              <Input
                data-ocid="admin.product.gallery3.input"
                value={form.gallery3}
                onChange={field("gallery3")}
                placeholder="Gallery Image 3 URL"
                className="h-9 text-xs"
              />
              <Input
                data-ocid="admin.product.gallery4.input"
                value={form.gallery4}
                onChange={field("gallery4")}
                placeholder="Gallery Image 4 URL"
                className="h-9 text-xs"
              />
            </div>

            {/* Description */}
            <div className="space-y-1">
              <Label className="text-xs font-medium">Description</Label>
              <Textarea
                data-ocid="admin.product.description.textarea"
                value={form.description}
                onChange={field("description")}
                placeholder="Product description..."
                className="resize-none text-sm"
                rows={3}
              />
            </div>

            {/* In Stock */}
            <div className="flex items-center justify-between">
              <Label className="text-xs font-medium">In Stock</Label>
              <Switch
                checked={form.inStock}
                onCheckedChange={(v) => setForm((f) => ({ ...f, inStock: v }))}
              />
            </div>
          </div>

          <DialogFooter className="mt-2">
            <Button
              variant="outline"
              onClick={() => setFormOpen(false)}
              size="sm"
              data-ocid="admin.product.cancel.button"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              size="sm"
              className="bg-gold text-primary-foreground hover:bg-gold/90"
              data-ocid="admin.product.save.button"
            >
              {editProduct ? "Save Changes" : "Add Product"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm */}
      <AlertDialog
        open={!!deleteId}
        onOpenChange={(o) => !o && setDeleteId(null)}
      >
        <AlertDialogContent data-ocid="admin.product.delete.dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Product?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The product will be permanently
              removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="admin.product.delete.cancel.button">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              data-ocid="admin.product.delete.confirm.button"
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
