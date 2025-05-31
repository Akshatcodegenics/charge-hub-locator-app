
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Zap, Shield, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
  const features = [
    {
      icon: <MapPin className="h-12 w-12 text-blue-500" />,
      title: "Smart Location Mapping",
      description: "Find charging stations with precision using our interactive map and real-time data."
    },
    {
      icon: <Zap className="h-12 w-12 text-green-500" />,
      title: "Real-Time Status",
      description: "Check availability, power output, and connector types before you arrive."
    },
    {
      icon: <Shield className="h-12 w-12 text-purple-500" />,
      title: "Secure Platform",
      description: "Protected user authentication and secure data management for all users."
    },
    {
      icon: <Users className="h-12 w-12 text-orange-500" />,
      title: "Community Driven",
      description: "Contribute to the network by adding and updating charging station information."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Zap className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">ChargeHub</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/stations">
                <Button variant="ghost">Stations</Button>
              </Link>
              <Link to="/map">
                <Button variant="ghost">Map View</Button>
              </Link>
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/register">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
              Find Your Perfect
              <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent block">
                Charging Station
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 animate-fade-in">
              Discover, manage, and navigate to electric vehicle charging stations with our comprehensive platform. 
              Real-time availability, detailed specifications, and community-driven updates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              <Link to="/map">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3">
                  <MapPin className="mr-2 h-5 w-5" />
                  Explore Map
                </Button>
              </Link>
              <Link to="/stations">
                <Button size="lg" variant="outline" className="px-8 py-3">
                  View All Stations
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for EV Charging
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform provides comprehensive tools for finding, managing, and sharing charging station information.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-md">
                <CardHeader>
                  <div className="mx-auto mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-green-500">
        <div className="max-w-7xl mx-auto">
          <div className="text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-12">
              Growing Network of Charging Stations
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">1,200+</div>
                <div className="text-xl opacity-90">Active Stations</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">50+</div>
                <div className="text-xl opacity-90">Cities Covered</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">10k+</div>
                <div className="text-xl opacity-90">Happy Users</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join our community and help build the future of electric vehicle infrastructure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-3">
                Create Account
              </Button>
            </Link>
            <Link to="/stations">
              <Button size="lg" variant="outline" className="px-8 py-3">
                Browse Stations
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Zap className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">ChargeHub</span>
            </div>
            <div className="text-gray-400">
              © 2024 ChargeHub. Building the future of EV infrastructure.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
