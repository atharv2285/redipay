import BillSummary from "../BillSummary";
import { BillItem } from "@shared/schema";

export default function BillSummaryExample() {
  const mockItems: BillItem[] = [
    { id: "1", name: "Masala Maggi", price: 4000, quantity: 2 },
    { id: "2", name: "Cheese Sandwich", price: 6000, quantity: 1 },
    { id: "3", name: "Cold Coffee", price: 8000, quantity: 1 },
  ];

  const handlePay = () => {
    console.log("Pay button clicked - Total:", mockItems.reduce((sum, item) => sum + (item.price * item.quantity), 0) / 100);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-card rounded-lg shadow-md p-6">
      <BillSummary items={mockItems} onPay={handlePay} />
    </div>
  );
}
