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
    <div className="flex flex-col items-center space-y-4 md:space-y-6 w-full max-w-lg mx-auto">
      {/* Top row: Timer & Upload */}
      <div className="flex flex-wrap items-center justify-center gap-3 w-full">
        <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-white/10 flex-1 min-w-[140px] justify-center">
          <Timer className="h-4 w-4 text-pink-400" />
          <Select
            value={timerDuration.toString()}
            onValueChange={(value) => setTimerDuration(parseInt(value))}
          >
            <SelectTrigger className="w-24 h-8 border-none bg-transparent text-white font-bold text-xs focus:ring-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-indigo-900 border-indigo-700 text-white">
              <SelectItem value="3">3s Timer</SelectItem>
              <SelectItem value="5">5s Timer</SelectItem>
              <SelectItem value="10">10s Timer</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={() => fileInputRef.current?.click()}
          variant="outline"
          size="sm"
          className="flex-1 min-w-[140px] bg-white/10 border-white/10 text-white hover:bg-white/20 rounded-2xl h-11 font-bold text-xs"
        >
          <Upload className="h-4 w-4 mr-2" />
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

      {/* Main Action Area */}
      <div className="w-full flex justify-center py-2 relative">
        <Button
          onClick={onStartCountdown}
          disabled={isCapturing || currentPhotoIndex >= photoCount}
          size="lg"
          className="w-full h-16 md:h-20 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:opacity-90 text-white rounded-3xl shadow-2xl transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          {isCapturing ? (
            <div className="flex items-center space-x-3">
              <Timer className="h-6 w-6 md:h-8 md:w-8 animate-spin" />
              <span className="text-lg md:text-2xl font-black">GET READY!</span>
            </div>
          ) : currentPhotoIndex >= photoCount ? (
            <span className="text-lg md:text-xl font-black">GO TO NEXT STEP →</span>
          ) : (
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-xl group-hover:scale-110 transition-transform">
                <Camera className="h-6 w-6 md:h-8 md:w-8" />
              </div>
              <div className="text-left leading-tight">
                <p className="text-sm font-bold opacity-70 uppercase tracking-widest">Strike a Pose!</p>
                <p className="text-xl md:text-2xl font-black">CAPTURE SHOT {currentPhotoIndex + 1}</p>
              </div>
            </div>
          )}
        </Button>

        {/* Minimize Button */}
        <div className="absolute -top-12 right-0 md:static md:mt-2">
          <Button
            onClick={() => setIsMinimized(!isMinimized)}
            size="icon"
            variant="ghost"
            className="text-white hover:bg-white/10"
            title={isMinimized ? "Maximize" : "Minimize"}
          >
            {isMinimized ? <Maximize className="h-6 w-6" /> : <Minimize className="h-6 w-6" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CameraControls;