
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, X } from 'lucide-react';
import { ChargingStation } from '@/hooks/useChargingStations';

// Dynamic import for Leaflet to avoid SSR issues
let L: any = null;

interface OpenStreetMapProps {
  stations: ChargingStation[];
  selectedStation: ChargingStation | null;
  onStationSelect: (station: ChargingStation | null) => void;
}

const OpenStreetMap: React.FC<OpenStreetMapProps> = ({ 
  stations, 
  selectedStation, 
  onStationSelect 
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

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

  // Initialize Leaflet dynamically
  useEffect(() => {
    const initLeaflet = async () => {
      if (!L) {
        try {
          L = await import('leaflet');
          // Import CSS
          await import('leaflet/dist/leaflet.css');
          
          // Fix for default markers in Leaflet
          delete (L.Icon.Default.prototype as any)._getIconUrl;
          L.Icon.Default.mergeOptions({
            iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
            iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
          });
        } catch (error) {
          console.error('Failed to load Leaflet:', error);
          return;
        }
      }

      if (!mapContainer.current || mapRef.current) return;

      // Initialize map
      mapRef.current = L.map(mapContainer.current).setView([37.7749, -122.4194], 10);

      // Add OpenStreetMap tiles (free)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapRef.current);
    };

    initLeaflet();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current || !L) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add new markers
    stations.forEach(station => {
      const customIcon = L.divIcon({
        className: 'custom-marker',
        html: `<div style="
          width: 24px;
          height: 24px;
          background-color: ${getStatusColor(station.status)};
          border: 3px solid white;
          border-radius: 50%;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
        </div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });

      const marker = L.marker([station.latitude, station.longitude], { icon: customIcon })
        .addTo(mapRef.current!)
        .on('click', () => onStationSelect(station));

      markersRef.current.push(marker);
    });

    // Fit map to show all stations
    if (stations.length > 0) {
      const group = new L.FeatureGroup(markersRef.current);
      mapRef.current.fitBounds(group.getBounds().pad(0.1));
    }
  }, [stations, onStationSelect]);

  // Highlight selected station
  useEffect(() => {
    if (selectedStation && mapRef.current) {
      mapRef.current.setView([selectedStation.latitude, selectedStation.longitude], 13);
    }
  }, [selectedStation]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="absolute inset-0 rounded-lg" />
      
      {/* Selected Station Details */}
      {selectedStation && (
        <div className="absolute top-4 left-4 w-80 bg-white rounded-lg shadow-lg p-6 z-[1000]">
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
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-md p-4 z-[1000]">
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

      {/* Map Attribution */}
      <div className="absolute bottom-4 right-4 bg-white rounded px-2 py-1 text-xs text-gray-600 z-[1000]">
        Powered by OpenStreetMap
      </div>
    </div>
  );
};

export default OpenStreetMap;
