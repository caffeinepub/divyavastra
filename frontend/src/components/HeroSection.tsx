import React from 'react';
import { Sparkles, Star, MessageCircle } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section id="home" className="relative overflow-hidden">
      {/* Hero Image */}
      <div className="relative min-h-[580px] md:min-h-[680px] flex items-center">
        <img
          src="/assets/generated/hero-bg-jaipuri.dim_1440x600.png"
          alt="DivyaVastrav - Elegant Traditional Ladies Wear"
          className="absolute inset-0 w-full h-full object-cover object-center"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/assets/generated/radha-krishna-hero-banner.dim_1440x700.png';
          }}
        />

        {/* Overlay gradient - deep red + golden tones */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, oklch(0.18 0.12 18 / 0.92) 0%, oklch(0.25 0.14 18 / 0.78) 45%, oklch(0.22 0.10 30 / 0.50) 100%)'
          }}
        />

        {/* Radial golden glow */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse at 75% 50%, oklch(0.75 0.18 75 / 0.12) 0%, transparent 60%)'
        }} />

        {/* Jaipuri pattern overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-5" style={{
          backgroundImage: 'url(/assets/generated/jaipuri-border-tile.dim_800x80.png)',
          backgroundRepeat: 'repeat',
          backgroundSize: '400px auto',
        }} />

        {/* Krishna-Radha illustration - decorative top right */}
        <div className="absolute top-6 right-6 md:top-10 md:right-12 z-10 hidden sm:block">
          <img
            src="/assets/generated/krishna-radha-mini.dim_128x128.png"
            alt="Krishna Radha"
            className="h-20 w-20 md:h-28 md:w-28 object-contain animate-float"
            style={{ filter: 'drop-shadow(0 4px 12px oklch(0.75 0.18 75 / 0.6))' }}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 py-16 md:py-24">
          <div className="max-w-2xl">
            {/* Decorative top element */}
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px flex-1 max-w-[50px]" style={{ background: 'oklch(0.75 0.18 75)' }} />
              <div className="flex items-center gap-2">
                <span style={{ color: 'oklch(0.75 0.18 75)', fontSize: '16px' }}>🌸</span>
                <span className="font-body text-xs tracking-[0.3em] uppercase font-semibold" style={{ color: 'oklch(0.75 0.18 75)' }}>
                  Traditional Indian Fashion
                </span>
                <span style={{ color: 'oklch(0.75 0.18 75)', fontSize: '16px' }}>🌸</span>
              </div>
              <div className="h-px flex-1 max-w-[50px]" style={{ background: 'oklch(0.75 0.18 75)' }} />
            </div>

            {/* Brand Name */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold mb-4 leading-tight" style={{ color: 'oklch(0.97 0.012 60)' }}>
              Divya
              <span style={{ color: 'oklch(0.75 0.18 75)' }}>Vastrav</span>
            </h1>

            {/* Tagline */}
            <p className="font-heading text-lg md:text-2xl italic mb-3" style={{ color: 'oklch(0.88 0.10 75)' }}>
              Elegant Traditional Ladies Wear
            </p>
            <p className="font-body text-sm md:text-base mb-8 leading-relaxed" style={{ color: 'oklch(0.85 0.04 60)' }}>
              Discover our divine collection of handcrafted{' '}
              <strong style={{ color: 'oklch(0.75 0.18 75)' }}>Jaipuri Skirts</strong>,{' '}
              <strong style={{ color: 'oklch(0.72 0.16 340)' }}>Short Kurtis</strong> &amp;{' '}
              <strong style={{ color: 'oklch(0.75 0.18 75)' }}>Sarees</strong> — 
              vibrant, flowing, and perfect for every festive occasion.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a
                href="#jaipuri-skirts"
                className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3 font-body font-bold text-sm tracking-widest uppercase rounded-sm transition-all duration-300 hover:shadow-gold hover:-translate-y-0.5"
                style={{
                  background: 'linear-gradient(135deg, oklch(0.75 0.18 75), oklch(0.60 0.16 70))',
                  color: 'oklch(0.18 0.10 18)',
                }}
              >
                <Sparkles size={16} />
                Explore Collection
              </a>
              <a
                href="https://wa.me/?text=I want to place an order at DivyaVastrav"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3 font-body font-bold text-sm tracking-widest uppercase rounded-sm border-2 transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  borderColor: 'oklch(0.75 0.18 75)',
                  color: 'oklch(0.75 0.18 75)',
                  background: 'oklch(0.18 0.12 18 / 0.4)',
                }}
              >
                <MessageCircle size={16} />
                WhatsApp Order
              </a>
            </div>

            {/* Decorative stars */}
            <div className="flex items-center gap-2 mt-8">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill="currentColor" style={{ color: 'oklch(0.75 0.18 75)' }} />
              ))}
              <span className="font-body text-xs ml-2" style={{ color: 'oklch(0.82 0.04 60)' }}>
                Premium Quality Traditional Wear
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Jaipuri border tile divider */}
      <div className="w-full overflow-hidden" style={{ height: '40px' }}>
        <img
          src="/assets/generated/jaipuri-border-tile.dim_800x80.png"
          alt=""
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
      </div>

      {/* Bottom decorative band */}
      <div className="h-2" style={{
        background: 'linear-gradient(90deg, oklch(0.22 0.14 18), oklch(0.75 0.18 75), oklch(0.45 0.22 18), oklch(0.75 0.18 75), oklch(0.22 0.14 18))'
      }} />
    </section>
  );
};

export default HeroSection;
