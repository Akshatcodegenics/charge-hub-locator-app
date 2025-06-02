
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedBackground from "@/components/AnimatedBackground";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="page-container flex items-center justify-center">
      <AnimatedBackground />
      
      <div className="text-center relative z-10 animate-fade-in">
        <div className="mb-8">
          <h1 className="text-8xl font-bold gradient-text mb-4 font-poppins animate-bounce-soft">404</h1>
          <h2 className="text-3xl font-semibold text-black mb-2 font-poppins">Page Not Found</h2>
          <p className="text-xl text-gray-700 mb-8 font-inter">
            Oops! The page you're looking for doesn't exist.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover-lift font-inter">
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Button>
          </Link>
          
          <Button 
            variant="outline" 
            onClick={() => window.history.back()}
            className="border-gray-300 text-black hover:bg-gray-100 hover-lift font-inter"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>
        
        <div className="mt-12 text-gray-600 font-inter">
          <p>Lost? Try navigating back to familiar territory.</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
