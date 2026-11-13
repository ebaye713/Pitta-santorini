import {useMemo, useState} from 'react';
import {
  Check,
  ClipboardList,
  ExternalLink,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from 'lucide-react';
import {AnimatePresence, motion, useReducedMotion} from 'motion/react';
import {
  MENU_CATEGORIES,
  MENU_ITEMS,
  RESTAURANT_INFO,
  type MenuCategoryId,
  type MenuItem,
} from '../data/restaurantData';
import {MotionSection} from './MotionSection';

export function MenuSection() {
  const shouldReduceMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] =
    useState<MenuCategoryId>('featured');
  const [vegetarianOnly, setVegetarianOnly] = useState(false);
  const [collectionBag, setCollectionBag] = useState<Record<string, number>>(
    {}
  );
  const [copiedSummary, setCopiedSummary] = useState(false);

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory =
        activeCategory === 'all'
          ? true
          : activeCategory === 'featured'
            ? Boolean(item.featured)
            : item.category === activeCategory;
      const matchesDietary =
        !vegetarianOnly ||
        item.dietary === 'Vegetarian' ||
        item.dietary === 'Vegan';
      return matchesCategory && matchesDietary;
    });
  }, [activeCategory, vegetarianOnly]);

  const groupedCategories = useMemo(() => {
    if (activeCategory === 'featured') {
      const featuredCategory = MENU_CATEGORIES.find((c) => c.id === 'featured')!;
      return filteredItems.length > 0
        ? [{category: featuredCategory, items: filteredItems}]
        : [];
    }

    const categoriesToShow =
      activeCategory === 'all'
        ? MENU_CATEGORIES.filter((c) => c.id !== 'all' && c.id !== 'featured')
        : MENU_CATEGORIES.filter((c) => c.id === activeCategory);

    return categoriesToShow
      .map((cat) => ({
        category: cat,
        items: filteredItems.filter((item) => item.category === cat.id),
      }))
      .filter((group) => group.items.length > 0);
  }, [activeCategory, filteredItems]);

  const bagEntries = useMemo(() => {
    return Object.entries(collectionBag)
      .filter(([, qty]) => qty > 0)
      .map(([id, qty]) => {
        const item = MENU_ITEMS.find((m) => m.id === id);
        return item ? {item, qty} : null;
      })
      .filter((entry): entry is {item: MenuItem; qty: number} => entry !== null);
  }, [collectionBag]);

  const bagTotalCount = useMemo(
    () => bagEntries.reduce((sum, entry) => sum + entry.qty, 0),
    [bagEntries]
  );

  const bagTotalPrice = useMemo(
    () =>
      bagEntries.reduce((sum, entry) => sum + entry.item.price * entry.qty, 0),
    [bagEntries]
  );

  const updateItemQty = (id: string, delta: number) => {
    setCollectionBag((prev) => {
      const nextQty = Math.max(0, (prev[id] ?? 0) + delta);
      if (nextQty === 0) {
        const next = {...prev};
        delete next[id];
        return next;
      }
      return {...prev, [id]: nextQty};
    });
  };

  const handleCopyCollectionList = async () => {
    if (bagEntries.length === 0) return;
    const lines = bagEntries.map(
      ({item, qty}) =>
        `${qty}x ${item.name} — £${(item.price * qty).toFixed(2)}`
    );
    lines.push(`Estimated Shop Collection Total: £${bagTotalPrice.toFixed(2)}`);
    lines.push(`Collect from: ${RESTAURANT_INFO.fullAddress}`);
    try {
      await navigator.clipboard.writeText(lines.join('\n'));
      setCopiedSummary(true);
      window.setTimeout(() => setCopiedSummary(false), 2500);
    } catch {
      setCopiedSummary(false);
    }
  };

  return (
    <MotionSection
      id="menu"
      className="py-16 sm:py-22 border-b border-slate-200/70"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200">
          <div>
            <p className="text-sm font-semibold text-[#0f4c81] mb-2">
              Shop Collection Menu · 72 Longbridge Road
            </p>
            <h2
              className="font-display font-semibold tracking-tight text-[#081c38] text-balance"
              style={{fontSize: 'clamp(1.75rem, 3vw, 2.5rem)'}}
            >
              Curated takeaway menu, priced for shop collection.
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl">
              Explore our Barking favourites below or switch tabs to browse
              specific wraps, portion boxes, sides, and Greek coffees.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setVegetarianOnly((prev) => !prev)}
              aria-pressed={vegetarianOnly}
              className={`min-h-[44px] px-4 py-2 text-sm font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f4c81] ${
                vegetarianOnly
                  ? 'bg-[#0f4c81] text-white border-[#0f4c81]'
                  : 'bg-white/90 text-slate-700 border-slate-300 hover:border-[#0f4c81]'
              }`}
            >
              {vegetarianOnly ? 'Showing Vegetarian / Vegan' : 'Vegetarian Options'}
            </button>

            <a
              href={RESTAURANT_INFO.deliverooUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 text-sm font-semibold text-[#0f4c81] bg-white/90 border border-[#0f4c81]/30 hover:border-[#0f4c81] rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f4c81]"
            >
              <span>Live Deliveroo Menu</span>
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Interactive category filter bar */}
        <div
          role="tablist"
          aria-label="Menu categories"
          className="mt-6 flex items-center gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {MENU_CATEGORIES.map((category) => {
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(category.id)}
                className={`min-h-[44px] px-4 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f4c81] ${
                  isActive
                    ? 'bg-[#081c38] text-white shadow-sm'
                    : 'bg-white/85 text-slate-700 border border-slate-200 hover:border-[#0f4c81] hover:text-[#0f4c81]'
                }`}
              >
                {category.label}
              </button>
            );
          })}
        </div>

        {/* Main layout: Curated menu items + optional Collection Estimator */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div
            className={
              bagTotalCount > 0 ? 'lg:col-span-8 space-y-10' : 'lg:col-span-12 space-y-10'
            }
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeCategory}-${vegetarianOnly ? 'veg' : 'all'}`}
                initial={shouldReduceMotion ? false : {opacity: 0, y: 8}}
                animate={{opacity: 1, y: 0}}
                exit={shouldReduceMotion ? {opacity: 0} : {opacity: 0, y: -6}}
                transition={{duration: 0.25, ease: [0.16, 1, 0.3, 1]}}
                className="space-y-10"
              >
                {groupedCategories.length === 0 ? (
                  <div className="bg-white/85 backdrop-blur-sm rounded-xl border border-slate-200 p-8 text-center">
                    <p className="text-base font-medium text-slate-800">
                      No menu items match the selected filter in this category.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveCategory('featured');
                        setVegetarianOnly(false);
                      }}
                      className="mt-4 min-h-[44px] px-5 py-2 text-sm font-semibold text-white bg-[#0f4c81] hover:bg-[#0b2d5b] rounded-lg transition-colors"
                    >
                      Reset Menu Filters
                    </button>
                  </div>
                ) : (
                  groupedCategories.map(({category, items}) => (
                    <div
                      key={category.id}
                      className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/90 p-5 sm:p-7"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pb-3 border-b-2 border-[#0f4c81]">
                        <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#081c38]">
                          {category.label}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-500">
                          {category.subtitle}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 divide-y divide-slate-200 md:divide-y-0">
                        {items.map((item) => {
                          const qty = collectionBag[item.id] ?? 0;
                          return (
                            <article
                              key={item.id}
                              className="py-4 sm:py-5 md:border-b md:border-slate-200/80 flex items-start justify-between gap-4"
                            >
                              <div className="min-w-0 flex-1">
                                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                                  <h4 className="text-base font-semibold text-[#081c38]">
                                    {item.name}
                                  </h4>
                                  {item.dietary && (
                                    <span className="text-xs font-medium text-[#0f4c81]">
                                      · {item.dietary}
                                    </span>
                                  )}
                                  {item.featured && activeCategory !== 'featured' && (
                                    <span className="text-xs font-medium text-slate-500">
                                      · House Favourite
                                    </span>
                                  )}
                                </div>
                                <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">
                                  {item.description}
                                </p>
                              </div>

                              <div className="flex flex-col items-end gap-2 shrink-0">
                                <span className="text-base font-semibold text-[#081c38] tabular-nums">
                                  £{item.price.toFixed(2)}
                                </span>

                                {qty === 0 ? (
                                  <button
                                    type="button"
                                    onClick={() => updateItemQty(item.id, 1)}
                                    aria-label={`Add ${item.name} to collection list`}
                                    className="inline-flex items-center gap-1 min-h-[36px] px-3 py-1 text-xs font-semibold text-[#0f4c81] bg-white border border-slate-300 hover:border-[#0f4c81] hover:bg-[#f2f7fc] rounded-md transition-colors whitespace-nowrap"
                                  >
                                    <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                                    <span>Add</span>
                                  </button>
                                ) : (
                                  <div className="inline-flex items-center rounded-md border border-[#0f4c81] bg-white overflow-hidden">
                                    <button
                                      type="button"
                                      onClick={() => updateItemQty(item.id, -1)}
                                      aria-label={`Remove one ${item.name}`}
                                      className="w-8 h-8 flex items-center justify-center text-[#0f4c81] hover:bg-[#f2f7fc] transition-colors"
                                    >
                                      <Minus className="w-3.5 h-3.5" aria-hidden="true" />
                                    </button>
                                    <span className="px-2 text-xs font-semibold text-[#081c38] tabular-nums">
                                      {qty}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => updateItemQty(item.id, 1)}
                                      aria-label={`Add one more ${item.name}`}
                                      className="w-8 h-8 flex items-center justify-center text-[#0f4c81] hover:bg-[#f2f7fc] transition-colors"
                                    >
                                      <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                                    </button>
                                  </div>
                                )}
                              </div>
                            </article>
                          );
                        })}
                      </div>

                      {activeCategory === 'featured' && (
                        <div className="pt-5 mt-2 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-3">
                          <p className="text-xs sm:text-sm text-slate-500">
                            Showing 6 signature picks from our {MENU_ITEMS.length}-item Barking shop menu.
                          </p>
                          <button
                            type="button"
                            onClick={() => setActiveCategory('all')}
                            className="min-h-[40px] px-4 py-2 text-xs sm:text-sm font-semibold text-[#0f4c81] bg-[#f2f7fc] hover:bg-[#e3eef9] rounded-lg transition-colors"
                          >
                            View All {MENU_ITEMS.length} Menu Items
                          </button>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Collection List Summary Panel (shown when items are added) */}
          {bagTotalCount > 0 && (
            <aside
              aria-label="Shop collection estimator"
              className="lg:col-span-4 bg-white/95 backdrop-blur-sm rounded-2xl border border-slate-200 p-5 sm:p-6 lg:sticky lg:top-24 shadow-sm"
            >
              <div className="flex items-center justify-between gap-2 pb-4 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <ShoppingBag
                    className="w-5 h-5 text-[#0f4c81]"
                    aria-hidden="true"
                  />
                  <h3 className="font-display text-lg font-semibold text-[#081c38]">
                    Your Collection List
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setCollectionBag({})}
                  aria-label="Clear collection list"
                  className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-red-700 py-1 px-2 rounded"
                >
                  <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Clear</span>
                </button>
              </div>

              <ul className="divide-y divide-slate-100 my-3 max-h-72 overflow-y-auto">
                {bagEntries.map(({item, qty}) => (
                  <li
                    key={item.id}
                    className="py-3 flex items-center justify-between gap-3 text-sm"
                  >
                    <div className="min-w-0">
                      <p className="font-medium text-[#081c38] truncate">
                        {qty}× {item.name}
                      </p>
                      <p className="text-xs text-slate-500 tabular-nums">
                        £{item.price.toFixed(2)} each
                      </p>
                    </div>
                    <span className="font-semibold text-[#081c38] tabular-nums shrink-0">
                      £{(item.price * qty).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="pt-4 border-t border-slate-200 flex items-baseline justify-between">
                <span className="text-sm font-medium text-slate-600">
                  Estimated Collection Total
                </span>
                <span className="font-display text-xl font-semibold text-[#081c38] tabular-nums">
                  £{bagTotalPrice.toFixed(2)}
                </span>
              </div>

              <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                Prepared fresh for collection at 72 Longbridge Road, Barking IG11
                8SF. Prices shown are guide shop collection rates.
              </p>

              <div className="mt-5 space-y-2.5">
                <button
                  type="button"
                  onClick={handleCopyCollectionList}
                  className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-[#0f4c81] bg-[#f2f7fc] hover:bg-[#e4effa] border border-[#0f4c81]/20 rounded-lg transition-colors"
                >
                  {copiedSummary ? (
                    <>
                      <Check className="w-4 h-4" aria-hidden="true" />
                      <span>Collection List Copied</span>
                    </>
                  ) : (
                    <>
                      <ClipboardList className="w-4 h-4" aria-hidden="true" />
                      <span>Copy List for Shop Counter</span>
                    </>
                  )}
                </button>

                <a
                  href={RESTAURANT_INFO.deliverooUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-[#0f4c81] hover:bg-[#0b2d5b] rounded-lg transition-colors"
                >
                  <span>Or Order Delivery on Deliveroo</span>
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            </aside>
          )}
        </div>
      </div>
    </MotionSection>
  );
}
