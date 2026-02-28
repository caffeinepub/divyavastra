import React from 'react';
import { Heart, Phone, Mail, MapPin, Instagram } from 'lucide-react';
import { SiInstagram, SiFacebook, SiWhatsapp } from 'react-icons/si';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const appId = encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'divyavastra');

  return (
    <footer id="contact" style={{ background: 'oklch(0.14 0.04 20)' }}>
      {/* Top decorative band */}
      <div className="h-1 w-full" style={{
        background: 'linear-gradient(90deg, oklch(0.38 0.16 18), oklch(0.72 0.18 55), oklch(0.78 0.16 80), oklch(0.72 0.18 55), oklch(0.38 0.16 18))'
      }} />

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand Column */}
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="font-display text-3xl font-bold" style={{ color: 'oklch(0.78 0.16 80)' }}>
                DivyaVastra
              </h2>
              <p className="font-heading text-sm italic mt-1" style={{ color: 'oklch(0.72 0.18 55)' }}>
                Divine Clothing for Every Occasion
              </p>
            </div>
            <div className="h-px w-16" style={{ background: 'oklch(0.78 0.16 80 / 0.4)' }} />
            <p className="font-body text-sm leading-relaxed" style={{ color: 'oklch(0.65 0.03 50)' }}>
              Celebrating the beauty of traditional Indian ladies fashion with our exquisite 
              Gopi skirts collection. Crafted with love, worn with pride.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-4 mt-2">
              {[
                { icon: <SiInstagram size={18} />, label: 'Instagram', href: '#' },
                { icon: <SiFacebook size={18} />, label: 'Facebook', href: '#' },
                { icon: <SiWhatsapp size={18} />, label: 'WhatsApp', href: '#' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-gold"
                  style={{
                    background: 'oklch(0.22 0.06 22)',
                    color: 'oklch(0.78 0.16 80)',
                    border: '1px solid oklch(0.78 0.16 80 / 0.3)',
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4" style={{ color: 'oklch(0.97 0.012 75)' }}>
              Quick Links
            </h3>
            <div className="h-px w-10 mb-5" style={{ background: 'oklch(0.72 0.18 55)' }} />
            <ul className="flex flex-col gap-3">
              {[
                { label: 'Home', href: '#home' },
                { label: 'Our Collection', href: '#collection' },
                { label: 'About Us', href: '#about' },
                { label: 'Contact', href: '#contact' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-sm flex items-center gap-2 transition-colors duration-200 group"
                    style={{ color: 'oklch(0.65 0.03 50)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'oklch(0.78 0.16 80)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'oklch(0.65 0.03 50)')}
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
            <h3 className="font-heading text-lg font-semibold mb-4" style={{ color: 'oklch(0.97 0.012 75)' }}>
              Contact Us
            </h3>
            <div className="h-px w-10 mb-5" style={{ background: 'oklch(0.72 0.18 55)' }} />
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 flex-shrink-0" style={{ color: 'oklch(0.72 0.18 55)' }} />
                <span className="font-body text-sm" style={{ color: 'oklch(0.65 0.03 50)' }}>
                  DivyaVastra Store<br />
                  India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="flex-shrink-0" style={{ color: 'oklch(0.72 0.18 55)' }} />
                <span className="font-body text-sm" style={{ color: 'oklch(0.65 0.03 50)' }}>
                  +91 XXXXX XXXXX
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="flex-shrink-0" style={{ color: 'oklch(0.72 0.18 55)' }} />
                <span className="font-body text-sm" style={{ color: 'oklch(0.65 0.03 50)' }}>
                  info@divyavastra.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6" style={{ borderTop: '1px solid oklch(0.78 0.16 80 / 0.15)' }}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="font-body text-xs" style={{ color: 'oklch(0.5 0.02 40)' }}>
              © {currentYear} DivyaVastra. All rights reserved.
            </p>
            <p className="font-body text-xs flex items-center gap-1" style={{ color: 'oklch(0.5 0.02 40)' }}>
              Built with{' '}
              <Heart
                size={12}
                fill="currentColor"
                className="inline"
                style={{ color: 'oklch(0.72 0.18 55)' }}
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
