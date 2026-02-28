import React from 'react';
import { Heart, Star, Sparkles } from 'lucide-react';

const AboutSection: React.FC = () => {
  const features = [
    {
      icon: <Heart size={28} />,
      title: 'Crafted with Love',
      description: 'Every Gopi skirt is made with care and devotion, honoring the rich tradition of Indian textile artistry.',
    },
    {
      icon: <Star size={28} />,
      title: 'Premium Quality',
      description: 'We use only the finest fabrics — vibrant, durable, and comfortable for all-day wear during festivals.',
    },
    {
      icon: <Sparkles size={28} />,
      title: 'Festive Elegance',
      description: 'Our designs celebrate the joy of Indian festivals, bringing color and grace to every occasion.',
    },
  ];

  return (
    <section id="about" className="py-16 md:py-24" style={{ background: 'oklch(0.38 0.16 18)' }}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, transparent, oklch(0.78 0.16 80 / 0.5))' }} />
            <span className="font-body text-xs tracking-[0.3em] uppercase font-semibold" style={{ color: 'oklch(0.72 0.18 55)' }}>
              ✦ Our Story ✦
            </span>
            <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, oklch(0.78 0.16 80 / 0.5), transparent)' }} />
          </div>

          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4" style={{ color: 'oklch(0.97 0.012 75)' }}>
            About DivyaVastra
          </h2>

          <div className="h-px max-w-xs mx-auto mb-6" style={{
            background: 'linear-gradient(90deg, transparent, oklch(0.78 0.16 80), oklch(0.72 0.18 55), oklch(0.78 0.16 80), transparent)'
          }} />

          <p className="font-body text-base md:text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: 'oklch(0.82 0.02 60)' }}>
            <em className="font-heading text-xl" style={{ color: 'oklch(0.78 0.16 80)' }}>DivyaVastra</em> — meaning "Divine Clothing" — is a passionate ladies clothing brand 
            dedicated to bringing the timeless beauty of traditional Indian Gopi skirts to modern women. 
            We believe every woman deserves to feel divine in her attire.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-8 rounded-sm transition-all duration-300 hover:-translate-y-1"
              style={{
                background: 'oklch(0.32 0.12 18)',
                border: '1px solid oklch(0.78 0.16 80 / 0.25)',
              }}
            >
              <div
                className="flex items-center justify-center w-16 h-16 rounded-full mb-5"
                style={{
                  background: 'linear-gradient(135deg, oklch(0.78 0.16 80 / 0.2), oklch(0.72 0.18 55 / 0.2))',
                  color: 'oklch(0.78 0.16 80)',
                  border: '1px solid oklch(0.78 0.16 80 / 0.4)',
                }}
              >
                {feature.icon}
              </div>
              <h3 className="font-heading text-xl font-semibold mb-3" style={{ color: 'oklch(0.97 0.012 75)' }}>
                {feature.title}
              </h3>
              <p className="font-body text-sm leading-relaxed" style={{ color: 'oklch(0.72 0.04 50)' }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
