import { useState, useMemo } from "react";
import SearchBar from "@/components/SearchBar";
import AutocompleteDropdown from "@/components/AutocompleteDropdown";
import BillItemRow from "@/components/BillItemRow";
import BillSummary from "@/components/BillSummary";
import { MenuItem, BillItem } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

const MENU_ITEMS: MenuItem[] = [
  { id: "1", name: "Masala Maggi", price: 4000 },
  { id: "2", name: "Cheese Maggi", price: 5000 },
  { id: "3", name: "Plain Maggi", price: 3500 },
  { id: "4", name: "Bread Omelette", price: 5000 },
  { id: "5", name: "Bread Butter", price: 3000 },
  { id: "6", name: "Bread Jam", price: 3500 },
  { id: "7", name: "Cheese Sandwich", price: 6000 },
  { id: "8", name: "Veg Sandwich", price: 5000 },
  { id: "9", name: "Grilled Sandwich", price: 7000 },
  { id: "10", name: "Tea", price: 2000 },
  { id: "11", name: "Coffee", price: 2500 },
  { id: "12", name: "Cold Coffee", price: 8000 },
  { id: "13", name: "Hot Chocolate", price: 9000 },
  { id: "14", name: "Lemon Tea", price: 2500 },
  { id: "15", name: "Green Tea", price: 3000 },
  { id: "16", name: "Coca Cola", price: 4000 },
  { id: "17", name: "Pepsi", price: 4000 },
  { id: "18", name: "Sprite", price: 4000 },
  { id: "19", name: "Fanta", price: 4000 },
  { id: "20", name: "Thumbs Up", price: 4000 },
  { id: "21", name: "Mineral Water", price: 2000 },
  { id: "22", name: "Pakoda", price: 4500 },
  { id: "23", name: "Samosa", price: 3000 },
  { id: "24", name: "Vada Pav", price: 3500 },
  { id: "25", name: "Pav Bhaji", price: 8000 },
  { id: "26", name: "Misal Pav", price: 7000 },
  { id: "27", name: "Poha", price: 5000 },
  { id: "28", name: "Upma", price: 4500 },
  { id: "29", name: "Idli Sambar", price: 6000 },
  { id: "30", name: "Dosa", price: 7000 },
  { id: "31", name: "Uttapam", price: 7500 },
  { id: "32", name: "Paratha", price: 6000 },
  { id: "33", name: "Aloo Paratha", price: 7000 },
  { id: "34", name: "Paneer Paratha", price: 9000 },
  { id: "35", name: "Bhel Puri", price: 5000 },
  { id: "36", name: "Pani Puri", price: 4000 },
  { id: "37", name: "Sev Puri", price: 5500 },
  { id: "38", name: "Dahi Puri", price: 6000 },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [billItems, setBillItems] = useState<BillItem[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const { toast } = useToast();

  const filteredItems = useMemo(() => {
    if (searchQuery.length < 2) return [];
    const query = searchQuery.toLowerCase();
    return MENU_ITEMS.filter(item => 
      item.name.toLowerCase().includes(query)
    ).slice(0, 10);
  }, [searchQuery]);

  const addItemToBill = (item: MenuItem) => {
    setBillItems(prev => {
      const existingItem = prev.find(billItem => billItem.id === item.id);
      if (existingItem) {
        return prev.map(billItem =>
          billItem.id === item.id
            ? { ...billItem, quantity: billItem.quantity + 1 }
            : billItem
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setSearchQuery("");
    setHighlightedIndex(0);
    
    toast({
      title: "Item added",
      description: `${item.name} added to bill`,
      duration: 2000,
    });
  };

  const removeItemFromBill = (id: string) => {
    setBillItems(prev => prev.filter(item => item.id !== id));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (filteredItems.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex(prev => 
        prev < filteredItems.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex(prev => prev > 0 ? prev - 1 : 0);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredItems.length === 1) {
        addItemToBill(filteredItems[0]);
      } else if (highlightedIndex < filteredItems.length) {
        addItemToBill(filteredItems[highlightedIndex]);
      }
    } else if (e.key === "Escape") {
      setSearchQuery("");
    }
  };

  const handlePay = () => {
    if (billItems.length === 0) return;
    
    const total = billItems.reduce((sum, item) => sum + (item.price * item.quantity), 0) / 100;
    toast({
      title: "Payment initiated",
      description: `Total amount: ₹${total.toFixed(2)}`,
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-background border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <h1 className="text-2xl font-bold text-primary" data-testid="text-title">
            Ashok Redi Billing
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="mb-6">
          <div className="relative">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              onKeyDown={handleKeyDown}
              placeholder="Search menu items..."
            />
            <AutocompleteDropdown
              items={filteredItems}
              onSelect={addItemToBill}
              highlightedIndex={highlightedIndex}
            />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="bg-card rounded-lg shadow-md p-6 min-h-96">
            <h2 className="text-xl font-bold text-foreground mb-4" data-testid="text-bill-items">
              Bill Items
            </h2>
            {billItems.length === 0 ? (
              <div className="flex items-center justify-center h-64 text-muted-foreground">
                <p className="text-base">Start searching to add items to the bill</p>
              </div>
            ) : (
              <div className="space-y-0">
                {billItems.map(item => (
                  <BillItemRow
                    key={item.id}
                    item={item}
                    onRemove={removeItemFromBill}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="bg-card rounded-lg shadow-md p-6 h-fit sticky top-24">
            <h2 className="text-xl font-bold text-foreground mb-6">Summary</h2>
            <BillSummary items={billItems} onPay={handlePay} />
          </div>
        </div>
      </main>
    </div>
  );
}
