import { useEffect, useState } from 'react';
import { fetchProducts } from '../services/api';
import { Search, MessageCircle, Layers, Maximize2, Palette, MapPin, Phone, Award, ChevronLeft, ChevronRight } from 'lucide-react';

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
      <div className="relative h-60 bg-stone-100 group">
        <img src={allPhotos[activeIdx]} alt={item.name} className="w-full h-full object-cover transition duration-200" />

        <span
          className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full ${
            item.inStock ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
          }`}
        >
          {item.inStock ? 'In Stock' : 'Out of Stock'}
        </span>

        {allPhotos.length > 1 && (
          <>
            <button
              type="button"
              onClick={prevPhoto}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/55 hover:bg-black/80 text-white p-1.5 rounded-full transition"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={nextPhoto}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/55 hover:bg-black/80 text-white p-1.5 rounded-full transition"
              aria-label="Next photo"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/45 px-2.5 py-1 rounded-full">
              {allPhotos.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveIdx(idx)}
                  className={`h-2 rounded-full transition-all ${
                    idx === activeIdx ? 'w-4 bg-white' : 'w-2 bg-white/60'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {allPhotos.length > 1 && (
        <div className="flex gap-1.5 px-3 pt-2.5 overflow-x-auto">
          {allPhotos.map((photo, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIdx(idx)}
              className={`w-11 h-11 rounded-md overflow-hidden border-2 shrink-0 ${
                idx === activeIdx ? 'border-amber-800' : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <img src={photo} alt={`${item.name} view ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start gap-2 mb-2">
            <h2 className="font-bold text-lg text-stone-900">{item.name}</h2>
            <span className="font-bold text-lg text-amber-800 whitespace-nowrap">{item.price}</span>
          </div>

          {item.description && (
            <p className="text-xs text-stone-600 mb-3 line-clamp-2">{item.description}</p>
          )}

          <div className="space-y-1.5 text-xs text-stone-700 bg-stone-50 p-3 rounded-lg border border-stone-100 mb-4">
            <div className="flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-amber-700" />
              <span><strong>Material:</strong> {item.material}</span>
            </div>
            <div className="flex items-center gap-2">
              <Maximize2 className="w-3.5 h-3.5 text-amber-700" />
              <span><strong>Size:</strong> {item.size}</span>
            </div>
            <div className="flex items-center gap-2">
              <Palette className="w-3.5 h-3.5 text-amber-700" />
              <span><strong>Colors:</strong> {item.availableColors}</span>
            </div>
          </div>
        </div>

        <a
          href={getWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 px-4 rounded-lg text-sm transition"
        >
          <MessageCircle className="w-4 h-4" />
          Inquire on WhatsApp
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
  const [bannerSrc, setBannerSrc] = useState('/banner.jpg');
  const [showBanner, setShowBanner] = useState(true);

  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '919917485101';

  const loadProducts = async () => {
    setLoading(true);
    try {
      const res = await fetchProducts({
        keyword: keyword || undefined,
        material: material || undefined,
        size: size || undefined,
      });
      setProducts(res.data);
    } catch (err) {
      console.error('Failed to fetch products:', err);
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

  const handleBannerError = () => {
    if (bannerSrc === '/banner.jpg') {
      setBannerSrc('/banner.png');
    } else if (bannerSrc === '/banner.png') {
      setBannerSrc('/banner.webp');
    } else {
      setShowBanner(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-gradient-to-br from-amber-950 via-amber-900 to-stone-900 rounded-2xl p-6 sm:p-10 text-white mb-8 shadow-lg">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider bg-amber-800/70 text-amber-200 px-3 py-1 rounded-full mb-3 border border-amber-700/50">
            <Award className="w-3.5 h-3.5" /> Direct Manufacturer & Wholesale Supplier
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-3">
            SADIK HANDLOOM
          </h1>
          <p className="text-amber-100/90 text-sm sm:text-base mb-5">
            Premium quality handcrafted & heavy-duty doormats. Explore sizes, materials, and color options below, or inquire directly on WhatsApp.
          </p>

          {showBanner && (
            <div className="my-6 flex justify-center">
              <div className="bg-white/10 p-2 rounded-2xl backdrop-blur-sm border border-white/20 shadow-2xl max-w-2xl w-full">
                <img
                  src={bannerSrc}
                  alt="Sadik Handloom Featured Collection"
                  onError={handleBannerError}
                  className="w-full max-h-80 sm:max-h-96 object-cover rounded-xl mx-auto"
                />
              </div>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-amber-200 mt-4">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
              Behind Government Hospital, Village Gangeru, Uttar Pradesh - 247775
            </span>
            <span className="hidden sm:inline text-amber-600">|</span>
            <a
              href="https://wa.me/919917485101"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white underline"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" /> +91 9917485101
            </a>
          </div>
        </div>
      </div>

      <form onSubmit={handleSearch} className="bg-white p-4 rounded-xl shadow-sm border border-stone-200 mb-8 grid grid-cols-1 sm:grid-cols-4 gap-3">
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search doormat name..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-stone-300 rounded-lg text-sm focus:outline-none focus:border-amber-700"
          />
        </div>

        <select
          value={material}
          onChange={(e) => setMaterial(e.target.value)}
          className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm bg-white focus:outline-none focus:border-amber-700"
        >
          <option value="">All Materials</option>
          <option value="Coir">Coir</option>
          <option value="Rubber">Rubber</option>
          <option value="Cotton">Cotton</option>
          <option value="Microfiber">Microfiber</option>
          <option value="PVC">PVC</option>
        </select>

        <input
          type="text"
          placeholder="Filter by size (e.g. 16x24)"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm focus:outline-none focus:border-amber-700"
        />

        <button
          type="submit"
          className="bg-amber-800 text-white font-medium py-2 px-4 rounded-lg text-sm hover:bg-amber-900 transition"
        >
          Search Catalog
        </button>
      </form>

      {loading ? (
        <div className="text-center py-16 text-stone-500">Loading catalog...</div>
      ) : products.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-stone-200 text-stone-500">
          No doormats found matching your filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((item) => (
            <ProductCard key={item.id} item={item} whatsappNumber={whatsappNumber} />
          ))}
        </div>
      )}
    </div>
  );
}