'use client';

import { useState } from 'react';
import { useLoadScript, GoogleMap, Marker } from '@react-google-maps/api';
import { Label } from '@/components/ui/label';

interface Location {
  lat: number;
  lng: number;
  address: string;
}

interface LocationFieldProps {
  onLocationChange: (location: Location | undefined) => void;
  defaultLocation?: Location;
}

export const LocationField = ({ onLocationChange, defaultLocation }: LocationFieldProps) => {
  const [selectedLocation, setSelectedLocation] = useState<Location | undefined>(defaultLocation);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries: ['places'],
  });

  const handleLocationSelect = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();
      
      if (data.results[0]) {
        const newLocation = {
          lat,
          lng,
          address: data.results[0].formatted_address
        };
        setSelectedLocation(newLocation);
        onLocationChange(newLocation);
      }
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  };

  return (
    <div className="space-y-4">
      <Label>Localisation (Optionnel)</Label>
      {isLoaded ? (
        <div className="h-[400px] w-full rounded-md border">
          <GoogleMap
            zoom={15}
            center={selectedLocation || { lat: 48.8566, lng: 2.3522 }}
            mapContainerClassName="w-full h-full rounded-md"
            onClick={(e) => {
              if (e.latLng) {
                handleLocationSelect(e.latLng.lat(), e.latLng.lng());
              }
            }}
          >
            {selectedLocation && (
              <Marker
                position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
              />
            )}
          </GoogleMap>
        </div>
      ) : (
        <div className="h-[400px] w-full rounded-md border flex items-center justify-center">
          Loading map...
        </div>
      )}
      {selectedLocation && (
        <p className="text-sm text-muted-foreground">
          Adresse sélectionnée: {selectedLocation.address}
        </p>
      )}
    </div>
  );
};
