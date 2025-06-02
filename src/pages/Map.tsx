
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
import AnimatedBackground from '@/components/AnimatedBackground';

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
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'maintenance':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'inactive':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const handleCreateStation = async (stationData: any) => {
    await createStation(stationData);
  };

  if (loading) {
    return (
      <div className="page-container flex items-center justify-center">
        <AnimatedBackground />
        <div className="text-center animate-fade-in">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-400 mx-auto"></div>
          <p className="mt-6 text-white/80 font-inter text-lg">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <AnimatedBackground />
      
      {/* Navigation - Enhanced visibility */}
      <nav className="nav-glass border-b sticky top-0 z-50 bg-black/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2 hover-glow rounded-lg px-3 py-2">
              <Zap className="h-8 w-8 text-blue-400 animate-pulse-glow" />
              <span className="text-xl font-bold text-white font-poppins">ChargeHub</span>
            </Link>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-white/90 font-inter bg-white/10 px-3 py-1 rounded-full">
                Welcome, {user?.email}
              </span>
              <Link to="/stations">
                <Button 
                  variant="ghost" 
                  className="text-white bg-white/10 hover:bg-white/20 border border-white/20 hover-lift font-medium"
                >
                  <List className="mr-2 h-4 w-4" />
                  List View
                </Button>
              </Link>
              <StationDialog
                trigger={
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover-lift text-white font-medium shadow-lg">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Station
                  </Button>
                }
                onSave={handleCreateStation}
              />
              <Button 
                variant="outline" 
                onClick={handleSignOut} 
                className="border-red-400/30 text-red-300 hover:bg-red-500/10 hover:border-red-400 hover-lift font-medium"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex h-[calc(100vh-64px)] relative z-10">
        {/* Sidebar - Enhanced visibility */}
        <div className="w-96 glass-card border-r border-white/20 overflow-y-auto animate-slide-up bg-black/20 backdrop-blur-md">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white font-poppins">
                Charging Stations ({filteredStations.length})
              </h2>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32 bg-white/20 border-white/30 text-white backdrop-blur-sm">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-white/20">
                  <SelectItem value="all" className="text-white hover:bg-white/10">All</SelectItem>
                  <SelectItem value="active" className="text-white hover:bg-white/10">Active</SelectItem>
                  <SelectItem value="maintenance" className="text-white hover:bg-white/10">Maintenance</SelectItem>
                  <SelectItem value="inactive" className="text-white hover:bg-white/10">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              {filteredStations.map((station, index) => (
                <Card 
                  key={station.id} 
                  className={`cursor-pointer transition-all duration-300 hover-lift glass-card border-white/30 animate-fade-in-up bg-white/10 backdrop-blur-sm ${
                    selectedStation?.id === station.id ? 'ring-2 ring-blue-400 shadow-lg bg-blue-500/20' : ''
                  }`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                  onClick={() => setSelectedStation(station)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-base text-white font-poppins font-bold">
                        {station.name}
                      </CardTitle>
                      <Badge className={getStatusBadgeColor(station.status)}>
                        {station.status}
                      </Badge>
                    </div>
                    <CardDescription className="text-sm text-white/80 font-inter font-medium">
                      {station.latitude.toFixed(6)}, {station.longitude.toFixed(6)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-white/70 font-inter">Power:</span>
                        <span className="ml-1 font-semibold text-blue-300 font-inter">{station.power_output} kW</span>
                      </div>
                      <div>
                        <span className="text-white/70 font-inter">Type:</span>
                        <span className="ml-1 font-semibold text-green-300 text-xs font-inter">{station.connector_type}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredStations.length === 0 && (
              <div className="text-center py-8 animate-fade-in">
                <p className="text-white/60 font-inter">No stations match the current filter</p>
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
