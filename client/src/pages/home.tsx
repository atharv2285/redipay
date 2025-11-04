import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import SearchBar from "@/components/SearchBar";
import AutocompleteDropdown from "@/components/AutocompleteDropdown";
import BillItemRow from "@/components/BillItemRow";
import BillSummary from "@/components/BillSummary";
import { MenuItem, BillItem } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [billItems, setBillItems] = useState<BillItem[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const { toast } = useToast();

  const { data: menuItems = [], isLoading } = useQuery<MenuItem[]>({
    queryKey: ["/api/menu-items"],
  });

  const filteredItems = useMemo(() => {
    if (searchQuery.length < 2 || !menuItems.length) return [];
    const query = searchQuery.toLowerCase();
    return menuItems.filter(item => 
      item.name.toLowerCase().includes(query)
    ).slice(0, 10);
  }, [searchQuery, menuItems]);

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
    
    if (total <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please add items to the bill",
        duration: 2000,
      });
      return;
    }
    
    const upiId = "paytmqr5w8oju@ptys";
    const payeeName = "Ashok Redi";
    const transactionNote = "Bill Payment";
    
    const upiUrl = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(payeeName)}&am=${encodeURIComponent(total.toFixed(2))}&cu=INR&tn=${encodeURIComponent(transactionNote)}`;
    
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
      window.location.href = upiUrl;
      toast({
        title: "Opening payment app",
        description: `Total amount: ₹${total.toFixed(2)}`,
        duration: 3000,
      });
    } else {
      toast({
        title: "UPI Payment",
        description: `Pay ₹${total.toFixed(2)} to UPI ID: ${upiId}`,
        duration: 5000,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading menu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-background border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-primary" data-testid="text-title">
              Ashok Redi Billing
            </h1>
            <img 
              src="/attached_assets/Screenshot 2025-11-04 at 4.35.54 PM_1762254371297.png" 
              alt="Redipay Logo" 
              className="h-10"
              data-testid="img-logo"
            />
          </div>
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
