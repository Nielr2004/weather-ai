'use client';

import { Star, X } from "lucide-react";

interface SavedLocationsProps {
  locations: string[];
  currentLocation: string;
  onSelect: (city: string) => void;
  onSave: (city: string) => void;
  onRemove: (city: string) => void;
}

export function SavedLocations({ locations, currentLocation, onSelect, onSave, onRemove }: SavedLocationsProps) {
  const isSaved = locations.includes(currentLocation);

  return (
    <div className="bg-black/25 backdrop-blur-lg border border-white/10 rounded-2xl p-4 text-white">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-white/60 text-xs font-bold uppercase tracking-wider px-2">Saved Locations</h2>
        <button onClick={() => onSave(currentLocation)} className={`p-2 rounded-full transition-colors ${isSaved ? 'text-yellow-400' : 'text-white/50 hover:text-white'}`}>
            <Star size={20} fill={isSaved ? 'currentColor' : 'none'}/>
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {locations.map(loc => (
            <div key={loc} className="flex items-center bg-white/10 rounded-full">
                <button onClick={() => onSelect(loc)} className="px-3 py-1 text-sm hover:bg-white/20 rounded-l-full">
                    {loc}
                </button>
                <button onClick={() => onRemove(loc)} className="pr-2 pl-1 text-white/50 hover:text-white">
                    <X size={14} />
                </button>
            </div>
        ))}
      </div>
    </div>
  );
}