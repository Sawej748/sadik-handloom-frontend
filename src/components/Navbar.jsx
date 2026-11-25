import { Link } from 'react-router-dom';
import { Phone, ShieldCheck, MessageCircle } from 'lucide-react';

export default function Navbar() {
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '919917485101';

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
      <div className="bg-[#0B1E46] text-white text-[11px] sm:text-xs py-1.5 px-4 text-center font-medium tracking-wide">
        Direct Manufacturer & Wholesale Supplier • Village Gangeru, Uttar Pradesh
      </div>
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
        <Link to="/" className="flex items-center gap-2.5 min-w-0">
          <img
            src="/logo.jpg"
            alt="Sadik Handloom Logo"
            className="h-11 sm:h-12 w-auto object-contain rounded-md shrink-0"
          />
          <div className="truncate">
            <span className="block font-extrabold text-base sm:text-lg text-[#0B1E46] leading-tight tracking-tight">
              SADIK HANDLOOM
            </span>
            <span className="block text-[10px] sm:text-xs text-[#C81E28] font-semibold">
              Premium Cotton Doormats
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hello SADIK HANDLOOM! I want to inquire about your doormat collection.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold px-3 py-2 rounded-lg transition shadow-sm"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="hidden xs:inline">WhatsApp</span>
          </a>

          <Link
            to="/admin"
            className="inline-flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-[#0B1E46] text-xs font-semibold px-2.5 py-2 rounded-lg border border-slate-300 transition"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#C81E28]" />
            <span>Admin</span>
          </Link>
        </div>
      </div>
    </header>
  );
}