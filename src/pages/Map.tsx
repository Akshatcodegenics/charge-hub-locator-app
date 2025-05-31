
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Zap, MapPin, Filter, List, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Map = () => {
  const [selectedStation, setSelectedStation] = useState<any>(null);
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock data for charging stations
  const stations = [
    {
      id: 1,
      name: "Downtown Tesla Supercharger",
      location: "123 Main St, San Francisco, CA",
      latitude: 37.7749,
      longitude: -122.4194,
      status: "Active",
      powerOutput: 250,
      connectorType: "Tesla Supercharger",
      available: 6,
      total: 8
    },
    {
      id: 2,
      name: "City Center Fast Charge",
      location: "456 Market St, San Francisco, CA",
      latitude: 37.7849,
      longitude: -122.4094,
      status: "Active",
      powerOutput: 150,
      connectorType: "CCS",
      available: 3,
      total: 4
    },
    {
      id: 3,
      name: "Airport Charging Hub",
      location: "789 Airport Blvd, San Francisco, CA",
      latitude: 37.7649,
      longitude: -122.4294,
      status: "Maintenance",
      powerOutput: 100,
      connectorType: "CHAdeMO",
      available: 0,
      total: 6
    },
    {
      id: 4,
      name: "Mall Charging Station",
      location: "321 Shopping Ave, San Francisco, CA",
      latitude: 37.7549,
      longitude: -122.4394,
      status: "Active",
      powerOutput: 75,
      connectorType: "Type 2",
      available: 2,
      total: 3
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-500';
      case 'maintenance':
        return 'bg-yellow-500';
      case 'inactive':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
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

  const getAvailabilityColor = (available: number, total: number) => {
    const ratio = available / total;
    if (ratio > 0.5) return 'text-green-600';
    if (ratio > 0.2) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <Zap className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">ChargeHub</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/stations">
                <Button variant="ghost">
                  <List className="mr-2 h-4 w-4" />
                  List View
                </Button>
              </Link>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Station
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex h-[calc(100vh-64px)]">
        {/* Sidebar */}
        <div className="w-96 bg-white border-r overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Charging Stations</h2>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              {stations
                .filter(station => statusFilter === 'all' || station.status.toLowerCase() === statusFilter)
                .map((station) => (
                <Card 
                  key={station.id} 
                  className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                    selectedStation?.id === station.id ? 'ring-2 ring-blue-500 shadow-md' : ''
                  }`}
                  onClick={() => setSelectedStation(station)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-base">{station.name}</CardTitle>
                      <Badge className={getStatusBadgeColor(station.status)}>
                        {station.status}
                      </Badge>
                    </div>
                    <CardDescription className="flex items-center text-sm">
                      <MapPin className="h-3 w-3 mr-1" />
                      {station.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-600">Power:</span>
                        <span className="ml-1 font-semibold">{station.powerOutput} kW</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Available:</span>
                        <span className={`ml-1 font-semibold ${getAvailabilityColor(station.available, station.total)}`}>
                          {station.available}/{station.total}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 text-sm">
                      <span className="text-gray-600">Type:</span>
                      <span className="ml-1 font-semibold">{station.connectorType}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Map Area */}
        <div className="flex-1 relative">
          {/* Placeholder Map */}
          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-green-100 relative overflow-hidden">
            {/* Map Overlay */}
            <div className="absolute inset-0 opacity-10">
              <div className="w-full h-full" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }} />
            </div>
            
            {/* Station Markers */}
            {stations
              .filter(station => statusFilter === 'all' || station.status.toLowerCase() === statusFilter)
              .map((station, index) => (
              <div
                key={station.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 hover:scale-110 ${
                  selectedStation?.id === station.id ? 'scale-110 z-10' : 'z-0'
                }`}
                style={{
                  left: `${30 + (index * 10)}%`,
                  top: `${40 + (index * 8)}%`,
                }}
                onClick={() => setSelectedStation(station)}
              >
                <div className={`w-4 h-4 rounded-full ${getStatusColor(station.status)} border-2 border-white shadow-lg`} />
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-white px-2 py-1 rounded shadow-md text-xs font-medium whitespace-nowrap">
                  {station.name}
                </div>
              </div>
            ))}

            {/* Map Controls */}
            <div className="absolute top-4 right-4 bg-white rounded-lg shadow-md p-1">
              <Button variant="ghost" size="sm" className="block mb-1">+</Button>
              <Button variant="ghost" size="sm" className="block">-</Button>
            </div>

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

            {/* Center Text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center text-gray-500">
                <MapPin className="h-16 w-16 mx-auto mb-4 opacity-30" />
                <p className="text-lg font-medium">Interactive Map View</p>
                <p className="text-sm">Click on markers to view station details</p>
              </div>
            </div>
          </div>

          {/* Selected Station Details */}
          {selectedStation && (
            <div className="absolute top-4 left-4 w-80 bg-white rounded-lg shadow-lg p-6 z-20">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold">{selectedStation.name}</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setSelectedStation(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </Button>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  {selectedStation.location}
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <Badge className={getStatusBadgeColor(selectedStation.status)}>
                    {selectedStation.status}
                  </Badge>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Power Output:</span>
                  <span className="font-semibold">{selectedStation.powerOutput} kW</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Connector Type:</span>
                  <span className="font-semibold">{selectedStation.connectorType}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Availability:</span>
                  <span className={`font-semibold ${getAvailabilityColor(selectedStation.available, selectedStation.total)}`}>
                    {selectedStation.available}/{selectedStation.total} available
                  </span>
                </div>
                
                <div className="flex gap-2 pt-4">
                  <Button variant="outline" size="sm" className="flex-1">
                    Edit Station
                  </Button>
                  <Button size="sm" className="flex-1">
                    Get Directions
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Map;
