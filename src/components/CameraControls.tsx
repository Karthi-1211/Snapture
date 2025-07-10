import { useState, useRef, useEffect } from "react";
import { Camera, Timer, Upload, Minimize, Maximize } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface CameraControlsProps {
  timerDuration: number;
  setTimerDuration: (duration: number) => void;
  isCapturing: boolean;
  currentPhotoIndex: number;
  photoCount: number;
  isMinimized: boolean;
  setIsMinimized: (minimized: boolean) => void;
  onStartCountdown: () => void;
  onPhotosUpload: (photoUrls: string[]) => void;
}

const CameraControls: React.FC<CameraControlsProps> = ({
  timerDuration,
  setTimerDuration,
  isCapturing,
  currentPhotoIndex,
  photoCount,
  isMinimized,
  setIsMinimized,
  onStartCountdown,
  onPhotosUpload,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      const photoPromises = fileArray.map((file) => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            resolve(e.target?.result as string);
          };
          reader.readAsDataURL(file);
        });
      });

      Promise.all(photoPromises).then((photoUrls) => {
        onPhotosUpload(photoUrls);
        toast.success(`${photoUrls.length} photo(s) uploaded successfully!`);
      });
    }

    // Reset the input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <>
      {/* Top Controls */}
      <div className="flex justify-center items-center space-x-6 mb-6">
        <div className="flex items-center space-x-2">
          <Timer className="h-5 w-5 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Timer:</span>
          <Select
            value={timerDuration.toString()}
            onValueChange={(value) => setTimerDuration(parseInt(value))}
          >
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3">3 seconds</SelectItem>
              <SelectItem value="5">5 seconds</SelectItem>
              <SelectItem value="10">10 seconds</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={() => fileInputRef.current?.click()}
          variant="outline"
          className="flex items-center space-x-2"
        >
          <Upload className="h-4 w-4" />
          <span>Upload Photos</span>
        </Button>

        <Input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>

      {/* Video Controls - Top Right */}
      <div className="absolute top-4 right-4 z-10 flex space-x-2">
        <Button
          onClick={() => setIsMinimized(!isMinimized)}
          size="sm"
          variant="secondary"
          className="bg-white/80 hover:bg-white/90"
          title={isMinimized ? "Maximize" : "Minimize"}
        >
          {isMinimized ? <Maximize className="h-4 w-4" /> : <Minimize className="h-4 w-4" />}
        </Button>
      </div>

      {/* Capture Button */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-30">
        <Button
          onClick={onStartCountdown}
          disabled={isCapturing || currentPhotoIndex >= photoCount}
          size="lg"
          className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-8 py-4 rounded-full shadow-xl transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isCapturing ? (
            <>
              <Timer className="mr-2 h-5 w-5 animate-spin" />
              Capturing...
            </>
          ) : currentPhotoIndex >= photoCount ? (
            "All Photos Captured!"
          ) : (
            <>
              <Camera className="mr-2 h-5 w-5" />
              Capture Photo {currentPhotoIndex + 1}
            </>
          )}
        </Button>
      </div>
    </>
  );
};

export default CameraControls;