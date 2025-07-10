import React from "react";

interface PhotoPreviewProps {
  capturedPhotos: string[];
  photoCount: number;
}

const PhotoPreview: React.FC<PhotoPreviewProps> = ({ capturedPhotos, photoCount }) => {
  if (capturedPhotos.length === 0) return null;

  return (
    <div className="mt-8 animate-fade-in">
      <h4 className="text-xl font-bold text-center text-white mb-6">
        📸 Your Photo Strip Preview
      </h4>

      <div className="flex justify-center">
        <div className="bg-gradient-to-br from-pink-100 to-purple-100 p-6 rounded-2xl shadow-2xl max-w-sm">
          {/* Photo Strip Container */}
          <div
            className="bg-white rounded-xl shadow-lg overflow-hidden"
            style={{ aspectRatio: "2/3", width: "300px" }}
          >
            {/* Photo Grid */}
            <div className="p-4 space-y-3">
              {capturedPhotos.map((photo, index) => (
                <div key={index} className="relative">
                  <div className="w-full bg-gray-100 rounded-lg overflow-hidden shadow-md border-2 border-gray-100">
                    <img
                      src={photo}
                      alt={`Photo ${index + 1}`}
                      className="w-full h-16 object-cover"
                      style={{
                        imageRendering: "auto",
                        objectFit: "cover",
                      }}
                      loading="lazy"
                    />
                  </div>
                  {/* Photo number overlay */}
                  <div className="absolute top-1 left-1 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {index + 1}
                  </div>
                </div>
              ))}

              {/* Show placeholders for remaining photos */}
              {Array.from({ length: Math.max(0, photoCount - capturedPhotos.length) }).map((_, index) => (
                <div key={`placeholder-${index}`} className="relative">
                  <div className="w-full h-16 bg-gray-200 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                    <span className="text-gray-400 text-xs">Photo {capturedPhotos.length + index + 1}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer with branding and date */}
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 text-center">
              <div className="text-white font-bold text-sm mb-1">📸 Snapture</div>
              <div className="text-white/90 text-xs">
                {new Date().toLocaleDateString()} •{" "}
                {new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex justify-center space-x-4 mt-4">
            <div className="bg-white/80 backdrop-blur-sm px-3 py-2 rounded-lg text-sm font-medium text-gray-700 shadow-md">
              ✨ {capturedPhotos.length} of {photoCount} photos ready
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoPreview;