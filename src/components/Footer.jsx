import { MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0B1E46] text-slate-200 mt-12 border-t-4 border-[#C81E28]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <div className="flex items-center gap-3">
          <img
            src="/logo.jpg"
            alt="Sadik Handloom"
            className="h-14 w-auto rounded-lg bg-white p-1 object-contain"
          />
          <div>
            <h3 className="font-bold text-white text-base">SADIK HANDLOOM</h3>
            <p className="text-xs text-slate-300">
              Handcrafted Cotton, Coir & Heavy-Duty Doormats. Retail & Bulk Wholesale Orders.
            </p>
          </div>
        </div>

        <div className="text-xs space-y-1.5 text-slate-300">
          <p className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-[#C81E28] shrink-0 mt-0.5" />
            <span>Behind Government Hospital, Village Gangeru, Uttar Pradesh - 247775</span>
          </p>
          <p className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
            <a href="https://wa.me/919917485101" className="hover:text-white underline">
              +91 9917485101 (WhatsApp & Call)
            </a>
          </p>
          <p className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-amber-400 shrink-0" />
            <span>sadikhandloom01@gmail.com</span>
          </p>
        </div>

        <div className="text-xs text-slate-400 md:text-right">
          <p className="font-semibold text-white mb-1">100% Made in India</p>
          <p>© {new Date().getFullYear()} SADIK HANDLOOM. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}