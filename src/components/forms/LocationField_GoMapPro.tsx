'use client';

import React, { useEffect, useRef, useState } from 'react';

interface Location {
  lat: number;
  lng: number;
  address?: string;
}

export const LocationField = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location>({ lat: 48.8566, lng: 2.3522 });

  useEffect(() => {
    const loadMapScript = async () => {
      if (!document.getElementById('gomap-script')) {
        const script = document.createElement('script');
        script.id = 'gomap-script';
        script.src = `https://maps.gomaps.pro/maps/api/js?key=${process.env.NEXT_PUBLIC_GOMAP_API_KEY}&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = () => initializeMap();
        document.body.appendChild(script);
      } else {
        initializeMap();
      }
    };

    const initializeMap = () => {
      if (mapRef.current && window.google) {
        const map = new google.maps.Map(mapRef.current, {
          center: selectedLocation,
          zoom: 12,
        });

        map.addListener('click', (e: google.maps.MapMouseEvent) => {
          if (e.latLng) {
            const lat = e.latLng.lat();
            const lng = e.latLng.lng();
            setSelectedLocation({ lat, lng });
          }
        });

        new google.maps.Marker({
          position: selectedLocation,
          map,
        });
      }
    };

    loadMapScript();
  }, [selectedLocation]);

  return (
    <div>
      <div className="h-[400px] w-full rounded-md border" ref={mapRef}></div>
      <p className="mt-2 text-sm">Lat: {selectedLocation.lat}, Lng: {selectedLocation.lng}</p>
    </div>
  );
};
