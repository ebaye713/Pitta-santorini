import {useState} from 'react';
import {Check, Clock, Copy, ExternalLink, MapPin} from 'lucide-react';
import {
  getLondonOpenStatus,
  OPENING_HOURS,
  RESTAURANT_INFO,
} from '../data/restaurantData';
import type {VerifiedPlaceData} from '../hooks/usePittaSantoriniPlace';
import {MotionSection} from './MotionSection';
import {StoreMap} from './StoreMap';

interface HoursAndLocationSectionProps {
  apiKeyPresent: boolean;
  quotaExceeded: boolean;
  placeData: VerifiedPlaceData;
}

export function HoursAndLocationSection({
  apiKeyPresent,
  quotaExceeded,
  placeData,
}: HoursAndLocationSectionProps) {
  const {isOpenNow, todayEntry, statusText} = getLondonOpenStatus();
  const [copiedAddress, setCopiedAddress] = useState(false);

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(RESTAURANT_INFO.fullAddress);
      setCopiedAddress(true);
      window.setTimeout(() => setCopiedAddress(false), 2500);
    } catch {
      setCopiedAddress(false);
    }
  };

  const directionsHref =
    placeData.googleMapsURI ?? RESTAURANT_INFO.googleMapsDirectionsUrl;

  return (
    <MotionSection
      id="hours"
      className="py-16 sm:py-22 border-b border-slate-200/70"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Opening Hours Column */}
          <div className="lg:col-span-5">
            <p className="text-sm font-semibold text-[#0f4c81] mb-2">
              Opening Hours
            </p>
            <h2
              className="font-display font-semibold tracking-tight text-[#081c38] text-balance"
              style={{fontSize: 'clamp(1.75rem, 3vw, 2.35rem)'}}
            >
              When the grill is hot in Barking.
            </h2>

            <div className="mt-4 flex items-center gap-2 text-sm font-medium text-slate-700">
              <Clock
                className="w-4 h-4 text-[#0f4c81] shrink-0"
                aria-hidden="true"
              />
              <span>
                {isOpenNow ? 'Open right now:' : 'Current status:'}{' '}
                <strong className="text-[#081c38]">{statusText}</strong>
              </span>
            </div>

            <div className="mt-6 rounded-xl border border-slate-200 overflow-hidden bg-white">
              <dl className="divide-y divide-slate-200">
                {OPENING_HOURS.map((entry) => {
                  const isToday = entry.day === todayEntry.day;
                  return (
                    <div
                      key={entry.day}
                      className={`px-4 sm:px-5 py-3.5 flex items-center justify-between gap-4 text-sm ${
                        isToday ? 'bg-[#f2f7fc]' : 'bg-white'
                      }`}
                    >
                      <dt className="flex items-center gap-2 font-medium text-[#081c38]">
                        <span>{entry.day}</span>
                        {isToday && (
                          <span className="text-xs font-semibold text-[#0f4c81]">
                            (Today)
                          </span>
                        )}
                      </dt>
                      <dd
                        className={`tabular-nums font-medium ${
                          entry.isClosed ? 'text-slate-500' : 'text-slate-800'
                        }`}
                      >
                        {entry.displayHours}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </div>

            <p className="mt-4 text-xs sm:text-sm text-slate-500 leading-relaxed">
              Walk-in shop collection and Deliveroo delivery operate during all
              opening hours above. Last grill orders are taken shortly before
              10:00pm.
            </p>
          </div>

          {/* Location & Interactive Map Column */}
          <div id="location" className="lg:col-span-7 scroll-mt-24">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-5">
              <div>
                <p className="text-sm font-semibold text-[#0f4c81] mb-2">
                  Find Us in Barking
                </p>
                <h2
                  className="font-display font-semibold tracking-tight text-[#081c38]"
                  style={{fontSize: 'clamp(1.75rem, 3vw, 2.35rem)'}}
                >
                  72 Longbridge Road, IG11 8SF
                </h2>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyAddress}
                  className="inline-flex items-center gap-1.5 min-h-[44px] px-4 py-2 text-sm font-medium text-[#081c38] bg-[#f2f7fc] hover:bg-[#e3eef9] border border-slate-200 rounded-lg transition-colors whitespace-nowrap"
                >
                  {copiedAddress ? (
                    <>
                      <Check className="w-4 h-4 text-[#0f4c81]" aria-hidden="true" />
                      <span>Address Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-[#0f4c81]" aria-hidden="true" />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>

                <a
                  href={directionsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 min-h-[44px] px-4 py-2 text-sm font-semibold text-white bg-[#0f4c81] hover:bg-[#0b2d5b] rounded-lg transition-colors whitespace-nowrap"
                >
                  <MapPin className="w-4 h-4" aria-hidden="true" />
                  <span>Get Directions</span>
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>

            <StoreMap
              apiKeyPresent={apiKeyPresent}
              quotaExceeded={quotaExceeded}
              placeData={placeData}
            />

            <p className="mt-3 text-xs sm:text-sm text-slate-600">
              Located on Longbridge Road, a short walk from Barking Station
              (District, Hammersmith &amp; City, Overground, and c2c lines) and
              Barking Park.
            </p>
          </div>
        </div>
      </div>
    </MotionSection>
  );
}
