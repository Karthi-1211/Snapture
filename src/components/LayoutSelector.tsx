
import { Card } from "@/components/ui/card";

interface LayoutSelectorProps {
  onLayoutSelect: (layout: string, photoCount: number) => void;
}

const layouts = [
  {
    id: 'strip-3-vertical',
    name: 'Layout A',
    description: 'Size 6 x 2 Strip (3 Pose)',
    photoCount: 3,
    preview: (
      <div className="w-16 h-24 bg-white border-2 border-gray-300 rounded-sm flex flex-col">
        <div className="flex-1 bg-gray-100 m-0.5 rounded-sm"></div>
        <div className="flex-1 bg-gray-100 m-0.5 rounded-sm"></div>
        <div className="flex-1 bg-gray-100 m-0.5 rounded-sm"></div>
      </div>
    )
  },
  {
    id: 'strip-4-vertical',
    name: 'Layout B',
    description: 'Size 6 x 2 Strip (4 Pose)',
    photoCount: 4,
    preview: (
      <div className="w-16 h-24 bg-white border-2 border-gray-300 rounded-sm flex flex-col">
        <div className="flex-1 bg-gray-100 m-0.5 rounded-sm"></div>
        <div className="flex-1 bg-gray-100 m-0.5 rounded-sm"></div>
        <div className="flex-1 bg-gray-100 m-0.5 rounded-sm"></div>
        <div className="flex-1 bg-gray-100 m-0.5 rounded-sm"></div>
      </div>
    )
  },
  {
    id: 'strip-2-vertical',
    name: 'Layout C',
    description: 'Size 6 x 2 Strip (2 Pose)',
    photoCount: 2,
    preview: (
      <div className="w-16 h-24 bg-white border-2 border-gray-300 rounded-sm flex flex-col">
        <div className="flex-1 bg-gray-100 m-0.5 rounded-sm"></div>
        <div className="flex-1 bg-gray-100 m-0.5 rounded-sm"></div>
      </div>
    )
  },
  {
    id: 'strip-6-grid',
    name: 'Layout D',
    description: 'Size 6 x 4 Strip (6 Pose)',
    photoCount: 6,
    preview: (
      <div className="w-16 h-20 bg-white border-2 border-gray-300 rounded-sm grid grid-cols-2 gap-0.5 p-0.5">
        <div className="bg-gray-100 rounded-sm"></div>
        <div className="bg-gray-100 rounded-sm"></div>
        <div className="bg-gray-100 rounded-sm"></div>
        <div className="bg-gray-100 rounded-sm"></div>
        <div className="bg-gray-100 rounded-sm"></div>
        <div className="bg-gray-100 rounded-sm"></div>
      </div>
    )
  },
  {
    id: 'strip-4-horizontal',
    name: 'Layout E',
    description: 'Size 8 x 2 Strip (4 Pose Horizontal)',
    photoCount: 4,
    preview: (
      <div className="w-20 h-12 bg-white border-2 border-gray-300 rounded-sm flex">
        <div className="flex-1 bg-gray-100 m-0.5 rounded-sm"></div>
        <div className="flex-1 bg-gray-100 m-0.5 rounded-sm"></div>
        <div className="flex-1 bg-gray-100 m-0.5 rounded-sm"></div>
        <div className="flex-1 bg-gray-100 m-0.5 rounded-sm"></div>
      </div>
    )
  },
  {
    id: 'strip-mixed',
    name: 'Layout F',
    description: 'Mixed Layout Strip',
    photoCount: 4,
    preview: (
      <div className="w-16 h-24 bg-white border-2 border-gray-300 rounded-sm flex flex-col">
        <div className="h-1/2 bg-gray-100 m-0.5 rounded-sm"></div>
        <div className="h-1/4 flex gap-0.5 mx-0.5">
          <div className="flex-1 bg-gray-100 rounded-sm"></div>
          <div className="flex-1 bg-gray-100 rounded-sm"></div>
        </div>
        <div className="h-1/4 bg-gray-100 m-0.5 rounded-sm"></div>
      </div>
    )
  }
];

const LayoutSelector: React.FC<LayoutSelectorProps> = ({ onLayoutSelect }) => {
  return (
    <div className="space-y-6 md:space-y-8 animate-fade-in">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
        {layouts.map((layout) => (
          <div
            key={layout.id}
            className="group relative cursor-pointer"
            onClick={() => onLayoutSelect(layout.name, layout.photoCount)}
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-3xl blur opacity-25 group-hover:opacity-100 transition duration-500" />
            <div className="relative p-6 md:p-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl transition-all duration-300 transform group-hover:-translate-y-2 group-active:scale-95 shadow-xl">
              <div className="text-center space-y-4 md:space-y-6">
                <div className="flex justify-center items-center h-28 md:h-32 transition-transform duration-500 group-hover:scale-110">
                  <div className="shadow-2xl ring-4 ring-white/10 rounded-lg overflow-hidden">
                    {layout.preview}
                  </div>
                </div>
                <div>
                  <h4 className="text-xl md:text-2xl font-black text-white group-hover:text-pink-400 transition-colors">
                    {layout.name}
                  </h4>
                  <p className="text-white/60 text-xs md:text-sm mt-1">{layout.description}</p>
                </div>
                <div className="inline-block px-4 py-1.5 bg-white/10 rounded-full border border-white/5">
                  <p className="text-pink-400 font-black text-xs md:text-sm tracking-widest uppercase">
                    {layout.photoCount} Shots
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LayoutSelector;
