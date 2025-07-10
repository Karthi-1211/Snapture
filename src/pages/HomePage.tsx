import { useState } from "react";
import { Link } from "react-router-dom";
import { Camera, Play, Sparkles, Star, Zap, Heart, Crown, Palette, Download, Timer, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const FeatureCard = ({ title, description, icon, gradient, shadowColor, animation, delay }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2; // Mouse X relative to card center
    const y = e.clientY - rect.top - rect.height / 2; // Mouse Y relative to card center
    const tiltX = (y / rect.height) * 50; // Max 20deg tilt on X-axis
    const tiltY = -(x / rect.width) * 50; // Max 20deg tilt on Y-axis
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 }); // Reset tilt when mouse leaves
  };

  return (
    <div
      className={`relative group ${animation} duration-1000 delay-${delay}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`absolute inset-0 ${gradient} rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300`}></div>
      <div
        className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl hover:shadow-[var(--shadow-color)] transition-all duration-300 transform hover:scale-105 border border-white/20"
        style={{
          '--shadow-color': shadowColor,
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: 'transform 0.2s ease',
        }}
      >
        <div className={`bg-gradient-to-r ${gradient.replace('/30', '')} w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-2xl mx-auto`}>
          {icon}
        </div>
        <h3 className="text-xl font-bold text-white mb-4 text-center">{title}</h3>
        <p className="text-white/80 text-center text-base">{description}</p>
      </div>
    </div>
  );
};

const HomePage = () => {
  const features = [
    {
      title: "Pro Layout Options",
      description: "Choose from 6 professionally designed layouts for your perfect photo strip",
      icon: <span className="text-2xl font-bold text-white">6</span>,
      gradient: "from-blue-500/30 to-cyan-500/30",
      shadowColor: "rgba(59, 130, 246, 0.3)",
      animation: "animate-in slide-in-from-left",
      delay: 700,
    },
    {
      title: "Magic Filters",
      description: "Apply stunning filters and effects to enhance your photos",
      icon: <Palette className="h-8 w-8 text-white" />,
      gradient: "from-purple-500/30 to-pink-500/30",
      shadowColor: "rgba(168, 85, 247, 0.3)",
      animation: "animate-in slide-in-from-right",
      delay: 300,
    },
    {
      title: "Smart Timer",
      description: "Set custom timer for perfect photo timing every time",
      icon: <Timer className="h-8 w-8 text-white" />,
      gradient: "from-green-500/30 to-emerald-500/30",
      shadowColor: "rgba(16, 185, 129, 0.3)",
      animation: "animate-in slide-in-from-left",
      delay: 400,
    },
    {
      title: "Custom Frame Colors",
      description: "Choose from beautiful frame colors to match your style",
      icon: <span className="text-2xl">🎨</span>,
      gradient: "from-pink-500/30 to-rose-500/30",
      shadowColor: "rgba(244, 63, 94, 0.3)",
      animation: "animate-in slide-in-from-right",
      delay: 500,
    },
    {
      title: "Mobile Ready",
      description: "Works perfectly on all devices and screen sizes",
      icon: <Smartphone className="h-8 w-8 text-white" />,
      gradient: "from-yellow-500/30 to-orange-500/30",
      shadowColor: "rgba(245, 158, 11, 0.3)",
      animation: "animate-in slide-in-from-left",
      delay: 600,
    },
    {
      title: "Instant Download",
      description: "Download your masterpieces instantly in high quality",
      icon: <Download className="h-8 w-8 text-white" />,
      gradient: "from-indigo-500/30 to-blue-500/30",
      shadowColor: "rgba(99, 102, 241, 0.3)",
      animation: "animate-in slide-in-from-right",
      delay: 700,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 font-inter relative overflow-hidden">
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl animate-pulse-slow delay-2000"></div>
      </div>

      {/* Enhanced Floating Sparkles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-32 left-16 animate-particle-float">
          <Star className="h-4 w-4 text-yellow-400 opacity-70 transform hover:scale-125 transition-all duration-500" />
        </div>
        <div className="absolute top-48 right-24 animate-particle-float delay-300">
          <Sparkles className="h-5 w-5 text-pink-400 opacity-70 transform hover:scale-125 transition-all duration-500" />
        </div>
        <div className="absolute bottom-56 left-24 animate-particle-float delay-700">
          <Heart className="h-4 w-4 text-red-400 opacity-70 transform hover:scale-125 transition-all duration-500" />
        </div>
        <div className="absolute bottom-32 right-32 animate-particle-float delay-1000">
          <Crown className="h-5 w-5 text-yellow-500 opacity-70 transform hover:scale-125 transition-all duration-500" />
        </div>
        <div className="absolute top-2/3 left-12 animate-particle-float delay-1500">
          <Zap className="h-4 w-4 text-blue-400 opacity-70 transform hover:scale-125 transition-all duration-500" />
        </div>
        <div className="absolute top-1/4 right-16 animate-particle-float delay-2000">
          <Sparkles className="h-4 w-4 text-purple-400 opacity-70 transform hover:scale-125 transition-all duration-500" />
        </div>
      </div>

      <Navigation />
      
      <main className="flex-1 py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-20 animate-in slide-in-from-top duration-1200">
            <div className="flex justify-center mb-12">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full blur-2xl opacity-60 animate-pulse"></div>
                <div className="relative bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 p-8 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-500">
                  <Camera className="h-20 w-20 text-white animate-spin-slow" />
                </div>
                <div className="absolute -top-6 -right-6 bg-yellow-400 rounded-full p-3 animate-spin">
                  <Sparkles className="h-8 w-8 text-yellow-900" />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-green-400 rounded-full p-2 animate-bounce">
                  <Star className="h-6 w-6 text-green-900" />
                </div>
              </div>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-black mb-8 leading-tight">
              <span className="bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-pulse-text">
                Welcome to
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse-text">
                Snapture
              </span>
            </h1>
            
            <div className="mb-12">
              <p className="text-2xl text-white/90 mb-4 font-light animate-in fade-in duration-1000 delay-200">
                ✨ <span className="font-bold text-pink-300">Create</span> • <span className="font-bold text-purple-300">Customize</span> • <span className="font-bold text-blue-300">Capture</span> ✨
              </p>
              <p className="text-xl text-white/80 mb-8 max-w-4xl mx-auto leading-relaxed animate-in fade-in duration-1000 delay-400">
                Transform your photos into stunning masterpieces with professional layouts, magical filters, 
                customizable frames, and instant downloads. Your perfect photo experience starts here!
              </p>
            </div>
            
            <Link to="/photobooth">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 text-white px-16 py-8 text-2xl font-bold shadow-2xl hover:shadow-pink-500/50 transform hover:scale-110 hover:rotate-2 transition-all duration-300 rounded-full border-2 border-white/20 animate-pulse"
              >
                <Play className="mr-4 h-8 w-8 animate-bounce" />
                Start Your Snapture Experience
              </Button>
            </Link>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-24">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>

          {/* Call to Action Section */}
          <div className="mt-24 text-center animate-in slide-in-from-bottom duration-1000 delay-900">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-blue-500/20 rounded-3xl blur-3xl animate-pulse-slow"></div>
              <div className="relative bg-white/5 backdrop-blur-lg border border-white/20 rounded-3xl p-16">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  🚀 Ready to Create Something Amazing?
                </h2>
                <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto animate-in fade-in duration-1000 delay-1100">
                  Don't wait! Start creating your perfect photo strips right now and experience the magic.
                </p>
                <Link to="/photobooth">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 hover:from-yellow-500 hover:via-orange-600 hover:to-red-600 text-white px-12 py-6 text-xl font-bold shadow-2xl hover:shadow-yellow-500/50 transform hover:scale-110 hover:rotate-2 transition-all duration-300 rounded-full animate-pulse"
                  >
                    <Crown className="mr-3 h-6 w-6 animate-bounce" />
                    Launch Snapture Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;