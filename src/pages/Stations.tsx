
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Zap, MapPin, Plus, Filter, Search, Edit, Trash2, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useChargingStations } from '@/hooks/useChargingStations';
import { useAuth } from '@/contexts/AuthContext';
import StationDialog from '@/components/StationDialog';
import AnimatedBackground from '@/components/AnimatedBackground';

const Stations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [connectorFilter, setConnectorFilter] = useState('all');
  const { stations, loading, createStation, updateStation, deleteStation } = useChargingStations();
  const { signOut, user } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const filteredStations = stations.filter(station => {
    const matchesSearch = station.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         `${station.latitude}, ${station.longitude}`.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || station.status.toLowerCase() === statusFilter;
    const matchesConnector = connectorFilter === 'all' || station.connector_type === connectorFilter;
    
    return matchesSearch && matchesStatus && matchesConnector;
  });

  const getStatusColor = (status: string) => {
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

  const handleUpdateStation = async (stationData: any, stationId: string) => {
    await updateStation(stationId, stationData);
  };

  const handleDeleteStation = async (stationId: string) => {
    if (window.confirm('Are you sure you want to delete this charging station?')) {
      await deleteStation(stationId);
    }
  };

  if (loading) {
    return (
      <div className="page-container flex items-center justify-center">
        <AnimatedBackground />
        <div className="text-center animate-fade-in">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto"></div>
          <p className="mt-6 text-black font-inter text-lg">Loading charging stations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <AnimatedBackground />
      
      {/* Navigation */}
      <nav className="nav-glass border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2 hover-glow rounded-lg px-3 py-2">
              <Zap className="h-8 w-8 text-blue-600 animate-pulse-glow" />
              <span className="text-xl font-bold text-black font-poppins">ChargeHub</span>
            </Link>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-black font-inter">Welcome, {user?.email}</span>
              <Link to="/map">
                <Button variant="ghost" className="text-black hover:bg-gray-100 hover-lift">
                  <MapPin className="mr-2 h-4 w-4" />
                  Map View
                </Button>
              </Link>
              <StationDialog
                trigger={
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover-lift">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Station
                  </Button>
                }
                onSave={handleCreateStation}
              />
              <Button variant="outline" onClick={handleSignOut} className="border-gray-300 text-black hover:bg-gray-100 hover-lift">
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold gradient-text mb-2 font-poppins">Charging Stations</h1>
          <p className="text-gray-700 font-inter text-lg">Manage electric vehicle charging stations ({stations.length} total)</p>
        </div>

        {/* Filters */}
        <div className="glass-card rounded-xl p-6 mb-8 animate-fade-in-up animation-delay-200">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search stations by name or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white border-gray-300 text-black placeholder-gray-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40 bg-white border-gray-300 text-black">
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
                <SelectTrigger className="w-48 bg-white border-gray-300 text-black">
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
          {filteredStations.map((station, index) => (
            <Card key={station.id} className="glass-card hover-lift animate-fade-in-up border-gray-300" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg text-black font-poppins">{station.name}</CardTitle>
                  <Badge className={getStatusColor(station.status)}>
                    {station.status}
                  </Badge>
                </div>
                <CardDescription className="flex items-center text-gray-600 font-inter">
                  <MapPin className="h-4 w-4 mr-1" />
                  {station.latitude.toFixed(6)}, {station.longitude.toFixed(6)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700 font-inter">Power Output:</span>
                    <span className="font-semibold text-blue-600 font-inter">{station.power_output} kW</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700 font-inter">Connector:</span>
                    <span className="font-semibold text-green-600 font-inter">{station.connector_type}</span>
                  </div>
                  <div className="flex gap-2 pt-4">
                    <StationDialog
                      trigger={
                        <Button variant="outline" size="sm" className="flex-1 border-gray-300 text-black hover:bg-gray-100">
                          <Edit className="mr-1 h-3 w-3" />
                          Edit
                        </Button>
                      }
                      station={station}
                      onSave={(data) => handleUpdateStation(data, station.id)}
                    />
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 border-red-300 text-red-600 hover:bg-red-50"
                      onClick={() => handleDeleteStation(station.id)}
                    >
                      <Trash2 className="mr-1 h-3 w-3" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredStations.length === 0 && (
          <div className="text-center py-12 animate-fade-in">
            <div className="text-gray-400 mb-4">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-black mb-2 font-poppins">No stations found</h3>
            <p className="text-gray-700 font-inter">
              {stations.length === 0 
                ? "Get started by adding your first charging station!" 
                : "Try adjusting your search criteria or filters"
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stations;
