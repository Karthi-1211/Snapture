import { Camera, Users, Award, Heart } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 font-inter relative overflow-hidden">
      {/* Subtle Particle Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="animate-particle-float bg-indigo-300/20 w-2 h-2 rounded-full absolute top-10 left-20"></div>
        <div className="animate-particle-float bg-pink-300/20 w-3 h-3 rounded-full absolute top-40 right-30 delay-1000"></div>
        <div className="animate-particle-float bg-purple-300/20 w-2 h-2 rounded-full absolute bottom-20 left-40 delay-2000"></div>
        <div className="animate-particle-float bg-blue-300/20 w-3 h-3 rounded-full absolute bottom-10 right-50 delay-3000"></div>
      </div>

      <Navigation />
      
      <main className="flex-1 py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Hero Section with Parallax Effect */}
          <div className="text-center mb-24 animate-in fade-in zoom-in duration-1200 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-pink-500/20 transform -skew-y-6 scale-110"></div>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight relative z-10">
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse-text">
                About Snapture
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-800 max-w-4xl mx-auto leading-relaxed relative z-10">
              Transform your moments into breathtaking memories with our state-of-the-art photobooth application, designed for effortless brilliance.
            </p>
          </div>

          {/* Mission Section with Glassmorphism */}
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-12 shadow-2xl mb-24 transform hover:scale-[1.03] transition-all duration-700 border border-white/20">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="animate-in slide-in-from-left duration-1000">
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">Our Vision</h2>
                <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">
                  We’re on a mission to make professional photography accessible to all, delivering studio-quality tools in a seamless, intuitive platform.
                </p>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                  From grand celebrations to intimate moments, Snapture ensures every shot is a masterpiece.
                </p>
              </div>
              <div className="flex justify-center animate-in slide-in-from-right duration-1000">
                <div className="bg-gradient-to-br from-indigo-300/50 to-pink-300/50 p-12 rounded-full shadow-2xl border border-white/30">
                  <Camera className="h-32 w-32 text-indigo-600 transform group-hover:rotate-12 transition-transform duration-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid with Interactive Hover Effects */}
          <div className="grid md:grid-cols-3 gap-8 mb-24">
            <div className="group text-center p-8 bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-3 transition-all duration-700 border border-indigo-100/50">
              <div className="bg-indigo-200/50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-indigo-300/70 group-hover:scale-110 transition-all duration-500">
                <Users className="h-12 w-12 text-indigo-600 group-hover:animate-bounce" />
              </div>
              <h3 className="text-2xl font-extrabold text-gray-900 mb-4 tracking-tight">Seamless Experience</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                An intuitive interface that empowers everyone to create stunning photos effortlessly.
              </p>
            </div>

            <div className="group text-center p-8 bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-3 transition-all duration-700 border border-purple-100/50">
              <div className="bg-purple-200/50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-300/70 group-hover:scale-110 transition-all duration-500">
                <Award className="h-12 w-12 text-purple-600 group-hover:animate-bounce" />
              </div>
              <h3 className="text-2xl font-extrabold text-gray-900 mb-4 tracking-tight">Pro-Grade Tools</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                Advanced editing features that rival the best professional photography software.
              </p>
            </div>

            <div className="group text-center p-8 bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-3 transition-all duration-700 border border-pink-100/50">
              <div className="bg-pink-200/50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-pink-300/70 group-hover:scale-110 transition-all duration-500">
                <Heart className="h-12 w-12 text-pink-600 group-hover:animate-bounce" />
              </div>
              <h3 className="text-2xl font-extrabold text-gray-900 mb-4 tracking-tight">Crafted with Heart</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                Built with passion to deliver unforgettable, delightful user experiences.
              </p>
            </div>
          </div>

          {/* Technology Section with Dynamic Animations */}
          <div className="bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 rounded-3xl p-12 text-white mb-24 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-pink-500/20 animate-pulse-slow"></div>
            <div className="text-center animate-in fade-in duration-1000 relative z-10">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">Fueled by Innovation</h2>
              <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed">
                Snapture leverages cutting-edge technologies to deliver unparalleled performance and a breathtaking experience on any device.
              </p>
              <div className="grid md:grid-cols-4 gap-6 text-center">
                <div className="group animate-in zoom-in duration-1000 delay-100">
                  <div className="bg-white/30 backdrop-blur-sm rounded-xl p-6 mb-2 group-hover:bg-white/40 group-hover:scale-105 transition-all duration-500">
                    <span className="text-2xl font-bold">React</span>
                  </div>
                  <p className="text-indigo-100">Dynamic UI Framework</p>
                </div>
                <div className="group animate-in zoom-in duration-1000 delay-200">
                  <div className="bg-white/30 backdrop-blur-sm rounded-xl p-6 mb-2 group-hover:bg-white/40 group-hover:scale-105 transition-all duration-500">
                    <span className="text-2xl font-bold">TypeScript</span>
                  </div>
                  <p className="text-indigo-100">Type-Safe Coding</p>
                </div>
                <div className="group animate-in zoom-in duration-1000 delay-300">
                  <div className="bg-white/30 backdrop-blur-sm rounded-xl p-6 mb-2 group-hover:bg-white/40 group-hover:scale-105 transition-all duration-500">
                    <span className="text-2xl font-bold">Tailwind</span>
                  </div>
                  <p className="text-indigo-100">Stunning Styling</p>
                </div>
                <div className="group animate-in zoom-in duration-1000 delay-400">
                  <div className="bg-white/30 backdrop-blur-sm rounded-xl p-6 mb-2 group-hover:bg-white/40 group-hover:scale-105 transition-all duration-500">
                    <span className="text-2xl font-bold">WebRTC</span>
                  </div>
                  <p className="text-indigo-100">Flawless Camera Integration</p>
                </div>
              </div>
            </div>
          </div>

          {/* Developer Section with Hover Glow */}
          <div className="text-center bg-white/80 backdrop-blur-lg rounded-3xl p-12 shadow-2xl animate-in fade-in duration-1000 border border-white/20">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">Meet the Creator</h2>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
              Snapture was brought to life by <b><i>Balu KarthiK</i></b>, a visionary full-stack developer with three years of experience crafting innovative, user-centric web applications.
            </p>
            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-4 px-8 rounded-full inline-block transform hover:scale-110 hover:shadow-glow transition-all duration-500">
              <span className="text-lg font-semibold">Designed & Developed by Balu KarthiK</span>
            </div>
          </div>

        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutPage;