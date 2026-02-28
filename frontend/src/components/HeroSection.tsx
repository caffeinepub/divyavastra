import React from 'react';
import { Sparkles, Star } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section id="home" className="relative overflow-hidden">
      {/* Hero Image */}
      <div className="relative min-h-[520px] md:min-h-[600px] flex items-center">
        <img
          src="/assets/generated/hero-banner.dim_1200x500.png"
          alt="DivyaVastra Gopi Skirts Collection"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Overlay gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, oklch(0.18 0.04 30 / 0.82) 0%, oklch(0.38 0.16 18 / 0.65) 50%, oklch(0.18 0.04 30 / 0.4) 100%)'
          }}
        />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-2xl">
            {/* Decorative top element */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1 max-w-[60px]" style={{ background: 'oklch(0.78 0.16 80)' }} />
              <div className="flex items-center gap-1">
                <Star size={12} fill="currentColor" style={{ color: 'oklch(0.78 0.16 80)' }} />
                <span className="font-body text-xs tracking-[0.3em] uppercase font-semibold" style={{ color: 'oklch(0.78 0.16 80)' }}>
                  Traditional Elegance
                </span>
                <Star size={12} fill="currentColor" style={{ color: 'oklch(0.78 0.16 80)' }} />
              </div>
              <div className="h-px flex-1 max-w-[60px]" style={{ background: 'oklch(0.78 0.16 80)' }} />
            </div>

            {/* Brand Name */}
            <h1 className="font-display text-5xl md:text-7xl font-bold mb-4 leading-tight" style={{ color: 'oklch(0.97 0.012 75)' }}>
              Divya
              <span style={{ color: 'oklch(0.78 0.16 80)' }}>Vastra</span>
            </h1>

            {/* Tagline */}
            <p className="font-heading text-xl md:text-2xl italic mb-3" style={{ color: 'oklch(0.88 0.03 55)' }}>
              Where Tradition Meets Grace
            </p>
            <p className="font-body text-base md:text-lg mb-8 leading-relaxed" style={{ color: 'oklch(0.82 0.02 60)' }}>
              Discover our exquisite collection of handcrafted <strong>Gopi Skirts</strong> — 
              vibrant, flowing, and perfect for every festive occasion. 
              Celebrate the beauty of traditional Indian ladies fashion.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <a
                href="#collection"
                className="flex items-center gap-2 px-8 py-3 font-body font-bold text-sm tracking-widest uppercase rounded-sm transition-all duration-300 hover:shadow-gold hover:-translate-y-0.5"
                style={{
                  background: 'linear-gradient(135deg, oklch(0.78 0.16 80), oklch(0.72 0.18 55))',
                  color: 'oklch(0.18 0.04 30)',
                }}
              >
                <Sparkles size={16} />
                Explore Collection
              </a>
              <a
                href="#about"
                className="flex items-center gap-2 px-8 py-3 font-body font-bold text-sm tracking-widest uppercase rounded-sm border-2 transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  borderColor: 'oklch(0.78 0.16 80)',
                  color: 'oklch(0.78 0.16 80)',
                }}
              >
                Our Story
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave / decorative band */}
      <div className="h-3" style={{
        background: 'linear-gradient(90deg, oklch(0.38 0.16 18), oklch(0.72 0.18 55), oklch(0.78 0.16 80), oklch(0.72 0.18 55), oklch(0.38 0.16 18))'
      }} />
    </section>
  );
};

export default HeroSection;
