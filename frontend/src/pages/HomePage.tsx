import React, { useEffect } from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import GopiSkirtsSection from '../components/GopiSkirtsSection';
import GopiDressesSection from '../components/GopiDressesSection';
import ShortKurtisSection from '../components/ShortKurtisSection';
import SareesSection from '../components/SareesSection';
import AboutSection from '../components/AboutSection';
import Footer from '../components/Footer';
import {
  useProducts,
  useInitializeJaipuriSkirts,
  useInitializeKurtis,
  useInitializeSarees,
  useInitializeGopiDresses,
} from '../hooks/useQueries';

const SectionDivider: React.FC<{ emoji?: string; label?: string }> = ({ emoji = '✦', label = 'DivyaVastrav' }) => (
  <div className="relative py-5 overflow-hidden" style={{ background: 'oklch(0.97 0.018 55)' }}>
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-center gap-4">
        <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, transparent, oklch(0.75 0.18 75 / 0.5))' }} />
        <div className="flex items-center gap-3 px-4">
          <span className="text-lg">{emoji}</span>
          <span className="font-display text-xs tracking-widest uppercase" style={{ color: 'oklch(0.55 0.16 70)' }}>
            ✦ {label} ✦
          </span>
          <span className="text-lg">{emoji}</span>
        </div>
        <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, oklch(0.75 0.18 75 / 0.5), transparent)' }} />
      </div>
    </div>
  </div>
);

const HomePage: React.FC = () => {
  const { data: products = [], isLoading, isError } = useProducts();
  const { mutate: initializeJaipuriSkirts } = useInitializeJaipuriSkirts();
  const { mutate: initializeKurtis } = useInitializeKurtis();
  const { mutate: initializeSarees } = useInitializeSarees();
  const { mutate: initializeGopiDresses } = useInitializeGopiDresses();

  // Auto-initialize products if none exist after loading
  useEffect(() => {
    if (!isLoading && !isError && products.length === 0) {
      initializeJaipuriSkirts(undefined, {
        onSuccess: () => {
          initializeKurtis(undefined, {
            onSuccess: () => {
              initializeSarees(undefined, {
                onSuccess: () => {
                  initializeGopiDresses();
                },
              });
            },
          });
        },
      });
    }
  }, [isLoading, isError, products.length, initializeJaipuriSkirts, initializeKurtis, initializeSarees, initializeGopiDresses]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />

        <GopiSkirtsSection />

        <SectionDivider emoji="🌸" label="DivyaVastrav" />

        <GopiDressesSection />

        <SectionDivider emoji="✨" label="Elegant Traditional Wear" />

        <ShortKurtisSection />

        <SectionDivider emoji="🌺" label="DivyaVastrav" />

        <SareesSection />

        <AboutSection />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
