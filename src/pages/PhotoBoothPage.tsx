import { useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import LayoutSelector from "@/components/LayoutSelector";
import CameraCapture from "@/components/CameraCapture";
import FrameColorSelector from "@/components/FrameColorSelector";

type Step = "layout" | "camera" | "frame" | "download";

const PhotoBoothPage = () => {
  const [currentStep, setCurrentStep] = useState<Step>("layout");
  const [selectedLayout, setSelectedLayout] = useState<string>("");
  const [photoCount, setPhotoCount] = useState<number>(1);
  const [capturedPhotos, setCapturedPhotos] = useState<string[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>("none");
  const [selectedFrameColor, setSelectedFrameColor] = useState<string>("#FFFFFF");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /* ───────────────────────── Handlers ───────────────────────── */

  const handleLayoutSelect = (layout: string, count: number) => {
    setSelectedLayout(layout);
    setPhotoCount(count);
    setCurrentStep("camera");
    toast.success(`🎯 Layout "${layout}" selected! Get ready to take ${count} amazing photos.`);
  };

  const handleAllPhotosCapture = (photos: string[], filter: string) => {
    setCapturedPhotos(photos);
    setSelectedFilter(filter);
    setCurrentStep("frame");
    toast.success("🎉 All photos captured successfully! Now choose your frame colour.");
  };

  const handleFrameColorSelect = (color: string) => {
    setSelectedFrameColor(color);
    setCurrentStep("download");
    toast.success("🎨 Perfect frame colour selected! Your photo strip is ready!");
  };

  /* ──────────────────── UPDATED downloadPhoto ─────────────────── */

  const downloadPhoto = useCallback(() => {
    if (capturedPhotos.length === 0 || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    /* 1. Initialise canvas */
    const stripWidth = 400;
    const stripHeight = 600;
    canvas.width = stripWidth;
    canvas.height = stripHeight;

    /* 2. Draw the frame background (solid or gradient) */
    if (selectedFrameColor.includes("gradient")) {
      const gradient = ctx.createLinearGradient(0, 0, stripWidth, stripHeight);

      if (selectedFrameColor.includes("rainbow")) {
        gradient.addColorStop(0, "#ff0000");
        gradient.addColorStop(0.16, "#ff8000");
        gradient.addColorStop(0.33, "#ffff00");
        gradient.addColorStop(0.5, "#00ff00");
        gradient.addColorStop(0.66, "#0000ff");
        gradient.addColorStop(0.83, "#8000ff");
        gradient.addColorStop(1, "#ff00ff");
      } else if (selectedFrameColor.includes("gold")) {
        gradient.addColorStop(0, "#FFD700");
        gradient.addColorStop(1, "#FFA500");
      } else {
        gradient.addColorStop(0, "#FFD700");
        gradient.addColorStop(1, "#FFA500");
      }
      ctx.fillStyle = gradient;
    } else {
      ctx.fillStyle = selectedFrameColor;
    }
    ctx.fillRect(0, 0, stripWidth, stripHeight);



    /* 4. Draw the photos */
    const outerMargin = 10;
    const innerWidth = stripWidth - outerMargin * 2;
    const innerHeight = stripHeight - outerMargin * 2;

    const photoMargin = 20;
    const photoSpacing = 10;
    const availableHeight = innerHeight - photoMargin * 2 - 60; // 60px reserved for footer
    const photoHeight =
      (availableHeight - photoSpacing * (capturedPhotos.length - 1)) /
      capturedPhotos.length;
    const photoWidth = innerWidth - photoMargin * 2;

    const promises = capturedPhotos.map((photoUrl, index) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = () => {
          ctx.filter = getFilterCSS(selectedFilter);

          const x = outerMargin + photoMargin;
          const y =
            outerMargin + photoMargin + index * (photoHeight + photoSpacing);

          /* optional subtle light‑grey border for each shot */
          ctx.fillStyle = "#f0f0f0";
          ctx.fillRect(x - 2, y - 2, photoWidth + 4, photoHeight + 4);

          ctx.drawImage(img, x, y, photoWidth, photoHeight);
          resolve();
        };
        img.crossOrigin = "anonymous";
        img.src = photoUrl;
      });
    });

    /* 5. Footer + download once all images drawn */
    Promise.all(promises).then(() => {
      ctx.filter = "none";

      const footerY = stripHeight - outerMargin - 40;

      const footerGradient = ctx.createLinearGradient(
        0,
        footerY,
        0,
        footerY + 40
      );
      footerGradient.addColorStop(0, "#8B5CF6");
      footerGradient.addColorStop(1, "#EC4899");

      ctx.fillStyle = footerGradient;
      ctx.fillRect(outerMargin, footerY, innerWidth, 40);

      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 16px Arial";
      ctx.textAlign = "center";
      ctx.fillText("📸 Snapture", stripWidth / 2, footerY + 18);

      ctx.font = "12px Arial";
      const now = new Date();
      ctx.fillText(
        `${now.toLocaleDateString()} • ${now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}`,
        stripWidth / 2,
        footerY + 32
      );

      /* download */
      const link = document.createElement("a");
      link.download = `Snapture-strip-${Date.now()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      toast.success("📥 Photo strip downloaded successfully!");
    });
  }, [capturedPhotos, selectedFilter, selectedFrameColor]);

  /* ───────────────────── Helpers & Reset ───────────────────── */

  const getFilterCSS = (filter: string) => {
    switch (filter) {
      case "vintage":
        return "sepia(0.8) contrast(1.2) brightness(1.1)";
      case "bw":
        return "grayscale(1)";
      case "sepia":
        return "sepia(1)";
      case "vibrant":
        return "contrast(1.4) saturate(1.8)";
      case "cool":
        return "hue-rotate(180deg) saturate(1.2)";
      case "warm":
        return "hue-rotate(30deg) saturate(1.3) brightness(1.1)";
      case "noir":
        return "grayscale(1) contrast(1.5) brightness(0.8)";
      case "retro":
        return "sepia(0.5) saturate(1.5) hue-rotate(20deg)";
      case "dreamy":
        return "blur(0.5px) brightness(1.2) saturate(0.8)";
      case "neon":
        return "saturate(2) contrast(1.3) hue-rotate(90deg)";
      case "sunset":
        return "sepia(0.3) saturate(1.4) hue-rotate(350deg)";
      case "arctic":
        return "saturate(0.8) brightness(1.1) hue-rotate(200deg)";
      case "dramatic":
        return "contrast(1.8) saturate(0.9) brightness(0.9)";
      default:
        return "none";
    }
  };

  const resetPhotoBooth = () => {
    setCurrentStep("layout");
    setSelectedLayout("");
    setPhotoCount(1);
    setCapturedPhotos([]);
    setSelectedFilter("none");
    setSelectedFrameColor("#FFFFFF");
    toast.success("🔄 PhotoBooth reset! Start your new photo session.");
  };

  /* ───────────────────────── UI labels ───────────────────────── */

  const stepTitles = {
    layout: "🎯 Choose Your Perfect Photo Strip Layout",
    camera: "📸 Capture Your Amazing Photos",
    frame: "🎨 Select Your Perfect Frame Colour",
    download: "⬇️ Download Your Beautiful Photo Strip",
  };

  const stepDescriptions = {
    layout: "Pick the layout that matches your style and occasion",
    camera: "Strike a pose and capture your perfect moments",
    frame: "Choose colours and patterns that make your photos pop",
    download: "Your masterpiece is ready to share with the world",
  };

  /* ────────────────────────── JSX ────────────────────────── */

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 font-inter relative overflow-hidden">
      {/* animated background blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            onClick={resetPhotoBooth}
            variant="outline"
            size="sm"
            className="border-white/30 hover:bg-white/10 backdrop-blur-sm"
          >
            <Link
              to="/home"
              className="flex items-center hover:text-white transition-colors group"
            >
              <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
          </Button>

          <div className="flex items-center space-x-4">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              ✨ Snapture
            </h1>
            <Button
              onClick={resetPhotoBooth}
              variant="outline"
              size="sm"
              className="border-white/30 hover:bg-white/10 backdrop-blur-sm"
            >
              🔄 Start Over
            </Button>
          </div>
        </div>

        {/* progress indicator */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-4">
            {["layout", "camera", "frame", "download"].map((step, index) => {
              const isActive = currentStep === step;
              const isCompleted =
                ["layout", "camera", "frame", "download"].indexOf(
                  currentStep
                ) > index;

              return (
                <div key={step} className="flex items-center">
                  <div
                    className={`relative w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg scale-110"
                        : isCompleted
                        ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg"
                        : "bg-white/20 text-white/60 backdrop-blur-sm"
                    }`}
                  >
                    {isCompleted ? "✅" : index + 1}
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur-lg opacity-50 animate-pulse" />
                    )}
                  </div>
                  {index < 3 && (
                    <div
                      className={`w-16 h-1 mx-2 rounded-full transition-all duration-300 ${
                        isCompleted
                          ? "bg-gradient-to-r from-green-500 to-emerald-500"
                          : "bg-white/20"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* card wrapper */}
        <Card className="p-8 shadow-2xl bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-white mb-4">
              {stepTitles[currentStep]}
            </h2>
            <p className="text-xl text-white/80 mb-6">
              {stepDescriptions[currentStep]}
            </p>
            <div className="w-32 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto rounded-full" />
          </div>

          {/* step content */}
          {currentStep === "layout" && (
            <LayoutSelector onLayoutSelect={handleLayoutSelect} />
          )}

          {currentStep === "camera" && (
            <CameraCapture
              selectedLayout={selectedLayout}
              photoCount={photoCount}
              onAllPhotosCapture={handleAllPhotosCapture}
            />
          )}

          {currentStep === "frame" && (
            <FrameColorSelector
              photos={capturedPhotos}
              filter={selectedFilter}
              onFrameColorSelect={handleFrameColorSelect}
            />
          )}

          {currentStep === "download" && (
            <div className="text-center animate-fade-in">
              <div className="mb-8">
                <div
                  className="max-w-md mx-auto bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-2xl border border-white/20"
                  style={{
                    background: selectedFrameColor,
                    padding: "10px",
                  }}
                >
                  <div className="bg-white rounded-xl p-3 space-y-2 shadow-lg">
                    {capturedPhotos.map((photo, index) => (
                      <img
                        key={index}
                        src={photo}
                        alt={`Photo ${index + 1}`}
                        className="w-full h-50 rounded-lg object-cover"
                        style={{ filter: getFilterCSS(selectedFilter) }}
                      />
                    ))}
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs p-2 rounded text-center font-medium">
                      <div className="font-bold">📸 Snapture</div>
                      <div>
                        {new Date().toLocaleDateString()} •{" "}
                        {new Date().toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-white mb-4">
                  🎉 Your Amazing Photo Strip is Ready!
                </h3>
                <p className="text-xl text-white/80 mb-6">
                  Perfect shots with beautiful styling&nbsp;&mdash; ready to
                  share!
                </p>
                <Button
                  onClick={downloadPhoto}
                  size="lg"
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-12 py-6 text-xl font-bold shadow-2xl hover:shadow-green-500/50 transform hover:scale-110 transition-all duration-300 rounded-full"
                >
                  <Download className="mr-3 h-6 w-6" />
                  📥 Download Your Masterpiece
                </Button>
              </div>
            </div>
          )}
        </Card>

        {/* hidden canvas for export */}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
};

export default PhotoBoothPage;
