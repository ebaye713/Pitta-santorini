import {useState, type FormEvent} from 'react';
import {CheckCircle2, ExternalLink, MapPin, Send, Store} from 'lucide-react';
import {RESTAURANT_INFO} from '../data/restaurantData';
import {MotionSection} from './MotionSection';

export function ContactSection() {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedName = name.trim();
    const trimmedContact = contact.trim();
    const trimmedMessage = message.trim();

    if (trimmedName.length < 2) {
      setError('Please enter your name.');
      return;
    }

    const emailOrPhoneValid =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedContact) ||
      /^[+\d\s()-]{7,}$/.test(trimmedContact);

    if (!emailOrPhoneValid) {
      setError('Please enter a valid UK phone number or email address.');
      return;
    }

    if (trimmedMessage.length < 5) {
      setError('Please share a brief note about your enquiry or group order.');
      return;
    }

    setError(null);
    setSubmitted(true);
  };

  return (
    <MotionSection
      id="contact"
      className="py-16 sm:py-22 border-b border-slate-200/70"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Contact Details */}
          <div className="lg:col-span-5">
            <p className="text-sm font-semibold text-[#0f4c81] mb-2">
              Contact &amp; Ordering
            </p>
            <h2
              className="font-display font-semibold tracking-tight text-[#081c38] text-balance"
              style={{fontSize: 'clamp(1.75rem, 3vw, 2.35rem)'}}
            >
              Visit the shop or order straight to your door.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
              Pop into our Barking takeaway for hot collection straight from the
              grill, or place an online order via Deliveroo for rapid local
              delivery.
            </p>

            <div className="mt-8 divide-y divide-slate-200 border-t border-b border-slate-200">
              <div className="py-4 flex items-start gap-3.5">
                <MapPin
                  className="w-5 h-5 text-[#0f4c81] mt-0.5 shrink-0"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="text-sm font-semibold text-[#081c38]">
                    Shop Address
                  </h3>
                  <p className="mt-0.5 text-sm text-slate-600">
                    {RESTAURANT_INFO.streetAddress}, {RESTAURANT_INFO.city},{' '}
                    {RESTAURANT_INFO.postcode}
                  </p>
                </div>
              </div>

              <div className="py-4 flex items-start gap-3.5">
                <Store
                  className="w-5 h-5 text-[#0f4c81] mt-0.5 shrink-0"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="text-sm font-semibold text-[#081c38]">
                    In-Shop Collection
                  </h3>
                  <p className="mt-0.5 text-sm text-slate-600">
                    Walk-in counter orders welcomed Monday–Tuesday &amp; Thursday
                    (4pm–10pm) and Friday–Sunday (11am–10pm). Closed Wednesdays.
                  </p>
                </div>
              </div>

              <div className="py-4 flex items-start gap-3.5">
                <ExternalLink
                  className="w-5 h-5 text-[#0f4c81] mt-0.5 shrink-0"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="text-sm font-semibold text-[#081c38]">
                    Online Delivery via Deliveroo
                  </h3>
                  <p className="mt-0.5 text-sm text-slate-600">
                    Live menu availability, delivery tracking, and contactless
                    ordering across Barking and Mayesbrook.
                  </p>
                  <a
                    href={RESTAURANT_INFO.deliverooUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2.5 inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 text-sm font-semibold text-white bg-[#0f4c81] hover:bg-[#0b2d5b] rounded-lg transition-colors"
                  >
                    <span>Order Now on Deliveroo</span>
                    <ExternalLink className="w-4 h-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Group / Catering Enquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
            <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#081c38]">
              Group Collection &amp; Catering Enquiries
            </h3>
            <p className="mt-1.5 text-sm text-slate-600">
              Planning an office lunch, family gathering, or large collection
              order in Barking? Leave your details below.
            </p>

            {submitted ? (
              <div className="mt-6 rounded-xl bg-[#f2f7fc] border border-[#0f4c81]/20 p-6">
                <div className="flex items-start gap-3">
                  <CheckCircle2
                    className="w-6 h-6 text-[#0f4c81] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <h4 className="text-base font-semibold text-[#081c38]">
                      Enquiry Prepared for {name}
                    </h4>
                    <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                      Thank you! For immediate same-day orders, please place your
                      order on Deliveroo or visit our counter at 72 Longbridge
                      Road, Barking IG11 8SF during opening hours.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setName('');
                        setContact('');
                        setMessage('');
                      }}
                      className="mt-4 min-h-[40px] px-4 py-2 text-xs font-semibold text-[#0f4c81] bg-white border border-slate-300 hover:border-[#0f4c81] rounded-lg transition-colors"
                    >
                      Send Another Note
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="enquiry-name"
                      className="block text-sm font-medium text-[#081c38] mb-1.5"
                    >
                      Your Name
                    </label>
                    <input
                      id="enquiry-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Elena Papadopoulos"
                      className="w-full min-h-[44px] px-3.5 py-2.5 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f4c81] focus:border-[#0f4c81]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="enquiry-contact"
                      className="block text-sm font-medium text-[#081c38] mb-1.5"
                    >
                      Phone or Email
                    </label>
                    <input
                      id="enquiry-contact"
                      type="text"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      placeholder="e.g. 07700 900123 or name@email.co.uk"
                      className="w-full min-h-[44px] px-3.5 py-2.5 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f4c81] focus:border-[#0f4c81]"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="enquiry-message"
                    className="block text-sm font-medium text-[#081c38] mb-1.5"
                  >
                    Order or Collection Details
                  </label>
                  <textarea
                    id="enquiry-message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Let us know preferred collection day, approximate party size, or dietary notes..."
                    className="w-full px-3.5 py-2.5 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f4c81] focus:border-[#0f4c81]"
                  />
                </div>

                {error && (
                  <p role="alert" className="text-sm font-medium text-red-700">
                    {error}
                  </p>
                )}

                <div className="pt-1 flex flex-wrap items-center justify-between gap-4">
                  <p className="text-xs text-slate-500">
                    Walk-in collection at 72 Longbridge Road, Barking IG11 8SF.
                  </p>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 min-h-[44px] px-6 py-2.5 text-sm font-semibold text-white bg-[#0f4c81] hover:bg-[#0b2d5b] rounded-lg transition-colors whitespace-nowrap"
                  >
                    <Send className="w-4 h-4" aria-hidden="true" />
                    <span>Submit Enquiry</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </MotionSection>
  );
}
