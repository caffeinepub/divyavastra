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
import { Pencil, Plus, Trash2, X } from "lucide-react";
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

type ImageEntry = { id: string; url: string };

type FormState = {
  name: string;
  category: string;
  customCategory: string;
  description: string;
  price: number;
  images: ImageEntry[];
  inStock: boolean;
};

function makeImageEntry(url = ""): ImageEntry {
  return { id: generateId(), url };
}

const EMPTY_FORM: FormState = {
  name: "",
  category: "",
  customCategory: "",
  description: "",
  price: 0,
  images: [makeImageEntry()],
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
    setForm({ ...EMPTY_FORM, images: [makeImageEntry()] });
    setFormOpen(true);
  };

  const openEdit = (product: Product) => {
    setEditProduct(product);
    const isPredefined = PREDEFINED_CATEGORIES.slice(0, -1).includes(
      product.category,
    );
    const rawImages =
      product.images && product.images.length > 0
        ? product.images
        : product.imageUrl
          ? [product.imageUrl]
          : [""];
    setForm({
      name: product.name,
      category: isPredefined ? product.category : "Other",
      customCategory: isPredefined ? "" : product.category,
      description: product.description,
      price: product.price,
      images: rawImages.map((url) => makeImageEntry(url)),
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
    const cleanImages = form.images
      .map((e) => e.url)
      .filter((url) => url.trim() !== "");
    const productData: Omit<Product, "id"> = {
      name: form.name,
      category: finalCategory,
      description: form.description,
      price: form.price,
      imageUrl: cleanImages[0] || "",
      images: cleanImages,
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

  const addImageField = () => {
    setForm((f) => ({ ...f, images: [...f.images, makeImageEntry()] }));
  };

  const updateImage = (id: string, value: string) => {
    setForm((f) => ({
      ...f,
      images: f.images.map((e) => (e.id === id ? { ...e, url: value } : e)),
    }));
  };

  const removeImage = (id: string) => {
    setForm((f) => {
      const images = f.images.filter((e) => e.id !== id);
      return {
        ...f,
        images: images.length === 0 ? [makeImageEntry()] : images,
      };
    });
  };

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
                  Images
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
                      className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${p.inStock ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}
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
              {editProduct ? "Edit Product" : "Add Product"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Name */}
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Name *</Label>
              <Input
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                placeholder="Product name"
                className="h-9"
              />
            </div>

            {/* Category Select */}
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">
                Category *
              </Label>
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

            {/* Price */}
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">
                Price (₹) *
              </Label>
              <Input
                type="number"
                value={form.price || ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, price: Number(e.target.value) }))
                }
                placeholder="0"
                className="h-9"
              />
            </div>

            {/* Description */}
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">
                Description
              </Label>
              <Textarea
                value={form.description}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
                placeholder="Product description..."
                className="resize-none text-sm"
                rows={3}
              />
            </div>

            {/* Multi-image URLs */}
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">
                Product Images (URLs)
              </Label>
              {form.images.map((entry, idx) => (
                <div key={entry.id} className="flex gap-2 items-center">
                  <Input
                    data-ocid="admin.product.image_url.input"
                    value={entry.url}
                    onChange={(e) => updateImage(entry.id, e.target.value)}
                    placeholder={`Image URL ${idx + 1}`}
                    className="h-9 flex-1 text-xs"
                  />
                  {form.images.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeImage(entry.id)}
                      className="h-9 w-9 p-0 text-muted-foreground hover:text-destructive shrink-0"
                    >
                      <X size={13} />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addImageField}
                data-ocid="admin.product.add_image.button"
                className="w-full border-dashed border-gold/40 text-gold hover:bg-gold-pale text-xs gap-1.5 h-8"
              >
                <Plus size={12} />
                Add Another Image
              </Button>
            </div>

            {/* In Stock */}
            <div className="flex items-center justify-between">
              <Label className="text-xs text-muted-foreground">In Stock</Label>
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
