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
    
    const params = `pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(payeeName)}&am=${encodeURIComponent(amount)}&cu=INR&tn=${encodeURIComponent(transactionNote)}`;
    
    const apps = [
      { name: 'Paytm', url: `paytmmp://pay?${params}` },
      { name: 'GPay', url: `tez://upi/pay?${params}` },
      { name: 'PhonePe', url: `phonepe://pay?${params}` }
    ];
    
    let currentAppIndex = 0;
    const startTime = Date.now();
    
    const tryNextApp = () => {
      if (currentAppIndex >= apps.length) {
        return;
      }
      
      const app = apps[currentAppIndex];
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = app.url;
      document.body.appendChild(iframe);
      
      setTimeout(() => {
        document.body.removeChild(iframe);
        
        const timeElapsed = Date.now() - startTime;
        if (timeElapsed < 2000 && currentAppIndex < apps.length - 1) {
          currentAppIndex++;
          tryNextApp();
        }
      }, 1000);
    };
    
    tryNextApp();
  };

  const isDisabled = items.length === 0;

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
        onClick={handlePayNow}
        className="w-full h-14 text-base font-bold"
        size="lg"
        disabled={isDisabled}
        data-testid="button-pay"
      >
        Pay Now
      </Button>
    </div>
  );
}
