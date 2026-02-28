import React from 'react';
import { Heart, Star, Sparkles } from 'lucide-react';

const AboutSection: React.FC = () => {
  const features = [
    {
      icon: <Heart size={28} />,
      title: 'Crafted with Love',
      description: 'Every Gopi skirt and kurti is made with care and devotion, honoring the rich tradition of Indian textile artistry.',
      emoji: '🪷',
    },
    {
      icon: <Star size={28} />,
      title: 'Premium Quality',
      description: 'We use only the finest fabrics — vibrant, durable, and comfortable for all-day wear during festivals.',
      emoji: '✨',
    },
    {
      icon: <Sparkles size={28} />,
      title: 'Festive Elegance',
      description: 'Our designs celebrate the joy of Indian culture, inspired by the divine love of Radha and Krishna.',
      emoji: '🦚',
    },
  ];

  return (
    <section id="about" className="py-16 md:py-24 relative overflow-hidden">
      {/* Peacock blue gradient background */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(135deg, oklch(0.18 0.06 240) 0%, oklch(0.22 0.08 240) 50%, oklch(0.18 0.06 240) 100%)'
      }} />

      {/* Decorative radial glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 50% 50%, oklch(0.78 0.16 80 / 0.06) 0%, transparent 70%)'
      }} />

      {/* Section divider motif at top */}
      <img
        src="/assets/generated/section-divider-motif.dim_1440x80.png"
        alt=""
        className="absolute top-0 left-0 w-full object-cover opacity-30"
        style={{ height: '60px' }}
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = 'none';
        }}
      />

      <div className="relative container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, transparent, oklch(0.78 0.16 80))' }} />
            <span className="text-xl">🪷</span>
            <span className="font-body text-xs tracking-[0.3em] uppercase font-semibold" style={{ color: 'oklch(0.72 0.18 55)' }}>
              Our Promise
            </span>
            <span className="text-xl">🪷</span>
            <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, oklch(0.78 0.16 80), transparent)' }} />
          </div>

          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4" style={{ color: 'oklch(0.97 0.012 85)' }}>
            About <span style={{ color: 'oklch(0.78 0.16 80)' }}>DivyaVastra</span>
          </h2>

          <div className="gold-divider max-w-xs mx-auto mb-6" />

          <p className="font-body text-base md:text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: 'oklch(0.78 0.04 80)' }}>
            Born from a deep love for Indian tradition and the divine spirit of Radha-Krishna, 
            DivyaVastra brings you clothing that carries the blessings of devotion. 
            Each piece is a celebration of culture, color, and grace.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-8 rounded-sm transition-all duration-300 hover:-translate-y-1"
              style={{
                background: 'oklch(0.22 0.07 240 / 0.6)',
                border: '1px solid oklch(0.78 0.16 80 / 0.25)',
                backdropFilter: 'blur(8px)',
              }}
            >
              {/* Icon */}
              <div
                className="flex items-center justify-center w-16 h-16 rounded-full mb-5"
                style={{
                  background: 'linear-gradient(135deg, oklch(0.78 0.16 80 / 0.2), oklch(0.72 0.18 55 / 0.15))',
                  border: '1px solid oklch(0.78 0.16 80 / 0.4)',
                  color: 'oklch(0.78 0.16 80)',
                }}
              >
                <span className="text-2xl">{feature.emoji}</span>
              </div>

              <h3 className="font-heading text-xl font-bold mb-3" style={{ color: 'oklch(0.88 0.08 80)' }}>
                {feature.title}
              </h3>

              <p className="font-body text-sm leading-relaxed" style={{ color: 'oklch(0.72 0.04 80)' }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Brand Story */}
        <div
          className="max-w-3xl mx-auto text-center p-8 rounded-sm"
          style={{
            background: 'oklch(0.22 0.07 240 / 0.5)',
            border: '1px solid oklch(0.78 0.16 80 / 0.2)',
          }}
        >
          <p className="font-heading text-lg italic leading-relaxed mb-4" style={{ color: 'oklch(0.88 0.08 80)' }}>
            "Dressed in the colors of devotion, every woman becomes Radha — 
            radiant, graceful, and eternally beautiful."
          </p>
          <div className="flex items-center justify-center gap-2">
            <div className="h-px w-12" style={{ background: 'oklch(0.78 0.16 80 / 0.5)' }} />
            <span style={{ color: 'oklch(0.78 0.16 80)' }}>✦</span>
            <span className="font-body text-sm font-semibold" style={{ color: 'oklch(0.72 0.18 55)' }}>DivyaVastra</span>
            <span style={{ color: 'oklch(0.78 0.16 80)' }}>✦</span>
            <div className="h-px w-12" style={{ background: 'oklch(0.78 0.16 80 / 0.5)' }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
