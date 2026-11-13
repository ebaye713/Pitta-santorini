import {useEffect, useState} from 'react';
import {AnimatePresence, motion, useReducedMotion} from 'motion/react';
import {ArrowUp} from 'lucide-react';

export function BackToTopButton() {
  const [visible, setVisible] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 360);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: shouldReduceMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          initial={shouldReduceMotion ? {opacity: 1} : {opacity: 0, y: 14, scale: 0.94}}
          animate={{opacity: 1, y: 0, scale: 1}}
          exit={shouldReduceMotion ? {opacity: 0} : {opacity: 0, y: 14, scale: 0.94}}
          transition={{duration: 0.22, ease: [0.16, 1, 0.3, 1]}}
          className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-1.5 min-h-[44px] px-4 py-2.5 rounded-full bg-[#081c38] hover:bg-[#0f4c81] text-white text-xs sm:text-sm font-semibold shadow-lg border border-white/15 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0f4c81]"
        >
          <ArrowUp className="w-4 h-4" aria-hidden="true" />
          <span>Top</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
