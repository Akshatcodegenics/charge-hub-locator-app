
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, X, ZoomIn, ZoomOut, Navigation } from 'lucide-react';
import { ChargingStation } from '@/hooks/useChargingStations';

interface VirtualMapProps {
  stations: ChargingStation[];
  selectedStation: ChargingStation | null;
  onStationSelect: (station: ChargingStation | null) => void;
}

const VirtualMap: React.FC<VirtualMapProps> = ({ 
  stations, 
  selectedStation, 
  onStationSelect 
}) => {
  const [zoom, setZoom] = useState(1);
  const [center, setCenter] = useState({ lat: 37.7749, lng: -122.4194 });

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

  const getMarkerPosition = (station: ChargingStation) => {
    const baseX = 50; // Center X
    const baseY = 50; // Center Y
    
    // Simple projection from lat/lng to screen coordinates
    const x = baseX + (station.longitude - center.lng) * 1000 * zoom;
    const y = baseY - (station.latitude - center.lat) * 1000 * zoom;
    
    return { x: Math.max(5, Math.min(95, x)), y: Math.max(5, Math.min(95, y)) };
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev * 1.5, 5));
  const handleZoomOut = () => setZoom(prev => Math.max(prev / 1.5, 0.5));

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-blue-50 to-green-50 rounded-lg overflow-hidden">
      {/* Virtual Map Grid */}
      <div className="absolute inset-0">
        <svg className="w-full h-full opacity-20">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#64748b" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Map Roads/Streets Simulation */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 right-0 h-1 bg-gray-300 opacity-60"></div>
        <div className="absolute top-1/2 left-0 right-0 h-2 bg-gray-400 opacity-80"></div>
        <div className="absolute top-3/4 left-0 right-0 h-1 bg-gray-300 opacity-60"></div>
        
        <div className="absolute left-1/4 top-0 bottom-0 w-1 bg-gray-300 opacity-60"></div>
        <div className="absolute left-1/2 top-0 bottom-0 w-2 bg-gray-400 opacity-80"></div>
        <div className="absolute left-3/4 top-0 bottom-0 w-1 bg-gray-300 opacity-60"></div>
      </div>

      {/* Charging Station Markers */}
      {stations.map((station) => {
        const position = getMarkerPosition(station);
        return (
          <div
            key={station.id}
            className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 hover:scale-110 ${
              selectedStation?.id === station.id ? 'scale-125 z-20' : 'z-10'
            }`}
            style={{ left: `${position.x}%`, top: `${position.y}%` }}
            onClick={() => onStationSelect(station)}
          >
            <div
              className="w-6 h-6 rounded-full border-3 border-white shadow-lg flex items-center justify-center"
              style={{ backgroundColor: getStatusColor(station.status) }}
            >
              <MapPin className="w-3 h-3 text-white" />
            </div>
            {selectedStation?.id === station.id && (
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg px-2 py-1 text-xs font-medium whitespace-nowrap">
                {station.name}
              </div>
            )}
          </div>
        );
      })}

      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2">
        <Button size="sm" variant="outline" onClick={handleZoomIn}>
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="outline" onClick={handleZoomOut}>
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button 
          size="sm" 
          variant="outline" 
          onClick={() => setCenter({ lat: 37.7749, lng: -122.4194 })}
        >
          <Navigation className="h-4 w-4" />
        </Button>
      </div>

      {/* Selected Station Details Panel */}
      {selectedStation && (
        <div className="absolute top-4 left-4 w-80 bg-white rounded-lg shadow-lg p-6 z-30">
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

      {/* Zoom Level Indicator */}
      <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-md px-3 py-2">
        <span className="text-xs font-medium">Zoom: {zoom.toFixed(1)}x</span>
      </div>
    </div>
  );
};

export default VirtualMap;
