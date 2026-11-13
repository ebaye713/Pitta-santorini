import {RESTAURANT_INFO} from '../data/restaurantData';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#081c38] text-slate-300 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-white/15">
          <div className="md:col-span-5">
            <a
              href="#top"
              className="font-display text-2xl font-semibold text-white tracking-tight"
            >
              Pitta Santorini
            </a>
            <p className="mt-3 text-sm text-slate-300 leading-relaxed max-w-sm">
              Authentic Greek gyros, souvlaki skewers, grilled halloumi, and
              Freddo iced coffee in the heart of Barking.
            </p>
            <p className="mt-3 text-sm text-slate-400">
              {RESTAURANT_INFO.fullAddress}
            </p>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-sm font-semibold text-white mb-3">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-white transition-colors">
                  Shop Collection Menu
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-white transition-colors">
                  Food Gallery
                </a>
              </li>
              <li>
                <a href="#hours" className="hover:text-white transition-colors">
                  Opening Hours
                </a>
              </li>
              <li>
                <a
                  href="#location"
                  className="hover:text-white transition-colors"
                >
                  Directions &amp; Map
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h3 className="text-sm font-semibold text-white mb-3">
              Hours &amp; Ordering
            </h3>
            <ul className="space-y-1.5 text-sm text-slate-300 tabular-nums">
              <li>Mon, Tue, Thu: 4:00pm – 10:00pm</li>
              <li>Wednesday: Closed</li>
              <li>Fri, Sat, Sun: 11:00am – 10:00pm</li>
            </ul>
            <div className="mt-4">
              <a
                href={RESTAURANT_INFO.deliverooUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center min-h-[40px] px-4 py-2 text-sm font-semibold text-[#081c38] bg-white hover:bg-sky-50 rounded-lg transition-colors"
              >
                Order on Deliveroo
              </a>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <p>© {year} Pitta Santorini Barking. All rights reserved.</p>
            <span aria-hidden="true" className="text-slate-600">
              ·
            </span>
            <p>
              Built and designed by{' '}
              <a
                href="https://portfolio-five-omega-27.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-white underline underline-offset-2 hover:text-sky-200 transition-colors"
              >
                Ebastech
              </a>
            </p>
          </div>
          <p>
            Location &amp; reviews powered by Google Maps Platform (subject to{' '}
            <a
              href="https://maps.google.com/help/terms_maps/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white"
            >
              Google Maps Terms
            </a>
            ).
          </p>
        </div>
      </div>
    </footer>
  );
}
