
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Zap, Shield, Users, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: <MapPin className="h-12 w-12 text-blue-500" />,
      title: "Smart Location Mapping",
      description: "Find charging stations with precision using our interactive map and real-time data.",
      gradient: "from-blue-400 to-blue-600"
    },
    {
      icon: <Zap className="h-12 w-12 text-green-500" />,
      title: "Real-Time Management",
      description: "Create, update, and manage charging stations with full CRUD operations.",
      gradient: "from-green-400 to-green-600"
    },
    {
      icon: <Shield className="h-12 w-12 text-purple-500" />,
      title: "Secure Platform",
      description: "Protected user authentication and secure data management for all users.",
      gradient: "from-purple-400 to-purple-600"
    },
    {
      icon: <Users className="h-12 w-12 text-orange-500" />,
      title: "Community Driven",
      description: "Contribute to the network by adding and updating charging station information.",
      gradient: "from-orange-400 to-orange-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Navigation */}
      <nav className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2 transform hover:scale-105 transition-transform duration-200">
              <div className="relative">
                <Zap className="h-8 w-8 text-blue-400 animate-pulse" />
                <div className="absolute inset-0 bg-blue-400 rounded-full blur-lg opacity-30 animate-ping"></div>
              </div>
              <span className="text-xl font-bold text-white">ChargeHub</span>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <Link to="/stations">
                    <Button variant="ghost" className="text-white hover:bg-white/20 transform hover:scale-105 transition-all duration-200">
                      <span className="text-white font-medium">Stations</span>
                    </Button>
                  </Link>
                  <Link to="/map">
                    <Button variant="ghost" className="text-white hover:bg-white/20 transform hover:scale-105 transition-all duration-200">
                      <span className="text-white font-medium">Map View</span>
                    </Button>
                  </Link>
                  <span className="text-sm text-white/80">Welcome, {user.email}</span>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="outline" className="border-white/30 text-white hover:bg-white/20 transform hover:scale-105 transition-all duration-200">
                      <span className="text-white font-medium">Login</span>
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg">
                      <span className="text-white font-medium">Get Started</span>
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full flex items-center justify-center animate-spin-slow">
                  <Sparkles className="h-10 w-10 text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full blur-xl opacity-50 animate-pulse"></div>
              </div>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
              Manage Your
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-green-400 bg-clip-text text-transparent block transform hover:scale-105 transition-transform duration-300">
                EV Charging Network
              </span>
            </h1>
            
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8 animate-fade-in">
              Complete charging station management platform with real-time CRUD operations, 
              interactive mapping, and secure user authentication.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              {user ? (
                <>
                  <Link to="/map">
                    <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-xl">
                      <MapPin className="mr-2 h-5 w-5 text-white" />
                      <span className="text-white font-medium">View Map</span>
                      <ArrowRight className="ml-2 h-5 w-5 text-white" />
                    </Button>
                  </Link>
                  <Link to="/stations">
                    <Button size="lg" variant="outline" className="px-8 py-4 border-white/30 text-white hover:bg-white/20 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 bg-transparent">
                      <span className="text-white font-medium">Manage Stations</span>
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/register">
                    <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-xl">
                      <span className="text-white font-medium">Get Started</span>
                      <ArrowRight className="ml-2 h-5 w-5 text-white" />
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button size="lg" variant="outline" className="px-8 py-4 border-white/30 text-white hover:bg-white/20 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 bg-transparent">
                      <span className="text-white font-medium">Sign In</span>
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Complete Charging Station Management
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Full CRUD operations, real-time updates, and interactive mapping for modern EV infrastructure.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 transition-all duration-500 hover:-translate-y-2 hover:scale-105 group cursor-pointer">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 relative">
                    <div className={`w-20 h-20 bg-gradient-to-r ${feature.gradient} rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform duration-300`}>
                      {feature.icon}
                    </div>
                    <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-full blur-xl opacity-50 group-hover:opacity-80 transition-opacity duration-300`}></div>
                  </div>
                  <CardTitle className="text-xl mb-2 group-hover:text-blue-300 transition-colors duration-300">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-white/70 group-hover:text-white/90 transition-colors duration-300">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-900/50 to-purple-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-12">
              Powerful Features for Modern EV Management
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="text-6xl md:text-7xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">100%</div>
                <div className="text-xl opacity-90">Real-time Updates</div>
              </div>
              <div className="text-center group">
                <div className="text-6xl md:text-7xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">CRUD</div>
                <div className="text-xl opacity-90">Full Operations</div>
              </div>
              <div className="text-center group">
                <div className="text-6xl md:text-7xl font-bold mb-2 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">Secure</div>
                <div className="text-xl opacity-90">Authentication</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Join our platform and start managing your charging station network today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <>
                <Link to="/stations">
                  <Button size="lg" className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white px-8 py-4 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-xl">
                    <span className="text-white font-medium">Manage Stations</span>
                  </Button>
                </Link>
                <Link to="/map">
                  <Button size="lg" variant="outline" className="px-8 py-4 border-white/30 text-white hover:bg-white/20 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 bg-transparent">
                    <span className="text-white font-medium">View Map</span>
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/register">
                  <Button size="lg" className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white px-8 py-4 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-xl">
                    <span className="text-white font-medium">Create Account</span>
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" variant="outline" className="px-8 py-4 border-white/30 text-white hover:bg-white/20 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 bg-transparent">
                    <span className="text-white font-medium">Sign In</span>
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/30 backdrop-blur-md text-white py-12 px-4 sm:px-6 lg:px-8 border-t border-white/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0 transform hover:scale-105 transition-transform duration-200">
              <Zap className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">ChargeHub</span>
            </div>
            <div className="text-white/60">
              © 2024 ChargeHub. Complete EV charging station management platform.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
