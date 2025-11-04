import { useState } from "react";
import BillItemRow from "../BillItemRow";
import { BillItem } from "@shared/schema";

export default function BillItemRowExample() {
  const [items, setItems] = useState<BillItem[]>([
    { id: "1", name: "Masala Maggi", price: 4000, quantity: 2 },
    { id: "2", name: "Cheese Sandwich", price: 6000, quantity: 1 },
  ]);

  const handleRemove = (id: string) => {
    setItems(items.filter(item => item.id !== id));
    console.log("Removed item:", id);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-card rounded-lg shadow-md p-6">
      {items.map(item => (
        <BillItemRow key={item.id} item={item} onRemove={handleRemove} />
      ))}
    </div>
  );
}
