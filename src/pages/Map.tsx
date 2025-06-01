
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Zap, List, Plus, Filter, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useChargingStations } from '@/hooks/useChargingStations';
import { useAuth } from '@/contexts/AuthContext';
import StationDialog from '@/components/StationDialog';
import OpenStreetMap from '@/components/OpenStreetMap';

const Map = () => {
  const [selectedStation, setSelectedStation] = useState<any>(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const { stations, loading, createStation } = useChargingStations();
  const { signOut, user } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const filteredStations = stations.filter(station => 
    statusFilter === 'all' || station.status.toLowerCase() === statusFilter
  );

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

  const handleCreateStation = async (stationData: any) => {
    await createStation(stationData);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading map...</p>
        </div>
      </div>
    );
  }

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
              <span className="text-sm text-gray-600">Welcome, {user?.email}</span>
              <Link to="/stations">
                <Button variant="ghost">
                  <List className="mr-2 h-4 w-4" />
                  List View
                </Button>
              </Link>
              <StationDialog
                trigger={
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Station
                  </Button>
                }
                onSave={handleCreateStation}
              />
              <Button variant="outline" onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
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
              <h2 className="text-xl font-bold text-gray-900">
                Charging Stations ({filteredStations.length})
              </h2>
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
              {filteredStations.map((station) => (
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
                    <CardDescription className="text-sm">
                      {station.latitude.toFixed(6)}, {station.longitude.toFixed(6)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-600">Power:</span>
                        <span className="ml-1 font-semibold">{station.power_output} kW</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Type:</span>
                        <span className="ml-1 font-semibold text-xs">{station.connector_type}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredStations.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No stations match the current filter</p>
              </div>
            )}
          </div>
        </div>

        {/* Map Area */}
        <div className="flex-1 relative">
          <OpenStreetMap
            stations={filteredStations}
            selectedStation={selectedStation}
            onStationSelect={setSelectedStation}
          />
        </div>
      </div>
    </div>
  );
};

export default Map;
