
import { Card } from "@/components/ui/card";

interface FilterSelectorProps {
  photo: string;
  onFilterSelect: (filter: string) => void;
}

const filters = [
  { id: 'none', name: 'Original', css: 'none' },
  { id: 'vintage', name: 'Vintage', css: 'sepia(0.8) contrast(1.2) brightness(1.1)' },
  { id: 'bw', name: 'Black & White', css: 'grayscale(1)' },
  { id: 'sepia', name: 'Sepia', css: 'sepia(1)' },
  { id: 'vibrant', name: 'Vibrant', css: 'contrast(1.4) saturate(1.8)' },
  { id: 'cool', name: 'Cool Tone', css: 'hue-rotate(180deg) saturate(1.2)' },
  { id: 'warm', name: 'Warm Tone', css: 'hue-rotate(30deg) saturate(1.3) brightness(1.1)' }
];

const FilterSelector: React.FC<FilterSelectorProps> = ({ photo, onFilterSelect }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Filter</h3>
        <p className="text-gray-600">Select a filter to enhance your photo</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filters.map((filter) => (
          <Card 
            key={filter.id}
            className="p-4 cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white border-2 hover:border-blue-300"
            onClick={() => onFilterSelect(filter.name)}
          >
            <div className="space-y-3">
              <div className="aspect-square overflow-hidden rounded-lg">
                <img 
                  src={photo} 
                  alt={`${filter.name} filter preview`}
                  className="w-full h-full object-cover"
                  style={{ filter: filter.css }}
                />
              </div>
              <div className="text-center">
                <h4 className="font-semibold text-gray-900">{filter.name}</h4>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FilterSelector;
