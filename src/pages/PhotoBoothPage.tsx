import { useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import LayoutSelector from "@/components/LayoutSelector";
import CameraCapture from "@/components/CameraCapture";
import FrameColorSelector from "@/components/FrameColorSelector";
import confetti from "canvas-confetti";

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

    /* 1. Initialise canvas with higher resolution for printing quality */
    const scaleFactor = 2; // 2x scale for high DPI export
    const stripWidth = 400 * scaleFactor;
    const stripHeight = 600 * scaleFactor;
    canvas.width = stripWidth;
    canvas.height = stripHeight;

    /* 2. Draw the frame background (solid or gradient) */
    if (selectedFrameColor.includes("gradient")) {
      const gradient = ctx.createLinearGradient(0, 0, stripWidth, stripHeight);

      if (selectedFrameColor.includes("rainbow") || selectedFrameColor.includes("Rainbow")) {
        gradient.addColorStop(0, "#ff0000");
        gradient.addColorStop(0.16, "#ff8000");
        gradient.addColorStop(0.33, "#ffff00");
        gradient.addColorStop(0.5, "#00ff00");
        gradient.addColorStop(0.66, "#0000ff");
        gradient.addColorStop(0.83, "#8000ff");
        gradient.addColorStop(1, "#ff00ff");
      } else if (selectedFrameColor.includes("gold") || selectedFrameColor.includes("Gold")) {
        gradient.addColorStop(0, "#FFD700");
        gradient.addColorStop(0.5, "#FEE101");
        gradient.addColorStop(1, "#FFA500");
      } else if (selectedFrameColor.includes("silver") || selectedFrameColor.includes("Silver")) {
        gradient.addColorStop(0, "#C0C0C0");
        gradient.addColorStop(0.5, "#E8E8E8");
        gradient.addColorStop(1, "#808080");
      } else if (selectedFrameColor.includes("Sunset")) {
        gradient.addColorStop(0, "#F093FB");
        gradient.addColorStop(1, "#F5576C");
      } else if (selectedFrameColor.includes("Midnight")) {
        gradient.addColorStop(0, "#2E3192");
        gradient.addColorStop(0.5, "#1BFFFF");
        gradient.addColorStop(1, "#00FF00");
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
    const outerMargin = 15 * scaleFactor;
    const innerWidth = stripWidth - outerMargin * 2;
    const innerHeight = stripHeight - outerMargin * 2;

    const photoMargin = 15 * scaleFactor;
    const photoSpacing = 12 * scaleFactor;
    // Reserved space for footer (increased)
    const footerHeight = 85 * scaleFactor;
    const availableHeightForPhotos = innerHeight - footerHeight - photoSpacing;

    const photoHeight =
      (availableHeightForPhotos - (capturedPhotos.length - 1) * photoSpacing) /
      capturedPhotos.length;
    const photoWidth = innerWidth;

    const promises = capturedPhotos.map((photoUrl, index) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = () => {
          ctx.save();

          const x = outerMargin;
          const y = outerMargin + index * (photoHeight + photoSpacing);

          // Draw shadows for photos
          ctx.shadowColor = "rgba(0,0,0,0.3)";
          ctx.shadowBlur = 15 * scaleFactor;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 4 * scaleFactor;

          // Draw white background for each photo (Polaroid style)
          const polaroidPadding = 6 * scaleFactor;
          ctx.fillStyle = "#FFFFFF";
          ctx.fillRect(
            x - polaroidPadding,
            y - polaroidPadding,
            photoWidth + polaroidPadding * 2,
            photoHeight + polaroidPadding * 2
          );

          ctx.restore();

          // Set filter before drawing the image
          ctx.save();
          ctx.filter = getFilterCSS(selectedFilter);

          // Clip image to rounded rect
          const radius = 4 * scaleFactor;
          ctx.beginPath();
          ctx.moveTo(x + radius, y);
          ctx.lineTo(x + photoWidth - radius, y);
          ctx.quadraticCurveTo(x + photoWidth, y, x + photoWidth, y + radius);
          ctx.lineTo(x + photoWidth, y + photoHeight - radius);
          ctx.quadraticCurveTo(x + photoWidth, y + photoHeight, x + photoWidth - radius, y + photoHeight);
          ctx.lineTo(x + radius, y + photoHeight);
          ctx.quadraticCurveTo(x, y + photoHeight, x, y + photoHeight - radius);
          ctx.lineTo(x, y + radius);
          ctx.quadraticCurveTo(x, y, x + radius, y);
          ctx.closePath();
          ctx.clip();

          ctx.drawImage(img, x, y, photoWidth, photoHeight);
          ctx.restore();
          resolve();
        };
        img.crossOrigin = "anonymous";
        img.src = photoUrl;
      });
    });

    /* 5. Footer + download once all images drawn */
    Promise.all(promises).then(() => {
      ctx.filter = "none";

      const footerY = stripHeight - footerHeight - outerMargin;
      const cornerRadius = 12 * scaleFactor;

      // Professional Footer Background with rounded top corners
      ctx.save();
      ctx.fillStyle = "rgba(0,0,0,0.15)";
      ctx.beginPath();
      ctx.moveTo(outerMargin + cornerRadius, footerY);
      ctx.lineTo(outerMargin + innerWidth - cornerRadius, footerY);
      ctx.quadraticCurveTo(outerMargin + innerWidth, footerY, outerMargin + innerWidth, footerY + cornerRadius);
      ctx.lineTo(outerMargin + innerWidth, footerY + footerHeight);
      ctx.lineTo(outerMargin, footerY + footerHeight);
      ctx.lineTo(outerMargin, footerY + cornerRadius);
      ctx.quadraticCurveTo(outerMargin, footerY, outerMargin + cornerRadius, footerY);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // Logo Text
      ctx.fillStyle = "#FFFFFF";
      ctx.font = `bold ${24 * scaleFactor}px Arial`;
      ctx.textAlign = "center";
      ctx.shadowColor = "rgba(0,0,0,0.4)";
      ctx.shadowBlur = 4 * scaleFactor;
      ctx.fillText("📸 SNAPTURE", stripWidth / 2, footerY + 40 * scaleFactor);

      // Date Text
      ctx.shadowBlur = 0;
      ctx.font = `${14 * scaleFactor}px Arial`;
      ctx.fillStyle = "rgba(255,255,255,0.9)";
      const now = new Date();
      ctx.fillText(
        `${now.toLocaleDateString('en-GB')}  •  ${now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}`,
        stripWidth / 2,
        footerY + 62 * scaleFactor
      );

      /* download */
      const link = document.createElement("a");
      link.download = `Snapture-Magic-${Date.now()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();

      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF1493', '#00BFFF', '#FFD700']
      });

      toast.success("✨ Your masterpiece has been saved!");
    });
  }, [capturedPhotos, selectedFilter, selectedFrameColor]);

  const handleShare = async () => {
    if (capturedPhotos.length === 0 || !canvasRef.current) return;

    try {
      const canvas = canvasRef.current;
      const dataUrl = canvas.toDataURL("image/png");
      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], 'snapture.png', { type: 'image/png' });

      if (navigator.share) {
        await navigator.share({
          files: [file],
          title: 'My Snapture Photo Strip',
          text: 'Check out my amazing photo strip from Snapture! 📸✨',
        });
      } else {
        toast.info("Sharing not supported on this browser, but you can download!");
      }
    } catch (error) {
      console.error("Share failed", error);
    }
  };

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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 font-inter relative pb-20">
      {/* animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-40 h-40 md:w-72 md:h-72 bg-pink-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-40 h-40 md:w-80 md:h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 md:py-8">
        {/* header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-6 md:mb-8 gap-4">
          <Button
            onClick={resetPhotoBooth}
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/10 self-start"
          >
            <Link
              to="/home"
              className="flex items-center group"
            >
              <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              Exit Booth
            </Link>
          </Button>

          <div className="flex items-center space-x-3 md:space-x-4">
            <h1 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              SNAPTURE
            </h1>
            <Button
              onClick={resetPhotoBooth}
              variant="outline"
              size="sm"
              className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm rounded-full text-xs md:text-sm"
            >
              🔄 Reset
            </Button>
          </div>
        </div>

        {/* progress indicator */}
        <div className="flex justify-center mb-8 md:mb-12 overflow-x-auto pb-2 no-scrollbar">
          <div className="flex items-center space-x-2 md:space-x-4">
            {["layout", "camera", "frame", "download"].map((step, index) => {
              const isActive = currentStep === step;
              const isCompleted =
                ["layout", "camera", "frame", "download"].indexOf(
                  currentStep
                ) > index;

              return (
                <div key={step} className="flex items-center">
                  <div
                    className={`relative w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold text-sm md:text-lg transition-all duration-300 ${isActive
                        ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg scale-110"
                        : isCompleted
                          ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg"
                          : "bg-white/10 text-white/40 backdrop-blur-sm"
                      }`}
                  >
                    {isCompleted ? "✓" : index + 1}
                  </div>
                  {index < 3 && (
                    <div
                      className={`w-4 md:w-16 h-0.5 md:h-1 mx-1 md:mx-2 rounded-full transition-all duration-300 ${isCompleted
                          ? "bg-gradient-to-r from-green-500 to-emerald-500"
                          : "bg-white/10"
                        }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* card wrapper */}
        <div className="shadow-2xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-3xl p-4 md:p-8">
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-2 md:mb-4">
              {stepTitles[currentStep]}
            </h2>
            <p className="text-sm md:text-xl text-white/70 mb-4 md:mb-6">
              {stepDescriptions[currentStep]}
            </p>
            <div className="w-16 md:w-32 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto rounded-full" />
          </div>

          {/* step content */}
          <div className="animate-fade-in">
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
              <div className="text-center">
                <div className="mb-6 md:mb-8">
                  <div
                    className="max-w-[280px] md:max-w-md mx-auto p-2 rounded-xl shadow-2xl overflow-hidden"
                    style={{
                      background: selectedFrameColor,
                    }}
                  >
                    <div className="bg-white rounded-lg p-2 space-y-1.5 shadow-inner">
                      {capturedPhotos.map((photo, index) => (
                        <div key={index} className="relative overflow-hidden rounded-md aspect-[4/3]">
                          <img
                            src={photo}
                            alt={`Photo ${index + 1}`}
                            className="w-full h-full object-cover"
                            style={{ filter: getFilterCSS(selectedFilter) }}
                          />
                        </div>
                      ))}
                      <div className="bg-blue-600 text-white py-2 rounded text-center">
                        <div className="font-black text-xs md:text-sm tracking-widest">SNAPTURE</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 md:space-y-6">
                  <h3 className="text-xl md:text-3xl font-black text-white">
                    Ready to Share! ✨
                  </h3>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Button
                      onClick={downloadPhoto}
                      size="lg"
                      className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white px-8 py-6 text-lg font-bold rounded-2xl shadow-xl transition-all active:scale-95"
                    >
                      <Download className="mr-2 h-5 w-5" />
                      Save Photo
                    </Button>

                    <Button
                      onClick={handleShare}
                      variant="outline"
                      size="lg"
                      className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg font-bold rounded-2xl shadow-xl transition-all active:scale-95 backdrop-blur-md"
                    >
                      <Share2 className="mr-2 h-5 w-5" />
                      Send to Friends
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* hidden canvas for export */}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
};

export default PhotoBoothPage;
