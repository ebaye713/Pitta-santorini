/// <reference types="google.maps" />
import {useEffect, useState} from 'react';
import {useMapsLibrary} from '@vis.gl/react-google-maps';
import {RESTAURANT_INFO} from '../data/restaurantData';

export interface VerifiedPlaceReview {
  authorName: string;
  rating: number;
  relativePublishTimeDescription: string;
  text: string;
  authorUri?: string;
}

export interface VerifiedPlaceData {
  placeId: string | null;
  displayName: string;
  formattedAddress: string;
  location: google.maps.LatLngLiteral;
  rating: number | null;
  userRatingCount: number | null;
  googleMapsURI: string | null;
  reviews: VerifiedPlaceReview[];
  source: 'google-places-live' | 'fallback';
  isLoading: boolean;
}

export function usePittaSantoriniPlace(apiKeyPresent: boolean): VerifiedPlaceData {
  const placesLib = useMapsLibrary('places');

  const [placeData, setPlaceData] = useState<VerifiedPlaceData>({
    placeId: null,
    displayName: RESTAURANT_INFO.name,
    formattedAddress: RESTAURANT_INFO.fullAddress,
    location: RESTAURANT_INFO.defaultCoordinates,
    rating: null,
    userRatingCount: null,
    googleMapsURI: null,
    reviews: [],
    source: 'fallback',
    isLoading: apiKeyPresent,
  });

  useEffect(() => {
    if (!apiKeyPresent) {
      setPlaceData((prev) => ({...prev, isLoading: false}));
      return;
    }

    if (!placesLib) return;

    let cancelled = false;

    async function fetchPlace() {
      try {
        const {places} = await placesLib!.Place.searchByText({
          textQuery: 'Pitta Santorini 72 Longbridge Road Barking IG11 8SF',
          fields: [
            'id',
            'displayName',
            'formattedAddress',
            'location',
            'rating',
            'userRatingCount',
            'reviews',
            'googleMapsURI',
          ],
          maxResultCount: 1,
          region: 'gb',
          language: 'en-GB',
        });

        if (cancelled) return;

        const match = places?.[0];
        if (!match) {
          setPlaceData((prev) => ({...prev, isLoading: false}));
          return;
        }

        const lat = match.location?.lat() ?? RESTAURANT_INFO.defaultCoordinates.lat;
        const lng = match.location?.lng() ?? RESTAURANT_INFO.defaultCoordinates.lng;

        const mappedReviews: VerifiedPlaceReview[] = (match.reviews ?? [])
          .filter((r) => Boolean(r.text))
          .slice(0, 4)
          .map((r) => ({
            authorName: r.authorAttribution?.displayName ?? 'Google Reviewer',
            rating: r.rating ?? 5,
            relativePublishTimeDescription:
              r.relativePublishTimeDescription ?? 'Recent review',
            text: r.text ?? '',
            authorUri: r.authorAttribution?.uri ?? undefined,
          }));

        setPlaceData({
          placeId: match.id ?? null,
          displayName: match.displayName ?? RESTAURANT_INFO.name,
          formattedAddress:
            match.formattedAddress ?? RESTAURANT_INFO.fullAddress,
          location: {lat, lng},
          rating: typeof match.rating === 'number' ? match.rating : null,
          userRatingCount:
            typeof match.userRatingCount === 'number'
              ? match.userRatingCount
              : null,
          googleMapsURI: match.googleMapsURI ?? null,
          reviews: mappedReviews,
          source: 'google-places-live',
          isLoading: false,
        });
      } catch (err: unknown) {
        if (cancelled) return;
        const message = err instanceof Error ? err.message : String(err);
        if (
          message.includes('RESOURCE_EXHAUSTED') ||
          message.includes('Quota') ||
          message.includes('429')
        ) {
          window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
        }
        setPlaceData((prev) => ({...prev, isLoading: false}));
      }
    }

    fetchPlace();

    return () => {
      cancelled = true;
    };
  }, [apiKeyPresent, placesLib]);

  return placeData;
}
