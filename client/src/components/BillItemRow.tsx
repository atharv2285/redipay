import { X } from "lucide-react";
import { BillItem } from "@shared/schema";

interface BillItemRowProps {
  item: BillItem;
  onRemove: (id: string) => void;
}

export default function BillItemRow({ item, onRemove }: BillItemRowProps) {
  const totalPrice = (item.price * item.quantity) / 100;

  return (
    <div 
      className="flex items-center justify-between py-4 border-b border-border last:border-b-0 transition-all"
      data-testid={`item-${item.id}`}
    >
      <div className="flex-1 min-w-0 pr-4">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-foreground truncate">{item.name}</span>
          <span className="text-sm font-semibold text-muted-foreground tabular-nums flex-shrink-0">x{item.quantity}</span>
        </div>
      </div>
      <div className="flex items-center gap-3 flex-shrink-0">
        <span className="text-sm font-semibold text-foreground tabular-nums">₹{totalPrice.toFixed(2)}</span>
        <button
          onClick={() => onRemove(item.id)}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-destructive/10 text-destructive hover-elevate active-elevate-2 transition-all"
          data-testid={`button-remove-${item.id}`}
          aria-label={`Remove ${item.name}`}
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
