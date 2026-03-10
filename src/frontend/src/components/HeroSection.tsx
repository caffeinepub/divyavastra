import { MessageCircle, Sparkles, Star } from "lucide-react";
import type React from "react";

const HeroSection: React.FC = () => {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="relative min-h-[580px] md:min-h-[680px] flex items-center">
        <img
          src="/assets/generated/hero-bg-jaipuri.dim_1440x600.png"
          alt="DivyaVastrav - Elegant Traditional Ladies Wear"
          className="absolute inset-0 w-full h-full object-cover object-center"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "/assets/generated/radha-krishna-hero-banner.dim_1440x700.png";
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.18 0.12 18 / 0.92) 0%, oklch(0.25 0.14 18 / 0.78) 45%, oklch(0.22 0.10 30 / 0.50) 100%)",
          }}
        />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 py-16 md:py-24">
          <div className="max-w-2xl">
            <h1
              className="font-display text-4xl sm:text-5xl md:text-7xl font-bold mb-4 leading-tight"
              style={{ color: "oklch(0.97 0.012 60)" }}
            >
              Divya
              <span style={{ color: "oklch(0.75 0.18 75)" }}>Vastrav</span>
            </h1>

            <p
              className="font-heading text-lg md:text-2xl italic mb-3"
              style={{ color: "oklch(0.88 0.10 75)" }}
            >
              Elegant Traditional Ladies Wear
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a
                href="#jaipuri-skirts"
                className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3 font-body font-bold text-sm tracking-widest uppercase rounded-sm transition-all duration-300 hover:shadow-gold hover:-translate-y-0.5"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.75 0.18 75), oklch(0.60 0.16 70))",
                  color: "oklch(0.18 0.10 18)",
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
                  borderColor: "oklch(0.75 0.18 75)",
                  color: "oklch(0.75 0.18 75)",
                  background: "oklch(0.18 0.12 18 / 0.4)",
                }}
              >
                <MessageCircle size={16} />
                WhatsApp Order
              </a>
            </div>

            <div className="flex items-center gap-2 mt-8">
              <Star
                size={14}
                fill="currentColor"
                style={{ color: "oklch(0.75 0.18 75)" }}
              />
              <Star
                size={14}
                fill="currentColor"
                style={{ color: "oklch(0.75 0.18 75)" }}
              />
              <Star
                size={14}
                fill="currentColor"
                style={{ color: "oklch(0.75 0.18 75)" }}
              />
              <Star
                size={14}
                fill="currentColor"
                style={{ color: "oklch(0.75 0.18 75)" }}
              />
              <Star
                size={14}
                fill="currentColor"
                style={{ color: "oklch(0.75 0.18 75)" }}
              />
              <span
                className="font-body text-xs ml-2"
                style={{ color: "oklch(0.82 0.04 60)" }}
              >
                Premium Quality Traditional Wear
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
