import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import type React from "react";
import { useState } from "react";
import type { Product } from "../backend";
import { useProducts } from "../hooks/useQueries";

const DEFAULT_WHATSAPP = "919999999999";

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: BigInt(1),
    name: "Gopi Dress",
    description:
      "Elegant pure cotton dress with a beautiful saffron border and delicate khadi work on a graceful white base. Perfect for Matajis during seva, darshan and festivals.",
    price: BigInt(6500),
    category: "Ladies",
    inStock: true,
    whatsappNumber: DEFAULT_WHATSAPP,
    imageId: undefined,
  },
  {
    id: BigInt(2),
    name: "Bagalbandi for Prabhujis",
    description:
      "Traditional devotional top crafted from fine saffron-dyed fabric, perfect for kirtan, morning programs, and temple visits. Designed with sacred comfort in mind.",
    price: BigInt(2100),
    category: "Mens",
    inStock: true,
    whatsappNumber: DEFAULT_WHATSAPP,
    imageId: undefined,
  },
  {
    id: BigInt(3),
    name: "Dhoti & Chadar Set",
    description:
      "Soft, comfortable pure cotton dhoti paired with a matching chadar – ideal for seva, abhishek, and all festival occasions. Worn by devotees in Vrindavan Dham.",
    price: BigInt(2000),
    category: "Mens",
    inStock: true,
    whatsappNumber: DEFAULT_WHATSAPP,
    imageId: undefined,
  },
];

const SAMPLE_IMAGES: Record<number, string> = {
  1: "/assets/generated/product-gopi-dress.dim_600x750.jpg",
  2: "/assets/generated/product-bagalbandi.dim_600x750.jpg",
  3: "/assets/generated/product-dhoti-chadar.dim_600x750.jpg",
};

function formatPrice(price: bigint): string {
  return `₹${Number(price).toLocaleString("en-IN")}`;
}

function getWhatsAppLink(product: Product): string {
  const number = product.whatsappNumber || DEFAULT_WHATSAPP;
  const text = encodeURIComponent(`I want to order: ${product.name}`);
  return `https://wa.me/${number}?text=${text}`;
}

function getProductImage(product: Product, index: number): string {
  if (product.imageId) return product.imageId;
  return (
    SAMPLE_IMAGES[index + 1] ||
    "/assets/generated/product-gopi-dress.dim_600x750.jpg"
  );
}

const WhatsAppIcon: React.FC = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-5 h-5 mr-2 fill-current"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

const LotusDivider: React.FC<{ label?: string }> = ({ label = "🪷" }) => (
  <div className="flex items-center justify-center gap-4 py-2">
    <div className="saffron-divider flex-1" />
    <span className="text-xl px-2 text-saffron">{label}</span>
    <div className="saffron-divider flex-1" />
  </div>
);

const ProductCard: React.FC<{ product: Product; index: number }> = ({
  product,
  index,
}) => {
  const [imgError, setImgError] = useState(false);
  const imgSrc = getProductImage(product, index);

  const categoryColors: Record<string, string> = {
    Ladies: "bg-pink-100 text-pink-800",
    Mens: "bg-blue-100 text-blue-800",
    "Couple Set": "bg-amber-100 text-amber-800",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      data-ocid={`products.item.${index + 1}`}
      className="devotional-card rounded-xl overflow-hidden group cursor-pointer"
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/5] bg-cream-warm">
        {!imgError ? (
          <img
            src={imgSrc}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.94 0.04 70), oklch(0.92 0.06 60))",
            }}
          >
            <span className="text-6xl opacity-40">🪷</span>
          </div>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-foreground/40 flex items-center justify-center">
            <span className="bg-background text-foreground font-heading text-sm font-semibold px-4 py-2 rounded-full">
              Out of Stock
            </span>
          </div>
        )}
        <div className="absolute top-3 left-3">
          <Badge
            className={`text-xs font-body font-medium px-2 py-0.5 rounded-full border-0 ${
              categoryColors[product.category] || "bg-amber-100 text-amber-800"
            }`}
          >
            {product.category}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-heading text-xl font-semibold text-maroon mb-1">
          {product.name}
        </h3>
        <div className="text-2xl font-heading font-bold text-saffron mb-3">
          {formatPrice(product.price)}
        </div>
        <p className="text-sm font-body text-muted-foreground leading-relaxed mb-4 line-clamp-3">
          {product.description}
        </p>
        <a
          href={getWhatsAppLink(product)}
          target="_blank"
          rel="noopener noreferrer"
          data-ocid="product.whatsapp_button"
        >
          <Button
            type="button"
            className="w-full font-body font-semibold text-white rounded-lg py-2.5 transition-all duration-200 hover:shadow-lg"
            style={{ background: "#25D366" }}
            disabled={!product.inStock}
          >
            <WhatsAppIcon />
            Order on WhatsApp
          </Button>
        </a>
      </div>
    </motion.div>
  );
};

