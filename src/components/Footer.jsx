import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';

export default function Footer() {
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '919917485101';

  return (
    <footer id="contact-section" className="scroll-mt-24 bg-[#FDEBD6] text-stone-700 mt-14 border-t border-orange-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex items-start gap-3.5">
          <img
            src="/logo.jpg"
            alt="Sadik Handloom"
            className="h-16 w-auto rounded-xl bg-white p-1 border border-orange-200 object-contain shrink-0"
          />
          <div>
            <h3 className="font-bold text-stone-900 text-base">SADIK HANDLOOM</h3>
            <p className="text-xs text-stone-600 mt-1 leading-relaxed">
              Handcrafted cotton, braided, coir & heavy-duty entrance doormats. Direct factory supply for homes, retailers & bulk wholesale buyers.
            </p>
          </div>
        </div>

        <div className="text-xs space-y-2.5 text-stone-700">
          <h4 className="font-bold text-stone-900 text-sm">Contact & Factory Address</h4>
          <p className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-orange-800 shrink-0 mt-0.5" />
            <span>Behind Government Hospital, Village Gangeru, Uttar Pradesh - 247775</span>
          </p>
          <p className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-emerald-700 shrink-0" />
            <a href="tel:+919917485101" className="hover:text-stone-950 font-medium">
              +91 9917485101
            </a>
          </p>
          <p className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-orange-800 shrink-0" />
            <span>sadikhandloom01@gmail.com</span>
          </p>
        </div>

        <div className="flex flex-col justify-between md:items-end text-xs">
          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hello SADIK HANDLOOM! I want to connect regarding doormat orders.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2.5 rounded-lg transition w-fit"
          >
            <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
          </a>
          <p className="text-stone-500 mt-4 md:text-right">
            © {new Date().getFullYear()} SADIK HANDLOOM • Made in India
          </p>
        </div>
      </div>
    </footer>
  );
}