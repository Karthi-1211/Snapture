import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCamera } from "@/hooks/useCamera";
import { CameraCaptureProps, Filter } from "@/types/camera";
import CameraCountdown from "@/components/CameraCountdown";
import CameraControls from "@/components/CameraControls";
import FilterBar from "@/components/FilterBar";
import PhotoPreview from "@/components/PhotoPreview";

const filters: Filter[] = [
  { id: "none", name: "Original", css: "none" },
  { id: "vintage", name: "Vintage", css: "sepia(0.8) contrast(1.2) brightness(1.1)" },
  { id: "bw", name: "B&W", css: "grayscale(1)" },
  { id: "sepia", name: "Sepia", css: "sepia(1)" },
  { id: "vibrant", name: "Vibrant", css: "contrast(1.4) saturate(1.8)" },
  { id: "cool", name: "Cool", css: "hue-rotate(180deg) saturate(1.2)" },
  { id: "warm", name: "Warm", css: "hue-rotate(30deg) saturate(1.3) brightness(1.1)" },
  { id: "crosshatch", name: "Crosshatch", css: "contrast(1.3) brightness(0.9)" },
  { id: "noir", name: "Noir", css: "grayscale(1) contrast(1.5) brightness(0.8)" },
  { id: "retro", name: "Retro", css: "sepia(0.5) saturate(1.5) hue-rotate(20deg)" },
  { id: "dreamy", name: "Dreamy", css: "blur(0.5px) brightness(1.2) saturate(0.8)" },
  { id: "neon", name: "Neon", css: "saturate(2) contrast(1.3) hue-rotate(90deg)" },
  { id: "sunset", name: "Sunset", css: "sepia(0.3) saturate(1.4) hue-rotate(350deg)" },
  { id: "arctic", name: "Arctic", css: "saturate(0.8) brightness(1.1) hue-rotate(200deg)" },
  { id: "dramatic", name: "Dramatic", css: "contrast(1.8) saturate(0.9) brightness(0.9)" },
];

const CameraCapture: React.FC<CameraCaptureProps> = ({
  selectedLayout,
  photoCount,
  onAllPhotosCapture,
}) => {
  const [timerDuration, setTimerDuration] = useState(3);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showCurtain, setShowCurtain] = useState(true);

  const {
    videoRef,
    canvasRef,
    capturedPhotos,
    currentPhotoIndex,
    selectedFilter,
    setSelectedFilter,
    cameraStarted,
    cameraError,
    isLoading,
    startCamera,
    capturePhoto,
    addUploadedPhotos,
    getFilterCSS,
    resetCamera,
  } = useCamera(photoCount, onAllPhotosCapture);

  // Start camera when curtain is opened
  useEffect(() => {
    if (!showCurtain && !cameraStarted && !isLoading) {
      console.log("Starting camera due to curtain open");
      startCamera();
    }
  }, [showCurtain, cameraStarted, isLoading, startCamera]);

  // Ensure video stream is active when minimizing
  useEffect(() => {
    if (cameraStarted && !isMinimized && videoRef.current && !videoRef.current.srcObject && !isLoading) {
      console.log("Restarting camera stream for non-minimized mode");
      startCamera();
    }
  }, [isMinimized, cameraStarted, isLoading, startCamera, videoRef]);

  const startCountdown = () => {
    if (isCapturing || currentPhotoIndex >= photoCount) return;

    setIsCapturing(true);
    setCountdown(timerDuration);

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(timer);
          capturePhoto();
          setIsCapturing(false);
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleCameraStart = () => {
    setShowCurtain(false);
  };

  const handleRetryCamera = () => {
    resetCamera();
    setShowCurtain(true);
  };

  const handlePhotosUpload = (photoUrls: string[]) => {
    addUploadedPhotos(photoUrls);
  };

  if (!cameraStarted) {
    return (
      <div className="space-y-6 animate-fade-in">
        <video ref={videoRef} playsInline muted className="hidden" />

        <Card className="p-8 bg-gradient-to-br from-pink-50 to-purple-50 border-2 border-pink-200">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              🎯 Ready to Capture {photoCount} Amazing Photos!
            </h3>

            <p className="text-lg text-gray-700 mb-8">
              Selected Layout:{" "}
              <span className="font-bold text-purple-600">{selectedLayout}</span>
            </p>

            <div className="relative w-96 h-64 mx-auto bg-gradient-to-br from-red-600 to-red-700 rounded-2xl overflow-hidden border-4 border-gray-800 shadow-2xl">
              <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-red-800 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                📸 Snapture
              </div>

              <div
                className={`absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 transition-transform duration-1000 ${
                  showCurtain ? "translate-x-0" : "translate-x-full"
                }`}
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(90deg, #dc2626 0px, #dc2626 8px, #b91c1c 8px, #b91c1c 16px)",
                }}
              />

              <Button
                onClick={handleCameraStart}
                disabled={isLoading}
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold px-8 py-3 rounded-full shadow-xl hover:scale-110 transition-all disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-black border-t-transparent mr-2"></div>
                    Starting…
                  </>
                ) : (
                  <>🪙 Click on the Coin 🪙</>
                )}
              </Button>
            </div>

            {cameraError && (
              <div className="mt-6 p-6 bg-red-50 border-2 border-red-200 rounded-xl">
                <p className="text-red-700 font-bold text-lg mb-2">
                  ❌ Camera Error:
                </p>
                <p className="text-red-600 mb-4">{cameraError}</p>
                <Button
                  onClick={handleRetryCamera}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold"
                >
                  🔄 Try Again
                </Button>
              </div>
            )}

            <p className="text-gray-600 mt-6 text-lg">
              🎬 Click the coin button to start your photo session!
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in pb-24">
      <Card className="p-6 bg-gradient-to-br from-pink-50 to-purple-50 border-2 border-pink-200">
        <div className="text-center mb-4">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            📸 Photo {currentPhotoIndex + 1} of {photoCount} – {selectedLayout}
          </h3>
          <p className="text-lg text-gray-700">
            🎯 Capture or upload your photos!{" "}
            {photoCount - currentPhotoIndex} photos remaining
          </p>
        </div>

        <CameraControls
          timerDuration={timerDuration}
          setTimerDuration={setTimerDuration}
          isCapturing={isCapturing}
          currentPhotoIndex={currentPhotoIndex}
          photoCount={photoCount}
          isMinimized={isMinimized}
          setIsMinimized={setIsMinimized}
          onStartCountdown={startCountdown}
          onPhotosUpload={handlePhotosUpload}
        />
      </Card>

      {cameraStarted && (
        <div className="relative max-w-4xl mx-auto">
          <div
            className={`relative overflow-hidden rounded-2xl shadow-2xl bg-black transition-all duration-300 ${
              isMinimized ? "w-64 h-48" : "w-full h-auto"
            }`}
          >
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
                <div className="animate-spin rounded-full h-8 w-8 border-4 border-white border-t-transparent"></div>
              </div>
            )}

            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-auto object-cover"
              style={{
                filter: getFilterCSS(selectedFilter),
                minHeight: isMinimized ? "48px" : "400px",
                maxHeight: isMinimized ? "48px" : "600px",
                background: "#000",
              }}
            />

            <CameraCountdown countdown={countdown} />

            <FilterBar
              filters={filters}
              selectedFilter={selectedFilter}
              onFilterSelect={setSelectedFilter}
            />
          </div>
        </div>
      )}

      <PhotoPreview capturedPhotos={capturedPhotos} photoCount={photoCount} />

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default CameraCapture;