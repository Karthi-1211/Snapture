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

const FrameColorSelector: React.FC<FrameColorSelectorProps> = ({ photos, filter, onFrameColorSelect }) => {
  const [selectedColor, setSelectedColor] = useState("#FFFFFF");
  const [selectedCategory, setSelectedCategory] = useState("Basic");

  const categories = ["Basic", "Metallic", "Special"];
  const filteredColors = colorPalette.filter((color) => color.category === selectedCategory);

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  const handleApplyColor = () => {
    onFrameColorSelect(selectedColor);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in">
      {/* Color Palette Side */}
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Choose Frame Color</h3>
          <p className="text-pink-600">Select a color from the palette below</p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center space-x-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${selectedCategory === category
                  ? "bg-purple-500 text-white shadow-lg"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Color Grid */}
        <div className="grid grid-cols-5 gap-3">
          {filteredColors.map((colorItem) => (
            <button
              key={colorItem.name}
              onClick={() => handleColorSelect(colorItem.color)}
              className={`aspect-square rounded-lg border-4 transition-all hover:scale-110 ${selectedColor === colorItem.color
                  ? "border-purple-500 shadow-lg"
                  : "border-gray-300 hover:border-gray-400"
                }`}
              style={{
                background: colorItem.isGradient ? colorItem.color : colorItem.color,
              }}
              title={colorItem.name}
            />
          ))}
        </div>

        <div className="text-center">
          <Button
            onClick={handleApplyColor}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg transform hover:scale-105 transition-all"
          >
            Apply Color to Frame
          </Button>
        </div>
      </div>

      {/* Preview Side */}
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Preview</h3>
          <p className="text-pink-600">See how your photos will look</p>
        </div>

        <Card className="p-6 bg-white shadow-xl">
          <div
            className="mx-auto rounded-2xl shadow-2xl overflow-hidden"
            style={{
              background: selectedColor.includes("gradient") ? selectedColor : selectedColor,
              padding: "10px",
              maxWidth: "350px",
            }}
          >
            <div className="bg-white rounded-xl p-3 space-y-4">
              {photos.slice(0, 3).map((photo, index) => (
                <div key={index} className="relative">
                  <img
                    src={photo}
                    alt={`Photo ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                    style={{ filter: getFilterCSS(filter) }}
                  />
                </div>
              ))}

              {/* Date and branding */}
              <div className="text-center text-xs text-gray-500 font-medium pt-2 space-y-1">
                <div className="font-bold text-gray-800">📸 Snapture</div>
                <div>
                  {new Date().toLocaleDateString()} •{" "}
                  {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default FrameColorSelector;