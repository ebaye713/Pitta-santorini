import {useEffect, useState} from 'react';
import {ChevronLeft, ChevronRight, Expand, X} from 'lucide-react';
import {AnimatePresence, motion, useReducedMotion} from 'motion/react';
import {GALLERY_ITEMS} from '../data/restaurantData';
import {MotionSection} from './MotionSection';
import {ResilientImage} from './ResilientImage';

export function GallerySection() {
  const shouldReduceMotion = useReducedMotion();
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (shouldReduceMotion || !isAutoPlaying || lightboxIndex !== null) return;
    const interval = window.setInterval(() => {
      setFeaturedIndex((prev) => (prev + 1) % GALLERY_ITEMS.length);
    }, 4800);
    return () => window.clearInterval(interval);
  }, [shouldReduceMotion, isAutoPlaying, lightboxIndex]);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLightboxIndex(null);
      } else if (event.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev + 1) % GALLERY_ITEMS.length
        );
      } else if (event.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  const featuredItem = GALLERY_ITEMS[featuredIndex];
  const activeLightboxItem =
    lightboxIndex !== null ? GALLERY_ITEMS[lightboxIndex] : null;

  return (
    <MotionSection
      id="gallery"
      className="py-16 sm:py-22 border-b border-slate-200/70"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-[#0f4c81] mb-2">
              Visual Showcase
            </p>
            <h2
              className="font-display font-semibold tracking-tight text-[#081c38] text-balance"
              style={{fontSize: 'clamp(1.75rem, 3vw, 2.5rem)'}}
            >
              From the Barking grill — plated fresh, wrapped warm.
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              Explore our signature Greek dishes in motion, or tap any photo to
              inspect closer details.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => {
                setIsAutoPlaying(false);
                setFeaturedIndex(
                  (prev) =>
                    (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length
                );
              }}
              aria-label="Previous featured dish"
              className="w-11 h-11 rounded-lg bg-white/90 border border-slate-200 hover:border-[#0f4c81] text-[#081c38] flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => {
                setIsAutoPlaying(false);
                setFeaturedIndex((prev) => (prev + 1) % GALLERY_ITEMS.length);
              }}
              aria-label="Next featured dish"
              className="w-11 h-11 rounded-lg bg-white/90 border border-slate-200 hover:border-[#0f4c81] text-[#081c38] flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Interactive Animated Spotlight Stage */}
        <div
          className="mt-8 bg-white/85 backdrop-blur-sm rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            <div className="lg:col-span-8 relative aspect-[16/10] lg:min-h-[420px] overflow-hidden bg-[#081c38]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={featuredItem.id}
                  initial={
                    shouldReduceMotion ? {opacity: 0} : {opacity: 0, scale: 1.04}
                  }
                  animate={
                    shouldReduceMotion ? {opacity: 1} : {opacity: 1, scale: 1}
                  }
                  exit={shouldReduceMotion ? {opacity: 0} : {opacity: 0}}
                  transition={{duration: 0.5, ease: [0.16, 1, 0.3, 1]}}
                  className="absolute inset-0"
                >
                  <ResilientImage
                    src={featuredItem.src}
                    alt={featuredItem.alt}
                    fallbackTitle={featuredItem.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </AnimatePresence>

              <button
                type="button"
                onClick={() => setLightboxIndex(featuredIndex)}
                aria-label={`Open full view of ${featuredItem.title}`}
                className="absolute top-4 right-4 min-h-[44px] px-3.5 py-2 rounded-lg bg-[#081c38]/75 hover:bg-[#081c38] text-white text-xs font-semibold backdrop-blur-sm border border-white/20 inline-flex items-center gap-1.5 transition-colors"
              >
                <Expand className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Full View</span>
              </button>
            </div>

            <div className="lg:col-span-4 p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-b from-white to-[#f5f9fe]">
              <div>
                <p className="text-xs font-semibold text-[#0f4c81] tabular-nums">
                  Dish {String(featuredIndex + 1).padStart(2, '0')} /{' '}
                  {String(GALLERY_ITEMS.length).padStart(2, '0')}
                </p>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={featuredItem.id}
                    initial={shouldReduceMotion ? {opacity: 0} : {opacity: 0, y: 8}}
                    animate={{opacity: 1, y: 0}}
                    exit={shouldReduceMotion ? {opacity: 0} : {opacity: 0, y: -8}}
                    transition={{duration: 0.3, ease: [0.16, 1, 0.3, 1]}}
                  >
                    <h3 className="mt-2 font-display text-2xl font-semibold text-[#081c38]">
                      {featuredItem.title}
                    </h3>
                    <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                      {featuredItem.caption}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Interactive animated thumbnail selector */}
              <div className="mt-8 pt-5 border-t border-slate-200">
                <p className="text-xs font-medium text-slate-500 mb-3">
                  Select a dish to preview
                </p>
                <div className="grid grid-cols-5 gap-2">
                  {GALLERY_ITEMS.map((item, idx) => {
                    const isSelected = idx === featuredIndex;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setIsAutoPlaying(false);
                          setFeaturedIndex(idx);
                        }}
                        aria-label={`Select ${item.title}`}
                        className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f4c81] ${
                          isSelected
                            ? 'border-[#0f4c81] scale-105 shadow-sm'
                            : 'border-transparent opacity-70 hover:opacity-100'
                        }`}
                      >
                        <ResilientImage
                          src={item.src}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Staggered Interactive Photo Grid */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {GALLERY_ITEMS.slice(1).map((item, idx) => {
            const actualIndex = idx + 1;
            return (
              <motion.button
                key={item.id}
                type="button"
                onClick={() => setLightboxIndex(actualIndex)}
                whileHover={shouldReduceMotion ? undefined : {y: -4}}
                transition={{duration: 0.2, ease: [0.16, 1, 0.3, 1]}}
                className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white aspect-[4/3] text-left shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f4c81]"
              >
                <ResilientImage
                  src={item.src}
                  alt={item.alt}
                  fallbackTitle={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#081c38]/90 via-[#081c38]/45 to-transparent p-4">
                  <p className="font-display text-base font-semibold text-white">
                    {item.title}
                  </p>
                  <p className="mt-0.5 text-xs text-sky-100/90 line-clamp-1">
                    Tap to enlarge
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Animated Accessible Lightbox Modal */}
      <AnimatePresence>
        {activeLightboxItem && lightboxIndex !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={activeLightboxItem.title}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.2}}
            className="fixed inset-0 z-50 bg-[#081c38]/85 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setLightboxIndex(null)}
          >
            <motion.div
              initial={
                shouldReduceMotion ? {opacity: 0} : {opacity: 0, scale: 0.96, y: 10}
              }
              animate={{opacity: 1, scale: 1, y: 0}}
              exit={
                shouldReduceMotion ? {opacity: 0} : {opacity: 0, scale: 0.96, y: 10}
              }
              transition={{duration: 0.25, ease: [0.16, 1, 0.3, 1]}}
              className="relative max-w-3xl w-full bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative bg-slate-100 aspect-[4/3] sm:aspect-[16/10]">
                <ResilientImage
                  src={activeLightboxItem.src}
                  alt={activeLightboxItem.alt}
                  fallbackTitle={activeLightboxItem.title}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setLightboxIndex(null)}
                  aria-label="Close gallery preview"
                  className="absolute top-3 right-3 w-11 h-11 rounded-full bg-white/95 text-[#081c38] hover:bg-white flex items-center justify-center shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f4c81]"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>

              <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-display text-lg sm:text-xl font-semibold text-[#081c38]">
                    {activeLightboxItem.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">
                    {activeLightboxItem.caption}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() =>
                      setLightboxIndex(
                        (lightboxIndex - 1 + GALLERY_ITEMS.length) %
                          GALLERY_ITEMS.length
                      )
                    }
                    aria-label="Previous dish photo"
                    className="w-11 h-11 rounded-lg border border-slate-200 hover:border-[#0f4c81] text-[#081c38] flex items-center justify-center transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setLightboxIndex((lightboxIndex + 1) % GALLERY_ITEMS.length)
                    }
                    aria-label="Next dish photo"
                    className="w-11 h-11 rounded-lg border border-slate-200 hover:border-[#0f4c81] text-[#081c38] flex items-center justify-center transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </MotionSection>
  );
}
