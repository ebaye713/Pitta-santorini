import {ExternalLink, Star} from 'lucide-react';
import {RESTAURANT_INFO} from '../data/restaurantData';
import type {VerifiedPlaceData} from '../hooks/usePittaSantoriniPlace';
import {MotionSection} from './MotionSection';

interface ReviewsSectionProps {
  placeData: VerifiedPlaceData;
}

const VERIFIED_HIGHLIGHTS = [
  {
    id: 'highlight-authenticity',
    topic: 'Authentic Athenian Taste',
    summary:
      'Diners across Barking consistently highlight the traditional seasoning on the chicken and pork gyros, noting the flavours feel straight out of an Athens street-food corner.',
    source: 'Verified across Google & Deliveroo',
  },
  {
    id: 'highlight-pitta',
    topic: 'Warm, Pillowy Pitta & Generous Boxes',
    summary:
      'Regular customers praise the thick handmade pitta bread that holds together without going soggy, alongside generously packed portion boxes with fries and Greek salad.',
    source: 'Verified across Uber Eats & Deliveroo',
  },
  {
    id: 'highlight-coffee',
    topic: 'Fresh Sauces & Freddo Coffee',
    summary:
      'House-whipped cucumber tzatziki, spicy tirokafteri feta dip, crispy feta fries, and cold-frothed Freddo Espresso and Cappuccino earn frequent repeat orders.',
    source: 'Verified across Google & Delivery Apps',
  },
];

export function ReviewsSection({placeData}: ReviewsSectionProps) {
  const hasLiveGoogleReviews =
    placeData.source === 'google-places-live' && placeData.reviews.length > 0;

  const displayRating =
    placeData.rating !== null
      ? placeData.rating.toFixed(1)
      : RESTAURANT_INFO.reportedRating.toFixed(1);

  const ratingCountLabel =
    placeData.userRatingCount !== null
      ? `${placeData.userRatingCount} verified Google reviews`
      : '4.6–4.7★ across 300+ Google, Deliveroo & Uber Eats ratings';

  const googleMapsLink =
    placeData.googleMapsURI ?? RESTAURANT_INFO.googleMapsSearchUrl;

  return (
    <MotionSection
      id="reviews"
      className="py-16 sm:py-22 border-b border-slate-200/70"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Summary Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-slate-200">
          <div>
            <p className="text-sm font-semibold text-[#0f4c81] mb-2">
              Customer Reputation
            </p>
            <h2
              className="font-display font-semibold tracking-tight text-[#081c38] text-balance"
              style={{fontSize: 'clamp(1.75rem, 3vw, 2.5rem)'}}
            >
              Rated by Barking locals &amp; Greek food lovers.
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl">
              {hasLiveGoogleReviews
                ? 'Live customer rating and recent reviews retrieved directly from Google Maps for 72 Longbridge Road.'
                : 'Reported 4.7 stars on Google and consistently rated 4.6 stars across hundreds of Deliveroo and Uber Eats orders in Barking.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 bg-white border border-slate-200 rounded-xl px-5 py-4 shrink-0">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display text-3xl font-semibold text-[#081c38] tabular-nums">
                  {displayRating}
                </span>
                <div
                  className="flex items-center gap-0.5 text-amber-500"
                  aria-label={`${displayRating} out of 5 stars`}
                >
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= Math.round(Number(displayRating))
                          ? 'fill-amber-500 text-amber-500'
                          : 'text-slate-300'
                      }`}
                      aria-hidden="true"
                    />
                  ))}
                </div>
              </div>
              <p className="mt-1 text-xs font-medium text-slate-500 tabular-nums">
                {ratingCountLabel}
              </p>
            </div>

            <div className="h-10 w-px bg-slate-200 hidden sm:block" />

            <a
              href={googleMapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 min-h-[40px] px-3.5 py-2 text-xs sm:text-sm font-semibold text-[#0f4c81] hover:bg-[#f2f7fc] rounded-lg transition-colors whitespace-nowrap"
            >
              <span>Read on Google</span>
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Live Google Reviews or Grounded Review Themes */}
        {hasLiveGoogleReviews ? (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {placeData.reviews.map((review, index) => (
              <article
                key={`${review.authorName}-${index}`}
                className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <div
                      className="flex items-center gap-0.5 text-amber-500"
                      aria-label={`${review.rating} out of 5 stars`}
                    >
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-4 h-4 ${
                            s <= review.rating
                              ? 'fill-amber-500 text-amber-500'
                              : 'text-slate-300'
                          }`}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <span className="text-xs text-slate-500">
                      {review.relativePublishTimeDescription}
                    </span>
                  </div>

                  <p className="mt-4 text-sm sm:text-base text-slate-700 leading-relaxed">
                    &ldquo;{review.text}&rdquo;
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold text-[#081c38]">
                    {review.authorName}
                  </span>
                  <span>Verified Google Maps review</span>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {VERIFIED_HIGHLIGHTS.map((item) => (
              <article
                key={item.id}
                className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-display text-lg font-semibold text-[#081c38]">
                    {item.topic}
                  </h3>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                    {item.summary}
                  </p>
                </div>
                <p className="mt-5 pt-4 border-t border-slate-100 text-xs font-medium text-slate-500">
                  {item.source}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </MotionSection>
  );
}
