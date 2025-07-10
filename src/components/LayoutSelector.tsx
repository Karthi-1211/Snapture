
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
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Layout</h3>
        <p className="text-gray-600">NOTE: You have 3 seconds for each shot</p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
        {layouts.map((layout) => (
          <Card 
            key={layout.id}
            className="p-8 cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-gradient-to-br from-white to-gray-50 border-2 hover:border-pink-300"
            onClick={() => onLayoutSelect(layout.name, layout.photoCount)}
          >
            <div className="text-center space-y-4">
              <div className="flex justify-center items-center h-32">
                {layout.preview}
              </div>
              <h4 className="text-xl font-bold text-gray-900">{layout.name}</h4>
              <p className="text-gray-600 text-sm">{layout.description}</p>
              <p className="text-pink-600 font-semibold text-xs">{layout.photoCount} Photos</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LayoutSelector;
