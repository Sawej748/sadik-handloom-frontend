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
  PackageOpen,
} from 'lucide-react';

const HERO_SLIDES = [
  {
    badge: 'Handcrafted in Village Gangeru, UP',
    title: 'Soft & Durable Handloom Cotton Doormats',
    subtitle: 'Traditional braided weaves, vibrant stripes, and washable cotton yarns crafted for everyday comfort.',
    image: 'https://images.pexels.com/photos/6585757/pexels-photo-6585757.jpeg?auto=compress&cs=tinysrgb&w=900',
    caption: 'Handwoven Cotton Collection',
  },
  {
    badge: 'Direct Manufacturer & Wholesale',
    title: 'Natural Coir & Textured Entrance Mats',
    subtitle: 'Heavy-duty dirt-trapping fibers and neat finishing built to last at every doorstep.',
    image: 'https://images.pexels.com/photos/6969866/pexels-photo-6969866.jpeg?auto=compress&cs=tinysrgb&w=900',
    caption: 'Heavy-Duty Entrance Mats',
  },
  {
    badge: 'Custom Sizes & Bulk Orders',
    title: 'Colourful Striped & Braided Floor Mats',
    subtitle: 'Available in standard 16x24, 18x27 and custom dimensions directly from our handloom unit.',
    image: 'https://images.pexels.com/photos/6707628/pexels-photo-6707628.jpeg?auto=compress&cs=tinysrgb&w=900',
    caption: 'Custom Bulk Supply',
  },
];

const DESIGN_SHOWCASE = [
  {
    title: 'Braided Cotton Stripe Mat',
    tag: 'Cotton Handloom',
    image: 'https://images.pexels.com/photos/6585757/pexels-photo-6585757.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    title: 'Natural Coir Welcome Mat',
    tag: 'Natural Coir',
    image: 'https://images.pexels.com/photos/6969866/pexels-photo-6969866.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    title: 'Textured Woven Door Mat',
    tag: 'Heavy Duty',
    image: 'https://images.pexels.com/photos/6707628/pexels-photo-6707628.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    title: 'Classic Indoor Cotton Rug Mat',
    tag: 'Washable Cotton',
    image: 'https://images.pexels.com/photos/6585602/pexels-photo-6585602.jpeg?auto=compress&cs=tinysrgb&w=600',
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

          <div className="text-[11px] text-slate-600 space-y-0.5 mb-3">
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

  const currentSlide = HERO_SLIDES[slideIdx];

  return (
    <div id="home-section" className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
      {/* Warm, Light-Toned Compact Hero Slider */}
      <div className="relative bg-gradient-to-br from-[#F4EDE4] via-[#EFE6DA] to-[#E6D9C8] border border-stone-200/90 rounded-2xl overflow-hidden shadow-sm mb-7">
        <div className="grid grid-cols-1 md:grid-cols-12 items-center p-4 sm:p-8 gap-5">
          <div className="md:col-span-7 space-y-2.5 text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold bg-white/80 text-amber-900 px-3 py-1 rounded-full border border-stone-200">
              <Sparkles className="w-3 h-3 text-amber-700" /> {currentSlide.badge}
            </span>
            <h1 className="text-xl sm:text-3xl font-extrabold text-stone-900 tracking-tight leading-tight">
              {currentSlide.title}
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 max-w-xl mx-auto md:mx-0 leading-relaxed">
              {currentSlide.subtitle}
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 pt-1">
              <a
                href="#products-section"
                className="bg-amber-800 hover:bg-amber-900 text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-lg transition shadow-sm"
              >
                View Catalog
              </a>
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hello SADIK HANDLOOM! Please share your latest doormat designs and wholesale rates.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white hover:bg-stone-50 text-stone-800 border border-stone-300 text-xs sm:text-sm font-semibold px-4 py-2 rounded-lg transition"
              >
                Bulk Inquiry
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-[11px] text-stone-600 pt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-800" /> Village Gangeru, UP - 247775
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-emerald-700" /> +91 9917485101
              </span>
            </div>
          </div>

          <div className="md:col-span-5 flex justify-center">
            <div className="relative bg-white p-2 rounded-xl shadow-sm border border-stone-200 w-full max-w-[300px] sm:max-w-[340px] aspect-[16/10] overflow-hidden">
              <img
                src={currentSlide.image}
                alt={currentSlide.title}
                className="w-full h-full object-cover rounded-lg"
              />
              <span className="absolute bottom-3 right-3 bg-stone-900/75 text-white text-[10px] font-medium px-2.5 py-0.5 rounded-full">
                {currentSlide.caption}
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-1.5 pb-3">
          {HERO_SLIDES.map((_, idx) => (
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

      {/* Visual Design Inspiration Strip (Photos Only - No Fake Prices) */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm sm:text-lg font-bold text-stone-900">
            Craftsmanship & Weave Styles
          </h2>
          <span className="text-[11px] text-stone-500">Handloom Showcase</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {DESIGN_SHOWCASE.map((design, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-xl border border-stone-200/90 overflow-hidden shadow-sm"
            >
              <div className="aspect-[4/3] overflow-hidden bg-stone-100">
                <img
                  src={design.image}
                  alt={design.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
              <div className="p-2.5">
                <span className="text-[10px] font-medium text-amber-800 block">
                  {design.tag}
                </span>
                <p className="text-xs font-semibold text-stone-800 truncate">
                  {design.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Real Products Section (Only Admin-Uploaded Products with Price & WhatsApp Inquiry) */}
      <div id="products-section" className="pt-2">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base sm:text-xl font-bold text-stone-900">
            Available Doormat Catalog
          </h2>
          <span className="text-xs text-stone-500">
            {products.length} {products.length === 1 ? 'Product' : 'Products'}
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.label}
              type="button"
              onClick={() => setMaterial(cat.value)}
              className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap border transition ${
                material === cat.value
                  ? 'bg-amber-800 text-white border-amber-800'
                  : 'bg-white text-stone-700 border-stone-300 hover:border-amber-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <form
          onSubmit={handleSearch}
          className="bg-white p-2.5 sm:p-3 rounded-xl shadow-sm border border-stone-200 mb-5 grid grid-cols-2 sm:grid-cols-4 gap-2"
        >
          <div className="relative col-span-2">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search doormat name..."
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

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="bg-white rounded-xl border border-stone-200 h-60 animate-pulse" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12 px-4 bg-white rounded-xl border border-stone-200">
            <PackageOpen className="w-10 h-10 text-amber-800/60 mx-auto mb-2" />
            <h3 className="text-sm sm:text-base font-semibold text-stone-800">
              Catalog Products Coming Soon
            </h3>
            <p className="text-xs text-stone-500 max-w-md mx-auto mt-1 mb-4">
              Our latest handloom doormat stock with sizes and pricing is being updated. Contact us directly on WhatsApp for instant photos and wholesale price list.
            </p>
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hello SADIK HANDLOOM! Please share photos and prices of your available doormats.')}`}
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