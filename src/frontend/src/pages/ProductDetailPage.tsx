import CheckoutModal from "@/components/CheckoutModal";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { detectCurrency, formatPrice } from "@/hooks/useCurrency";
import { getPaymentSettings, getProducts } from "@/lib/store";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, Instagram } from "lucide-react";
import { useMemo, useState } from "react";

export default function ProductDetailPage() {
  const params = useParams({ strict: false }) as { id?: string };
  const id = params.id;
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const currency = useMemo(() => detectCurrency(), []);
  const products = useMemo(() => getProducts(), []);
  const paymentSettings = useMemo(() => getPaymentSettings(), []);
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 py-20 text-center">
          <div className="text-4xl mb-4">🪷</div>
          <h2 className="font-heading text-xl font-semibold mb-2">
            Product Not Found
          </h2>
          <p className="text-muted-foreground text-sm mb-6">
            This product may have been removed.
          </p>
          <Button
            asChild
            variant="outline"
            className="border-gold/40 text-gold"
          >
            <Link to="/products">Browse All Products</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const allImages =
    product.images && product.images.length > 0
      ? product.images
      : product.imageUrl
        ? [product.imageUrl]
        : [];

  const mainImage = allImages[selectedImageIndex] || null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 py-8">
        <Link
          to="/products"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-gold transition-colors mb-6"
        >
          <ArrowLeft size={14} />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="flex flex-col gap-3">
            <div className="placeholder-img aspect-square rounded-lg overflow-hidden">
              {mainImage ? (
                <img
                  src={mainImage}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-6xl select-none">🪷</span>
              )}
            </div>

            {/* Thumbnail Row */}
            {allImages.length > 1 && (
              <div className="flex gap-2 flex-wrap">
                {allImages.map((img, idx) => (
                  <button
                    // biome-ignore lint/suspicious/noArrayIndexKey: thumbnails are ordered by position
                    key={`thumb-${idx}`}
                    type="button"
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-16 h-16 rounded overflow-hidden border-2 transition-all ${
                      selectedImageIndex === idx
                        ? "border-gold shadow-sm"
                        : "border-border hover:border-gold/50"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <Badge
              variant="secondary"
              className="self-start mb-3 bg-gold-pale text-gold border-0"
            >
              {product.category}
            </Badge>

            <h1 className="font-heading text-2xl md:text-3xl font-semibold mb-2 leading-tight">
              {product.name}
            </h1>

            <p className="text-2xl font-semibold text-gold mb-4">
              {formatPrice(product.price, currency)}
            </p>

            <div className="gold-line mb-4" />

            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              {product.description}
            </p>

            <div className="bg-muted/40 rounded p-3 text-xs text-muted-foreground mb-6">
              🪷 Imported from Vrindavan Dham — Limited pieces available
            </div>

            {product.inStock ? (
              <Button
                data-ocid="product.detail.order.button"
                onClick={() => setCheckoutOpen(true)}
                className="w-full bg-gold text-primary-foreground hover:bg-gold/90 h-11 mb-3"
              >
                Order Now
              </Button>
            ) : (
              <Button disabled className="w-full h-11 mb-3">
                Out of Stock
              </Button>
            )}

            <a
              href="https://www.instagram.com/divyavastra_?igsh=eGd4eTc2bGl4MzN1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                className="w-full border-gold/40 text-gold hover:bg-gold-pale gap-2"
              >
                <Instagram size={15} />
                Inquire on Instagram
              </Button>
            </a>
          </div>
        </div>
      </main>

      <Footer />

      {checkoutOpen && (
        <CheckoutModal
          open={checkoutOpen}
          onClose={() => setCheckoutOpen(false)}
          product={product}
          currency={currency}
          paymentSettings={paymentSettings}
        />
      )}
    </div>
  );
}
