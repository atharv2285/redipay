import AutocompleteDropdown from "../AutocompleteDropdown";
import { MenuItem } from "@shared/schema";

export default function AutocompleteDropdownExample() {
  const mockItems: MenuItem[] = [
    { id: "1", name: "Masala Maggi", price: 4000 },
    { id: "2", name: "Cheese Maggi", price: 5000 },
    { id: "3", name: "Plain Maggi", price: 3500 },
  ];

  const handleSelect = (item: MenuItem) => {
    console.log("Selected item:", item);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <AutocompleteDropdown 
        items={mockItems}
        onSelect={handleSelect}
        highlightedIndex={0}
      />
    </div>
  );
}
