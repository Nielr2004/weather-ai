'use client';

import { useState, useEffect } from 'react';
import { Search, Loader } from 'lucide-react';

interface Suggestion {
  id: number;
  name: string;
  region: string;
  country: string;
}

interface SearchBarProps {
  onSearch: (city: string) => void;
  loading: boolean;
}

export function SearchBar({ onSearch, loading }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (query.trim().length < 3) {
      setSuggestions([]);
      return;
    }
    const fetchSuggestions = async () => {
      setIsTyping(true);
      try {
        const response = await fetch(`/api/search?q=${query}`);
        if (response.ok) {
          const data = await response.json();
          setSuggestions(data);
        } else {
          setSuggestions([]);
        }
      } catch (error) {
        console.error("Failed to fetch suggestions:", error);
        setSuggestions([]);
      } finally {
        setIsTyping(false);
      }
    };
    const debounceTimer = setTimeout(() => {
      fetchSuggestions();
    }, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  const handleSuggestionClick = (cityName: string) => {
    setQuery(cityName);
    setSuggestions([]);
    onSearch(cityName);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
    setSuggestions([]);
  };

  return (
    <div className="relative w-full">
      <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
        {/* Replaced <Input> with a styled <input> */}
        <input
          type="text"
          placeholder="Search for a city..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={loading}
          className="w-full h-12 px-4 rounded-lg bg-black/30 backdrop-blur-sm border border-white/30 text-white placeholder:text-gray-300 text-lg focus:outline-none focus:ring-2 focus:ring-white/50"
        />
        {/* Replaced <Button> with a styled <button> */}
        <button
          type="submit"
          disabled={loading || isTyping}
          className="h-12 w-12 flex-shrink-0 flex items-center justify-center rounded-lg bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? <Loader className="animate-spin" /> : <Search />}
        </button>
      </form>
      {suggestions.length > 0 && (
        <ul className="absolute top-full mt-2 w-full bg-black/50 backdrop-blur-lg rounded-lg border border-white/20 z-10">
          {suggestions.map((s) => (
            <li
              key={s.id}
              onClick={() => handleSuggestionClick(s.name)}
              className="px-4 py-2 text-white hover:bg-white/10 cursor-pointer"
            >
              {s.name}, {s.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}