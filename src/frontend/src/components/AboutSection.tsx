import type React from "react";
import { SiInstagram, SiWhatsapp } from "react-icons/si";

const AboutSection: React.FC = () => {
  const features = [
    {
      emoji: "🌺",
      title: "Jaipuri Skirts",
      description:
        "Vibrant, flowing Jaipuri skirts with traditional block prints and royal Rajasthani patterns — perfect for every festive occasion.",
    },
    {
      emoji: "✨",
      title: "Short Kurtis",
      description:
        "Elegant short kurtis with delicate floral designs and block prints, crafted for everyday grace and casual festive wear.",
    },
    {
      emoji: "🥛",
      title: "Sarees",
      description:
        "Timeless sarees in silk, georgette, and handloom cotton — each piece a celebration of India's rich textile heritage.",
    },
  ];

  return (
    <section id="about" className="py-16 md:py-24 relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.22 0.14 18) 0%, oklch(0.28 0.16 18) 50%, oklch(0.22 0.14 18) 100%)",
        }}
      />
      <div className="relative container mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <h2
            className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
            style={{ color: "oklch(0.97 0.012 60)" }}
          >
            About{" "}
            <span style={{ color: "oklch(0.75 0.18 75)" }}>DivyaVastrav</span>
          </h2>
          <p
            className="font-body text-sm sm:text-base max-w-2xl mx-auto leading-relaxed"
            style={{ color: "oklch(0.80 0.04 60)" }}
          >
            Traditional Indian Ladies Clothing Brand.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-14">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col items-center text-center p-6 sm:p-8 rounded-sm transition-all duration-300 hover:-translate-y-1"
              style={{
                background: "oklch(0.28 0.14 18 / 0.7)",
                border: "1px solid oklch(0.75 0.18 75 / 0.30)",
              }}
            >
              <span className="text-3xl mb-4">{feature.emoji}</span>
              <h3
                className="font-heading text-xl font-bold mb-3"
                style={{ color: "oklch(0.88 0.10 75)" }}
              >
                {feature.title}
              </h3>
              <p
                className="font-body text-sm leading-relaxed"
                style={{ color: "oklch(0.72 0.04 60)" }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://wa.me/?text=I want to place an order at DivyaVastrav"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-6 py-3 rounded-sm font-body font-bold text-sm tracking-wider uppercase transition-all duration-300"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.55 0.18 145), oklch(0.42 0.16 145))",
              color: "oklch(0.97 0.012 60)",
            }}
          >
            <SiWhatsapp size={20} />
            WhatsApp Order
          </a>
          <a
            href="https://www.instagram.com/divyavastra_?igsh=eGd4eTc2bGl4MzN1"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-6 py-3 rounded-sm font-body font-bold text-sm tracking-wider uppercase border-2 transition-all duration-300"
            style={{
              borderColor: "oklch(0.75 0.18 75)",
              color: "oklch(0.75 0.18 75)",
              background: "oklch(0.28 0.14 18 / 0.5)",
            }}
          >
            <SiInstagram size={20} />
            @divyavastra_
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
