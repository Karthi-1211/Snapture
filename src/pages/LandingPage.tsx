
import { Link } from "react-router-dom";
import { Camera, Sparkles, Download, Palette, Star, Zap, Heart, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-20 animate-bounce">
        <Star className="h-6 w-6 text-yellow-400" />
      </div>
      <div className="absolute top-40 right-32 animate-bounce delay-300">
        <Sparkles className="h-8 w-8 text-pink-400" />
      </div>
      <div className="absolute bottom-40 left-32 animate-bounce delay-700">
        <Heart className="h-6 w-6 text-red-400" />
      </div>
      <div className="absolute bottom-20 right-20 animate-bounce delay-1000">
        <Crown className="h-7 w-7 text-yellow-500" />
      </div>

      {/* Hero Section */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center animate-fade-in">
            {/* Logo/Icon Section */}
            <div className="flex justify-center mb-12">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full blur-lg opacity-75 animate-pulse"></div>
                <div className="relative bg-gradient-to-r from-pink-500 to-purple-600 p-8 rounded-full shadow-2xl">
                  <Camera className="h-16 w-16 text-white" />
                </div>
                <div className="absolute -top-4 -right-4 bg-yellow-400 rounded-full p-2 animate-spin">
                  <Zap className="h-6 w-6 text-yellow-900" />
                </div>
              </div>
            </div>
            
            {/* Main Title */}
            <h1 className="text-7xl md:text-8xl font-black mb-8 leading-tight">
              <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
                PhotoBooth
              </span>
              <br />
              <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                Pro
              </span>
            </h1>
            
            {/* Subtitle */}
            <div className="mb-12">
              <p className="text-2xl md:text-3xl text-white/90 mb-4 font-light">
                ✨ Create <span className="font-bold text-pink-300">Magical</span> Photos ✨
              </p>
              <p className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed">
                Transform your moments into stunning masterpieces with our revolutionary photobooth. 
                Professional layouts, incredible filters, and instant magic at your fingertips!
              </p>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Link to="/home">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 text-white px-12 py-6 text-xl font-bold shadow-2xl hover:shadow-pink-500/50 transform hover:scale-110 transition-all duration-300 rounded-full border-2 border-white/20"
                >
                  <Sparkles className="mr-3 h-6 w-6" />
                  Start Creating Magic
                </Button>
              </Link>
              <Link to="/about">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-white/30  hover:bg-white/10 px-8 py-6 text-lg font-semibold rounded-full backdrop-blur-sm"
                >
                  Discover More
                </Button>
              </Link>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
              <div className="text-center">
                <div className="text-4xl font-bold text-pink-400 mb-2">50K+</div>
                <div className="text-white/80">Happy Users</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-400 mb-2">1M+</div>
                <div className="text-white/80">Photos Created</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">25+</div>
                <div className="text-white/80">Filters & Effects</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-400 mb-2">6</div>
                <div className="text-white/80">Pro Layouts</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 py-20 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">
              🎨 Incredible Features
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Everything you need to create professional-quality photos
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative text-center p-8 rounded-3xl bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <div className="bg-gradient-to-r from-pink-500 to-purple-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                  <Camera className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">6 Pro Layouts</h3>
                <p className="text-white/80 text-lg">
                  Choose from professionally designed layouts that make every photo look amazing
                </p>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative text-center p-8 rounded-3xl bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                  <Palette className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Magic Filters</h3>
                <p className="text-white/80 text-lg">
                  Transform your photos with stunning filters and customizable frame colors
                </p>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative text-center p-8 rounded-3xl bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                  <Download className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Instant Download</h3>
                <p className="text-white/80 text-lg">
                  Get your beautiful photo strips instantly in high quality
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/30 to-purple-500/30 rounded-3xl blur-3xl"></div>
            <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-12">
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Ready to Create Magic? ✨
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Join thousands of users creating unforgettable memories with PhotoBooth Pro
              </p>
              <Link to="/home">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 hover:from-yellow-500 hover:via-orange-600 hover:to-red-600 text-white px-12 py-6 text-xl font-bold shadow-2xl hover:shadow-yellow-500/50 transform hover:scale-110 transition-all duration-300 rounded-full"
                >
                  <Crown className="mr-3 h-6 w-6" />
                  Start Your Journey
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
