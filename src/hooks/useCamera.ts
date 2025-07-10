
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";

export const useCamera = (
  photoCount: number,
  onAllPhotosCapture: (photos: string[], selectedFilter: string) => void
) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedPhotos, setCapturedPhotos] = useState<string[]>([]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState("none");

  const [cameraStarted, setCameraStarted] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  /* ---------------- attach MediaStream to the <video> element ---------------- */
  useEffect(() => {
    if (!stream || !videoRef.current) return;

    const video = videoRef.current;
    video.srcObject = stream;
    video.autoplay = true;
    video.playsInline = true;
    video.muted = true;

    const handleCanPlay = () => {
      setCameraStarted(true);
      setIsLoading(false);
      toast.success("🎉 Camera ready! Start capturing your photos.");
    };

    const handleError = () => {
      setCameraError("Video display error - please try again");
      setIsLoading(false);
    };

    video.addEventListener("canplay", handleCanPlay, { once: true });
    video.addEventListener("error", handleError, { once: true });

    // fallback in case canplay never fires (older browsers)
    const fallback = setTimeout(() => {
      if (!cameraStarted) {
        setCameraStarted(true);
        setIsLoading(false);
      }
    }, 3000);

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("error", handleError);
      clearTimeout(fallback);
    };
  }, [stream, cameraStarted]);
  /* --------------------------------------------------------------------------- */

  /* ---------------- stop stream on unmount ----------------------------------- */
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((t) => t.stop());
      }
    };
  }, [stream]);
  /* --------------------------------------------------------------------------- */

  const getFilterCSS = (filter: string) => {
    const filters: Record<string, string> = {
      none: "none",
      vintage: "sepia(0.8) contrast(1.2) brightness(1.1)",
      bw: "grayscale(1)",
      sepia: "sepia(1)",
      vibrant: "contrast(1.4) saturate(1.8)",
      cool: "hue-rotate(180deg) saturate(1.2)",
      warm: "hue-rotate(30deg) saturate(1.3) brightness(1.1)",
      crosshatch: "contrast(1.3) brightness(0.9)",
      noir: "grayscale(1) contrast(1.5) brightness(0.8)",
      retro: "sepia(0.5) saturate(1.5) hue-rotate(20deg)",
      dreamy: "blur(0.5px) brightness(1.2) saturate(0.8)",
      neon: "saturate(2) contrast(1.3) hue-rotate(90deg)",
      sunset: "sepia(0.3) saturate(1.4) hue-rotate(350deg)",
      arctic: "saturate(0.8) brightness(1.1) hue-rotate(200deg)",
      dramatic: "contrast(1.8) saturate(0.9) brightness(0.9)",
    };
    return filters[filter] || "none";
  };

  const startCamera = async () => {
    if (cameraStarted || isLoading) return;

    setIsLoading(true);
    setCameraError(null);

    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error("Camera access is not supported in this browser");
      }

      // stop old stream if any
      if (stream) {
        stream.getTracks().forEach((t) => t.stop());
        setStream(null);
      }

      const constraints: MediaStreamConstraints = {
        video: {
          width: { ideal: 1920, min: 1280 },
          height: { ideal: 1080, min: 720 },
          facingMode: "user",
        },
        audio: false,
      };

      const mediaStream = await navigator.mediaDevices.getUserMedia(
        constraints
      );
      setStream(mediaStream); // triggers the effect above
    } catch (error: any) {
      let message = "Unable to access camera. ";
      switch (error?.name) {
        case "NotAllowedError":
          message +=
            "Please allow camera access in your browser settings and refresh.";
          break;
        case "NotFoundError":
          message += "No camera found on this device.";
          break;
        case "NotReadableError":
          message += "Camera is already in use by another application.";
          break;
        case "OverconstrainedError":
          message += "Camera does not support the required settings.";
          break;
        default:
          message += error?.message || "Please try again.";
      }
      setCameraError(message);
      setIsLoading(false);
      toast.error("❌ " + message);
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current || !cameraStarted) {
      toast.error("Camera not ready");
      return;
    }

    const canvas = canvasRef.current;
    const video = videoRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Use higher resolution for better quality
    canvas.width = video.videoWidth || 1920;
    canvas.height = video.videoHeight || 1080;

    ctx.filter = getFilterCSS(selectedFilter);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    ctx.filter = "none";

    // Use higher quality JPEG
    const photoUrl = canvas.toDataURL("image/jpeg", 0.95);
    const newPhotos = [...capturedPhotos, photoUrl];

    setCapturedPhotos(newPhotos);
    setCurrentPhotoIndex((prev) => prev + 1);

    if (newPhotos.length >= photoCount) {
      toast.success("🎉 All photos captured! Moving to frame selection.");
      onAllPhotosCapture(newPhotos, selectedFilter);
    } else {
      const left = photoCount - newPhotos.length;
      toast.success(`📸 Photo captured! ${left} more to go.`);
    }
  };

  const addUploadedPhotos = (uploadedPhotos: string[]) => {
    const remainingSlots = photoCount - capturedPhotos.length;
    const photosToAdd = uploadedPhotos.slice(0, remainingSlots);
    const newPhotos = [...capturedPhotos, ...photosToAdd];
    
    setCapturedPhotos(newPhotos);
    setCurrentPhotoIndex(newPhotos.length);

    if (newPhotos.length >= photoCount) {
      toast.success("🎉 All photos ready! Moving to frame selection.");
      onAllPhotosCapture(newPhotos, selectedFilter);
    } else {
      const left = photoCount - newPhotos.length;
      toast.success(`📤 ${photosToAdd.length} photos uploaded! ${left} more needed.`);
    }
  };

  const resetCamera = () => {
    if (stream) stream.getTracks().forEach((t) => t.stop());
    setStream(null);
    setCameraStarted(false);
    setCameraError(null);
    setIsLoading(false);
    setCapturedPhotos([]);
    setCurrentPhotoIndex(0);
  };

  return {
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
  };
};
