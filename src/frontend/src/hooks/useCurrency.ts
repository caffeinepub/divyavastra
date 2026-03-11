export type Currency = {
  code: string;
  symbol: string;
  rate: number;
};

export function detectCurrency(): Currency {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (tz === "Asia/Kathmandu" || tz.includes("Kathmandu"))
    return { code: "NPR", symbol: "रु", rate: 1.6 };
  if (tz.startsWith("Asia/Kolkata") || tz.startsWith("Asia/Calcutta"))
    return { code: "INR", symbol: "₹", rate: 1 };
  return { code: "USD", symbol: "$", rate: 0.012 };
}

export function formatPrice(priceINR: number, currency: Currency): string {
  const converted = priceINR * currency.rate;
  if (currency.code === "USD") {
    return `${currency.symbol}${converted.toFixed(2)}`;
  }
  return `${currency.symbol}${Math.round(converted).toLocaleString("en-IN")}`;
}
