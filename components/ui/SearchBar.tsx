'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
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
    // ## FIX 2: Check the query before calling onSearch ##
    if (query.trim()) {
      onSearch(query);
    }
    setSuggestions([]);
  };

  return (
    <div className="relative w-full">
      <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
        <Input
          type="text"
          placeholder="Search for a city..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={loading}
          className="bg-black/30 backdrop-blur-sm border-white/30 text-white placeholder:text-gray-300 text-lg h-12"
        />
        <Button type="submit" disabled={loading || isTyping} size="lg" className="h-12">
          {loading ? <Loader className="animate-spin" /> : <Search />}
        </Button>
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