const ProductSkeleton: React.FC<{ idx: number }> = ({ idx }) => (
  <div key={idx} className="devotional-card rounded-xl overflow-hidden">
    <Skeleton className="aspect-[4/5] w-full" />
    <div className="p-5 space-y-3">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-8 w-1/3" />
      <Skeleton className="h-16 w-full" />
      <Skeleton className="h-11 w-full" />
    </div>
  </div>
);

const FILTERS = ["All", "Ladies", "Mens", "Couple Set"];

const HomePage: React.FC = () => {
  const { data: backendProducts, isLoading } = useProducts();

  const products =
    backendProducts && backendProducts.length > 0
      ? backendProducts
      : SAMPLE_PRODUCTS;

  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filteredProducts =
    activeFilter === "All"
      ? products
      : products.filter((p) => p.category === activeFilter);

  return (
    <div className="min-h-screen flex flex-col font-body">
      {/* Header */}
      <header
        className="sticky top-0 z-50 border-b border-saffron/20"
        style={{
          background:
            "linear-gradient(90deg, oklch(0.98 0.012 72), oklch(0.97 0.020 68), oklch(0.98 0.012 72))",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🪷</span>
            <div>
              <h1 className="font-heading text-lg font-bold text-maroon leading-tight">
                Vrindavan Devotee Collection
              </h1>
              <p className="text-xs font-body text-saffron tracking-wide">
                Dressed for Devotion
              </p>
            </div>
          </div>
          <nav className="flex items-center gap-4">
            <a
              href="#products"
              data-ocid="nav.home_link"
              className="text-sm font-body text-maroon/80 hover:text-saffron transition-colors hidden sm:block"
            >
              Collection
            </a>
            <a
              href="#about"
              className="text-sm font-body text-maroon/80 hover:text-saffron transition-colors hidden sm:block"
            >
              About
            </a>
            <Link
              to="/admin"
              data-ocid="nav.admin_link"
              className="text-xs font-body px-3 py-1.5 rounded-full border border-saffron/40 text-saffron hover:bg-saffron hover:text-white transition-all duration-200"
            >
              Admin
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Announcement Banner */}
        <div
          className="text-center py-2.5 px-4 text-sm font-body font-medium tracking-wide"
          style={{ background: "oklch(0.62 0.16 55)", color: "white" }}
        >
          🌸 Imported from Vrindavan Dham – Limited Pieces Available 🌸
        </div>

        {/* Hero Section */}
        <section
          className="relative overflow-hidden"
          style={{ minHeight: "480px" }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "url('/assets/generated/vrindavan-hero-bg.dim_1440x600.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.15 0.06 30 / 0.55) 0%, oklch(0.35 0.12 20 / 0.35) 100%)",
            }}
          />
          <div className="relative container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <p
                className="font-serif text-lg italic mb-4"
                style={{ color: "oklch(0.90 0.10 70)" }}
              >
                ॥ श्री राधे ॥
              </p>
              <h2
                className="font-heading text-4xl md:text-6xl font-bold mb-4 leading-tight"
                style={{ color: "oklch(0.98 0.015 80)" }}
              >
                Dressed for Devotion,
                <br />
                <span style={{ color: "oklch(0.85 0.14 70)" }}>
                  Crafted in Vrindavan
                </span>
              </h2>
              <p
                className="font-body text-lg max-w-lg mx-auto mb-8"
                style={{ color: "oklch(0.92 0.02 75)" }}
              >
                Sacred clothing for the devoted heart – pure, elegant, and
                crafted with love from the land of Sri Krishna.
              </p>
              <a href="#products">
                <Button
                  type="button"
                  className="font-body font-semibold px-8 py-3 rounded-full text-white text-base shadow-sacred transition-all duration-300 hover:scale-105"
                  style={{ background: "oklch(0.62 0.16 55)" }}
                >
                  View Collection
                </Button>
              </a>
            </motion.div>
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="py-16 temple-bg">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <p className="font-serif italic text-saffron text-base mb-2">
                Premium Devotee Collection
              </p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-maroon mb-4">
                Sacred Garments
              </h2>
              <LotusDivider label="🪷" />
              <p className="font-body text-muted-foreground mt-4 max-w-xl mx-auto">
                Each piece is carefully chosen to honor your spiritual journey,
                bringing the essence of Vrindavan to your daily devotion.
              </p>
            </motion.div>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {FILTERS.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  data-ocid="products.filter.tab"
                  className={`px-5 py-2 rounded-full text-sm font-body font-medium transition-all duration-200 border ${
                    activeFilter === filter
                      ? "border-saffron bg-saffron text-white shadow-saffron"
                      : "border-saffron/30 text-maroon/70 hover:border-saffron hover:text-saffron"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Product Grid */}
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              data-ocid="products.list"
            >
              <AnimatePresence mode="wait">
                {isLoading
                  ? [0, 1, 2].map((i) => <ProductSkeleton key={i} idx={i} />)
                  : filteredProducts.map((product, i) => (
                      <ProductCard
                        key={product.id.toString()}
                        product={product}
                        index={i}
                      />
                    ))}
              </AnimatePresence>
            </div>

            {filteredProducts.length === 0 && !isLoading && (
              <div
                className="text-center py-16"
                data-ocid="products.empty_state"
              >
                <span className="text-5xl block mb-4">🪷</span>
                <p className="font-heading text-xl text-maroon">
                  No products in this category yet
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Couple Collection Banner */}
        <section
          className="py-12 text-center"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.35 0.12 20 / 0.06), oklch(0.62 0.16 55 / 0.08), oklch(0.35 0.12 20 / 0.06))",
            borderTop: "1px solid oklch(0.62 0.16 55 / 0.20)",
            borderBottom: "1px solid oklch(0.62 0.16 55 / 0.20)",
          }}
        >
          <div className="container mx-auto px-4">
            <p className="font-serif italic text-saffron mb-2">
              Special Offering
            </p>
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-maroon mb-3">
              Premium Devotee Couple Collection
            </h3>
            <LotusDivider label="🌸" />
            <p className="font-body text-muted-foreground mt-4 mb-2">
              Gopi Dress + Bagalbandi + Dhoti &amp; Chadar Set
            </p>
            <p className="font-heading text-3xl font-bold text-saffron mt-2 mb-4">
              ₹10,600
            </p>
            <p className="text-sm font-body text-muted-foreground mb-6">
              Complete devotional attire for Matajis and Prabhujis together
            </p>
            <a
              href={`https://wa.me/${DEFAULT_WHATSAPP}?text=${encodeURIComponent("I want to order the Premium Devotee Couple Collection")}`}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="product.whatsapp_button.1"
            >
              <Button
                type="button"
                className="font-body font-semibold px-8 py-3 rounded-full text-white text-base shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                style={{ background: "#25D366" }}
              >
                <WhatsAppIcon />
                Order Couple Set on WhatsApp
              </Button>
            </a>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <p className="font-serif italic text-saffron text-base">
                Our Story
              </p>
              <h2 className="font-heading text-3xl font-bold text-maroon">
                Born in Vrindavan, Made for Devotees
              </h2>
              <LotusDivider label="🪷" />
              <p className="font-body text-muted-foreground leading-relaxed text-base">
                The Vrindavan Devotee Collection is a labour of love, curated
                from the sacred land of Sri Sri Radha Krishna. Each garment is
                thoughtfully sourced from local artisans in Vrindavan Dham, who
                weave devotion into every thread.
              </p>
              <p className="font-body text-muted-foreground leading-relaxed text-base">
                Whether you are attending morning aarti, singing kirtan, or
                serving in the temple, our clothing helps you feel connected to
                the divine atmosphere of Vrindavan — wherever you are.
              </p>
              <div className="flex justify-center gap-8 pt-4">
                {[
                  { value: "100%", label: "Pure Cotton" },
                  { value: "✓", label: "Vrindavan Sourced" },
                  { value: "✓", label: "Devotee Approved" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="font-heading text-2xl font-bold text-saffron">
                      {stat.value}
                    </div>
                    <div className="font-body text-xs text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        className="py-10 text-center"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.22 0.07 25), oklch(0.16 0.06 22))",
        }}
      >
        <div className="container mx-auto px-4">
          <div className="text-3xl mb-3">🪷</div>
          <h3
            className="font-heading text-xl font-bold mb-1"
            style={{ color: "oklch(0.90 0.10 70)" }}
          >
            Vrindavan Devotee Collection
          </h3>
          <p
            className="font-serif italic text-sm mb-4"
            style={{ color: "oklch(0.72 0.10 65)" }}
          >
            Dressed for Devotion, Crafted in Vrindavan
          </p>
          <div className="saffron-divider max-w-sm mx-auto mb-4" />
          <p
            className="font-body text-xs mb-2"
            style={{ color: "oklch(0.65 0.06 50)" }}
          >
            📞 WhatsApp:{" "}
            <a
              href={`https://wa.me/${DEFAULT_WHATSAPP}`}
              className="hover:text-saffron transition-colors"
              style={{ color: "oklch(0.72 0.10 65)" }}
            >
              +91 99999 99999
            </a>
          </p>
          <p
            className="font-body text-xs mt-4"
            style={{ color: "oklch(0.50 0.05 40)" }}
          >
            © {new Date().getFullYear()} · Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              className="hover:text-saffron transition-colors"
              style={{ color: "oklch(0.62 0.16 55)" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
