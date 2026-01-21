import React from "react";
import { Button } from "./ui/button";
import { Filter } from "@/types/camera";

interface FilterBarProps {
  filters: Filter[];
  selectedFilter: string;
  onFilterSelect: (filterId: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  selectedFilter,
  onFilterSelect,
}) => {
  return (
    <div className="absolute bottom-4 left-0 right-0 px-4">
      <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pb-2 pt-1">
        {filters.map((filter) => (
          <Button
            key={filter.id}
            size="sm"
            variant={selectedFilter === filter.id ? "default" : "secondary"}
            onClick={() => onFilterSelect(filter.id)}
            className={`flex-none rounded-full px-5 py-5 text-sm font-black capitalize transition-all duration-300 shadow-xl ${selectedFilter === filter.id
                ? "bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 scale-110 border-2 border-white/50"
                : "bg-black/40 text-white/90 hover:bg-black/60 backdrop-blur-xl border border-white/10"
              }`}
          >
            {filter.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;