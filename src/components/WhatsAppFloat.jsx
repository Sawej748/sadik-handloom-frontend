export default function WhatsAppFloat() {
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '919917485101';
  const defaultMsg = 'Hello SADIK HANDLOOM! I visited your online doormat catalog and would like to inquire about products and wholesale/retail pricing.';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultMsg)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      title="Chat with SADIK HANDLOOM on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold px-4 py-3 rounded-full shadow-2xl transition-transform duration-200 hover:scale-105"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-6 h-6 fill-current shrink-0">
        <path d="M16 .5C7.44.5.5 7.44.5 16c0 2.74.72 5.41 2.08 7.77L.38 31.62l8.06-2.11A15.42 15.42 0 0 0 16 31.5c8.56 0 15.5-6.94 15.5-15.5S24.56.5 16 .5zm0 28.25c-2.42 0-4.79-.65-6.86-1.88l-.49-.29-4.78 1.25 1.28-4.66-.32-.51A12.69 12.69 0 0 1 3.25 16C3.25 8.97 8.97 3.25 16 3.25S28.75 8.97 28.75 16 23.03 28.75 16 28.75zm7.01-9.52c-.38-.19-2.27-1.12-2.62-1.25-.35-.13-.61-.19-.86.19-.26.38-.99 1.25-1.22 1.5-.22.26-.45.29-.83.1-.38-.19-1.62-.6-3.09-1.91-1.14-1.02-1.91-2.28-2.14-2.66-.22-.38-.02-.59.17-.78.17-.17.38-.45.58-.67.19-.22.26-.38.38-.64.13-.26.06-.48-.03-.67-.1-.19-.86-2.08-1.18-2.85-.31-.75-.63-.65-.86-.66h-.74c-.26 0-.67.1-1.02.48-.35.38-1.34 1.31-1.34 3.2s1.38 3.71 1.57 3.97c.19.26 2.71 4.14 6.57 5.8.92.4 1.63.63 2.19.81.92.29 1.76.25 2.42.15.74-.11 2.27-.93 2.59-1.82.32-.9.32-1.66.22-1.82-.09-.16-.35-.26-.73-.45z" />
      </svg>
      <span className="hidden sm:inline text-sm">WhatsApp Us</span>
    </a>
  );
}