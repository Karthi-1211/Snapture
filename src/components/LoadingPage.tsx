
import { useEffect, useState } from 'react';

const LoadingPage = () => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing Snapture...');

  useEffect(() => {
    const loadingSteps = [
      { text: 'Initializing Snapture...', duration: 500 },
      { text: 'Loading camera modules...', duration: 800 },
      { text: 'Preparing filters and effects...', duration: 600 },
      { text: 'Setting up photo layouts...', duration: 700 },
      { text: 'Almost ready...', duration: 400 }
    ];

    let currentStep = 0;
    let currentProgress = 0;

    const updateLoading = () => {
      if (currentStep < loadingSteps.length) {
        setLoadingText(loadingSteps[currentStep].text);
        
        const stepProgress = 100 / loadingSteps.length;
        const targetProgress = (currentStep + 1) * stepProgress;
        
        const progressInterval = setInterval(() => {
          currentProgress += 3;
          setProgress(Math.min(currentProgress, targetProgress));
          
          if (currentProgress >= targetProgress) {
            clearInterval(progressInterval);
            currentStep++;
            
            if (currentStep < loadingSteps.length) {
              setTimeout(updateLoading, 200);
            }
          }
        }, 50);
      }
    };

    updateLoading();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 text-center">
        {/* Logo Animation */}
        <div className="mb-12">
          <div className="relative">
            <div className="w-32 h-32 mx-auto bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-6xl animate-bounce shadow-2xl">
              📸
            </div>
            <div className="absolute -inset-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full blur-lg opacity-50 animate-pulse"></div>
          </div>
        </div>

        {/* Brand Name */}
        <h1 className="text-6xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mb-4 animate-fade-in">
          Snapture
        </h1>
        
        <p className="text-xl text-white/80 mb-12 animate-fade-in delay-500">
          Creating magical moments, one photo at a time
        </p>

        {/* Progress Bar */}
        <div className="w-96 mx-auto mb-8">
          <div className="bg-white/20 rounded-full h-3 backdrop-blur-sm">
            <div 
              className="bg-gradient-to-r from-pink-500 to-purple-600 h-3 rounded-full transition-all duration-300 ease-out shadow-lg"
              style={{ width: `${progress}%` }}
            >
              <div className="h-full bg-white/30 rounded-full animate-pulse"></div>
            </div>
          </div>
          <div className="text-center mt-4">
            <span className="text-white/90 text-lg font-medium">{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Loading Text */}
        <p className="text-white/70 text-lg mb-8 h-6 transition-all duration-300">
          {loadingText}
        </p>

        {/* Animated Dots */}
        <div className="flex justify-center space-x-2">
          <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce delay-100"></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-200"></div>
        </div>

        {/* Feature Highlights */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="text-center animate-fade-in delay-1000">
            <div className="text-4xl mb-2">🎯</div>
            <p className="text-white/60 text-sm">Multiple Layouts</p>
          </div>
          <div className="text-center animate-fade-in delay-1200">
            <div className="text-4xl mb-2">🎨</div>
            <p className="text-white/60 text-sm">Creative Filters</p>
          </div>
          <div className="text-center animate-fade-in delay-1400">
            <div className="text-4xl mb-2">⬇️</div>
            <p className="text-white/60 text-sm">Instant Download</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
