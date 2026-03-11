import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useLocation } from "@tanstack/react-router";
import { Menu, Search, X } from "lucide-react";
import { useState } from "react";

type NavbarProps = {
  onSearch?: (q: string) => void;
  showSearch?: boolean;
};

export default function Navbar({ onSearch, showSearch }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const location = useLocation();

  const navLinks = [
    { to: "/", label: "Home", ocid: "nav.home.link" },
    { to: "/products", label: "Products", ocid: "nav.products.link" },
    { to: "/about", label: "About", ocid: "nav.about.link" },
    { to: "/contact", label: "Contact", ocid: "nav.contact.link" },
  ];

  const isActive = (to: string) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          <Link to="/" className="flex-shrink-0">
            <div>
              <span className="font-heading text-xl font-semibold text-gold">
                DivyaVastra
              </span>
              <p className="text-[10px] text-muted-foreground leading-none mt-0.5 tracking-wide">
                Traditional Devotional Clothing
              </p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                data-ocid={link.ocid}
                className={`text-sm transition-colors hover:text-gold ${
                  isActive(link.to)
                    ? "text-gold font-medium"
                    : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {showSearch && (
          <div className="pb-3">
            <div className="relative max-w-lg mx-auto">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                size={15}
              />
              <Input
                data-ocid="home.search.input"
                placeholder="Search devotional clothing..."
                value={searchVal}
                onChange={(e) => {
                  setSearchVal(e.target.value);
                  onSearch?.(e.target.value);
                }}
                className="pl-9 h-9 text-sm bg-muted/40 border-border focus:bg-card"
              />
            </div>
          </div>
        )}

        {menuOpen && (
          <div className="md:hidden border-t border-border py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                data-ocid={link.ocid}
                onClick={() => setMenuOpen(false)}
                className={`block px-2 py-2 text-sm rounded transition-colors hover:bg-muted ${
                  isActive(link.to)
                    ? "text-gold font-medium"
                    : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Search products...",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="relative">
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        size={15}
      />
      <Input
        data-ocid="home.search.input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-9 h-10 text-sm bg-card"
      />
    </div>
  );
}
