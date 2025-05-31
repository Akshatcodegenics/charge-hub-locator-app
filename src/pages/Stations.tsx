
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Zap, MapPin, Plus, Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

const Stations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [connectorFilter, setConnectorFilter] = useState('all');

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

  const filteredStations = stations.filter(station => {
    const matchesSearch = station.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         station.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || station.status.toLowerCase() === statusFilter;
    const matchesConnector = connectorFilter === 'all' || station.connectorType === connectorFilter;
    
    return matchesSearch && matchesStatus && matchesConnector;
  });

  const getStatusColor = (status: string) => {
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
              <Link to="/map">
                <Button variant="ghost">
                  <MapPin className="mr-2 h-4 w-4" />
                  Map View
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Charging Stations</h1>
          <p className="text-gray-600">Find and manage electric vehicle charging stations in your area</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search stations by name or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Select value={connectorFilter} onValueChange={setConnectorFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Connector Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Connectors</SelectItem>
                  <SelectItem value="Tesla Supercharger">Tesla Supercharger</SelectItem>
                  <SelectItem value="CCS">CCS</SelectItem>
                  <SelectItem value="CHAdeMO">CHAdeMO</SelectItem>
                  <SelectItem value="Type 2">Type 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Station Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStations.map((station) => (
            <Card key={station.id} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{station.name}</CardTitle>
                  <Badge className={getStatusColor(station.status)}>
                    {station.status}
                  </Badge>
                </div>
                <CardDescription className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-1" />
                  {station.location}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Power Output:</span>
                    <span className="font-semibold">{station.powerOutput} kW</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Connector:</span>
                    <span className="font-semibold">{station.connectorType}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Availability:</span>
                    <span className={`font-semibold ${getAvailabilityColor(station.available, station.total)}`}>
                      {station.available}/{station.total} available
                    </span>
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button variant="outline" size="sm" className="flex-1">
                      Edit
                    </Button>
                    <Button size="sm" className="flex-1">
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredStations.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No stations found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stations;
