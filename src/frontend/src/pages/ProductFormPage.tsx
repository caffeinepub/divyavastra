import { Button } from "@/components/ui/button";
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
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { ArrowLeft, Loader2, Upload } from "lucide-react";
import { motion } from "motion/react";
import type React from "react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useBlobStorage } from "../hooks/useBlobStorage";
import {
  useAddProduct,
  useIsAdmin,
  useProduct,
  useUpdateProduct,
} from "../hooks/useQueries";

const CATEGORIES = ["Ladies", "Mens", "Couple Set"];

const ProductFormPage: React.FC = () => {
  const params = useParams({ strict: false }) as { id?: string };
  const productId = params.id ? BigInt(params.id) : null;
  const isEditing = productId !== null;
  const navigate = useNavigate();

  const { data: isAdmin, isLoading: checkingAdmin } = useIsAdmin();
  const { data: existingProduct, isLoading: loadingProduct } =
    useProduct(productId);
  const { mutate: addProduct, isPending: adding } = useAddProduct();
  const { mutate: updateProduct, isPending: updating } = useUpdateProduct();
  const { uploadFile, isUploading, uploadProgress } = useBlobStorage();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "Ladies",
    whatsappNumber: "",
    inStock: true,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageId, setImageId] = useState<string | null>(null);

  useEffect(() => {
    if (!checkingAdmin && !isAdmin) {
      navigate({ to: "/admin" });
    }
  }, [isAdmin, checkingAdmin, navigate]);

  useEffect(() => {
    if (existingProduct) {
      setForm({
        name: existingProduct.name,
        description: existingProduct.description,
        price: existingProduct.price.toString(),
        category: existingProduct.category,
        whatsappNumber: existingProduct.whatsappNumber,
        inStock: existingProduct.inStock,
      });
      if (existingProduct.imageId) {
        setImageId(existingProduct.imageId);
        setImagePreview(existingProduct.imageId);
      }
    }
  }, [existingProduct]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    const url = URL.createObjectURL(file);
    setImagePreview(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let finalImageId = imageId;

    if (imageFile) {
      try {
        const hash = await uploadFile(imageFile);
        finalImageId = hash;
      } catch {
        toast.error("Image upload failed. Saving without image.");
      }
    }

    const data = {
      name: form.name,
      description: form.description,
      price: BigInt(Math.round(Number(form.price) || 0)),
      imageId: finalImageId,
      category: form.category,
      inStock: form.inStock,
      whatsappNumber: form.whatsappNumber,
    };

    if (isEditing && productId !== null) {
      updateProduct(
        { id: productId, ...data },
        {
          onSuccess: () => {
            toast.success("Product updated!");
            navigate({ to: "/admin/dashboard" });
          },
          onError: (err) => toast.error(err.message || "Update failed"),
        },
      );
    } else {
      addProduct(data, {
        onSuccess: () => {
          toast.success("Product added!");
          navigate({ to: "/admin/dashboard" });
        },
        onError: (err) => toast.error(err.message || "Add failed"),
      });
    }
  };

  const isPending = adding || updating || isUploading;

  if (checkingAdmin || (isEditing && loadingProduct)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-saffron" />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen py-10"
      style={{ background: "oklch(0.97 0.015 75)" }}
    >
      {/* Header */}
      <header
        className="fixed top-0 left-0 right-0 z-50 border-b border-saffron/20 py-4 px-6"
        style={{
          background:
            "linear-gradient(90deg, oklch(0.22 0.07 25), oklch(0.28 0.09 25))",
        }}
      >
        <div className="container mx-auto flex items-center gap-4">
          <Link to="/admin/dashboard">
            <Button
              variant="ghost"
              size="sm"
              className="text-white/70 hover:text-white hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
          </Link>
          <h1
            className="font-heading text-lg font-bold"
            style={{ color: "oklch(0.90 0.10 70)" }}
          >
            {isEditing ? "Edit Product" : "Add New Product"}
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 pt-20 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl overflow-hidden devotional-card"
        >
          <div
            className="px-6 py-5"
            style={{
              background:
                "linear-gradient(90deg, oklch(0.22 0.07 25), oklch(0.28 0.09 25))",
            }}
          >
            <h2
              className="font-heading text-xl font-bold"
              style={{ color: "oklch(0.90 0.10 70)" }}
            >
              {isEditing ? "Edit Product Details" : "New Product"}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Image Upload */}
            <div className="space-y-2">
              <Label className="font-heading text-sm font-semibold text-maroon">
                Product Image
              </Label>
              <div className="flex gap-4 items-start">
                <div
                  className="w-28 h-28 rounded-xl overflow-hidden flex items-center justify-center flex-shrink-0"
                  style={{ background: "oklch(0.94 0.04 70)" }}
                >
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-4xl">🪷</span>
                  )}
                </div>
                <div className="flex-1">
                  <label htmlFor="image-upload">
                    <Button
                      type="button"
                      variant="outline"
                      className="font-body border-saffron/30 text-saffron hover:bg-saffron hover:text-white cursor-pointer"
                      data-ocid="product_form.upload_button"
                      asChild
                    >
                      <span>
                        <Upload className="h-4 w-4 mr-2" />
                        {isUploading
                          ? `Uploading ${uploadProgress}%`
                          : "Upload Image"}
                      </span>
                    </Button>
                  </label>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <p className="font-body text-xs text-muted-foreground mt-2">
                    JPG, PNG, WEBP accepted
                  </p>
                </div>
              </div>
            </div>

            {/* Name */}
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="font-heading text-sm font-semibold text-maroon"
              >
                Product Name *
              </Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                placeholder="e.g., Gopi Dress"
                required
                data-ocid="product_form.name_input"
                className="font-body border-saffron/30 focus:border-saffron"
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label className="font-heading text-sm font-semibold text-maroon">
                Category *
              </Label>
              <Select
                value={form.category}
                onValueChange={(v) => setForm((f) => ({ ...f, category: v }))}
              >
                <SelectTrigger
                  data-ocid="product_form.category_select"
                  className="font-body border-saffron/30"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat} className="font-body">
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <Label
                htmlFor="price"
                className="font-heading text-sm font-semibold text-maroon"
              >
                Price (₹) *
              </Label>
              <Input
                id="price"
                type="number"
                min="0"
                value={form.price}
                onChange={(e) =>
                  setForm((f) => ({ ...f, price: e.target.value }))
                }
                placeholder="e.g., 6500"
                required
                data-ocid="product_form.price_input"
                className="font-body border-saffron/30 focus:border-saffron"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label
                htmlFor="description"
                className="font-heading text-sm font-semibold text-maroon"
              >
                Description
              </Label>
              <Textarea
                id="description"
                value={form.description}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
                placeholder="Describe the product..."
                rows={4}
                data-ocid="product_form.description_input"
                className="font-body border-saffron/30 focus:border-saffron resize-none"
              />
            </div>

            {/* WhatsApp */}
            <div className="space-y-2">
              <Label
                htmlFor="whatsapp"
                className="font-heading text-sm font-semibold text-maroon"
              >
                WhatsApp Number
              </Label>
              <Input
                id="whatsapp"
                value={form.whatsappNumber}
                onChange={(e) =>
                  setForm((f) => ({ ...f, whatsappNumber: e.target.value }))
                }
                placeholder="e.g., 919876543210"
                data-ocid="product_form.whatsapp_input"
                className="font-body border-saffron/30 focus:border-saffron"
              />
              <p className="font-body text-xs text-muted-foreground">
                Include country code, no + or spaces (e.g., 919876543210)
              </p>
            </div>

            {/* In Stock */}
            <div
              className="flex items-center gap-3 p-4 rounded-xl"
              style={{ background: "oklch(0.94 0.025 68)" }}
            >
              <Switch
                id="inStock"
                checked={form.inStock}
                onCheckedChange={(v) => setForm((f) => ({ ...f, inStock: v }))}
              />
              <Label
                htmlFor="inStock"
                className="font-body text-sm cursor-pointer text-maroon font-medium"
              >
                {form.inStock ? "In Stock" : "Out of Stock"}
              </Label>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isPending}
              data-ocid="product_form.submit_button"
              className="w-full font-body font-semibold py-3 rounded-xl text-white transition-all duration-200 hover:shadow-lg"
              style={{ background: "oklch(0.62 0.16 55)" }}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isUploading
                    ? `Uploading... ${uploadProgress}%`
                    : "Saving..."}
                </>
              ) : isEditing ? (
                "Update Product"
              ) : (
                "Add Product"
              )}
            </Button>
          </form>
        </motion.div>
      </main>
    </div>
  );
};

export default ProductFormPage;
