import { Button } from "@/components/ui/button";
import { BillItem } from "@shared/schema";

interface BillSummaryProps {
  items: BillItem[];
  onPay: () => void;
}

export default function BillSummary({ items, onPay }: BillSummaryProps) {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0) / 100;

  return (
    <div className="space-y-6">
      <div className="border-t-2 border-border pt-4">
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-foreground">Total</span>
          <span 
            className="text-3xl font-bold text-primary tabular-nums"
            aria-live="polite"
            data-testid="text-total"
          >
            ₹{total.toFixed(2)}
          </span>
        </div>
      </div>
      <Button
        onClick={onPay}
        className="w-full h-14 text-base font-bold"
        size="lg"
        disabled={items.length === 0}
        data-testid="button-pay"
      >
        Pay Now
      </Button>
    </div>
  );
}
