'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Check, Copy, ExternalLink } from 'lucide-react';
import { Card } from '../ui/card';

export interface Location {
  lat: number; 
  lng: number; 
  address: string; 
}

interface LocationFieldProps {
  onChange: (value: Location | undefined) => void;
  defaultValue?: Location | undefined;
}

export const LocationField = ({ onChange, defaultValue }: LocationFieldProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const searchBoxRef = useRef<HTMLInputElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location | undefined>(defaultValue);
  const [tempLocation, setTempLocation] = useState<Location | undefined>(undefined);
  const [copied, setCopied] = useState(false);


  const handleCopyLink = (location: Location) => {
 
    const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(location.address)}`;
    navigator.clipboard.writeText(mapUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const getMapLink = (location: Location) => {

    return `https://www.google.com/maps?q=${encodeURIComponent(location.address)}`;
  };

  // Fonction pour mettre à jour le marqueur temporaire
  const updateTempMarker = (position: google.maps.LatLng | google.maps.LatLngLiteral) => {
    if (marker) {
      marker.setMap(null);
    }
    
    const newMarker = new google.maps.Marker({
      position,
      map,
      draggable: true,
      animation: google.maps.Animation.DROP
    });

  
    newMarker.addListener('dragend', async () => {
      const position = newMarker.getPosition();
      if (position) {
        await getAddressFromLatLng(position.lat(), position.lng());
      }
    });

    setMarker(newMarker);
  };

  
  const getAddressFromLatLng = async (lat: number, lng: number) => {
    try {
      const geocoder = new google.maps.Geocoder();
      const response = await geocoder.geocode({ location: { lat, lng } });
      
      if (response.results[0]) {
        const newLocation = {
          lat,
          lng,
          address: response.results[0].formatted_address
        };
        setTempLocation(newLocation);
      }
    } catch (error) {
      console.error('Erreur lors de la géocodification:', error);
    }
  };

//confir location?
  const confirmLocation = () => {
    if (tempLocation) {
      setSelectedLocation(tempLocation);
      onChange(tempLocation);
      if (searchBoxRef.current) {
        searchBoxRef.current.value = tempLocation.address;
      }
    }
  };

  // reset location?
  const resetLocation = () => {
    setTempLocation(undefined);
    setSelectedLocation(undefined);
    onChange(undefined);
    if (marker) {
      marker.setMap(null);
      setMarker(null);
    }
    if (searchBoxRef.current) {
      searchBoxRef.current.value = '';
    }
  };

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
        // map creating
        const newMap = new google.maps.Map(mapRef.current, {
          center: selectedLocation || { lat: 6.20955, lng: 1.18393},
          zoom: 12,
          streetViewControl: false,
        });
        setMap(newMap);

      
        if (searchBoxRef.current) {
          const searchBox = new google.maps.places.SearchBox(searchBoxRef.current);

          searchBox.addListener('places_changed', () => {
            const places = searchBox.getPlaces();
            if (places && places.length > 0) {
              const place = places[0];
              if (place.geometry && place.geometry.location) {
                const lat = place.geometry.location.lat();
                const lng = place.geometry.location.lng();
                
                if (place.geometry.viewport) {
                  newMap.fitBounds(place.geometry.viewport);
                } else {
                  newMap.setCenter(place.geometry.location);
                  newMap.setZoom(17);
                }

                const newLocation = {
                  lat,
                  lng,
                  address: place.formatted_address || ''
                };
                setTempLocation(newLocation);
                updateTempMarker(place.geometry.location);
              }
            }
          });
        }

        // click listener 
        newMap.addListener('click', async (e: google.maps.MapMouseEvent) => {
          if (e.latLng) {
            const lat = e.latLng.lat();
            const lng = e.latLng.lng();
            updateTempMarker(e.latLng);
            await getAddressFromLatLng(lat, lng);
          }
        });

        
        if (selectedLocation) {
          updateTempMarker(selectedLocation);
          setTempLocation(selectedLocation);
        }
      }
    };

    loadMapScript();

    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, []);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Localisation</Label>
        <Input
          ref={searchBoxRef}
          type="text"
          placeholder="Rechercher une adresse..."
          className="w-full"
          defaultValue={selectedLocation?.address || ''}
        />
      </div>
      <div className="h-[400px] w-full rounded-md border" ref={mapRef}></div>
      
      {tempLocation && !selectedLocation && (
        <Card className="p-4 space-y-4">
          <div className="space-y-2">
            <p className="text-sm font-medium">Localisation temporaire :</p>
            <p className="text-sm text-muted-foreground">{tempLocation.address}</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <a
              href={getMapLink(tempLocation)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Voir sur Google Maps
            </a>
            
            <Button 
              type="button"
              variant="outline"
              className="relative"
              onClick={() => handleCopyLink(tempLocation)}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Copié !
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copier le lien
                </>
              )}
            </Button>
          </div>

          <div className="flex space-x-2 pt-2">
            <Button 
              type="button" 
              onClick={confirmLocation}
              className="bg-green-600 hover:bg-green-700"
            >
              Confirmer cette localisation
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={resetLocation}
            >
              Annuler
            </Button>
          </div>
        </Card>
      )}

      {selectedLocation && (
        <Card className="p-4 space-y-4">
          <div className="space-y-2">
            <p className="text-sm font-medium">Localisation sélectionnée :</p>
            <p className="text-sm text-muted-foreground">{selectedLocation.address}</p>
          </div>

          <div className="flex items-center space-x-4">
            <a
              href={getMapLink(selectedLocation)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Voir sur Google Maps
            </a>
            
            <Button 
              type="button"
              variant="outline"
              className="relative"
              onClick={() => handleCopyLink(selectedLocation)}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Copié !
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copier le lien
                </>
              )}
            </Button>
          </div>

          <Button 
            type="button" 
            variant="outline" 
            onClick={resetLocation}
            className="text-red-600 hover:text-red-700"
          >
            Supprimer la localisation
          </Button>
        </Card>
      )}
    </div>
  );
};