import {useEffect, useState} from 'react';
import {APIProvider} from '@vis.gl/react-google-maps';
import {Navbar} from './components/Navbar';
import {HeroSection} from './components/HeroSection';
import {AboutSection} from './components/AboutSection';
import {MenuSection} from './components/MenuSection';
import {GallerySection} from './components/GallerySection';
import {ReviewsSection} from './components/ReviewsSection';
import {HoursAndLocationSection} from './components/HoursAndLocationSection';
import {ContactSection} from './components/ContactSection';
import {Footer} from './components/Footer';
import {BackToTopButton} from './components/BackToTopButton';
import {usePittaSantoriniPlace} from './hooks/usePittaSantoriniPlace';

const GOOGLE_MAPS_API_KEY =
  (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined)?.trim() ?? '';

function PageContent({
  apiKeyPresent,
  quotaExceeded,
}: {
  apiKeyPresent: boolean;
  quotaExceeded: boolean;
}) {
  const placeData = usePittaSantoriniPlace(apiKeyPresent && !quotaExceeded);

  return (
    <div className="relative min-h-screen flex flex-col bg-[#f3f7fc] text-slate-900 overflow-x-clip">
      {/* Animated luminous Cycladic alabaster & Aegean sky-mist background */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      >
        <div className="aegean-aura-a absolute -top-[18%] -left-[12%] w-[72vw] h-[72vw] max-w-[920px] max-h-[920px] rounded-full bg-radial from-[#dceafa]/75 via-[#e9f2fc]/45 to-transparent blur-3xl" />
        <div className="aegean-aura-b absolute top-[32%] -right-[14%] w-[68vw] h-[68vw] max-w-[860px] max-h-[860px] rounded-full bg-radial from-[#d7e8fb]/65 via-[#f0f6fd]/50 to-transparent blur-3xl" />
        <div className="aegean-aura-a absolute -bottom-[20%] left-[18%] w-[64vw] h-[64vw] max-w-[820px] max-h-[820px] rounded-full bg-radial from-[#e1effd]/70 via-[#f8fafd]/50 to-transparent blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <HeroSection placeData={placeData} />
          <AboutSection />
          <MenuSection />
          <GallerySection />
          <ReviewsSection placeData={placeData} />
          <HoursAndLocationSection
            apiKeyPresent={apiKeyPresent}
            quotaExceeded={quotaExceeded}
            placeData={placeData}
          />
          <ContactSection />
        </main>
        <Footer />
        <BackToTopButton />
      </div>
    </div>
  );
}

export default function App() {
  const [quotaExceeded, setQuotaExceeded] = useState(false);

  useEffect(() => {
    const handleQuotaExceeded = () => {
      setQuotaExceeded(true);
    };
    window.addEventListener('gmp-quota-exceeded', handleQuotaExceeded);
    return () => {
      window.removeEventListener('gmp-quota-exceeded', handleQuotaExceeded);
    };
  }, []);

  const apiKeyPresent = Boolean(GOOGLE_MAPS_API_KEY);

  return (
    <>
      {quotaExceeded && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-50 shadow-sm">
          <span>
            Google Maps Platform quota reached. If you are the app owner, visit{' '}
            <a
              href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold text-amber-950 hover:text-amber-800"
            >
              maps developer site
            </a>{' '}
            for instructions to update your account.
          </span>
        </div>
      )}

      {apiKeyPresent ? (
        <APIProvider
          apiKey={GOOGLE_MAPS_API_KEY}
          libraries={['places', 'marker']}
          language="en"
          region="GB"
        >
          <PageContent
            apiKeyPresent={apiKeyPresent}
            quotaExceeded={quotaExceeded}
          />
        </APIProvider>
      ) : (
        <PageContent
          apiKeyPresent={false}
          quotaExceeded={quotaExceeded}
        />
      )}
    </>
  );
}
