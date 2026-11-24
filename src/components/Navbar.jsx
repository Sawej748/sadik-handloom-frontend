import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, LogOut, Phone } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();
  const isAdmin = !!localStorage.getItem('adminToken');
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '919917485101';
  const defaultMsg = 'Hello SADIK HANDLOOM! I visited your online doormat catalog and would like to inquire about products and pricing.';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultMsg)}`;

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/');
  };

  return (
    <nav className="bg-white border-b border-stone-200 sticky top-0 z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <img
            src="/logo.png"
            alt="Sadik Handloom Logo"
            className="h-10 w-10 object-contain rounded-md"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <div>
            <span className="font-bold text-base sm:text-xl text-amber-900 tracking-wide block leading-tight">
              SADIK HANDLOOM
            </span>
            <span className="text-[11px] text-stone-500 hidden lg:block">
              Manufacturers & Suppliers of Quality Doormats
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Phone Number */}
          <a
            href="tel:+919917485101"
            className="hidden md:flex items-center gap-1.5 text-xs font-medium text-stone-700 hover:text-amber-800 px-2 py-1.5 rounded-lg hover:bg-stone-100 transition"
          >
            <Phone className="w-3.5 h-3.5 text-amber-800" /> +91 9917485101
          </a>

          {/* WhatsApp Us Button right next to Number */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Chat on WhatsApp"
            className="flex items-center gap-1.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white text-xs sm:text-sm font-medium px-3 py-1.5 rounded-lg shadow-sm transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-4 h-4 fill-current shrink-0">
              <path d="M16 .5C7.44.5.5 7.44.5 16c0 2.74.72 5.41 2.08 7.77L.38 31.62l8.06-2.11A15.42 15.42 0 0 0 16 31.5c8.56 0 15.5-6.94 15.5-15.5S24.56.5 16 .5zm0 28.25c-2.42 0-4.79-.65-6.86-1.88l-.49-.29-4.78 1.25 1.28-4.66-.32-.51A12.69 12.69 0 0 1 3.25 16C3.25 8.97 8.97 3.25 16 3.25S28.75 8.97 28.75 16 23.03 28.75 16 28.75zm7.01-9.52c-.38-.19-2.27-1.12-2.62-1.25-.35-.13-.61-.19-.86.19-.26.38-.99 1.25-1.22 1.5-.22.26-.45.29-.83.1-.38-.19-1.62-.6-3.09-1.91-1.14-1.02-1.91-2.28-2.14-2.66-.22-.38-.02-.59.17-.78.17-.17.38-.45.58-.67.19-.22.26-.38.38-.64.13-.26.06-.48-.03-.67-.1-.19-.86-2.08-1.18-2.85-.31-.75-.63-.65-.86-.66h-.74c-.26 0-.67.1-1.02.48-.35.38-1.34 1.31-1.34 3.2s1.38 3.71 1.57 3.97c.19.26 2.71 4.14 6.57 5.8.92.4 1.63.63 2.19.81.92.29 1.76.25 2.42.15.74-.11 2.27-.93 2.59-1.82.32-.9.32-1.66.22-1.82-.09-.16-.35-.26-.73-.45z" />
            </svg>
            <span className="hidden sm:inline">WhatsApp Us</span>
          </a>

          <Link to="/" className="hidden sm:inline text-sm font-medium text-stone-700 hover:text-amber-700 px-1">
            Catalog
          </Link>

          {isAdmin ? (
            <>
              <Link to="/admin/dashboard" className="text-sm font-medium text-amber-800 hover:underline">
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-sm bg-red-50 text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-100"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </>
          ) : (
            <Link
              to="/admin"
              className="flex items-center gap-1 text-xs sm:text-sm bg-stone-900 text-white px-3 py-1.5 rounded-lg hover:bg-stone-800"
            >
              <ShieldCheck className="w-4 h-4" /> Admin
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}