import { useEffect, useState } from 'react';
import { fetchProducts } from '../services/api';
import {
  Search,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  PackageOpen,
} from 'lucide-react';

const SHOWCASE_SLIDES = [
  {
    badge: 'Craftsmanship Showcase',
    title: 'Handwoven Cotton Braided Doormat',
    qualityPoints: [
      'Material: 100% Pure Twisted Cotton Yarn',
      'Build: Heavy-Duty Tight Braided Handloom Weave',
      'Care: Soft Underfoot & Easy Machine Washable',
    ],
    image: 'https://images.pexels.com/photos/6969866/pexels-photo-6969866.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
  {
    badge: 'Craftsmanship Showcase',
    title: 'Natural Coir Entrance Welcome Mat',
    qualityPoints: [
      'Material: 100% Natural Coconut Husk Fiber',
      'Build: Coarse Dirt-Trapping Bristles with Anti-Slip Base',
      'Care: Shake or Brush Clean Effortlessly',
    ],
    image: 'https://images.pexels.com/photos/4207892/pexels-photo-4207892.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
  {
    badge: 'Craftsmanship Showcase',
    title: 'Textured Handloom Jute & Cotton Mat',
    qualityPoints: [
      'Material: Natural Jute & Thick Cotton Blend',
      'Build: Reinforced Edge Stitching for Zero Fraying',
      'Feature: High Dust & Moisture Absorption',
    ],
    image: 'https://images.pexels.com/photos/6585757/pexels-photo-6585757.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
  {
    badge: 'Craftsmanship Showcase',
    title: 'Traditional Striped Handloom Floor Mat',
    qualityPoints: [
      'Material: Colorfast Dyed Cotton Threads',
      'Build: Reversible Flat-Lay Heavy Weave',
      'Use: Ideal for Main Entrance, Kitchen & Balcony',
    ],
    image: 'https://images.pexels.com/photos/6707628/pexels-photo-6707628.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
  {
    badge: 'Craftsmanship Showcase',
    title: 'Heavy-Duty Woven Doorstep Mat',
    qualityPoints: [
      'Material: High-Density Interlaced Fiber Yarn',
      'Build: All-Weather Durable Doorstep Grip',
      'Finish: Handcrafted in Village Gangeru, UP',
    ],
    image: 'https://images.pexels.com/photos/6585602/pexels-photo-6585602.jpeg?auto=compress&cs=tinysrgb&w=900',
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
    <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col">
      <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
        <img
          src={allPhotos[activeIdx]}
          alt={item.name}
          className="w-full h-full object-cover transition duration-300 hover:scale-105"
        />

        <span
          className={`absolute top-2 left-2 text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full ${
            item.inStock ? 'bg-emerald-600 text-white' : 'bg-stone-700 text-white'
          }`}
        >
          {item.inStock ? 'In Stock' : 'Out of Stock'}
        </span>

        {allPhotos.length > 1 && (
          <>
            <button
              type="button"
              onClick={prevPhoto}
              className="absolute left-1.5 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-1 rounded-full transition"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={nextPhoto}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-1 rounded-full transition"
              aria-label="Next photo"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <div className="absolute bottom-1.5 right-2 bg-black/55 text-white text-[10px] px-1.5 py-0.5 rounded-full">
              {activeIdx + 1}/{allPhotos.length}
            </div>
          </>
        )}
      </div>

      <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-900 bg-amber-50 border border-amber-200/70 px-2 py-0.5 rounded">
              {item.material}
            </span>
            <span className="font-bold text-sm sm:text-base text-stone-900">
              {item.price}
            </span>
          </div>

          <h3 className="font-bold text-xs sm:text-sm text-stone-900 line-clamp-2 mb-1.5 leading-snug">
            {item.name}
          </h3>

          <div className="text-[11px] text-stone-600 space-y-0.5 mb-3">
            <p className="truncate"><span className="font-medium text-stone-800">Size:</span> {item.size}</p>
            <p className="truncate"><span className="font-medium text-stone-800">Colors:</span> {item.availableColors}</p>
          </div>
        </div>

        <a
          href={getWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-2.5 rounded-lg text-xs sm:text-sm transition"
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

  // Auto-slide every 3.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIdx((prev) => (prev + 1) % SHOWCASE_SLIDES.length);
    }, 3500);
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

  const prevSlide = () => {
    setSlideIdx((prev) => (prev === 0 ? SHOWCASE_SLIDES.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setSlideIdx((prev) => (prev + 1) % SHOWCASE_SLIDES.length);
  };

  const currentSlide = SHOWCASE_SLIDES[slideIdx];

  return (
    <div id="home-section" className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-7">
      {/* Single Auto-Sliding Showcase Banner (1 Doormat Photo + Quality Specs at a time, No Price) */}
      <div className="relative bg-gradient-to-br from-[#F4EDE4] via-[#EFE6DA] to-[#E6D9C8] border border-stone-200/90 rounded-2xl overflow-hidden shadow-xs mb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 items-center p-5 sm:p-8 lg:px-14 gap-6 transition-all duration-500">
          {/* Left: Quality Specifications */}
          <div className="md:col-span-6 space-y-3 text-left order-2 md:order-1">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold bg-white/85 text-amber-900 px-3 py-1 rounded-full border border-stone-200">
              <Sparkles className="w-3 h-3 text-amber-700" /> {currentSlide.badge}
            </span>

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-stone-900 tracking-tight leading-snug">
              {currentSlide.title}
            </h1>

            <div className="space-y-2 pt-1">
              <p className="text-xs font-bold uppercase tracking-wider text-stone-600">
                Quality Specifications:
              </p>
              <ul className="space-y-1.5 text-xs sm:text-sm text-stone-800">
                {currentSlide.qualityPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Single Crisp Doormat Photo */}
          <div className="md:col-span-6 flex justify-center order-1 md:order-2">
            <div className="bg-white p-2 rounded-xl shadow-sm border border-stone-200 w-full max-w-[360px] sm:max-w-[420px] aspect-[4/3] overflow-hidden">
              <img
                key={currentSlide.image}
                src={currentSlide.image}
                alt={currentSlide.title}
                onError={(e) => {
                  e.currentTarget.src = '/logo.jpg';
                }}
                className="w-full h-full object-cover rounded-lg transition-opacity duration-500"
              />
            </div>
          </div>
        </div>

        {/* Left / Right Manual Slide Arrows */}
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Previous design"
          className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 bg-white/85 hover:bg-white text-stone-800 p-2 rounded-full border border-stone-200 shadow-xs transition"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next design"
          className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 bg-white/85 hover:bg-white text-stone-800 p-2 rounded-full border border-stone-200 shadow-xs transition"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Slide Indicator Dots */}
        <div className="flex justify-center gap-1.5 pb-3.5">
          {SHOWCASE_SLIDES.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSlideIdx(idx)}
              className={`h-1.5 rounded-full transition-all ${
                idx === slideIdx ? 'w-6 bg-amber-800' : 'w-1.5 bg-stone-400/50'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Category Filter Pills */}
      <div id="products-section" className="pt-1">
        <div className="flex items-center justify-center sm:justify-start gap-2 overflow-x-auto pb-2 mb-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.label}
              type="button"
              onClick={() => setMaterial(cat.value)}
              className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap border transition ${
                material === cat.value
                  ? 'bg-amber-800 text-white border-amber-800'
                  : 'bg-white text-stone-700 border-stone-300 hover:border-amber-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search & Size Bar */}
        <form
          onSubmit={handleSearch}
          className="bg-white p-2.5 sm:p-3 rounded-xl shadow-xs border border-stone-200 mb-5 grid grid-cols-2 sm:grid-cols-4 gap-2"
        >
          <div className="relative col-span-2">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search available doormats..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 border border-stone-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:border-amber-700"
            />
          </div>

          <input
            type="text"
            placeholder="Size (e.g. 16x24)"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="w-full px-3 py-1.5 border border-stone-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:border-amber-700"
          />

          <button
            type="submit"
            className="bg-amber-800 hover:bg-amber-900 text-white font-medium py-1.5 px-3 rounded-lg text-xs sm:text-sm transition"
          >
            Search
          </button>
        </form>

        {/* Available Doormat Catalog Header */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base sm:text-xl font-bold text-stone-900">
            Available Doormat Catalog
          </h2>
          <span className="text-xs text-stone-500">
            {products.length} {products.length === 1 ? 'Product' : 'Products'}
          </span>
        </div>

        {/* Real Admin-Uploaded Products Only */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="bg-white rounded-xl border border-stone-200 h-60 animate-pulse" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12 px-4 bg-white rounded-xl border border-dashed border-stone-300">
            <PackageOpen className="w-10 h-10 text-amber-800/60 mx-auto mb-2" />
            <h3 className="text-sm sm:text-base font-semibold text-stone-800">
              Catalog Products Coming Soon
            </h3>
            <p className="text-xs text-stone-500 max-w-md mx-auto mt-1 mb-4">
              Admin-uploaded doormats with live pricing, available colors, and direct WhatsApp inquiry will appear here.
            </p>
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hello SADIK HANDLOOM! Please share photos and prices of your ready stock doormats.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-lg transition"
            >
              <MessageCircle className="w-4 h-4" /> Ask on WhatsApp
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
            {products.map((item) => (
              <ProductCard key={item.id} item={item} whatsappNumber={whatsappNumber} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}