import { Search } from "lucide-react";
import { useEffect, useRef } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export default function SearchBar({ value, onChange, onKeyDown, placeholder = "Search menu items..." }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
        <Search className="w-5 h-5" />
      </div>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className="w-full h-16 pl-16 pr-6 text-lg font-medium bg-background border-2 border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition-all"
        data-testid="input-search"
        aria-label="Search menu items"
      />
    </div>
  );
}
