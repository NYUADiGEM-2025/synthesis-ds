import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";

export function Navigation() {
  const location = useLocation();
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-foreground font-inter">
            Synthesis
          </Link>
          
          <div className="flex gap-2">
            <Link to="/">
              <Button 
                variant={location.pathname === "/" ? "default" : "ghost"}
                className="font-inter"
              >
                Home
              </Button>
            </Link>
            <Link to="/simulator">
              <Button 
                variant={location.pathname === "/simulator" ? "default" : "ghost"}
                className="font-inter"
              >
                Simulator
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
