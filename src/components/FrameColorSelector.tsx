import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface FrameColorSelectorProps {
  photos: string[];
  filter: string;
  onFrameColorSelect: (color: string) => void;
}

const colorPalette = [
  { name: "White", color: "#FFFFFF", category: "Basic" },
  { name: "Black", color: "#000000", category: "Basic" },
  { name: "Soft Pink", color: "#FFB6C1", category: "Basic" },
  { name: "Sky Blue", color: "#87CEEB", category: "Basic" },
  { name: "Royal Purple", color: "#6A5ACD", category: "Basic" },
  { name: "Mint Green", color: "#98FB98", category: "Basic" },
  { name: "Slate Grey", color: "#708090", category: "Basic" },
  { name: "Deep Navy", color: "#000080", category: "Basic" },
  { name: "Pure Gold", color: "linear-gradient(45deg, #FFD700, #FEE101, #FFA500)", category: "Metallic", isGradient: true },
  { name: "Silver Fox", color: "linear-gradient(45deg, #C0C0C0, #E8E8E8, #808080)", category: "Metallic", isGradient: true },
  { name: "Rose Gold Elegance", color: "linear-gradient(45deg, #E8B4CB, #F7CAC9, #D4AF37)", category: "Metallic", isGradient: true },
  { name: "Cosmic Bronze", color: "linear-gradient(45deg, #CD7F32, #E6BE8A, #8B4513)", category: "Metallic", isGradient: true },
  { name: "Platinum Luxe", color: "linear-gradient(45deg, #E5E4E2, #FFFFFF, #B0C4DE)", category: "Metallic", isGradient: true },
  { name: "Rainbow Bridge", color: "linear-gradient(45deg, #ff0000, #ff8000, #ffff00, #00ff00, #0000ff, #ff00ff)", category: "Special", isGradient: true },
  { name: "Electric Neon", color: "linear-gradient(45deg, #FF00FF, #00FFFF, #00FF00)", category: "Special", isGradient: true },
  { name: "Cotton Candy", color: "linear-gradient(45deg, #FFC0CB, #E0FFFF, #FFB6C1)", category: "Special", isGradient: true },
  { name: "Midnight Aurora", color: "linear-gradient(45deg, #2E3192, #1BFFFF, #00FF00)", category: "Special", isGradient: true },
  { name: "Sunset Blaze", color: "linear-gradient(45deg, #F093FB, #F5576C)", category: "Special", isGradient: true },
];

const getFilterCSS = (filter: string) => {
  const filters: Record<string, string> = {
    none: "none",
    vintage: "sepia(0.8) contrast(1.2) brightness(1.1)",
    bw: "grayscale(1)",
    sepia: "sepia(1)",
    vibrant: "contrast(1.4) saturate(1.8)",
    cool: "hue-rotate(180deg) saturate(1.2)",
    warm: "hue-rotate(30deg) saturate(1.3) brightness(1.1)",
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

const FrameColorSelector: React.FC<FrameColorSelectorProps> = ({ photos, filter, onFrameColorSelect }) => {
  const [selectedColor, setSelectedColor] = useState("#FFFFFF");
  const [selectedCategory, setSelectedCategory] = useState("Basic");

  const categories = ["Basic", "Metallic", "Special"];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 animate-fade-in items-start">
      {/* Color Palette Side */}
      <div className="space-y-6 md:space-y-10 order-2 lg:order-1">
        <div className="flex justify-center flex-wrap gap-2">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-6 transition-all font-black tracking-widest text-xs uppercase ${selectedCategory === cat
                  ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-xl scale-105"
                  : "border-white/20 text-white/70 hover:bg-white/10 backdrop-blur-md"
                }`}
            >
              {cat}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 md:gap-4">
          {colorPalette
            .filter((c) => c.category === selectedCategory)
            .map((color) => (
              <button
                key={color.name}
                className={`group relative flex flex-col items-center gap-2 focus:outline-none transition-all duration-300 ${selectedColor === color.color ? "scale-110" : "hover:scale-105"
                  }`}
                onClick={() => setSelectedColor(color.color)}
              >
                <div
                  className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl shadow-xl transition-all duration-300 border-2 overflow-hidden ${selectedColor === color.color ? "border-white" : "border-white/10"
                    }`}
                  style={{ background: color.color }}
                />
                <span className="text-[10px] md:text-xs text-white/60 font-black tracking-tight text-center uppercase">
                  {color.name}
                </span>
              </button>
            ))}
        </div>

        <div className="pt-4">
          <Button
            onClick={() => onFrameColorSelect(selectedColor)}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white py-6 md:py-8 text-xl font-black rounded-2xl shadow-2xl transition-all active:scale-95"
          >
            CONFIRM THIS FRAME
          </Button>
        </div>
      </div>

      {/* Preview Side */}
      <div className="order-1 lg:order-2 space-y-6">
        <div className="text-center md:text-left mb-6">
          <h3 className="text-2xl md:text-3xl font-black text-white">LIVE PREVIEW</h3>
          <p className="text-white/60">See your colors in real-time</p>
        </div>

        <div
          className="mx-auto rounded-3xl shadow-2xl overflow-hidden transition-all duration-500"
          style={{
            background: selectedColor,
            padding: "12px",
            maxWidth: "320px",
          }}
        >
          <div className="bg-white rounded-2xl p-2 md:p-3 space-y-2 md:space-y-3 shadow-inner">
            {photos.slice(0, 3).map((photo, index) => (
              <div key={index} className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
                <img
                  src={photo}
                  alt={`Photo ${index + 1}`}
                  className="w-full h-full object-cover"
                  style={{ filter: getFilterCSS(filter) }}
                />
              </div>
            ))}
            <div className="bg-blue-600 text-white py-2 rounded-xl text-center">
              <div className="font-black text-xs tracking-widest uppercase italic">SNAPTURE MAGIC</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrameColorSelector;