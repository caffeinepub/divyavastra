import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Currency } from "@/hooks/useCurrency";
import { formatPrice } from "@/hooks/useCurrency";
import type { PaymentSettings, Product } from "@/lib/store";
import { generateId, saveOrder } from "@/lib/store";
import { useState } from "react";
import { toast } from "sonner";

const BANKS = [
  "State Bank of India",
  "HDFC Bank",
  "ICICI Bank",
  "Axis Bank",
  "Kotak Mahindra Bank",
  "Punjab National Bank",
  "Bank of Baroda",
  "Yes Bank",
];

type Props = {
  open: boolean;
  onClose: () => void;
  product: Product;
  currency: Currency;
  paymentSettings: PaymentSettings;
};

export default function CheckoutModal({
  open,
  onClose,
  product,
  currency,
  paymentSettings,
}: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [method, setMethod] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [bank, setBank] = useState("");
  const [success, setSuccess] = useState(false);

  const reset = () => {
    setName("");
    setPhone("");
    setMethod("");
    setCardName("");
    setCardNumber("");
    setCardExpiry("");
    setCardCvv("");
    setBank("");
    setSuccess(false);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSubmit = () => {
    if (!name.trim() || !phone.trim() || !method) {
      toast.error("Please fill in all required fields.");
      return;
    }
    saveOrder({
      id: generateId(),
      productId: product.id,
      productName: product.name,
      customerName: name,
      customerPhone: phone,
      paymentMethod: method,
      status: "Pending",
      timestamp: Date.now(),
      currency: currency.code,
      displayPrice: formatPrice(product.price, currency),
    });
    setSuccess(true);
  };

  const methods = paymentSettings.enabledMethods;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        data-ocid="checkout.dialog"
        className="max-w-md max-h-[90vh] overflow-y-auto"
      >
        <DialogHeader>
          <DialogTitle className="font-heading text-lg">
            {success ? "Order Placed! 🪷" : "Place Order"}
          </DialogTitle>
          <DialogDescription>
            {success
              ? "Your order has been received. We'll contact you shortly."
              : `${product.name} — ${formatPrice(product.price, currency)}`}
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <div className="text-center py-4">
            <p className="text-sm text-muted-foreground mb-4">
              Thank you, <strong>{name}</strong>! Your order for{" "}
              <strong>{product.name}</strong> has been placed successfully. Our
              team will reach out to you on <strong>{phone}</strong>.
            </p>
            <Button
              onClick={handleClose}
              className="bg-gold text-primary-foreground hover:bg-gold/90"
              data-ocid="checkout.close_button"
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">
                Full Name *
              </Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="h-9"
              />
            </div>

            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">
                Phone Number *
              </Label>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 XXXXX XXXXX"
                className="h-9"
              />
            </div>

            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">
                Payment Method *
              </Label>
              <Select value={method} onValueChange={setMethod}>
                <SelectTrigger
                  data-ocid="checkout.payment.select"
                  className="h-9 text-sm"
                >
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  {methods.map((m) => (
                    <SelectItem key={m} value={m}>
                      {m === "COD" ? "Cash on Delivery" : m}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {method === "UPI" && (
              <div className="bg-muted/50 rounded p-3 text-sm">
                <p className="text-muted-foreground text-xs mb-1">
                  Pay to UPI ID:
                </p>
                <p className="font-semibold text-foreground">
                  {paymentSettings.upiId}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  After payment, submit this form to confirm your order.
                </p>
              </div>
            )}

            {method === "Card" && (
              <div className="space-y-3">
                <Input
                  placeholder="Name on Card"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  className="h-9 text-sm"
                />
                <Input
                  placeholder="Card Number"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="h-9 text-sm"
                />
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    placeholder="MM/YY"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    className="h-9 text-sm"
                  />
                  <Input
                    placeholder="CVV"
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value)}
                    className="h-9 text-sm"
                  />
                </div>
              </div>
            )}

            {method === "NetBanking" && (
              <Select value={bank} onValueChange={setBank}>
                <SelectTrigger className="h-9 text-sm">
                  <SelectValue placeholder="Select your bank" />
                </SelectTrigger>
                <SelectContent>
                  {BANKS.map((b) => (
                    <SelectItem key={b} value={b}>
                      {b}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {method === "COD" && (
              <div className="bg-muted/50 rounded p-3 text-sm text-muted-foreground">
                Pay in cash when your order is delivered.
              </div>
            )}

            <Button
              data-ocid="checkout.submit.button"
              onClick={handleSubmit}
              className="w-full bg-gold text-primary-foreground hover:bg-gold/90 h-9"
            >
              Confirm Order
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
