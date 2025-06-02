
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Zap, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import AnimatedBackground from '@/components/AnimatedBackground';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/stations');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const { error } = await signIn(email, password);
    
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success",
        description: "Logged in successfully!"
      });
      navigate('/stations');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="page-container flex items-center justify-center p-4">
      <AnimatedBackground />
      
      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8 animate-fade-in">
          <Link to="/" className="inline-flex items-center space-x-2 hover-glow rounded-lg px-4 py-2">
            <Zap className="h-12 w-12 text-blue-600 animate-pulse-glow" />
            <span className="text-3xl font-bold gradient-text font-poppins">ChargeHub</span>
          </Link>
          <p className="text-gray-700 mt-3 font-inter text-lg">Welcome back to your charging network</p>
        </div>

        {/* Login Form */}
        <Card className="glass-card shadow-2xl border-gray-300 animate-scale-in">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center text-black font-poppins">Sign in</CardTitle>
            <CardDescription className="text-center text-gray-700 font-inter">
              Enter your email and password to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-black font-inter">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11 bg-white border-gray-300 text-black placeholder-gray-500 focus:border-blue-500"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-black font-inter">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-11 pr-10 bg-white border-gray-300 text-black placeholder-gray-500 focus:border-blue-500"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover-lift font-inter"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </form>

            <p className="text-center text-sm text-gray-700 mt-6 font-inter">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-600 hover:text-blue-500 font-medium hover-glow">
                Sign up
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
