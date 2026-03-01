import React from 'react';
import { Heart, MapPin, Phone, Mail } from 'lucide-react';
import { SiInstagram, SiWhatsapp } from 'react-icons/si';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const appId = encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'divyavastrav');

  return (
    <footer style={{ background: 'linear-gradient(180deg, oklch(0.18 0.10 18) 0%, oklch(0.14 0.08 18) 100%)' }}>
      {/* Top Jaipuri decorative band */}
      <div className="h-2 w-full" style={{
        background: 'linear-gradient(90deg, oklch(0.45 0.22 18), oklch(0.75 0.18 75), oklch(0.72 0.16 340), oklch(0.75 0.18 75), oklch(0.45 0.22 18))'
      }} />

      {/* Jaipuri border tile */}
      <div className="w-full overflow-hidden" style={{ height: '32px' }}>
        <img
          src="/assets/generated/jaipuri-border-tile.dim_800x80.png"
          alt=""
          className="w-full h-full object-cover opacity-40"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10">
          {/* Brand Column */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/generated/krishna-radha-mini.dim_128x128.png"
                alt="DivyaVastrav"
                className="h-12 w-12 object-contain rounded-full"
                style={{ filter: 'drop-shadow(0 2px 6px oklch(0.75 0.18 75 / 0.4))' }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <div>
                <h2 className="font-display text-xl sm:text-2xl font-bold leading-none" style={{ color: 'oklch(0.75 0.18 75)' }}>
                  DivyaVastrav
                </h2>
                <p className="font-body text-xs italic mt-0.5" style={{ color: 'oklch(0.72 0.16 340)' }}>
                  Elegant Traditional Ladies Wear
                </p>
              </div>
            </div>

            <div className="h-px w-16" style={{ background: 'oklch(0.75 0.18 75 / 0.4)' }} />

            <p className="font-body text-sm leading-relaxed" style={{ color: 'oklch(0.58 0.04 60)' }}>
              DivyaVastrav is a Traditional Indian Ladies Clothing Brand specializing in 
              Jaipuri Skirts, Short Kurtis, and Sarees. Crafted with love, worn with pride.
            </p>

            {/* Social Media Icons */}
            <div className="mt-2">
              <p className="font-body text-xs uppercase tracking-widest mb-3" style={{ color: 'oklch(0.50 0.04 60)' }}>
                Follow Us
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.instagram.com/divyavastra_?igsh=eGd4eTc2bGl4MzN1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-gold"
                  style={{
                    background: 'linear-gradient(135deg, oklch(0.72 0.16 340), oklch(0.55 0.18 340))',
                    color: 'oklch(0.97 0.012 60)',
                  }}
                  aria-label="Instagram"
                >
                  <SiInstagram size={18} />
                </a>
                <a
                  href="https://wa.me/?text=I want to place an order at DivyaVastrav"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-gold"
                  style={{
                    background: 'linear-gradient(135deg, oklch(0.55 0.18 145), oklch(0.42 0.16 145))',
                    color: 'oklch(0.97 0.012 60)',
                  }}
                  aria-label="WhatsApp"
                >
                  <SiWhatsapp size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-base sm:text-lg font-semibold mb-4" style={{ color: 'oklch(0.97 0.012 60)' }}>
              Quick Links
            </h3>
            <div className="h-px w-10 mb-5" style={{ background: 'oklch(0.75 0.18 75)' }} />
            <ul className="flex flex-col gap-3">
              {[
                { label: 'Home', href: '#home' },
                { label: 'Jaipuri Skirts', href: '#jaipuri-skirts' },
                { label: 'Short Kurtis', href: '#short-kurtis' },
                { label: 'Sarees', href: '#sarees' },
                { label: 'About Us', href: '#about' },
                { label: 'Contact', href: '#contact' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-sm flex items-center gap-2 transition-colors duration-200"
                    style={{ color: 'oklch(0.58 0.04 60)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'oklch(0.75 0.18 75)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'oklch(0.58 0.04 60)')}
                  >
                    <span style={{ color: 'oklch(0.75 0.18 75)' }}>›</span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="font-heading text-base sm:text-lg font-semibold mb-4" style={{ color: 'oklch(0.97 0.012 60)' }}>
              Contact Us
            </h3>
            <div className="h-px w-10 mb-5" style={{ background: 'oklch(0.75 0.18 75)' }} />

            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 flex-shrink-0" style={{ color: 'oklch(0.75 0.18 75)' }} />
                <span className="font-body text-sm" style={{ color: 'oklch(0.58 0.04 60)' }}>
                  Address: Coming Soon<br />
                  <span className="text-xs" style={{ color: 'oklch(0.45 0.03 60)' }}>India</span>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={16} className="mt-0.5 flex-shrink-0" style={{ color: 'oklch(0.75 0.18 75)' }} />
                <span className="font-body text-sm" style={{ color: 'oklch(0.58 0.04 60)' }}>
                  Phone: Coming Soon
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={16} className="mt-0.5 flex-shrink-0" style={{ color: 'oklch(0.75 0.18 75)' }} />
                <span className="font-body text-sm" style={{ color: 'oklch(0.58 0.04 60)' }}>
                  Email: Coming Soon
                </span>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/divyavastra_?igsh=eGd4eTc2bGl4MzN1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 transition-colors duration-200 group"
                  style={{ color: 'oklch(0.58 0.04 60)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'oklch(0.72 0.16 340)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'oklch(0.58 0.04 60)')}
                >
                  <SiInstagram size={16} className="flex-shrink-0" style={{ color: 'oklch(0.72 0.16 340)' }} />
                  <span className="font-body text-sm">@divyavastra_</span>
                </a>
              </li>
            </ul>

            {/* Blessing card */}
            <div className="mt-6 p-4 rounded-sm" style={{
              background: 'oklch(0.22 0.12 18 / 0.7)',
              border: '1px solid oklch(0.75 0.18 75 / 0.25)',
            }}>
              <p className="font-heading text-sm italic text-center" style={{ color: 'oklch(0.75 0.18 75)' }}>
                🌸 Jai Shri Radhe Krishna 🌸
              </p>
              <p className="font-body text-xs text-center mt-1" style={{ color: 'oklch(0.50 0.04 60)' }}>
                Blessed with divine grace
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6" style={{ borderTop: '1px solid oklch(0.75 0.18 75 / 0.15)' }}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
            <p className="font-body text-xs" style={{ color: 'oklch(0.42 0.03 60)' }}>
              © {currentYear} DivyaVastrav. All rights reserved.
            </p>

            {/* Designed with Love */}
            <p className="font-body text-xs flex items-center gap-1" style={{ color: 'oklch(0.42 0.03 60)' }}>
              Designed with{' '}
              <Heart
                size={12}
                fill="currentColor"
                className="inline"
                style={{ color: 'oklch(0.55 0.20 18)' }}
              />{' '}
              Love
            </p>

            <p className="font-body text-xs flex items-center gap-1" style={{ color: 'oklch(0.42 0.03 60)' }}>
              Built with{' '}
              <Heart
                size={12}
                fill="currentColor"
                className="inline"
                style={{ color: 'oklch(0.55 0.20 18)' }}
              />{' '}
              using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-200"
                style={{ color: 'oklch(0.75 0.18 75)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'oklch(0.60 0.16 70)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'oklch(0.75 0.18 75)')}
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
