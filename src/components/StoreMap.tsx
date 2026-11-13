import {useCallback, useState} from 'react';
import {
  AdvancedMarker,
  InfoWindow,
  Map as GoogleMap,
  Pin,
  useAdvancedMarkerRef,
  useApiLoadingStatus,
  APILoadingStatus,
} from '@vis.gl/react-google-maps';
import {ExternalLink, MapPin} from 'lucide-react';
import {RESTAURANT_INFO} from '../data/restaurantData';
import type {VerifiedPlaceData} from '../hooks/usePittaSantoriniPlace';

interface StoreMapProps {
  apiKeyPresent: boolean;
  quotaExceeded: boolean;
  placeData: VerifiedPlaceData;
}

function StoreMapFallback({
  placeData,
  reason,
}: {
  placeData: VerifiedPlaceData;
  reason: string;
}) {
  const directionsHref =
    placeData.googleMapsURI ?? RESTAURANT_INFO.googleMapsDirectionsUrl;

  return (
    <div className="h-[360px] sm:h-[420px] w-full rounded-xl border border-slate-200 bg-gradient-to-br from-[#e8f1fb] via-[#f7faff] to-white p-6 flex flex-col items-center justify-center text-center">
      <div className="w-12 h-12 rounded-full bg-[#0f4c81] text-white flex items-center justify-center mb-4">
        <MapPin className="w-6 h-6" aria-hidden="true" />
      </div>
      <h3 className="font-display text-xl font-semibold text-[#081c38]">
        {RESTAURANT_INFO.name}
      </h3>
      <p className="mt-1 text-sm font-medium text-slate-700">
        {placeData.formattedAddress}
      </p>
      <p className="mt-2 text-xs text-slate-500 max-w-sm">{reason}</p>
      <a
        href={directionsHref}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 text-sm font-semibold text-white bg-[#0f4c81] hover:bg-[#0b2d5b] rounded-lg transition-colors"
      >
        <span>Open in Google Maps</span>
        <ExternalLink className="w-4 h-4" aria-hidden="true" />
      </a>
    </div>
  );
}

function InteractiveGoogleMap({placeData}: {placeData: VerifiedPlaceData}) {
  const status = useApiLoadingStatus();
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [infoOpen, setInfoOpen] = useState(true);

  const handleMarkerClick = useCallback(() => {
    setInfoOpen((prev) => !prev);
  }, []);

  if (
    status === APILoadingStatus.FAILED ||
    status === APILoadingStatus.AUTH_FAILURE
  ) {
    return (
      <StoreMapFallback
        placeData={placeData}
        reason="Interactive map preview is temporarily unavailable. Open our Barking location directly in Google Maps."
      />
    );
  }

  const directionsHref =
    placeData.googleMapsURI ?? RESTAURANT_INFO.googleMapsDirectionsUrl;

  return (
    <div className="h-[360px] sm:h-[420px] w-full rounded-xl overflow-hidden border border-slate-200 bg-[#f2f7fc]">
      <GoogleMap
        center={placeData.location}
        defaultZoom={16}
        mapId="DEMO_MAP_ID"
        gestureHandling="cooperative"
        internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
        style={{width: '100%', height: '100%'}}
      >
        <AdvancedMarker
          ref={markerRef}
          position={placeData.location}
          onClick={handleMarkerClick}
          title="Pitta Santorini — 72 Longbridge Road, Barking IG11 8SF"
        >
          <Pin
            background="#0f4c81"
            borderColor="#081c38"
            glyphColor="#ffffff"
            scale={1.15}
          />
        </AdvancedMarker>

        {infoOpen && marker && (
          <InfoWindow
            anchor={marker}
            onCloseClick={() => setInfoOpen(false)}
            maxWidth={260}
          >
            <div className="p-1 text-slate-900">
              <p className="font-display text-sm font-semibold text-[#081c38]">
                {placeData.displayName}
              </p>
              <p className="mt-1 text-xs text-slate-600">
                {placeData.formattedAddress}
              </p>
              <a
                href={directionsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[#0f4c81] hover:underline"
              >
                <span>Get Directions</span>
                <ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}

export function StoreMap({
  apiKeyPresent,
  quotaExceeded,
  placeData,
}: StoreMapProps) {
  if (!apiKeyPresent || quotaExceeded) {
    return (
      <StoreMapFallback
        placeData={placeData}
        reason={
          quotaExceeded
            ? 'Map preview quota reached. Use the button below to view 72 Longbridge Road directly on Google Maps.'
            : 'Click below to open turn-by-turn directions to 72 Longbridge Road, Barking IG11 8SF in Google Maps.'
        }
      />
    );
  }

  return <InteractiveGoogleMap placeData={placeData} />;
}
