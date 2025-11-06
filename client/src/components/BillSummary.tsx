import { Button } from "@/components/ui/button";
import { BillItem } from "@shared/schema";

interface BillSummaryProps {
  items: BillItem[];
}

export default function BillSummary({ items }: BillSummaryProps) {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0) / 100;

  const handlePayNow = () => {
    if (items.length === 0 || total <= 0) return;
    
    const upiId = "paytmqr5w8oju@ptys";
    const payeeName = "Ashok Redi";
    const transactionNote = "Bill Payment";
    const amount = total.toFixed(2);
    
    const upiUrl = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(payeeName)}&am=${encodeURIComponent(amount)}&cu=INR&tn=${encodeURIComponent(transactionNote)}`;
    
    window.location.href = upiUrl;
  };

  const isDisabled = items.length === 0;

  return (
    <div className="space-y-3 lg:space-y-6">
      <div className="border-t-2 border-border pt-3 lg:pt-4">
        <div className="flex items-center justify-between">
          <span className="text-lg lg:text-xl font-bold text-foreground">Total</span>
          <span 
            className="text-2xl lg:text-3xl font-bold text-primary tabular-nums"
            aria-live="polite"
            data-testid="text-total"
          >
            ₹{total.toFixed(2)}
          </span>
        </div>
      </div>

      <Button
        onClick={handlePayNow}
        className="w-full h-12 lg:h-14 text-base font-bold"
        size="lg"
        disabled={isDisabled}
        data-testid="button-pay"
      >
        Pay Now
      </Button>
    </div>
  );
}
