import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getPaymentSettings, savePaymentSettings } from "@/lib/store";
import { useState } from "react";
import { toast } from "sonner";

const ALL_METHODS = ["UPI", "Card", "NetBanking", "COD"];

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState(() => getPaymentSettings());

  const handleSave = () => {
    savePaymentSettings(settings);
    toast.success("Settings saved!");
  };

  const toggleMethod = (method: string) => {
    setSettings((s) => ({
      ...s,
      enabledMethods: s.enabledMethods.includes(method)
        ? s.enabledMethods.filter((m) => m !== method)
        : [...s.enabledMethods, method],
    }));
  };

  return (
    <div className="max-w-md">
      <h1 className="font-heading text-xl font-semibold mb-6">Settings</h1>

      <div className="space-y-6">
        {/* UPI */}
        <div className="border border-border rounded-lg p-5 bg-card space-y-3">
          <h2 className="font-semibold text-sm">UPI Settings</h2>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">UPI ID</Label>
            <Input
              value={settings.upiId}
              onChange={(e) =>
                setSettings((s) => ({ ...s, upiId: e.target.value }))
              }
              placeholder="yourname@upi"
              className="h-9"
            />
          </div>
        </div>

        {/* Payment Methods */}
        <div className="border border-border rounded-lg p-5 bg-card space-y-3">
          <h2 className="font-semibold text-sm">Enabled Payment Methods</h2>
          <div className="space-y-2.5">
            {ALL_METHODS.map((method) => (
              <div key={method} className="flex items-center gap-2.5">
                <Checkbox
                  id={method}
                  checked={settings.enabledMethods.includes(method)}
                  onCheckedChange={() => toggleMethod(method)}
                />
                <Label htmlFor={method} className="text-sm cursor-pointer">
                  {method === "COD"
                    ? "Cash on Delivery"
                    : method === "NetBanking"
                      ? "Net Banking"
                      : method}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Button
          data-ocid="admin.settings.save.button"
          onClick={handleSave}
          className="bg-gold text-primary-foreground hover:bg-gold/90"
        >
          Save Settings
        </Button>
      </div>
    </div>
  );
}
