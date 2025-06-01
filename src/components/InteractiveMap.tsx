
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, X } from 'lucide-react';
import { ChargingStation } from '@/hooks/useChargingStations';

interface InteractiveMapProps {
  stations: ChargingStation[];
  selectedStation: ChargingStation | null;
  onStationSelect: (station: ChargingStation | null) => void;
  mapboxToken?: string;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ 
  stations, 
  selectedStation, 
  onStationSelect,
  mapboxToken 
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return '#10b981';
      case 'maintenance':
        return '#f59e0b';
      case 'inactive':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    // Dynamically import Mapbox GL JS
    const loadMapbox = async () => {
      const mapboxgl = await import('mapbox-gl');
      await import('mapbox-gl/dist/mapbox-gl.css');
      
      mapboxgl.default.accessToken = mapboxToken;
      
      const mapInstance = new mapboxgl.default.Map({
        container: mapContainer.current!,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [-122.4194, 37.7749], // San Francisco
        zoom: 10
      });

      mapInstance.addControl(new mapboxgl.default.NavigationControl());
      setMap(mapInstance);

      return () => mapInstance.remove();
    };

    loadMapbox();
  }, [mapboxToken]);

  useEffect(() => {
    if (!map || !stations.length) return;

    // Clear existing markers
    markers.forEach(marker => marker.remove());
    
    const newMarkers = stations.map(station => {
      // Create custom marker element
      const el = document.createElement('div');
      el.className = 'marker';
      el.style.backgroundColor = getStatusColor(station.status);
      el.style.width = '20px';
      el.style.height = '20px';
      el.style.borderRadius = '50%';
      el.style.border = '3px solid white';
      el.style.cursor = 'pointer';
      el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';

      // Add click event
      el.addEventListener('click', () => {
        onStationSelect(station);
      });

      // Create marker
      const mapboxgl = require('mapbox-gl');
      const marker = new mapboxgl.Marker(el)
        .setLngLat([station.longitude, station.latitude])
        .addTo(map);

      return marker;
    });

    setMarkers(newMarkers);

    // Fit map to show all stations
    if (stations.length > 0) {
      const bounds = new (require('mapbox-gl')).LngLatBounds();
      stations.forEach(station => {
        bounds.extend([station.longitude, station.latitude]);
      });
      map.fitBounds(bounds, { padding: 50 });
    }
  }, [map, stations, onStationSelect]);

  if (!mapboxToken) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center">
        <div className="text-center p-8">
          <MapPin className="h-16 w-16 mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Map Not Available</h3>
          <p className="text-gray-600 mb-4">Please configure your Mapbox API key to enable the interactive map.</p>
          <p className="text-sm text-gray-500">
            Get your free API key at{' '}
            <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              mapbox.com
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="absolute inset-0 rounded-lg" />
      
      {/* Selected Station Details */}
      {selectedStation && (
        <div className="absolute top-4 left-4 w-80 bg-white rounded-lg shadow-lg p-6 z-10">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-bold">{selectedStation.name}</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onStationSelect(null)}
              className="text-gray-400 hover:text-gray-600 p-1"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center text-gray-600">
              <MapPin className="h-4 w-4 mr-2" />
              {selectedStation.latitude.toFixed(6)}, {selectedStation.longitude.toFixed(6)}
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <Badge className={getStatusBadgeColor(selectedStation.status)}>
                {selectedStation.status}
              </Badge>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Power Output:</span>
              <span className="font-semibold">{selectedStation.power_output} kW</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Connector Type:</span>
              <span className="font-semibold">{selectedStation.connector_type}</span>
            </div>
            
            <div className="flex gap-2 pt-4">
              <Button variant="outline" size="sm" className="flex-1">
                Get Directions
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-md p-4">
        <h3 className="font-semibold text-sm mb-2">Station Status</h3>
        <div className="space-y-1 text-xs">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2" />
            <span>Active</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2" />
            <span>Maintenance</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-2" />
            <span>Inactive</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;
