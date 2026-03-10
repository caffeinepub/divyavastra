import type React from "react";
import { useProducts } from "../hooks/useQueries";
import FeaturedProducts from "./FeaturedProducts";

const GopiDressesSection: React.FC = () => {
  const { data: allProducts = [], isLoading, isError } = useProducts();
  const products = allProducts.filter((p) => p.category === "Gopi Dress");

  return (
    <section
      id="gopi-dresses"
      className="py-16 md:py-24 relative overflow-hidden"
    >
      <div className="relative container mx-auto px-4 sm:px-6">
        <h2
          className="font-heading text-3xl font-bold mb-8 text-center"
          style={{ color: "oklch(0.32 0.18 18)" }}
        >
          Gopi Dresses
        </h2>
        <FeaturedProducts
          products={products}
          isLoading={isLoading}
          isError={isError}
          accentColor="golden"
        />
      </div>
    </section>
  );
};

export default GopiDressesSection;
