import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { SearchBar } from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { detectCurrency } from "@/hooks/useCurrency";
import { getProducts } from "@/lib/store";
import { useMemo, useState } from "react";

const PAGE_SIZE = 8;

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const currency = useMemo(() => detectCurrency(), []);
  const products = useMemo(() => getProducts(), []);

  const categories = useMemo(
    () => Array.from(new Set(products.map((p) => p.category))),
    [products],
  );

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());
      const matchCat = !category || p.category === category;
      return matchSearch && matchCat;
    });
  }, [products, search, category]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  const handleSearch = (val: string) => {
    setSearch(val);
    setPage(1);
  };

  const handleCategory = (cat: string) => {
    setCategory(cat);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="font-heading text-2xl font-semibold mb-1">
          All Products
        </h1>
        <p className="text-sm text-muted-foreground mb-6">
          Authentic devotional clothing from Vrindavan Dham
        </p>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex-1">
            <SearchBar
              value={search}
              onChange={handleSearch}
              placeholder="Search products..."
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={!category ? "default" : "outline"}
              size="sm"
              onClick={() => handleCategory("")}
              className={
                !category ? "bg-gold text-primary-foreground" : "border-border"
              }
            >
              All
            </Button>
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={category === cat ? "default" : "outline"}
                size="sm"
                onClick={() => handleCategory(cat)}
                className={
                  category === cat
                    ? "bg-gold text-primary-foreground"
                    : "border-border text-muted-foreground hover:text-foreground"
                }
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div
            data-ocid="products.empty_state"
            className="text-center py-20 text-muted-foreground"
          >
            <div className="text-4xl mb-3">🪷</div>
            <p>No products found.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {paginated.map((product, i) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  currency={currency}
                  ocid={`product.card.item.${(safePage - 1) * PAGE_SIZE + i + 1}`}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        data-ocid="products.pagination_prev"
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        className={
                          safePage <= 1
                            ? "pointer-events-none opacity-50"
                            : "cursor-pointer"
                        }
                      />
                    </PaginationItem>
                    <PaginationItem>
                      <span className="px-4 py-2 text-sm text-muted-foreground">
                        Page {safePage} of {totalPages}
                      </span>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext
                        data-ocid="products.pagination_next"
                        onClick={() =>
                          setPage((p) => Math.min(totalPages, p + 1))
                        }
                        className={
                          safePage >= totalPages
                            ? "pointer-events-none opacity-50"
                            : "cursor-pointer"
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
