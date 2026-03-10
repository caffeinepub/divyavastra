import { Badge } from "@/components/ui/badge";
import { MessageCircle, Tag } from "lucide-react";
import type React from "react";
import { useState } from "react";
import type { Product } from "../backend";

interface ProductCardProps {
  product: Product;
  accentColor?: "crimson" | "golden" | "pink";
}

const PLACEHOLDER = "/assets/generated/product-placeholder.dim_600x700.png";

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  accentColor = "crimson",
}) => {
  const imageUrl = product.imageId || "";
  const [imgSrc, setImgSrc] = useState<string>(imageUrl || PLACEHOLDER);
  const [fallbackTried, setFallbackTried] = useState(false);

  const handleImageError = () => {
    if (!fallbackTried) {
      setFallbackTried(true);
      if (imageUrl && imageUrl !== imgSrc) {
        setImgSrc(imageUrl);
        return;
      }
    }
    setImgSrc(PLACEHOLDER);
  };

  const getAccentStyles = () => {
    switch (accentColor) {
      case "golden":
        return {
          topGradient:
            "linear-gradient(90deg, oklch(0.75 0.18 75), oklch(0.45 0.22 18), oklch(0.75 0.18 75))",
          categoryBg: "oklch(0.75 0.18 75 / 0.88)",
          categoryColor: "oklch(0.18 0.10 18)",
          priceColor: "oklch(0.55 0.16 70)",
          buttonBg:
            "linear-gradient(135deg, oklch(0.75 0.18 75), oklch(0.60 0.16 70))",
          buttonColor: "oklch(0.18 0.10 18)",
          borderColor: "oklch(0.75 0.18 75 / 0.35)",
          dividerColor: "oklch(0.75 0.18 75 / 0.2)",
        };
      case "pink":
        return {
          topGradient:
            "linear-gradient(90deg, oklch(0.72 0.16 340), oklch(0.75 0.18 75), oklch(0.72 0.16 340))",
          categoryBg: "oklch(0.72 0.16 340 / 0.88)",
          categoryColor: "oklch(0.18 0.06 20)",
          priceColor: "oklch(0.50 0.16 340)",
          buttonBg:
            "linear-gradient(135deg, oklch(0.72 0.16 340), oklch(0.55 0.18 340))",
          buttonColor: "oklch(0.97 0.012 60)",
          borderColor: "oklch(0.72 0.16 340 / 0.35)",
          dividerColor: "oklch(0.72 0.16 340 / 0.2)",
        };
      default:
        return {
          topGradient:
            "linear-gradient(90deg, oklch(0.45 0.22 18), oklch(0.75 0.18 75), oklch(0.45 0.22 18))",
          categoryBg: "oklch(0.45 0.22 18 / 0.88)",
          categoryColor: "oklch(0.75 0.18 75)",
          priceColor: "oklch(0.45 0.22 18)",
          buttonBg:
            "linear-gradient(135deg, oklch(0.45 0.22 18), oklch(0.32 0.18 18))",
          buttonColor: "oklch(0.75 0.18 75)",
          borderColor: "oklch(0.45 0.22 18 / 0.30)",
          dividerColor: "oklch(0.45 0.22 18 / 0.15)",
        };
    }
  };

  const styles = getAccentStyles();
  const whatsappMessage = encodeURIComponent(
    `I want to order: ${product.name} from DivyaVastrav`,
  );

  return (
    <div
      className="group relative flex flex-col overflow-hidden rounded-sm transition-all duration-300 hover:-translate-y-1"
      style={{
        background: "oklch(0.99 0.008 55)",
        border: `1px solid ${styles.borderColor}`,
        boxShadow: "0 2px 12px oklch(0.45 0.22 18 / 0.08)",
      }}
    >
      <div className="h-1 w-full" style={{ background: styles.topGradient }} />

      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: "3/4", background: "oklch(0.95 0.02 55)" }}
      >
        <img
          src={imgSrc}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={handleImageError}
        />
        {product.inStock && (
          <div className="absolute top-3 right-3">
            <Badge
              className="text-xs font-body font-bold px-2 py-1 rounded-sm"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.75 0.18 75), oklch(0.60 0.16 70))",
                color: "oklch(0.18 0.10 18)",
                border: "none",
              }}
            >
              In Stock
            </Badge>
          </div>
        )}
        <div className="absolute bottom-3 left-3">
          <span
            className="flex items-center gap-1 text-xs font-body font-semibold uppercase px-2 py-1 rounded-sm"
            style={{
              background: styles.categoryBg,
              color: styles.categoryColor,
            }}
          >
            <Tag size={10} />
            {product.category}
          </span>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-4 gap-2">
        <h3
          className="font-heading text-base font-semibold leading-snug"
          style={{ color: "oklch(0.22 0.14 18)" }}
        >
          {product.name}
        </h3>
        <p
          className="font-body text-sm leading-relaxed flex-1"
          style={{ color: "oklch(0.45 0.05 30)" }}
        >
          {product.description}
        </p>
        <div
          className="flex items-center justify-between mt-3 pt-3"
          style={{ borderTop: `1px solid ${styles.dividerColor}` }}
        >
          <span
            className="font-heading font-bold text-base"
            style={{ color: styles.priceColor }}
          >
            ₹{Number(product.price).toLocaleString("en-IN")}
          </span>
          <a
            href={`https://wa.me/?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-body font-bold uppercase rounded-sm transition-all duration-200 hover:-translate-y-0.5 flex-shrink-0"
            style={{ background: styles.buttonBg, color: styles.buttonColor }}
          >
            <MessageCircle size={12} />
            Buy Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
