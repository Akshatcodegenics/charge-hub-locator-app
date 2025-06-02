import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, X, Navigation } from 'lucide-react';
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
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'maintenance':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'inactive':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const handleGetDirections = (station: ChargingStation) => {
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${station.latitude},${station.longitude}`;
    window.open(googleMapsUrl, '_blank');
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

    // Add new markers with station names
    stations.forEach(station => {
      const customIcon = L.divIcon({
        className: 'custom-marker',
        html: `
          <div style="
            position: relative;
            width: 40px;
            height: 50px;
            display: flex;
            flex-direction: column;
            align-items: center;
            pointer-events: auto;
          ">
            <div style="
              width: 32px;
              height: 32px;
              background-color: ${getStatusColor(station.status)};
              border: 3px solid white;
              border-radius: 50%;
              box-shadow: 0 4px 8px rgba(0,0,0,0.3);
              display: flex;
              align-items: center;
              justify-content: center;
              position: relative;
              z-index: 2;
            ">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <div style="
              background: rgba(0, 0, 0, 0.8);
              color: white;
              padding: 4px 8px;
              border-radius: 4px;
              font-size: 12px;
              font-weight: bold;
              white-space: nowrap;
              margin-top: 4px;
              border: 1px solid rgba(255, 255, 255, 0.2);
              backdrop-filter: blur(4px);
              font-family: 'Inter', sans-serif;
              max-width: 120px;
              text-overflow: ellipsis;
              overflow: hidden;
              box-shadow: 0 2px 4px rgba(0,0,0,0.5);
            ">${station.name}</div>
          </div>
        `,
        iconSize: [40, 50],
        iconAnchor: [20, 40]
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
      mapRef.current.setView([selectedStation.latitude, selectedStation.longitude], 15);
    }
  }, [selectedStation]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="absolute inset-0 rounded-lg" />
      
      {/* Selected Station Details - Enhanced visibility */}
      {selectedStation && (
        <div className="absolute top-4 left-4 w-80 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl p-6 z-[1000] border border-gray-300">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-bold text-black font-poppins">{selectedStation.name}</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onStationSelect(null)}
              className="text-gray-700 hover:text-black hover:bg-gray-100 p-1"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center text-gray-800">
              <MapPin className="h-4 w-4 mr-2 text-blue-600" />
              <span className="font-inter text-sm">
                {selectedStation.latitude.toFixed(6)}, {selectedStation.longitude.toFixed(6)}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-700 font-inter">Status:</span>
              <Badge className={getStatusBadgeColor(selectedStation.status)}>
                {selectedStation.status}
              </Badge>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-700 font-inter">Power Output:</span>
              <span className="font-semibold text-blue-600 font-inter">{selectedStation.power_output} kW</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-700 font-inter">Connector Type:</span>
              <span className="font-semibold text-green-600 font-inter">{selectedStation.connector_type}</span>
            </div>
            
            <div className="pt-4">
              <Button 
                onClick={() => handleGetDirections(selectedStation)}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium hover-lift"
              >
                <Navigation className="mr-2 h-4 w-4" />
                Get Directions
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Legend - Enhanced visibility */}
      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md rounded-lg shadow-xl p-4 z-[1000] border border-gray-300">
        <h3 className="font-semibold text-sm mb-2 text-black font-poppins">Station Status</h3>
        <div className="space-y-1 text-xs">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2 border border-gray-300" />
            <span className="text-black font-inter">Active</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2 border border-gray-300" />
            <span className="text-black font-inter">Maintenance</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-2 border border-gray-300" />
            <span className="text-black font-inter">Inactive</span>
          </div>
        </div>
      </div>

      {/* Map Attribution - Enhanced visibility */}
      <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md rounded px-3 py-2 text-xs text-black z-[1000] border border-gray-300">
        Powered by OpenStreetMap
      </div>
    </div>
  );
};

export default OpenStreetMap;
