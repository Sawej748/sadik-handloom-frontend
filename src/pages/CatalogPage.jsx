import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, CheckCircle2, PackageOpen, MessageCircle } from 'lucide-react';

const SAMPLE_SLIDES = [
  {
    badge: 'Sample Showcase • Design 1 of 6',
    title: 'Geometric Handwoven Jute & Cotton Mat',
    qualityPoints: [
      'Material: Natural Jute & Handspun Cotton Blend',
      'Build: Tight Handloom Geometric Weave',
      'Care: Shake, Brush or Spot Clean Easily',
    ],
    candidates: ['/mat1.png', '/mat1.jpg', '/mat1.jpeg'],
  },
  {
    badge: 'Sample Showcase • Design 2 of 6',
    title: 'Rustic Striped Woven Doormat with Tassels',
    qualityPoints: [
      'Material: 100% Pure Twisted Cotton Yarn',
      'Build: Heavy-Duty Woven Weave with Edge Tassels',
      'Care: Soft Underfoot & Hand Washable',
    ],
    candidates: ['/mat2.png', '/mat2.jpg', '/mat2.jpeg'],
  },
  {
    badge: 'Sample Showcase • Design 3 of 6',
    title: 'Colorful Braided Handloom Doormat',
    qualityPoints: [
      'Material: Multi-Tone Braided Cotton Yarn',
      'Build: Durable Flat-Lay Braided Construction',
      'Care: Reversible & Easy to Clean',
    ],
    candidates: ['/mat3.png', '/mat3.jpg', '/mat3.jpeg'],
  },
  {
    badge: 'Sample Showcase • Design 4 of 6',
    title: 'Geometric Handloom Dhurrie Mat',
    qualityPoints: [
      'Material: Woven Cotton & Natural Fiber',
      'Build: Flat-Weave Handloom Craftsmanship',
      'Care: Lightweight & Long-Lasting',
    ],
    candidates: ['/mat4.png', '/mat4.jpg', '/mat4.jpeg'],
  },
  {
    badge: 'Sample Showcase • Design 5 of 6',
    title: 'Floral Handwoven Entrance Doormat',
    qualityPoints: [
      'Material: Pure Handloom Cotton & Fiber',
      'Build: Neat Border & Firm Doorstep Grip',
      'Care: Colorfast & Washable',
    ],
    candidates: ['/mat5.png', '/mat5.jpg', '/mat5.jpeg'],
  },
  {
    badge: 'Sample Showcase • Design 6 of 6',
    title: 'Botanical Welcome Coir Doormat',
    qualityPoints: [
      'Material: Natural Coconut Coir Fiber',
      'Build: Dirt-Scraping Bristles for Doorsteps',
      'Care: Shake Out Dust or Brush Clean',
    ],
    candidates: ['/mat6.png', '/mat6.jpg', '/mat6.jpeg'],
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

function SlideImage({ candidates, alt }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    setIdx(0);
  }, [candidates]);

  const handleError = () => {
    setIdx((prev) => (prev + 1 < candidates.length ? prev + 1 : prev));
  };

  return (
    <img
      src={candidates[idx]}
      alt={alt}
      onError={handleError}
      className="w-full h-full object-cover rounded-xl transition-all duration-500"
    />
  );
}

export default function CatalogPage() {
  const [material, setMaterial] = useState('');
  const [slideIdx, setSlideIdx] = useState(0);
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '919917485101';

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIdx((prev) => (prev + 1) % SAMPLE_SLIDES.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setSlideIdx((prev) => (prev === 0 ? SAMPLE_SLIDES.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setSlideIdx((prev) => (prev + 1) % SAMPLE_SLIDES.length);
  };

  const currentSlide = SAMPLE_SLIDES[slideIdx];

  return (
    <div id="home-section" className="scroll-mt-24 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-7">
      {/* Single Box Auto-Sliding Sample Showcase (1 Doormat Photo + Quality Details, No Price) */}
      <div className="relative bg-gradient-to-br from-[#FDEBD6] via-[#FCE2C4] to-[#F7D3AC] border border-orange-200/90 rounded-2xl overflow-hidden shadow-xs mb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 items-center p-5 sm:p-8 lg:px-14 gap-6">
          {/* Left: Quality Specifications */}
          <div className="md:col-span-6 space-y-3 text-left order-2 md:order-1">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold bg-white/90 text-orange-900 px-3 py-1 rounded-full border border-orange-200">
              <Sparkles className="w-3 h-3 text-orange-700" /> {currentSlide.badge}
            </span>

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-stone-900 tracking-tight leading-snug">
              {currentSlide.title}
            </h1>

            <div className="space-y-2 pt-1">
              <p className="text-xs font-bold uppercase tracking-wider text-stone-700">
                Quality Specifications:
              </p>
              <ul className="space-y-1.5 text-xs sm:text-sm text-stone-800">
                {currentSlide.qualityPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-orange-800 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Single Doormat Photo */}
          <div className="md:col-span-6 flex justify-center order-1 md:order-2">
            <div className="bg-white p-2.5 rounded-xl shadow-sm border border-orange-200/80 w-full max-w-[380px] sm:max-w-[430px] aspect-[4/3] overflow-hidden">
              <SlideImage candidates={currentSlide.candidates} alt={currentSlide.title} />
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={prevSlide}
          aria-label="Previous doormat"
          className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-stone-800 p-2 rounded-full border border-orange-200 shadow-xs transition"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next doormat"
          className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-stone-800 p-2 rounded-full border border-orange-200 shadow-xs transition"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        <div className="flex justify-center gap-1.5 pb-3.5">
          {SAMPLE_SLIDES.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSlideIdx(idx)}
              className={`h-1.5 rounded-full transition-all ${
                idx === slideIdx ? 'w-6 bg-orange-800' : 'w-1.5 bg-stone-500/40'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Category Filter Pills & Empty Catalog State */}
      <div id="products-section" className="scroll-mt-24 pt-1">
        <div className="flex items-center justify-center sm:justify-start gap-2 overflow-x-auto pb-2 mb-5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.label}
              type="button"
              onClick={() => setMaterial(cat.value)}
              className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap border transition ${
                material === cat.value
                  ? 'bg-orange-800 text-white border-orange-800'
                  : 'bg-white text-stone-700 border-stone-300 hover:border-orange-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="text-center py-12 px-4 bg-white rounded-xl border border-dashed border-orange-200">
          <PackageOpen className="w-10 h-10 text-orange-800/60 mx-auto mb-2" />
          <h2 className="text-sm sm:text-base font-semibold text-stone-800">
            Catalog Products Coming Soon
          </h2>
          <p className="text-xs text-stone-500 max-w-md mx-auto mt-1 mb-4">
            Admin-uploaded doormats with live price and WhatsApp inquiry will appear here once added.
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
      </div>
    </div>
  );
}