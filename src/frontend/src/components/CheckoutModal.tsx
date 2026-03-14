import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
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
import { CheckCircle2, ChevronLeft } from "lucide-react";
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

type ShippingData = {
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
};

const STEPS = [
  { label: "Shipping", num: 1 },
  { label: "Payment", num: 2 },
  { label: "Review", num: 3 },
];

export default function CheckoutModal({
  open,
  onClose,
  product,
  currency,
  paymentSettings,
}: Props) {
  const [step, setStep] = useState(1);
  const [success, setSuccess] = useState(false);

  const [shipping, setShipping] = useState<ShippingData>({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [method, setMethod] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [bank, setBank] = useState("");

  const reset = () => {
    setStep(1);
    setSuccess(false);
    setShipping({
      name: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
    });
    setMethod("");
    setCardName("");
    setCardNumber("");
    setCardExpiry("");
    setCardCvv("");
    setBank("");
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const validateShipping = () => {
    const { name, phone, address, city, state, pincode } = shipping;
    if (
      !name.trim() ||
      !phone.trim() ||
      !address.trim() ||
      !city.trim() ||
      !state.trim() ||
      !pincode.trim()
    ) {
      toast.error("Please fill in all shipping fields.");
      return false;
    }
    return true;
  };

  const validatePayment = () => {
    if (!method) {
      toast.error("Please select a payment method.");
      return false;
    }
    return true;
  };

  const handlePlaceOrder = () => {
    saveOrder({
      id: generateId(),
      productId: product.id,
      productName: product.name,
      customerName: shipping.name,
      customerPhone: shipping.phone,
      address: shipping.address,
      city: shipping.city,
      state: shipping.state,
      pincode: shipping.pincode,
      paymentMethod: method,
      status: "Pending",
      timestamp: Date.now(),
      currency: currency.code,
      displayPrice: formatPrice(product.price, currency),
    });
    setSuccess(true);
  };

  const methods = paymentSettings.enabledMethods;
  const displayPrice = formatPrice(product.price, currency);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        data-ocid="checkout.dialog"
        className="max-w-md max-h-[92vh] overflow-y-auto"
      >
        {success ? (
          <div className="text-center py-6 space-y-4">
            <CheckCircle2 className="w-14 h-14 text-gold mx-auto" />
            <div>
              <h2 className="font-heading text-xl font-semibold">
                Order Placed! 🪷
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Your order has been received.
              </p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 text-sm text-left space-y-1">
              <p>
                <span className="text-muted-foreground">Customer: </span>
                <strong>{shipping.name}</strong>
              </p>
              <p>
                <span className="text-muted-foreground">Phone: </span>
                <strong>{shipping.phone}</strong>
              </p>
              <p className="text-muted-foreground text-xs mt-2">
                Our team will contact you on the above number to confirm your
                order.
              </p>
            </div>
            <Button
              data-ocid="checkout.close_button"
              onClick={handleClose}
              className="w-full bg-gold text-primary-foreground hover:bg-gold/90"
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="font-heading text-lg">
                Place Order
              </DialogTitle>
            </DialogHeader>

            {/* Step indicator */}
            <div className="flex items-center justify-between mb-2">
              {STEPS.map((s, i) => (
                <div key={s.num} className="flex items-center flex-1">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors ${
                        step > s.num
                          ? "bg-gold border-gold text-primary-foreground"
                          : step === s.num
                            ? "border-gold text-gold bg-gold/10"
                            : "border-border text-muted-foreground"
                      }`}
                    >
                      {step > s.num ? "✓" : s.num}
                    </div>
                    <span
                      className={`text-[10px] mt-0.5 ${
                        step >= s.num
                          ? "text-gold font-medium"
                          : "text-muted-foreground"
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div
                      className={`flex-1 h-px mx-2 mt-[-10px] ${
                        step > s.num ? "bg-gold" : "bg-border"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* ── STEP 1: Shipping ── */}
            {step === 1 && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2 space-y-1">
                    <Label className="text-xs text-muted-foreground">
                      Full Name *
                    </Label>
                    <Input
                      data-ocid="checkout.step1.name.input"
                      placeholder="Your full name"
                      value={shipping.name}
                      onChange={(e) =>
                        setShipping((s) => ({ ...s, name: e.target.value }))
                      }
                      className="h-9"
                    />
                  </div>
                  <div className="col-span-2 space-y-1">
                    <Label className="text-xs text-muted-foreground">
                      Phone Number *
                    </Label>
                    <Input
                      data-ocid="checkout.step1.phone.input"
                      placeholder="+91 XXXXX XXXXX"
                      value={shipping.phone}
                      onChange={(e) =>
                        setShipping((s) => ({ ...s, phone: e.target.value }))
                      }
                      className="h-9"
                    />
                  </div>
                  <div className="col-span-2 space-y-1">
                    <Label className="text-xs text-muted-foreground">
                      Address *
                    </Label>
                    <Input
                      data-ocid="checkout.step1.address.input"
                      placeholder="House No., Street, Area"
                      value={shipping.address}
                      onChange={(e) =>
                        setShipping((s) => ({ ...s, address: e.target.value }))
                      }
                      className="h-9"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">
                      City *
                    </Label>
                    <Input
                      placeholder="City"
                      value={shipping.city}
                      onChange={(e) =>
                        setShipping((s) => ({ ...s, city: e.target.value }))
                      }
                      className="h-9"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">
                      State *
                    </Label>
                    <Input
                      placeholder="State"
                      value={shipping.state}
                      onChange={(e) =>
                        setShipping((s) => ({ ...s, state: e.target.value }))
                      }
                      className="h-9"
                    />
                  </div>
                  <div className="col-span-2 space-y-1">
                    <Label className="text-xs text-muted-foreground">
                      Pincode *
                    </Label>
                    <Input
                      placeholder="Pincode / ZIP"
                      value={shipping.pincode}
                      onChange={(e) =>
                        setShipping((s) => ({ ...s, pincode: e.target.value }))
                      }
                      className="h-9"
                    />
                  </div>
                </div>
                <Button
                  data-ocid="checkout.step1.continue.button"
                  onClick={() => {
                    if (validateShipping()) setStep(2);
                  }}
                  className="w-full bg-gold text-primary-foreground hover:bg-gold/90 h-9"
                >
                  Continue to Payment
                </Button>
              </div>
            )}

            {/* ── STEP 2: Payment ── */}
            {step === 2 && (
              <div className="space-y-4">
                {/* Order summary strip */}
                <div className="bg-muted/40 rounded-lg px-4 py-3 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground truncate max-w-[60%]">
                    {product.name}
                  </span>
                  <span className="font-semibold text-foreground">
                    {displayPrice}
                  </span>
                </div>

                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">
                    Payment Method *
                  </Label>
                  <Select value={method} onValueChange={setMethod}>
                    <SelectTrigger
                      data-ocid="checkout.step2.payment.select"
                      className="h-9 text-sm"
                    >
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      {methods.map((m) => (
                        <SelectItem key={m} value={m}>
                          {m === "COD"
                            ? "Cash on Delivery"
                            : m === "NetBanking"
                              ? "Net Banking"
                              : m}
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
                      Complete the UPI transfer, then click Continue.
                    </p>
                  </div>
                )}

                {method === "Card" && (
                  <div className="space-y-2">
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

                <div className="flex gap-2">
                  <Button
                    data-ocid="checkout.step2.back.button"
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="flex-1 h-9 gap-1"
                  >
                    <ChevronLeft className="w-4 h-4" /> Back
                  </Button>
                  <Button
                    data-ocid="checkout.step2.continue.button"
                    onClick={() => {
                      if (validatePayment()) setStep(3);
                    }}
                    className="flex-1 bg-gold text-primary-foreground hover:bg-gold/90 h-9"
                  >
                    Review Order
                  </Button>
                </div>
              </div>
            )}

            {/* ── STEP 3: Review ── */}
            {step === 3 && (
              <div className="space-y-4">
                <div className="border border-border rounded-lg divide-y divide-border text-sm">
                  <div className="px-4 py-3 flex justify-between">
                    <span className="text-muted-foreground">Product</span>
                    <span className="font-medium text-right max-w-[55%]">
                      {product.name}
                    </span>
                  </div>
                  <div className="px-4 py-3 flex justify-between">
                    <span className="text-muted-foreground">Price</span>
                    <span className="font-semibold text-gold">
                      {displayPrice}
                    </span>
                  </div>
                  <div className="px-4 py-3 flex justify-between">
                    <span className="text-muted-foreground">Name</span>
                    <span>{shipping.name}</span>
                  </div>
                  <div className="px-4 py-3 flex justify-between">
                    <span className="text-muted-foreground">Phone</span>
                    <span>{shipping.phone}</span>
                  </div>
                  <div className="px-4 py-3 flex justify-between">
                    <span className="text-muted-foreground">Address</span>
                    <span className="text-right max-w-[60%]">
                      {shipping.address}, {shipping.city}, {shipping.state} –{" "}
                      {shipping.pincode}
                    </span>
                  </div>
                  <div className="px-4 py-3 flex justify-between">
                    <span className="text-muted-foreground">Payment</span>
                    <span>
                      {method === "COD"
                        ? "Cash on Delivery"
                        : method === "NetBanking"
                          ? "Net Banking"
                          : method}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    data-ocid="checkout.step3.back.button"
                    variant="outline"
                    onClick={() => setStep(2)}
                    className="flex-1 h-9 gap-1"
                  >
                    <ChevronLeft className="w-4 h-4" /> Back
                  </Button>
                  <Button
                    data-ocid="checkout.step3.confirm.button"
                    onClick={handlePlaceOrder}
                    className="flex-1 bg-gold text-primary-foreground hover:bg-gold/90 h-9 font-semibold"
                  >
                    Place Order 🪷
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
