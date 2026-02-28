import React, { useState } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Gopi Skirts', href: '#gopi-skirts' },
    { label: 'Short Kurtis', href: '#short-kurtis' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full" style={{ background: 'oklch(0.18 0.06 240)', boxShadow: '0 4px 24px oklch(0.12 0.05 240 / 0.5)' }}>
      {/* Top decorative strip - gold & saffron */}
      <div className="h-1 w-full" style={{
        background: 'linear-gradient(90deg, oklch(0.78 0.16 80), oklch(0.72 0.18 55), oklch(0.78 0.16 80), oklch(0.72 0.18 55), oklch(0.78 0.16 80))'
      }} />

      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo & Brand */}
        <a href="#home" className="flex items-center gap-3 group">
          <div className="relative flex items-center gap-2">
            <img
              src="/assets/generated/divyavastra-logo-emblem.dim_200x200.png"
              alt="DivyaVastra Emblem"
              className="h-10 w-10 object-contain rounded-full animate-float"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            <div>
              <span
                className="font-display text-2xl font-bold tracking-wider block leading-none"
                style={{ color: 'oklch(0.78 0.16 80)' }}
              >
                DivyaVastra
              </span>
              <span
                className="font-body text-xs tracking-widest uppercase"
                style={{ color: 'oklch(0.72 0.18 55)' }}
              >
                ✦ Divine Fashion ✦
              </span>
            </div>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-body text-xs font-semibold tracking-widest uppercase transition-colors duration-200"
              style={{ color: 'oklch(0.82 0.04 80)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'oklch(0.78 0.16 80)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'oklch(0.82 0.04 80)')}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-2">
          <a
            href="#gopi-skirts"
            className="flex items-center gap-2 px-5 py-2 rounded-sm font-body text-xs font-bold tracking-wider uppercase transition-all duration-200 hover:shadow-gold hover:-translate-y-0.5"
            style={{
              background: 'linear-gradient(135deg, oklch(0.78 0.16 80), oklch(0.72 0.18 55))',
              color: 'oklch(0.18 0.06 240)',
            }}
          >
            <Sparkles size={13} />
            Shop Now
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 rounded"
          style={{ color: 'oklch(0.78 0.16 80)' }}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t" style={{ borderColor: 'oklch(0.78 0.16 80 / 0.25)', background: 'oklch(0.14 0.05 240)' }}>
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-body text-sm font-semibold tracking-widest uppercase py-2 border-b"
                style={{ color: 'oklch(0.82 0.04 80)', borderColor: 'oklch(0.78 0.16 80 / 0.15)' }}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#gopi-skirts"
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-sm font-body text-sm font-bold tracking-wider uppercase mt-2"
              style={{
                background: 'linear-gradient(135deg, oklch(0.78 0.16 80), oklch(0.72 0.18 55))',
                color: 'oklch(0.18 0.06 240)',
              }}
              onClick={() => setMenuOpen(false)}
            >
              <Sparkles size={14} />
              Shop Now
            </a>
          </nav>
        </div>
      )}

      {/* Bottom decorative strip */}
      <div className="h-px w-full" style={{
        background: 'linear-gradient(90deg, transparent, oklch(0.78 0.16 80 / 0.4), transparent)'
      }} />
    </header>
  );
};

export default Header;
