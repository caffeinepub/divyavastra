import React from 'react';
import { Heart, MapPin } from 'lucide-react';
import { SiInstagram } from 'react-icons/si';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const appId = encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'divyavastra');

  return (
    <footer id="contact" style={{ background: 'oklch(0.14 0.05 240)' }}>
      {/* Top decorative band - gold & saffron */}
      <div className="h-1.5 w-full" style={{
        background: 'linear-gradient(90deg, oklch(0.18 0.06 240), oklch(0.72 0.18 55), oklch(0.78 0.16 80), oklch(0.72 0.18 55), oklch(0.18 0.06 240))'
      }} />

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand Column */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/generated/divyavastra-logo-emblem.dim_200x200.png"
                alt="DivyaVastra"
                className="h-12 w-12 object-contain rounded-full"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <div>
                <h2 className="font-display text-2xl font-bold leading-none" style={{ color: 'oklch(0.78 0.16 80)' }}>
                  DivyaVastra
                </h2>
                <p className="font-body text-xs italic mt-0.5" style={{ color: 'oklch(0.72 0.18 55)' }}>
                  Divine Clothing for Every Occasion
                </p>
              </div>
            </div>

            <div className="h-px w-16" style={{ background: 'oklch(0.78 0.16 80 / 0.4)' }} />

            <p className="font-body text-sm leading-relaxed" style={{ color: 'oklch(0.60 0.04 260)' }}>
              Celebrating the beauty of traditional Indian ladies fashion with our exquisite 
              Gopi Skirts &amp; Short Kurtis collection. Crafted with love, worn with pride.
            </p>

            {/* Instagram - Primary Contact */}
            <div className="mt-2">
              <p className="font-body text-xs uppercase tracking-widest mb-3" style={{ color: 'oklch(0.55 0.04 260)' }}>
                Connect with us
              </p>
              <a
                href="https://www.instagram.com/divyavastra_?igsh=eGd4eTc2bGl4MzN1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 rounded-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-gold group w-fit"
                style={{
                  background: 'linear-gradient(135deg, oklch(0.22 0.07 240), oklch(0.20 0.06 240))',
                  border: '1px solid oklch(0.78 0.16 80 / 0.3)',
                }}
              >
                <SiInstagram
                  size={20}
                  style={{ color: 'oklch(0.78 0.12 340)' }}
                />
                <div>
                  <p className="font-body text-sm font-bold leading-none" style={{ color: 'oklch(0.88 0.06 80)' }}>
                    @divyavastra_
                  </p>
                  <p className="font-body text-xs mt-0.5" style={{ color: 'oklch(0.60 0.04 260)' }}>
                    DM us to order
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4" style={{ color: 'oklch(0.97 0.012 85)' }}>
              Quick Links
            </h3>
            <div className="h-px w-10 mb-5" style={{ background: 'oklch(0.72 0.18 55)' }} />
            <ul className="flex flex-col gap-3">
              {[
                { label: 'Home', href: '#home' },
                { label: 'Gopi Skirts', href: '#gopi-skirts' },
                { label: 'Short Kurtis', href: '#short-kurtis' },
                { label: 'About Us', href: '#about' },
                { label: 'Contact', href: '#contact' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-sm flex items-center gap-2 transition-colors duration-200"
                    style={{ color: 'oklch(0.60 0.04 260)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'oklch(0.78 0.16 80)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'oklch(0.60 0.04 260)')}
                  >
                    <span style={{ color: 'oklch(0.72 0.18 55)' }}>›</span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4" style={{ color: 'oklch(0.97 0.012 85)' }}>
              Contact Us
            </h3>
            <div className="h-px w-10 mb-5" style={{ background: 'oklch(0.72 0.18 55)' }} />

            <ul className="flex flex-col gap-5">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 flex-shrink-0" style={{ color: 'oklch(0.72 0.18 55)' }} />
                <span className="font-body text-sm" style={{ color: 'oklch(0.60 0.04 260)' }}>
                  DivyaVastra Store<br />
                  India
                </span>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/divyavastra_?igsh=eGd4eTc2bGl4MzN1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 transition-colors duration-200 group"
                  style={{ color: 'oklch(0.60 0.04 260)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'oklch(0.78 0.12 340)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'oklch(0.60 0.04 260)')}
                >
                  <SiInstagram size={16} className="flex-shrink-0" style={{ color: 'oklch(0.78 0.12 340)' }} />
                  <span className="font-body text-sm">@divyavastra_</span>
                </a>
              </li>
            </ul>

            {/* Radha Krishna blessing */}
            <div className="mt-8 p-4 rounded-sm" style={{
              background: 'oklch(0.18 0.06 240 / 0.6)',
              border: '1px solid oklch(0.78 0.16 80 / 0.2)',
            }}>
              <p className="font-heading text-sm italic text-center" style={{ color: 'oklch(0.78 0.16 80)' }}>
                🪷 Jai Shri Radhe Krishna 🪷
              </p>
              <p className="font-body text-xs text-center mt-1" style={{ color: 'oklch(0.55 0.04 260)' }}>
                Blessed with divine grace
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6" style={{ borderTop: '1px solid oklch(0.78 0.16 80 / 0.12)' }}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="font-body text-xs" style={{ color: 'oklch(0.45 0.03 260)' }}>
              © {currentYear} DivyaVastra. All rights reserved.
            </p>
            <p className="font-body text-xs flex items-center gap-1" style={{ color: 'oklch(0.45 0.03 260)' }}>
              Built with{' '}
              <Heart
                size={12}
                fill="currentColor"
                className="inline"
                style={{ color: 'oklch(0.78 0.12 340)' }}
              />{' '}
              using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-200"
                style={{ color: 'oklch(0.78 0.16 80)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'oklch(0.72 0.18 55)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'oklch(0.78 0.16 80)')}
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
