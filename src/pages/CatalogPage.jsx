import { useEffect, useState } from 'react';
import { fetchProducts } from '../services/api';
import {
  Search,
  MessageCircle,
  MapPin,
  Phone,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

const HERO_SLIDES = [
  {
    badge: 'Handcrafted in Gangeru, UP',
    title: 'Premium Cotton Handloom Doormats',
    subtitle: 'Thick braided weave, washable cotton yarn & vibrant multi-color stripes for homes & bulk buyers.',
    image: '/logo.jpg',
    tag: 'Wholesale & Retail',
  },
  {
    badge: 'Heavy-Duty Entrance Collection',
    title: 'Durable Braided & Coir Door Mats',
    subtitle: 'Anti-slip grip, dust-trapping texture, and custom sizes available directly from our loom.',
    image: 'https://images.unsplash.com/photo-1600166898405-da9535204843?auto=format&fit=crop&w=900&q=80',
    tag: 'Direct Factory Rates',
  },
  {
    badge: 'Custom Bulk Orders Open',
    title: 'Colourful Reversible Cotton Mats',
    subtitle: 'Soft underfoot, easy machine wash, and long-lasting natural dyes in 16x24 & custom dimensions.',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=900&q=80',
    tag: 'Pan-India Dispatch',
  },
];

const SHOWCASE_PRODUCTS = [
  {
    id: 'demo-1',
    name: 'Classic Tricolor Braided Cotton Mat',
    material: 'Cotton',
    size: '16x24 inches',
    availableColors: 'Navy Blue, Crimson Red, Cream',
    price: '180',
    inStock: true,
    imageUrl: '/logo.jpg',
    isSample: true,
  },
  {
    id: 'demo-2',
    name: 'Royal Handloom Striped Cotton Doormat',
    material: 'Cotton',
    size: '18x27 inches',
    availableColors: 'Maroon, Beige, Forest Green',
    price: '220',
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1600166898405-da9535204843?auto=format&fit=crop&w=700&q=80',
    isSample: true,
  },
  {
    id: 'demo-3',
    name: 'Heavy Duty Natural Coir Welcome Mat',
    material: 'Coir',
    size: '16x24 inches',
    availableColors: 'Natural Brown, Black Border',
    price: '260',
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=700&q=80',
    isSample: true,
  },
  {
    id: 'demo-4',
    name: 'Soft Absorbent Microfiber Bath & Door Mat',
    material: 'Microfiber',
    size: '16x24 inches',
    availableColors: 'Grey, Navy, Wine Red',
    price: '210',
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=700&q=80',
    isSample: true,
  },
];

const CATEGORIES = [
  { label: 'All Mats', value: '' },
  { label: 'Cotton', value: 'Cotton' },
  { label: 'Coir', value: 'Coir' },
  { label: 'Rubber', value: 'Rubber' },
  { label: 'Microfiber', value: 'Microfiber' },
  { label: 'PVC', value: 'PVC' },
];

function ProductCard({ item, whatsappNumber }) {
  const allPhotos = [
    item.imageUrl,
    ...(item.extraImageUrls ? item.extraImageUrls.split(',').filter(Boolean) : []),
  ];
  const [activeIdx, setActiveIdx] = useState(0);

  const prevPhoto = (e) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev === 0 ? allPhotos.length - 1 : prev - 1));
  };

  const nextPhoto = (e) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev === allPhotos.length - 1 ? 0 : prev + 1));
  };

  const getWhatsAppLink = () => {
    const msg = `Hello SADIK HANDLOOM! I am interested in this Doormat:\n*Name:* ${item.name}\n*Size:* ${item.size}\n*Material:* ${item.material}\n*Colors:* ${item.availableColors}\n*Price:* ${item.price}\nPlease share availability and order details.`;
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col">
      <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
        <img
          src={allPhotos[activeIdx]}
          alt={item.name}
          className="w-full h-full object-cover transition duration-300 hover:scale-105"
        />

        <span
          className={`absolute top-2 left-2 text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full shadow-sm ${
            item.inStock ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
          }`}
        >
          {item.inStock ? 'In Stock' : 'Out of Stock'}
        </span>

        {item.isSample && (
          <span className="absolute bottom-2 left-2 bg-[#0B1E46]/85 text-white text-[10px] font-medium px-2 py-0.5 rounded">
            Sample Design
          </span>
        )}

        {allPhotos.length > 1 && (
          <>
            <button
              type="button"
              onClick={prevPhoto}
              className="absolute left-1.5 top-1/2 -translate-y-1/2 bg-black/55 hover:bg-black/80 text-white p-1 rounded-full transition"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={nextPhoto}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-black/55 hover:bg-black/80 text-white p-1 rounded-full transition"
              aria-label="Next photo"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <div className="absolute bottom-1.5 right-2 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded-full">
              {activeIdx + 1}/{allPhotos.length}
            </div>
          </>
        )}
      </div>

      <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#C81E28] bg-red-50 px-2 py-0.5 rounded">
              {item.material}
            </span>
            <span className="font-extrabold text-sm sm:text-base text-[#0B1E46]">
              {item.price}
            </span>
          </div>

          <h3 className="font-bold text-xs sm:text-sm text-slate-900 line-clamp-2 mb-1.5 leading-snug">
            {item.name}
          </h3>

          <div className="text-[11px] text-slate-600 space-y-0.5 mb-3">
            <p className="truncate"><span className="font-medium text-slate-800">Size:</span> {item.size}</p>
            <p className="truncate"><span className="font-medium text-slate-800">Colors:</span> {item.availableColors}</p>
          </div>
        </div>

        <a
          href={getWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-semibold py-2 px-2.5 rounded-lg text-xs sm:text-sm transition shadow-sm"
        >
          <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
          <span>Inquire on WhatsApp</span>
        </a>
      </div>
    </div>
  );
}

