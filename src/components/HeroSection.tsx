import {useEffect, useState} from 'react';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Clock,
  ExternalLink,
  MapPin,
  Star,
} from 'lucide-react';
import {AnimatePresence, motion, useReducedMotion} from 'motion/react';
import {
  GALLERY_ITEMS,
  getLondonOpenStatus,
  RESTAURANT_INFO,
} from '../data/restaurantData';
import type {VerifiedPlaceData} from '../hooks/usePittaSantoriniPlace';
import {ResilientImage} from './ResilientImage';

interface HeroSectionProps {
  placeData: VerifiedPlaceData;
}

export function HeroSection({placeData}: HeroSectionProps) {
  const shouldReduceMotion = useReducedMotion();
  const [slideIndex, setSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const {isOpenNow, statusText} = getLondonOpenStatus();

  useEffect(() => {
    if (shouldReduceMotion || isPaused) return;
    const timer = window.setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % GALLERY_ITEMS.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [shouldReduceMotion, isPaused]);

  const currentSlide = GALLERY_ITEMS[slideIndex];

  const ratingValue =
    placeData.rating !== null
      ? placeData.rating.toFixed(1)
      : RESTAURANT_INFO.reportedRating.toFixed(1);

  const ratingSubtitle =
    placeData.userRatingCount !== null
      ? `Verified on Google (${placeData.userRatingCount} reviews)`
      : 'Reported across Google & delivery platforms';

  const handlePrev = () => {
    setSlideIndex(
      (prev) => (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length
    );
  };

  const handleNext = () => {
    setSlideIndex((prev) => (prev + 1) % GALLERY_ITEMS.length);
  };

  return (
    <section id="top" className="relative">
      {/* Full-bleed background slideshow with overlaid text & vanish scrim */}
      <div
        className="relative overflow-hidden bg-[#071830] min-h-[540px] sm:min-h-[600px] lg:min-h-[660px] flex items-center"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Crossfading background photography */}
        <AnimatePresence mode="sync" initial={false}>
          <motion.div
            key={currentSlide.id}
            initial={
              shouldReduceMotion ? {opacity: 0} : {opacity: 0, scale: 1.05}
            }
            animate={
              shouldReduceMotion ? {opacity: 1} : {opacity: 1, scale: 1}
            }
            exit={{opacity: 0}}
            transition={{duration: 1.05, ease: [0.16, 1, 0.3, 1]}}
            className="absolute inset-0"
          >
            <ResilientImage
              src={currentSlide.src}
              alt={currentSlide.alt}
              fallbackTitle={currentSlide.title}
              loading="eager"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Measured vanish scrim: fades smoothly across the photo so complete text remains crisp */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#061529]/90 via-[#081c38]/72 to-[#081c38]/30"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#061529]/85 via-transparent to-[#061529]/35"
        />

        {/* Hero foreground content */}
        <div className="relative z-10 max-w-6xl w-full mx-auto px-4 sm:px-6 py-16 sm:py-20 lg:py-24">
          <div className="max-w-2xl">
            <motion.p
              initial={
                shouldReduceMotion
                  ? false
                  : {opacity: 0, y: 10, filter: 'blur(4px)'}
              }
              animate={{opacity: 1, y: 0, filter: 'blur(0px)'}}
              transition={{duration: 0.55, ease: [0.16, 1, 0.3, 1]}}
              className="text-xs sm:text-sm font-medium text-sky-200 tracking-wide mb-3"
            >
              72 Longbridge Road, Barking IG11 8SF
              <span aria-hidden="true" className="mx-2 text-sky-300/60">
                ·
              </span>
              Shop Collection &amp; Deliveroo
            </motion.p>

            <motion.h1
              initial={
                shouldReduceMotion
                  ? false
                  : {opacity: 0, y: 16, filter: 'blur(6px)'}
              }
              animate={{opacity: 1, y: 0, filter: 'blur(0px)'}}
              transition={{duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1]}}
              className="font-display font-semibold tracking-tight text-white leading-[1.08] text-balance drop-shadow-sm"
              style={{fontSize: 'clamp(2.25rem, 4.4vw, 3.85rem)'}}
            >
              Authentic Greek Food in the Heart of Barking.
            </motion.h1>

            <motion.p
              initial={
                shouldReduceMotion
                  ? false
                  : {opacity: 0, y: 14, filter: 'blur(4px)'}
              }
              animate={{opacity: 1, y: 0, filter: 'blur(0px)'}}
              transition={{duration: 0.65, delay: 0.16, ease: [0.16, 1, 0.3, 1]}}
              className="mt-5 text-base sm:text-lg text-slate-100/95 leading-relaxed max-w-xl"
            >
              Flame-grilled chicken and pork gyros, hand-skewered souvlaki,
              golden Cypriot halloumi, and cold-whipped Greek Freddo coffee
              wrapped in warm handmade pitta every day.
            </motion.p>

            <motion.div
              initial={shouldReduceMotion ? false : {opacity: 0, y: 12}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.55, delay: 0.24, ease: [0.16, 1, 0.3, 1]}}
              className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4"
            >
              <a
                href={RESTAURANT_INFO.deliverooUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 min-h-[44px] px-6 py-3 text-sm sm:text-base font-semibold text-[#081c38] bg-white hover:bg-sky-50 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white"
              >
                <span>Order on Deliveroo</span>
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </a>

              <a
                href="#menu"
                className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-3 text-sm sm:text-base font-semibold text-white bg-white/12 hover:bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <span>Explore Shop Menu</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </motion.div>

            {/* Active dish vanish caption + manual slide controls */}
            <div className="mt-10 pt-5 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="min-h-[24px] flex items-center">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentSlide.id}
                    initial={
                      shouldReduceMotion ? {opacity: 0} : {opacity: 0, y: 6}
                    }
                    animate={{opacity: 1, y: 0}}
                    exit={
                      shouldReduceMotion ? {opacity: 0} : {opacity: 0, y: -6}
                    }
                    transition={{duration: 0.35, ease: [0.16, 1, 0.3, 1]}}
                    className="text-xs sm:text-sm text-sky-100/90 font-medium"
                  >
                    Now showing: <strong className="text-white">{currentSlide.title}</strong>
                  </motion.p>
                </AnimatePresence>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous hero dish photo"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                </button>
                <div className="flex items-center gap-1.5 px-1" role="tablist" aria-label="Hero photo slides">
                  {GALLERY_ITEMS.map((item, idx) => (
                    <button
                      key={item.id}
                      type="button"
                      role="tab"
                      aria-selected={idx === slideIndex}
                      aria-label={`Show ${item.title}`}
                      onClick={() => setSlideIndex(idx)}
                      className={`h-1.5 rounded-full transition-all ${
                        idx === slideIndex
                          ? 'w-6 bg-white'
                          : 'w-2 bg-white/40 hover:bg-white/70'
                      }`}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next hero dish photo"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-colors"
                >
                  <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4-column summary strip directly below hero */}
      <div className="bg-white/80 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-3">
            <Clock
              className="w-5 h-5 text-[#0f4c81] mt-0.5 shrink-0"
              aria-hidden="true"
            />
            <div>
              <p className="text-xs font-semibold text-slate-500">
                Today&apos;s Hours
              </p>
              <p className="text-sm font-semibold text-[#081c38] mt-0.5 tabular-nums">
                {statusText}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                Status:{' '}
                {isOpenNow ? 'Open for collection & delivery' : 'Currently closed'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin
              className="w-5 h-5 text-[#0f4c81] mt-0.5 shrink-0"
              aria-hidden="true"
            />
            <div>
              <p className="text-xs font-semibold text-slate-500">
                Collect From Shop
              </p>
              <p className="text-sm font-semibold text-[#081c38] mt-0.5">
                72 Longbridge Road
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                Barking, IG11 8SF · Walk-in takeaway
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Star
              className="w-5 h-5 text-amber-600 fill-amber-500 mt-0.5 shrink-0"
              aria-hidden="true"
            />
            <div>
              <p className="text-xs font-semibold text-slate-500">
                Customer Rating
              </p>
              <p className="text-sm font-semibold text-[#081c38] mt-0.5 tabular-nums">
                {ratingValue} / 5.0 Stars
              </p>
              <p className="text-xs text-slate-500 mt-0.5">{ratingSubtitle}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <ExternalLink
              className="w-5 h-5 text-[#0f4c81] mt-0.5 shrink-0"
              aria-hidden="true"
            />
            <div>
              <p className="text-xs font-semibold text-slate-500">
                Home Delivery
              </p>
              <a
                href={RESTAURANT_INFO.deliverooUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-sm font-semibold text-[#0f4c81] hover:underline mt-0.5"
              >
                Order on Deliveroo
              </a>
              <p className="text-xs text-slate-500 mt-0.5">
                Barking &amp; Mayesbrook delivery
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
