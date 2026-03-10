import type React from "react";
import { useProducts } from "../hooks/useQueries";
import FeaturedProducts from "./FeaturedProducts";

const GopiSkirtsSection: React.FC = () => {
  const { data: allProducts = [], isLoading, isError } = useProducts();
  const products = allProducts.filter((p) => p.category === "Jaipuri Skirt");

  return (
    <section
      id="jaipuri-skirts"
      className="py-16 md:py-24 relative overflow-hidden"
    >
      <div className="relative container mx-auto px-4 sm:px-6">
        <h2
          className="font-heading text-3xl font-bold mb-8 text-center"
          style={{ color: "oklch(0.32 0.18 18)" }}
        >
          Jaipuri Skirts
        </h2>
        <FeaturedProducts
          products={products}
          isLoading={isLoading}
          isError={isError}
          accentColor="crimson"
        />
      </div>
    </section>
  );
};

export default GopiSkirtsSection;
