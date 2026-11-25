import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShieldCheck, MessageCircle } from 'lucide-react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '919917485101';
  const isHome = location.pathname === '/';

  const navLinks = [
    { name: 'Home', href: isHome ? '#home-section' : '/' },
    { name: 'Products', href: isHome ? '#products-section' : '/#products-section' },
    { name: 'Contact', href: isHome ? '#contact-section' : '/#contact-section' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FAF8F5]/95 backdrop-blur border-b border-stone-200/80">
      <div className="bg-[#EFEAE2] text-stone-700 text-[11px] sm:text-xs py-1.5 px-4 text-center font-medium border-b border-stone-200/60">
        Direct Handloom Manufacturer & Wholesale Supplier • Village Gangeru, UP
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        <Link to="/" className="flex items-center gap-2.5 min-w-0">
          <img
            src="/logo.jpg"
            alt="Sadik Handloom"
            className="h-11 sm:h-12 w-auto object-contain rounded-lg border border-stone-200 bg-white p-0.5 shrink-0"
          />
          <div className="truncate">
            <span className="block font-bold text-base sm:text-lg text-stone-900 tracking-tight leading-tight">
              SADIK HANDLOOM
            </span>
            <span className="block text-[11px] text-amber-800 font-medium">
              Premium Cotton & Coir Doormats
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-700">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-amber-800 transition py-1"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hello SADIK HANDLOOM! I would like to inquire about your doormat collection.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-medium px-3 py-2 rounded-lg transition"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>

          <Link
            to="/admin"
            className="hidden sm:inline-flex items-center gap-1 bg-white hover:bg-stone-100 text-stone-700 text-xs font-medium px-2.5 py-2 rounded-lg border border-stone-300 transition"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-800" />
            <span>Admin</span>
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden inline-flex items-center gap-1 bg-white border border-stone-300 text-stone-800 px-2.5 py-2 rounded-lg text-xs font-medium hover:bg-stone-100"
            aria-label="Toggle Menu"
          >
            {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            <span>Menu</span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-b border-stone-200 px-4 py-3 space-y-2 shadow-sm">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block py-2 px-3 rounded-lg text-sm font-medium text-stone-800 hover:bg-[#FAF8F5] hover:text-amber-800"
            >
              {link.name}
            </a>
          ))}
          <Link
            to="/admin"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-1.5 py-2 px-3 rounded-lg text-sm font-medium text-amber-900 bg-amber-50/70"
          >
            <ShieldCheck className="w-4 h-4" /> Admin Login
          </Link>
        </div>
      )}
    </header>
  );
}