import React, { useState } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Jaipuri Skirts', href: '#jaipuri-skirts' },
    { label: 'Gopi Dresses', href: '#gopi-dresses' },
    { label: 'Short Kurtis', href: '#short-kurtis' },
    { label: 'Sarees', href: '#sarees' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full" style={{
      background: 'linear-gradient(135deg, oklch(0.22 0.14 18) 0%, oklch(0.28 0.16 18) 50%, oklch(0.22 0.14 18) 100%)',
      boxShadow: '0 4px 24px oklch(0.16 0.10 18 / 0.6)'
    }}>
      {/* Top decorative strip - golden & crimson */}
      <div className="h-1.5 w-full" style={{
        background: 'linear-gradient(90deg, oklch(0.45 0.22 18), oklch(0.75 0.18 75), oklch(0.72 0.16 340), oklch(0.75 0.18 75), oklch(0.45 0.22 18))'
      }} />

      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo & Brand with Krishna-Radha illustration */}
        <a href="#home" className="flex items-center gap-2 group flex-shrink-0">
          {/* Krishna-Radha mini illustration */}
          <img
            src="/assets/generated/krishna-radha-mini.dim_128x128.png"
            alt="Krishna Radha"
            className="h-12 w-12 object-contain animate-float flex-shrink-0"
            style={{ filter: 'drop-shadow(0 2px 6px oklch(0.75 0.18 75 / 0.5))' }}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          <div>
            <span
              className="font-display text-xl md:text-2xl font-bold tracking-wider block leading-none"
              style={{ color: 'oklch(0.75 0.18 75)' }}
            >
              DivyaVastrav
            </span>
            <span
              className="font-body text-xs tracking-widest uppercase"
              style={{ color: 'oklch(0.72 0.16 340)' }}
            >
              ✦ Elegant Traditional Wear ✦
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-5">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-body text-xs font-semibold tracking-widest uppercase transition-colors duration-200"
              style={{ color: 'oklch(0.88 0.06 60)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'oklch(0.75 0.18 75)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'oklch(0.88 0.06 60)')}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-2">
          <a
            href="https://wa.me/?text=I want to place an order at DivyaVastrav"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2 rounded-sm font-body text-xs font-bold tracking-wider uppercase transition-all duration-200 hover:shadow-gold hover:-translate-y-0.5"
            style={{
              background: 'linear-gradient(135deg, oklch(0.75 0.18 75), oklch(0.60 0.16 70))',
              color: 'oklch(0.18 0.10 18)',
            }}
          >
            <Sparkles size={13} />
            Order Now
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden p-2 rounded"
          style={{ color: 'oklch(0.75 0.18 75)' }}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden border-t" style={{
          borderColor: 'oklch(0.75 0.18 75 / 0.25)',
          background: 'oklch(0.18 0.10 18)'
        }}>
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-body text-sm font-semibold tracking-widest uppercase py-2 border-b"
                style={{ color: 'oklch(0.88 0.06 60)', borderColor: 'oklch(0.75 0.18 75 / 0.15)' }}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://wa.me/?text=I want to place an order at DivyaVastrav"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-sm font-body text-sm font-bold tracking-wider uppercase mt-2"
              style={{
                background: 'linear-gradient(135deg, oklch(0.75 0.18 75), oklch(0.60 0.16 70))',
                color: 'oklch(0.18 0.10 18)',
              }}
              onClick={() => setMenuOpen(false)}
            >
              <Sparkles size={14} />
              Order Now
            </a>
          </nav>
        </div>
      )}

      {/* Bottom decorative strip */}
      <div className="h-px w-full" style={{
        background: 'linear-gradient(90deg, transparent, oklch(0.75 0.18 75 / 0.5), transparent)'
      }} />
    </header>
  );
};

export default Header;
