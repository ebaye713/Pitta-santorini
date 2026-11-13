import {useState} from 'react';
import {ExternalLink, Menu, X} from 'lucide-react';
import {RESTAURANT_INFO} from '../data/restaurantData';

const NAV_LINKS = [
  {href: '#menu', label: 'Menu'},
  {href: '#gallery', label: 'Gallery'},
  {href: '#hours', label: 'Hours'},
  {href: '#reviews', label: 'Reviews'},
  {href: '#location', label: 'Find Us'},
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-[#081c38] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f4c81] rounded-sm"
        >
          Pitta Santorini
        </a>

        {/* Zone 2: Concise single-line navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="py-2 whitespace-nowrap shrink-0 hover:text-[#0f4c81] transition-colors relative after:absolute after:bottom-1 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#0f4c81] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f4c81] rounded-sm"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary action + mobile toggle */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href={RESTAURANT_INFO.deliverooUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-[#0f4c81] hover:bg-[#0b2d5b] rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0f4c81]"
          >
            <span>Order on Deliveroo</span>
            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg text-[#081c38] hover:bg-[#f2f7fc] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f4c81]"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-1"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="flex items-center min-h-[44px] px-3 rounded-lg text-base font-medium text-slate-700 hover:text-[#0f4c81] hover:bg-[#f2f7fc] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2">
            <a
              href={RESTAURANT_INFO.deliverooUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 w-full min-h-[44px] px-4 py-2.5 text-sm font-semibold text-white bg-[#0f4c81] hover:bg-[#0b2d5b] rounded-lg transition-colors"
            >
              <span>Order on Deliveroo</span>
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
