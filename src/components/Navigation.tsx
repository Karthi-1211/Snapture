import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Camera, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/home" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Feedback", path: "/feedback" },
  ];

  return (
    <nav className="bg-white text-gray-900 shadow-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/home" className="flex items-center space-x-2 text-xl font-bold hover:opacity-80 transition-opacity">
            <div className="bg-blue-600 p-1.5 rounded-lg shadow-md">
              <Camera className="h-6 w-6 text-white" />
            </div>
            <span className="bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">
              Snapture
            </span>
            <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-[10px] text-white px-1.5 py-0.5 rounded-md font-black tracking-tighter shadow-md">
              PRO
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-semibold transition-all hover:text-blue-600 relative py-1 ${location.pathname === item.path
                  ? "text-blue-600"
                  : "text-gray-600"
                  }`}
              >
                {item.name}
                {location.pathname === item.path && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-full" />
                )}
              </Link>
            ))}
          </div>

          <div className="hidden md:block">
            <Link to="/photobooth">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 rounded-full px-6 font-bold">
                Launch Booth
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100 transition-all"
            >
              {isMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 animate-slide-up">
          <div className="px-4 pt-2 pb-6 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-4 text-lg font-bold rounded-xl transition-all ${location.pathname === item.path
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                  }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 px-3">
              <Link to="/photobooth" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 py-6 text-lg font-black rounded-2xl shadow-xl">
                  Open Photo Booth
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
