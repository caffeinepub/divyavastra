import React, { useEffect } from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import GopiSkirtsSection from '../components/GopiSkirtsSection';
import ShortKurtisSection from '../components/ShortKurtisSection';
import AboutSection from '../components/AboutSection';
import Footer from '../components/Footer';
import { useProducts, useInitializeGopi, useInitializeKurti } from '../hooks/useQueries';

const HomePage: React.FC = () => {
  const { data: products = [], isLoading, isError } = useProducts();
  const { mutate: initializeGopi } = useInitializeGopi();
  const { mutate: initializeKurti } = useInitializeKurti();

  // Auto-initialize products if none exist after loading
  useEffect(() => {
    if (!isLoading && !isError && products.length === 0) {
      initializeGopi(undefined, {
        onSuccess: () => {
          initializeKurti();
        },
      });
    }
  }, [isLoading, isError, products.length, initializeGopi, initializeKurti]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />

        {/* Section divider between hero and gopi skirts */}
        <div className="h-px w-full" style={{
          background: 'linear-gradient(90deg, transparent, oklch(0.78 0.16 80 / 0.4), oklch(0.72 0.18 55 / 0.4), oklch(0.78 0.16 80 / 0.4), transparent)'
        }} />

        <GopiSkirtsSection />

        {/* Decorative divider between sections */}
        <div className="relative py-6 overflow-hidden" style={{ background: 'oklch(0.97 0.015 85)' }}>
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-4">
              <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, transparent, oklch(0.78 0.16 80 / 0.5))' }} />
              <div className="flex items-center gap-3 px-4">
                <span className="text-xl">🦚</span>
                <span className="font-display text-sm tracking-widest uppercase" style={{ color: 'oklch(0.72 0.18 55)' }}>
                  ✦ DivyaVastra ✦
                </span>
                <span className="text-xl">🌸</span>
              </div>
              <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, oklch(0.78 0.16 80 / 0.5), transparent)' }} />
            </div>
          </div>
        </div>

        <ShortKurtisSection />

        <AboutSection />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
