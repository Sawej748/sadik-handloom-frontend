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
  PackageOpen,
} from 'lucide-react';

// Single-slide visual showcase (1 doormat photo + quality details at a time, auto-sliding - no prices)
const SHOWCASE_SLIDES = [
  {
    badge: 'Handloom Craftsmanship Showcase',
    title: 'Braided Tricolor Cotton Doormat',
    description:
      'Thick hand-braided cotton yarn weave crafted on traditional handlooms in Village Gangeru. Soft underfoot, absorbent, and easily washable for high-traffic entrances.',
    qualityPoints: [
      'Material: 100% Pure Twisted Cotton Yarn',
      'Build: Heavy-Duty Tight Braided Weave',
      'Care: Easy Hand & Machine Washable',
      'Feature: Eco-Friendly & Reversible',
    ],
    image: '/mat1.jpg',
    label: 'Handcrafted Cotton Series',
  },
  {
    badge: 'Handloom Craftsmanship Showcase',
    title: 'Natural Coir Bordered Entrance Mat',
    description:
      'Heavy-duty natural coconut fiber with a durable woven border. Excellent scraping ability for dirt and moisture, ideal for outdoor or sheltered doorways.',
    qualityPoints: [
      'Material: High-Grade Natural Coconut Coir',
      'Build: Rugged Brush Surface, Anti-Slip Base',
      'Feature: Heavy-Duty All-Weather Construction',
      'Size: Standard 18" x 30"',
    ],
    image: '/mat2.jpg',
    label: 'Coir & Natural Fiber',
  },
  {
    badge: 'Handloom Craftsmanship Showcase',
    title: 'Oval Chindi Braided Floor Mat',
    description:
      'Vibrant, spiral-braided cotton rag rug (chindi) with reinforced stitching. Adds a cozy, bohemian touch to bedrooms, kitchens, or living areas.',
    qualityPoints: [
      'Material: Upcycled Mixed Cotton Chindi',
      'Build: Reversible Flat-Lay Construction',
      'Finish: Dense Weave for Extra Comfort',
      'Color: Multicolored Earthy Palette',
    ],
    image: '/mat3.jpg',
    label: 'Boho Chindi Collection',
  },
  {
    badge: 'Handloom Craftsmanship Showcase',
    title: 'Floral Jute Handloom Dhurrie',
    description:
      'Elegant handwoven jute rug with intricate floral block print design. A natural, rustic addition that brings warmth and texture to any interior space.',
    qualityPoints: [
      'Material: 100% Natural Golden Jute Fiber',
      'Build: Flat-Weave Handloom Construction',
      'Design: Traditional Floral Print with Tassels',
      'Eco-Friendly & Sustainable',
    ],
    image: '/mat4.jpg',
    label: 'Jute & Printed Series',
  },
  {
    badge: 'Handloom Craftsmanship Showcase',
    title: 'Plush Microfiber Anti-Slip Mat',
    description:
      'Ultra-soft, highly absorbent microfiber mat with a heavy-duty anti-skid rubber backing. Perfect for bathroom, kitchen sink, or doorway entry.',
    qualityPoints: [
      'Material: High-GSM Soft Microfiber',
      'Feature: Super Absorbent & Quick Drying',
      'Build: TPR Anti-Slip Safety Backing',
      'Care: Machine Washable',
    ],
    image: '/mat5.jpg',
    label: 'Modern Comfort Mat',
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

export default function CatalogPage() {
  const [loading, setLoading] = useState(false);
  const [material, setMaterial] = useState('');
  const [slideIdx, setSlideIdx] = useState(0);
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '919917485101';

  // Automatic slideshow: advances one doormat slide every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIdx((prev) => (prev + 1) % SHOWCASE_SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

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
          {/* Left: Quality Specifications & Description */}
          <div className="md:col-span-7 space-y-3 text-left order-2 md:order-1">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold bg-white/85 text-amber-900 px-3 py-1 rounded-full border border-stone-200">
              <Sparkles className="w-3 h-3 text-amber-700" /> {currentSlide.badge}
            </span>

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-stone-900 tracking-tight leading-snug">
              {currentSlide.title}
            </h1>
            
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed max-w-2xl">
                {currentSlide.description}
            </p>

            <div className="space-y-2.5 pt-1.5">
              <p className="text-[11px] font-bold uppercase tracking-wider text-stone-600">
                Key Quality Points:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-xs sm:text-sm text-stone-800">
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
          <div className="md:col-span-5 flex justify-center order-1 md:order-2">
            <div className="bg-white p-3 rounded-2xl shadow-lg border border-stone-200 w-full max-w-[400px] aspect-[4/3] overflow-hidden flex items-center justify-center">
              <img
                key={currentSlide.image}
                src={currentSlide.image}
                alt={currentSlide.title}
                onError={(e) => {
                  e.currentTarget.src = '/logo.jpg';
                }}
                className="w-full h-full object-cover rounded-xl transition-opacity duration-500 ease-in-out"
              />
            </div>
          </div>
        </div>

        {/* Left / Right Manual Slide Arrows */}
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Previous design"
          className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 bg-white/85 hover:bg-white text-stone-800 p-2.5 rounded-full border border-stone-200 shadow-xs transition group"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
        </button>
        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next design"
          className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 bg-white/85 hover:bg-white text-stone-800 p-2.5 rounded-full border border-stone-200 shadow-xs transition group"
        >
          <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* Slide Indicator Dots */}
        <div className="flex justify-center gap-2 pb-3">
          {SHOWCASE_SLIDES.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSlideIdx(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === slideIdx ? 'w-8 bg-amber-800' : 'w-2 bg-stone-400/60 hover:bg-amber-600/80'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Category Filter Pills (Active - no products yet) */}
      <div id="products-section" className="pt-1.5">
        <div className="flex items-center justify-center sm:justify-start gap-2 overflow-x-auto pb-3 mb-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.label}
              type="button"
              onClick={() => setMaterial(cat.value)}
              className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap border transition duration-200 ${
                material === cat.value
                  ? 'bg-amber-800 text-white border-amber-800 shadow-sm'
                  : 'bg-white text-stone-700 border-stone-300 hover:border-amber-700 hover:text-amber-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Clean Empty-State Catalog Message (Neeche real products hidden) */}
        <div className="text-center py-16 px-6 bg-white rounded-2xl border-2 border-dashed border-stone-300 shadow-inner">
          <PackageOpen className="w-14 h-14 text-amber-800/60 mx-auto mb-4" />
          <h3 className="text-base sm:text-xl font-bold text-stone-900">
            Catalog Products Coming Soon
          </h3>
          <p className="text-sm text-stone-600 max-w-lg mx-auto mt-2.5 mb-6 leading-relaxed">
            Admin-uploaded doormats with live pricing, available size variations, color options, and direct WhatsApp inquiry functionality will appear here once added from the Admin Panel.
          </p>
          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hello SADIK HANDLOOM! I am waiting for your doormat catalog to be updated. Please share photos and prices of available stock on WhatsApp.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition duration-200 shadow"
          >
            <MessageCircle className="w-5 h-5" /> Ask for Updates on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}