export default function CatalogPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState('');
  const [material, setMaterial] = useState('');
  const [size, setSize] = useState('');
  const [slideIdx, setSlideIdx] = useState(0);

  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '919917485101';

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIdx((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const res = await fetchProducts({
        keyword: keyword || undefined,
        material: material || undefined,
        size: size || undefined,
      });
      setProducts(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error('Failed to fetch products:', err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [material, size]);

  const handleSearch = (e) => {
    e.preventDefault();
    loadProducts();
  };

  const isFiltered = Boolean(keyword || material || size);
  const displayProducts =
    products.length > 0
      ? products
      : isFiltered
      ? []
      : SHOWCASE_PRODUCTS;

  const currentSlide = HERO_SLIDES[slideIdx];

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
      {/* Compact Auto-Sliding Hero Banner */}
      <div className="relative bg-gradient-to-r from-[#0B1E46] via-[#132c63] to-[#7f131b] rounded-2xl overflow-hidden shadow-md mb-5 text-white">
        <div className="grid grid-cols-1 md:grid-cols-12 items-center p-4 sm:p-7 gap-4">
          <div className="md:col-span-7 space-y-2.5 text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold bg-white/15 text-amber-200 px-2.5 py-1 rounded-full">
              <Sparkles className="w-3 h-3" /> {currentSlide.badge}
            </span>
            <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight leading-tight">
              {currentSlide.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-200 max-w-xl mx-auto md:mx-0">
              {currentSlide.subtitle}
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1">
              <a
                href="#catalog-section"
                className="bg-[#C81E28] hover:bg-red-700 text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-lg transition shadow"
              >
                Explore Designs
              </a>
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hello SADIK HANDLOOM! Please share your latest doormat catalog & wholesale price list.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-[#0B1E46] hover:bg-slate-100 text-xs sm:text-sm font-semibold px-4 py-2 rounded-lg transition"
              >
                Bulk Inquiry
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-[11px] text-slate-300 pt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400" /> Village Gangeru, UP - 247775
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-emerald-400" /> +91 9917485101
              </span>
            </div>
          </div>

          <div className="md:col-span-5 flex justify-center">
            <div className="relative bg-white p-2 rounded-xl shadow-lg w-full max-w-[260px] sm:max-w-[300px] aspect-[16/10] overflow-hidden">
              <img
                src={currentSlide.image}
                alt={currentSlide.title}
                className="w-full h-full object-contain rounded-lg"
              />
              <span className="absolute bottom-2 right-2 bg-[#0B1E46] text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                {currentSlide.tag}
              </span>
            </div>
          </div>
        </div>

        {/* Slide Dots */}
        <div className="flex justify-center gap-1.5 pb-3">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSlideIdx(idx)}
              className={`h-1.5 rounded-full transition-all ${
                idx === slideIdx ? 'w-6 bg-white' : 'w-1.5 bg-white/40'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Category Filter Pills (Mobile Horizontal Scroll) */}
      <div id="catalog-section" className="flex items-center gap-2 overflow-x-auto pb-2 mb-4 no-scrollbar">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.label}
            type="button"
            onClick={() => setMaterial(cat.value)}
            className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap border transition ${
              material === cat.value
                ? 'bg-[#0B1E46] text-white border-[#0B1E46]'
                : 'bg-white text-slate-700 border-slate-300 hover:border-[#0B1E46]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Compact Search & Size Filter Bar */}
      <form
        onSubmit={handleSearch}
        className="bg-white p-2.5 sm:p-3 rounded-xl shadow-sm border border-slate-200 mb-5 grid grid-cols-2 sm:grid-cols-4 gap-2"
      >
        <div className="relative col-span-2 sm:col-span-2">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search doormat design..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 border border-slate-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:border-[#0B1E46]"
          />
        </div>

        <input
          type="text"
          placeholder="Size (e.g. 16x24)"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:border-[#0B1E46]"
        />

        <button
          type="submit"
          className="bg-[#C81E28] hover:bg-red-700 text-white font-semibold py-1.5 px-3 rounded-lg text-xs sm:text-sm transition"
        >
          Search
        </button>
      </form>

      {/* Section Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base sm:text-xl font-extrabold text-[#0B1E46]">
          {products.length > 0 ? 'Our Doormat Collection' : 'Featured Handloom Designs'}
        </h2>
        <span className="text-[11px] sm:text-xs text-slate-500 flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Direct WhatsApp Order
        </span>
      </div>

      {/* Product Grid: 2 Columns on Mobile (same as mymatsindia mobile view), 4 Columns on Desktop */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="bg-white rounded-xl border border-slate-200 h-64 animate-pulse" />
          ))}
        </div>
      ) : displayProducts.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-slate-200 text-sm text-slate-500">
          No doormats found matching your filter.{' '}
          <button
            type="button"
            onClick={() => {
              setKeyword('');
              setMaterial('');
              setSize('');
            }}
            className="text-[#C81E28] font-semibold underline ml-1"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          {displayProducts.map((item) => (
            <ProductCard key={item.id} item={item} whatsappNumber={whatsappNumber} />
          ))}
        </div>
      )}
    </div>
  );
}