import { Filter } from "@/types/camera";

interface FilterBarProps {
  filters: Filter[];
  selectedFilter: string;
  onFilterSelect: (filterId: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, selectedFilter, onFilterSelect }) => {
  return (
    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black/80 rounded-full px-4 py-2 max-w-4xl">
      <div className="flex space-x-2 min-w-max">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => onFilterSelect(filter.id)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all whitespace-nowrap w-20 text-center ${
              selectedFilter === filter.id 
                ? 'bg-yellow-500 text-black' 
                : 'bg-gray-700 text-white hover:bg-gray-600'
            }`}
          >
            {filter.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;