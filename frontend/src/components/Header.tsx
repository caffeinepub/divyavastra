import React, { useState } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Collection', href: '#collection' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full shadow-warm" style={{ background: 'oklch(0.38 0.16 18)' }}>
      {/* Top decorative strip */}
      <div className="h-1 w-full" style={{
        background: 'linear-gradient(90deg, oklch(0.78 0.16 80), oklch(0.72 0.18 55), oklch(0.78 0.16 80), oklch(0.72 0.18 55), oklch(0.78 0.16 80))'
      }} />

      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo & Brand */}
        <a href="#home" className="flex items-center gap-3 group">
          <div className="relative">
            <img
              src="/assets/generated/logo.dim_400x150.png"
              alt="DivyaVastra"
              className="h-12 w-auto object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            <span
              className="font-display text-2xl font-bold tracking-wider"
              style={{ color: 'oklch(0.78 0.16 80)' }}
            >
              DivyaVastra
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-body text-sm font-semibold tracking-widest uppercase transition-colors duration-200"
              style={{ color: 'oklch(0.88 0.03 55)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'oklch(0.78 0.16 80)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'oklch(0.88 0.03 55)')}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-2">
          <a
            href="#collection"
            className="flex items-center gap-2 px-5 py-2 rounded-sm font-body text-sm font-bold tracking-wider uppercase transition-all duration-200 hover:shadow-gold"
            style={{
              background: 'linear-gradient(135deg, oklch(0.78 0.16 80), oklch(0.72 0.18 55))',
              color: 'oklch(0.18 0.04 30)',
            }}
          >
            <Sparkles size={14} />
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
        <div className="md:hidden border-t" style={{ borderColor: 'oklch(0.78 0.16 80 / 0.3)', background: 'oklch(0.32 0.12 18)' }}>
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-body text-sm font-semibold tracking-widest uppercase py-2 border-b"
                style={{ color: 'oklch(0.88 0.03 55)', borderColor: 'oklch(0.78 0.16 80 / 0.2)' }}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#collection"
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-sm font-body text-sm font-bold tracking-wider uppercase mt-2"
              style={{
                background: 'linear-gradient(135deg, oklch(0.78 0.16 80), oklch(0.72 0.18 55))',
                color: 'oklch(0.18 0.04 30)',
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
        background: 'linear-gradient(90deg, transparent, oklch(0.78 0.16 80 / 0.5), transparent)'
      }} />
    </header>
  );
};

export default Header;
