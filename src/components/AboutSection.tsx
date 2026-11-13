import {ABOUT_IMAGE} from '../data/restaurantData';
import {MotionSection} from './MotionSection';
import {ResilientImage} from './ResilientImage';

const HERITAGE_PILLARS = [
  {
    number: '01.',
    title: 'Rooted in Cycladic & Athenian Tradition',
    description:
      'Named after the volcanic cliffs and cobalt-domed kitchens of Santorini, our takeaway carries forward the classic Greek souvlatzidiko ritual: simple, sunlit flavours cooked with patience and pride.',
  },
  {
    number: '02.',
    title: 'Daily Vertical Rotisserie & Handmade Pitta',
    description:
      'Every morning our kitchen marinates chicken and pork in wild Greek oregano, lemon, garlic, and olive oil before stacking the spit—pairing freshly shaved meat with blistered pitta, vine tomatoes, crisp fries, and house-whisked tzatziki.',
  },
  {
    number: '03.',
    title: 'A Neighbourhood Staple on Longbridge Road',
    description:
      'Since opening our doors at 72 Longbridge Road, Pitta Santorini has grown through word-of-mouth from Barking commuters, families, and late-evening diners stopping by for hot portion boxes and cold-frothed Freddo coffees.',
  },
];

export function AboutSection() {
  return (
    <MotionSection
      id="about"
      className="py-16 sm:py-22 border-b border-slate-200/70"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          <div className="lg:col-span-5 flex">
            <figure className="w-full overflow-hidden rounded-2xl border border-slate-200/90 bg-white/80 shadow-sm aspect-[4/3] lg:aspect-auto lg:min-h-[450px]">
              <ResilientImage
                src={ABOUT_IMAGE}
                alt="Chargrilled Cypriot halloumi on warm blistered Greek pitta with ceramic bowls of tzatziki, hummus, and spicy feta dip"
                fallbackTitle="Santorini Meze & Halloumi"
                className="w-full h-full object-cover"
              />
            </figure>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center">
            <p className="text-sm font-semibold text-[#0f4c81] mb-2">
              Our Story &amp; History
            </p>
            <h2
              className="font-display font-semibold tracking-tight text-[#081c38] text-balance"
              style={{fontSize: 'clamp(1.75rem, 3vw, 2.5rem)'}}
            >
              From Santorini&apos;s sunlit alleys to a welcoming Greek grill in Barking.
            </h2>

            <p className="mt-4 text-base text-slate-600 leading-relaxed max-w-2xl">
              Pitta Santorini began with a clear goal: to bring the unmistakable
              aroma of an authentic Greek street-food corner to East London
              without cutting corners. What started as family recipes for
              marinated souvlaki, hand-rolled dolmades, and whipped feta
              tirokafteri now anchors our busy counter at 72 Longbridge Road.
            </p>

            <div className="mt-8 divide-y divide-slate-200/90 border-t border-b border-slate-200/90 bg-white/60 backdrop-blur-sm rounded-xl px-5">
              {HERITAGE_PILLARS.map((pillar) => (
                <div key={pillar.number} className="py-4 sm:py-5 flex gap-4">
                  <span className="font-display text-base font-semibold text-[#0f4c81] tabular-nums shrink-0 pt-0.5">
                    {pillar.number}
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-[#081c38]">
                      {pillar.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MotionSection>
  );
}
