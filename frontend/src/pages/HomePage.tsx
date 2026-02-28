import React, { useEffect } from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import FeaturedProducts from '../components/FeaturedProducts';
import AboutSection from '../components/AboutSection';
import Footer from '../components/Footer';
import { useProducts, useInitialize } from '../hooks/useQueries';

const HomePage: React.FC = () => {
  const { data: products = [], isLoading, isError } = useProducts();
  const { mutate: initialize } = useInitialize();

  // Auto-initialize products if none exist after loading
  useEffect(() => {
    if (!isLoading && !isError && products.length === 0) {
      initialize();
    }
  }, [isLoading, isError, products.length, initialize]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturedProducts
          products={products}
          isLoading={isLoading}
          isError={isError}
        />
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
