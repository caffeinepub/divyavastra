import React from 'react';
import { Sparkles, Star } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section id="home" className="relative overflow-hidden">
      {/* Hero Image */}
      <div className="relative min-h-[560px] md:min-h-[680px] flex items-center">
        <img
          src="/assets/generated/radha-krishna-hero-banner.dim_1440x700.png"
          alt="Radha Krishna - DivyaVastra"
          className="absolute inset-0 w-full h-full object-cover object-center"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/assets/generated/hero-banner.dim_1200x500.png';
          }}
        />
        {/* Overlay gradient - peacock blue + saffron tones */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, oklch(0.18 0.06 240 / 0.88) 0%, oklch(0.22 0.07 240 / 0.70) 45%, oklch(0.18 0.04 30 / 0.35) 100%)'
          }}
        />

        {/* Decorative peacock feather motif overlay */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse at 80% 50%, oklch(0.72 0.18 55 / 0.08) 0%, transparent 60%)'
        }} />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-2xl">
            {/* Decorative top element */}
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px flex-1 max-w-[60px]" style={{ background: 'oklch(0.78 0.16 80)' }} />
              <div className="flex items-center gap-2">
                <span style={{ color: 'oklch(0.78 0.16 80)', fontSize: '16px' }}>🪷</span>
                <span className="font-body text-xs tracking-[0.3em] uppercase font-semibold" style={{ color: 'oklch(0.78 0.16 80)' }}>
                  Radha Krishna Blessings
                </span>
                <span style={{ color: 'oklch(0.78 0.16 80)', fontSize: '16px' }}>🪷</span>
              </div>
              <div className="h-px flex-1 max-w-[60px]" style={{ background: 'oklch(0.78 0.16 80)' }} />
            </div>

            {/* Brand Name */}
            <h1 className="font-display text-5xl md:text-7xl font-bold mb-4 leading-tight" style={{ color: 'oklch(0.97 0.012 85)' }}>
              Divya
              <span style={{ color: 'oklch(0.78 0.16 80)' }}>Vastra</span>
            </h1>

            {/* Tagline */}
            <p className="font-heading text-xl md:text-2xl italic mb-3" style={{ color: 'oklch(0.88 0.08 80)' }}>
              Where Devotion Meets Elegance
            </p>
            <p className="font-body text-base md:text-lg mb-8 leading-relaxed" style={{ color: 'oklch(0.85 0.03 80)' }}>
              Discover our divine collection of handcrafted <strong style={{ color: 'oklch(0.78 0.16 80)' }}>Gopi Skirts</strong> &amp; <strong style={{ color: 'oklch(0.78 0.12 340)' }}>Short Kurtis</strong> — 
              vibrant, flowing, and perfect for every festive occasion. 
              Celebrate the beauty of traditional Indian ladies fashion.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <a
                href="#gopi-skirts"
                className="flex items-center gap-2 px-8 py-3 font-body font-bold text-sm tracking-widest uppercase rounded-sm transition-all duration-300 hover:shadow-gold hover:-translate-y-0.5"
                style={{
                  background: 'linear-gradient(135deg, oklch(0.78 0.16 80), oklch(0.72 0.18 55))',
                  color: 'oklch(0.18 0.06 240)',
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

            {/* Decorative stars */}
            <div className="flex items-center gap-2 mt-8">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill="currentColor" style={{ color: 'oklch(0.78 0.16 80)' }} />
              ))}
              <span className="font-body text-xs ml-2" style={{ color: 'oklch(0.82 0.04 80)' }}>
                Trusted by thousands of happy customers
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Section divider motif */}
      <img
        src="/assets/generated/section-divider-motif.dim_1440x80.png"
        alt=""
        className="w-full object-cover"
        style={{ height: '60px', display: 'block' }}
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = 'none';
        }}
      />

      {/* Bottom decorative band */}
      <div className="h-2" style={{
        background: 'linear-gradient(90deg, oklch(0.18 0.06 240), oklch(0.72 0.18 55), oklch(0.78 0.16 80), oklch(0.72 0.18 55), oklch(0.18 0.06 240))'
      }} />
    </section>
  );
};

export default HeroSection;
