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
  { name: "Pink", color: "#FF69B4", category: "Basic" },
  { name: "Light Blue", color: "#87CEEB", category: "Basic" },
  { name: "Yellow", color: "#FFFF00", category: "Basic" },
  { name: "Light Green", color: "#90EE90", category: "Basic" },
  { name: "Purple", color: "#9370DB", category: "Basic" },
  { name: "Orange", color: "#FFA500", category: "Basic" },
  { name: "Red", color: "#FF0000", category: "Basic" },
  { name: "Navy", color: "#000080", category: "Basic" },
  { name: "Gold", color: "linear-gradient(45deg, #FFD700, #FFA500)", category: "Metallic", isGradient: true },
  { name: "Silver", color: "linear-gradient(45deg, #C0C0C0, #808080)", category: "Metallic", isGradient: true },
  { name: "Rose Gold", color: "linear-gradient(45deg, #E8B4CB, #D4AF37)", category: "Metallic", isGradient: true },
  { name: "Bronze", color: "linear-gradient(45deg, #CD7F32, #8B4513)", category: "Metallic", isGradient: true },
  { name: "Rainbow", color: "linear-gradient(45deg, #ff0000, #ff8000, #ffff00, #80ff00, #00ff00, #00ff80, #00ffff, #0080ff, #0000ff, #8000ff, #ff00ff, #ff0080)", category: "Special", isGradient: true },
  { name: "Sunset", color: "linear-gradient(45deg, #FF6B6B, #FF8E53, #FF6B9D)", category: "Special", isGradient: true },
  { name: "Ocean", color: "linear-gradient(45deg, #00C9FF, #92FE9D)", category: "Special", isGradient: true },
  { name: "Forest", color: "linear-gradient(45deg, #134E5E, #71B280)", category: "Special", isGradient: true },
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
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === category
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
              className={`aspect-square rounded-lg border-4 transition-all hover:scale-110 ${
                selectedColor === colorItem.color
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