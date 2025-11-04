import { MenuItem } from "@shared/schema";

interface AutocompleteDropdownProps {
  items: MenuItem[];
  onSelect: (item: MenuItem) => void;
  highlightedIndex: number;
}

export default function AutocompleteDropdown({ items, onSelect, highlightedIndex }: AutocompleteDropdownProps) {
  if (items.length === 0) return null;

  return (
    <div 
      className="absolute top-full left-0 right-0 mt-2 bg-popover border border-popover-border rounded-xl shadow-lg max-h-80 overflow-y-auto z-50"
      role="listbox"
      aria-label="Menu item suggestions"
    >
      {items.map((item, index) => (
        <button
          key={item.id}
          onClick={() => onSelect(item)}
          className={`w-full px-6 py-4 flex items-center justify-between hover-elevate active-elevate-2 transition-colors ${
            index === highlightedIndex ? 'bg-accent' : ''
          } ${index !== items.length - 1 ? 'border-b border-popover-border' : ''}`}
          data-testid={`button-item-${item.id}`}
          role="option"
          aria-selected={index === highlightedIndex}
        >
          <span className="text-base font-medium text-foreground">{item.name}</span>
          <span className="text-lg font-bold text-primary tabular-nums">₹{(item.price / 100).toFixed(2)}</span>
        </button>
      ))}
    </div>
  );
}
