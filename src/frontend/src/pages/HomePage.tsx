import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { detectCurrency } from "@/hooks/useCurrency";
import { getProducts } from "@/lib/store";
import { Link } from "@tanstack/react-router";
import { Instagram } from "lucide-react";
import { useMemo, useState } from "react";

const CATEGORIES = [
  {
    name: "Gopi Dresses",
    emoji: "🪷",
    desc: "For Matajis — elegant cotton dresses",
  },
  { name: "Bagalbandi", emoji: "🙏", desc: "For Prabhujis — devotional tops" },
  { name: "Dhoti Sets", emoji: "✨", desc: "Classic dhoti sets for seva" },
];

export default function HomePage() {
  const [search, setSearch] = useState("");
  const currency = useMemo(() => detectCurrency(), []);
  const products = useMemo(() => getProducts(), []);

  const featured = useMemo(() => {
    if (!search) return products;
    const q = search.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q),
    );
  }, [products, search]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar showSearch onSearch={setSearch} />

      <main>
        {/* Hero */}
        <section className="relative bg-gradient-to-b from-[oklch(0.96_0.02_68)] to-background py-16 md:py-24 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs tracking-[0.2em] uppercase text-gold mb-4">
              Imported from Vrindavan Dham
            </p>
            <h1 className="font-heading text-3xl md:text-5xl font-semibold text-foreground mb-4 leading-tight">
              Premium Devotee
              <br />
              <em className="text-gold">Couple Collection</em>
            </h1>
            <p className="text-muted-foreground text-sm md:text-base mb-8 max-w-md mx-auto">
              Authentic devotional clothing from the holy land of Vrindavan
              Dham. Traditional craftsmanship, pure cotton fabrics.
            </p>
            <Button
              asChild
              data-ocid="home.hero.button"
              className="bg-gold text-primary-foreground hover:bg-gold/90 px-8 h-11 text-sm"
            >
              <Link to="/products">Shop Now</Link>
            </Button>
          </div>
        </section>

        <div className="gold-line" />

        {/* Categories */}
        <section className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="font-heading text-2xl font-semibold text-center mb-8">
            Our Collections
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.name}
                to="/products"
                className="group block p-6 rounded-lg border border-border bg-card hover:border-gold/40 hover:shadow-sm transition-all text-center"
              >
                <div className="text-3xl mb-3">{cat.emoji}</div>
                <h3 className="font-heading font-semibold text-foreground mb-1 group-hover:text-gold transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-muted-foreground">{cat.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section className="max-w-6xl mx-auto px-4 pb-12">
          <h2 className="font-heading text-2xl font-semibold text-center mb-2">
            {search ? "Search Results" : "Featured Products"}
          </h2>
          <p className="text-center text-xs text-muted-foreground mb-8 tracking-wide">
            Limited pieces available — imported directly from Vrindavan Dham
          </p>

          {featured.length === 0 ? (
            <div
              data-ocid="products.empty_state"
              className="text-center py-16 text-muted-foreground"
            >
              <div className="text-4xl mb-3">🪷</div>
              <p>No products found for "{search}"</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {featured.map((product, i) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  currency={currency}
                  ocid={`product.card.item.${i + 1}`}
                />
              ))}
            </div>
          )}
        </section>

        {/* Instagram */}
        <section className="bg-card border-t border-border">
          <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-heading text-lg font-semibold mb-1">
                Follow Us on Instagram
              </h3>
              <p className="text-sm text-muted-foreground">
                See our latest collections and devotional content
              </p>
            </div>
            <a
              href="https://www.instagram.com/divyavastra_?igsh=eGd4eTc2bGl4MzN1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                className="border-gold/40 text-gold hover:bg-gold-pale gap-2"
              >
                <Instagram size={16} />
                @divyavastra_
              </Button>
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
