import { Heart } from "lucide-react";
import type React from "react";
import { SiInstagram, SiWhatsapp } from "react-icons/si";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const appId = encodeURIComponent(
    typeof window !== "undefined" ? window.location.hostname : "divyavastra",
  );

  const links = [
    { label: "Home", href: "#home" },
    { label: "Jaipuri Skirts", href: "#jaipuri-skirts" },
    { label: "Short Kurtis", href: "#short-kurtis" },
    { label: "Sarees", href: "#sarees" },
    { label: "About Us", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <footer
      style={{
        background:
          "linear-gradient(180deg, oklch(0.18 0.10 18) 0%, oklch(0.14 0.08 18) 100%)",
      }}
    >
      <div
        className="h-2 w-full"
        style={{
          background:
            "linear-gradient(90deg, oklch(0.45 0.22 18), oklch(0.75 0.18 75), oklch(0.72 0.16 340), oklch(0.75 0.18 75), oklch(0.45 0.22 18))",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10">
          <div className="flex flex-col gap-4">
            <h2
              className="font-display text-xl sm:text-2xl font-bold leading-none"
              style={{ color: "oklch(0.75 0.18 75)" }}
            >
              Divya Vastra
            </h2>
            <p
              className="font-body text-sm leading-relaxed"
              style={{ color: "oklch(0.58 0.04 60)" }}
            >
              Traditional Indian Ladies Clothing Brand.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/divyavastra_?igsh=eGd4eTc2bGl4MzN1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.72 0.16 340), oklch(0.55 0.18 340))",
                  color: "oklch(0.97 0.012 60)",
                }}
                aria-label="Instagram"
              >
                <SiInstagram size={18} />
              </a>
              <a
                href="https://wa.me/?text=I want to place an order at Divya Vastra"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.55 0.18 145), oklch(0.42 0.16 145))",
                  color: "oklch(0.97 0.012 60)",
                }}
                aria-label="WhatsApp"
              >
                <SiWhatsapp size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3
              className="font-heading text-base sm:text-lg font-semibold mb-4"
              style={{ color: "oklch(0.97 0.012 60)" }}
            >
              Quick Links
            </h3>
            <ul className="flex flex-col gap-3">
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-sm transition-colors duration-200 hover:text-yellow-300"
                    style={{ color: "oklch(0.58 0.04 60)" }}
                  >
                    <span style={{ color: "oklch(0.75 0.18 75)" }}>› </span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3
              className="font-heading text-base sm:text-lg font-semibold mb-4"
              style={{ color: "oklch(0.97 0.012 60)" }}
            >
              Contact
            </h3>
            <div
              className="mt-4 p-4 rounded-sm"
              style={{
                background: "oklch(0.22 0.12 18 / 0.7)",
                border: "1px solid oklch(0.75 0.18 75 / 0.25)",
              }}
            >
              <p
                className="font-heading text-sm italic text-center"
                style={{ color: "oklch(0.75 0.18 75)" }}
              >
                🌸 Jai Shri Radhe Krishna 🌸
              </p>
            </div>
          </div>
        </div>

        <div
          className="mt-10 pt-6"
          style={{ borderTop: "1px solid oklch(0.75 0.18 75 / 0.15)" }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-center">
            <p
              className="font-body text-xs"
              style={{ color: "oklch(0.42 0.03 60)" }}
            >
              © {currentYear} Divya Vastra. All rights reserved.
            </p>
            <p
              className="font-body text-xs flex items-center gap-1"
              style={{ color: "oklch(0.42 0.03 60)" }}
            >
              Built with{" "}
              <Heart
                size={12}
                fill="currentColor"
                className="inline"
                style={{ color: "oklch(0.55 0.20 18)" }}
              />{" "}
              using{" "}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-400 hover:text-yellow-300 transition-colors"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
