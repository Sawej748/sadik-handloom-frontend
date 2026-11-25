import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ShieldCheck, MessageCircle } from 'lucide-react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '919917485101';

  const handleSectionNav = (e, sectionId) => {
    e.preventDefault();
    setMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 120);
      return;
    }
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FFF9F2]/95 backdrop-blur border-b border-orange-200/70">
      <div className="bg-[#FDEBD6] text-stone-700 text-[11px] sm:text-xs py-1.5 px-4 text-center font-medium border-b border-orange-200/60">
        Direct Handloom Manufacturer & Wholesale Supplier • Village Gangeru, Uttar Pradesh
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-24 grid grid-cols-3 items-center">
        {/* Left: Navigation Menu */}
        <div className="flex items-center">
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-700">
            <a
              href="#home-section"
              onClick={(e) => handleSectionNav(e, 'home-section')}
              className="hover:text-orange-800 transition py-1 cursor-pointer"
            >
              Home
            </a>
            <a
              href="#products-section"
              onClick={(e) => handleSectionNav(e, 'products-section')}
              className="hover:text-orange-800 transition py-1 cursor-pointer"
            >
              Products
            </a>
            <a
              href="#contact-section"
              onClick={(e) => handleSectionNav(e, 'contact-section')}
              className="hover:text-orange-800 transition py-1 cursor-pointer"
            >
              Contact
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden inline-flex items-center gap-1.5 bg-white border border-stone-300 text-stone-800 px-2.5 py-2 rounded-lg text-xs font-medium hover:bg-orange-50"
            aria-label="Toggle Menu"
          >
            {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            <span>Menu</span>
          </button>
        </div>

        {/* Center: Sadik Handloom Logo (Slightly larger, balanced) */}
        <div className="flex justify-center">
          <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center">
            <img
              src="/logo.jpg"
              alt="Sadik Handloom"
              className="h-16 sm:h-20 w-auto object-contain rounded-xl bg-white px-2 py-1 border border-orange-200/80 shadow-xs"
            />
          </Link>
        </div>

        {/* Right: WhatsApp & Admin */}
        <div className="flex items-center justify-end gap-2">
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
            className="hidden sm:inline-flex items-center gap-1 bg-white hover:bg-orange-50 text-stone-700 text-xs font-medium px-2.5 py-2 rounded-lg border border-stone-300 transition"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-orange-800" />
            <span>Admin</span>
          </Link>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-b border-orange-200 px-4 py-3 space-y-2 shadow-sm">
          <a
            href="#home-section"
            onClick={(e) => handleSectionNav(e, 'home-section')}
            className="block py-2 px-3 rounded-lg text-sm font-medium text-stone-800 hover:bg-[#FFF9F2] hover:text-orange-800"
          >
            Home
          </a>
          <a
            href="#products-section"
            onClick={(e) => handleSectionNav(e, 'products-section')}
            className="block py-2 px-3 rounded-lg text-sm font-medium text-stone-800 hover:bg-[#FFF9F2] hover:text-orange-800"
          >
            Products
          </a>
          <a
            href="#contact-section"
            onClick={(e) => handleSectionNav(e, 'contact-section')}
            className="block py-2 px-3 rounded-lg text-sm font-medium text-stone-800 hover:bg-[#FFF9F2] hover:text-orange-800"
          >
            Contact
          </a>
          <Link
            to="/admin"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-1.5 py-2 px-3 rounded-lg text-sm font-medium text-orange-900 bg-orange-50"
          >
            <ShieldCheck className="w-4 h-4" /> Admin Login
          </Link>
        </div>
      )}
    </header>
  );
}