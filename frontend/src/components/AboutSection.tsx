import React from 'react';
import { Heart, Star, Sparkles, MessageCircle, Instagram } from 'lucide-react';
import { SiInstagram, SiWhatsapp } from 'react-icons/si';

const AboutSection: React.FC = () => {
  const features = [
    {
      emoji: '🌺',
      title: 'Jaipuri Skirts',
      description: 'Vibrant, flowing Jaipuri skirts with traditional block prints and royal Rajasthani patterns — perfect for every festive occasion.',
    },
    {
      emoji: '✨',
      title: 'Short Kurtis',
      description: 'Elegant short kurtis with delicate floral designs and block prints, crafted for everyday grace and casual festive wear.',
    },
    {
      emoji: '🥻',
      title: 'Sarees',
      description: 'Timeless sarees in silk, georgette, and handloom cotton — each piece a celebration of India\'s rich textile heritage.',
    },
  ];

  return (
    <section id="about" className="py-16 md:py-24 relative overflow-hidden">
      {/* Red Jaipuri gradient background */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(135deg, oklch(0.22 0.14 18) 0%, oklch(0.28 0.16 18) 50%, oklch(0.22 0.14 18) 100%)'
      }} />

      {/* Decorative radial glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 50% 50%, oklch(0.75 0.18 75 / 0.08) 0%, transparent 70%)'
      }} />

      {/* Jaipuri pattern overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-5" style={{
        backgroundImage: 'url(/assets/generated/jaipuri-border-tile.dim_800x80.png)',
        backgroundRepeat: 'repeat',
        backgroundSize: '400px auto',
      }} />

      <div className="relative container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-14">
          {/* Golden floral divider */}
          <div className="mb-4">
            <img
              src="/assets/generated/golden-floral-divider.dim_600x40.png"
              alt=""
              className="mx-auto max-w-xs w-full"
              style={{ height: '36px', objectFit: 'contain' }}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>

          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 sm:w-16" style={{ background: 'linear-gradient(90deg, transparent, oklch(0.75 0.18 75))' }} />
            <span className="text-xl">🌸</span>
            <span className="font-body text-xs tracking-[0.3em] uppercase font-semibold" style={{ color: 'oklch(0.75 0.18 75)' }}>
              Our Story
            </span>
            <span className="text-xl">🌸</span>
            <div className="h-px w-12 sm:w-16" style={{ background: 'linear-gradient(90deg, oklch(0.75 0.18 75), transparent)' }} />
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ color: 'oklch(0.97 0.012 60)' }}>
            About <span style={{ color: 'oklch(0.75 0.18 75)' }}>DivyaVastrav</span>
          </h2>

          <div className="gold-divider max-w-xs mx-auto mb-6" />

          <p className="font-body text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: 'oklch(0.80 0.04 60)' }}>
            <strong style={{ color: 'oklch(0.75 0.18 75)' }}>DivyaVastrav</strong> is a Traditional Indian Ladies Clothing Brand 
            specializing in Jaipuri Skirts, Short Kurtis, and Sarees. 
            Born from a deep love for Indian tradition and Rajasthani artistry, 
            we bring you clothing that carries the essence of divine grace and royal elegance.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-14">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 sm:p-8 rounded-sm transition-all duration-300 hover:-translate-y-1"
              style={{
                background: 'oklch(0.28 0.14 18 / 0.7)',
                border: '1px solid oklch(0.75 0.18 75 / 0.30)',
                backdropFilter: 'blur(8px)',
              }}
            >
              {/* Icon */}
              <div
                className="flex items-center justify-center w-16 h-16 rounded-full mb-5"
                style={{
                  background: 'linear-gradient(135deg, oklch(0.75 0.18 75 / 0.20), oklch(0.45 0.22 18 / 0.15))',
                  border: '1px solid oklch(0.75 0.18 75 / 0.45)',
                }}
              >
                <span className="text-3xl">{feature.emoji}</span>
              </div>

              <h3 className="font-heading text-xl font-bold mb-3" style={{ color: 'oklch(0.88 0.10 75)' }}>
                {feature.title}
              </h3>

              <p className="font-body text-sm leading-relaxed" style={{ color: 'oklch(0.72 0.04 60)' }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Brand Story Quote */}
        <div
          className="max-w-3xl mx-auto text-center p-6 sm:p-8 rounded-sm mb-12"
          style={{
            background: 'oklch(0.28 0.14 18 / 0.6)',
            border: '1px solid oklch(0.75 0.18 75 / 0.25)',
          }}
        >
          <p className="font-heading text-base sm:text-lg italic leading-relaxed mb-4" style={{ color: 'oklch(0.88 0.10 75)' }}>
            "Dressed in the colors of tradition, every woman becomes a queen — 
            radiant, graceful, and eternally beautiful in the spirit of Jaipur."
          </p>
          <div className="flex items-center justify-center gap-2">
            <div className="h-px w-10 sm:w-12" style={{ background: 'oklch(0.75 0.18 75 / 0.5)' }} />
            <span style={{ color: 'oklch(0.75 0.18 75)' }}>✦</span>
            <span className="font-body text-sm font-semibold" style={{ color: 'oklch(0.75 0.18 75)' }}>DivyaVastrav</span>
            <span style={{ color: 'oklch(0.75 0.18 75)' }}>✦</span>
            <div className="h-px w-10 sm:w-12" style={{ background: 'oklch(0.75 0.18 75 / 0.5)' }} />
          </div>
        </div>

        {/* Contact Section */}
        <div id="contact" className="text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12 sm:w-16" style={{ background: 'linear-gradient(90deg, transparent, oklch(0.75 0.18 75))' }} />
            <span className="font-body text-xs tracking-[0.3em] uppercase font-semibold" style={{ color: 'oklch(0.75 0.18 75)' }}>
              Get In Touch
            </span>
            <div className="h-px w-12 sm:w-16" style={{ background: 'linear-gradient(90deg, oklch(0.75 0.18 75), transparent)' }} />
          </div>

          <h3 className="font-heading text-2xl sm:text-3xl font-bold mb-4" style={{ color: 'oklch(0.97 0.012 60)' }}>
            Order &amp; Connect
          </h3>

          <p className="font-body text-sm mb-8" style={{ color: 'oklch(0.72 0.04 60)' }}>
            Place your order via WhatsApp or follow us on Instagram for the latest collections.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* WhatsApp Order Button */}
            <a
              href="https://wa.me/?text=I want to place an order at DivyaVastrav"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-sm font-body font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:shadow-gold hover:-translate-y-0.5 w-full sm:w-auto justify-center"
              style={{
                background: 'linear-gradient(135deg, oklch(0.55 0.18 145), oklch(0.42 0.16 145))',
                color: 'oklch(0.97 0.012 60)',
              }}
            >
              <SiWhatsapp size={20} />
              WhatsApp Order
            </a>

            {/* Instagram Link */}
            <a
              href="https://www.instagram.com/divyavastra_?igsh=eGd4eTc2bGl4MzN1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-sm font-body font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:-translate-y-0.5 border-2 w-full sm:w-auto justify-center"
              style={{
                borderColor: 'oklch(0.75 0.18 75)',
                color: 'oklch(0.75 0.18 75)',
                background: 'oklch(0.28 0.14 18 / 0.5)',
              }}
            >
              <SiInstagram size={20} />
              @divyavastra_
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
