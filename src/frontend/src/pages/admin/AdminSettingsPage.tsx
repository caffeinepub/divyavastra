import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  getAdminSettings,
  getPaymentSettings,
  saveAdminSettings,
  savePaymentSettings,
} from "@/lib/store";
import { useState } from "react";
import { toast } from "sonner";

const ALL_METHODS = ["UPI", "Card", "NetBanking", "COD"];

export default function AdminSettingsPage() {
  const [paySettings, setPaySettings] = useState(() => getPaymentSettings());

  // Admin account state
  const [newUsername, setNewUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleSavePayment = () => {
    savePaymentSettings(paySettings);
    toast.success("Payment settings saved!");
  };

  const toggleMethod = (method: string) => {
    setPaySettings((s) => ({
      ...s,
      enabledMethods: s.enabledMethods.includes(method)
        ? s.enabledMethods.filter((m) => m !== method)
        : [...s.enabledMethods, method],
    }));
  };

  const handleChangeUsername = () => {
    if (!newUsername.trim()) {
      toast.error("Username cannot be empty.");
      return;
    }
    const current = getAdminSettings();
    saveAdminSettings({ ...current, username: newUsername.trim() });
    toast.success("Username updated!");
    setNewUsername("");
  };

  const handleChangePassword = () => {
    const current = getAdminSettings();
    if (btoa(currentPassword) !== current.passwordHash) {
      toast.error("Current password is incorrect.");
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      toast.error("New password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    saveAdminSettings({ ...current, passwordHash: btoa(newPassword) });
    toast.success("Password updated successfully!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
  };

  return (
    <div className="max-w-md">
      <h1 className="font-heading text-xl font-semibold mb-6">Settings</h1>

      <div className="space-y-6">
        {/* ── Admin Account ── */}
        <div className="border border-border rounded-lg p-5 bg-card space-y-5">
          <h2 className="font-semibold text-sm">Admin Account</h2>

          {/* Change Username */}
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground font-medium">
              Change Username
            </p>
            <div className="flex gap-2">
              <Input
                data-ocid="admin.settings.username.input"
                placeholder="New username"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                className="h-9 flex-1"
              />
              <Button
                data-ocid="admin.settings.username.save.button"
                onClick={handleChangeUsername}
                size="sm"
                className="bg-gold text-primary-foreground hover:bg-gold/90 h-9 px-4"
              >
                Save
              </Button>
            </div>
          </div>

          {/* Change Password */}
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground font-medium">
              Change Password
            </p>
            <div className="space-y-2">
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">
                  Current Password
                </Label>
                <Input
                  data-ocid="admin.settings.current.password.input"
                  type="password"
                  placeholder="Enter current password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="h-9"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">
                  New Password
                </Label>
                <Input
                  data-ocid="admin.settings.new.password.input"
                  type="password"
                  placeholder="New password (min 6 chars)"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="h-9"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">
                  Confirm New Password
                </Label>
                <Input
                  data-ocid="admin.settings.confirm.password.input"
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  className="h-9"
                />
              </div>
              <Button
                data-ocid="admin.settings.password.save.button"
                onClick={handleChangePassword}
                className="w-full bg-gold text-primary-foreground hover:bg-gold/90 h-9"
              >
                Update Password
              </Button>
            </div>
          </div>
        </div>

        {/* ── UPI Settings ── */}
        <div className="border border-border rounded-lg p-5 bg-card space-y-3">
          <h2 className="font-semibold text-sm">UPI Settings</h2>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">UPI ID</Label>
            <Input
              data-ocid="admin.settings.upi.input"
              value={paySettings.upiId}
              onChange={(e) =>
                setPaySettings((s) => ({ ...s, upiId: e.target.value }))
              }
              placeholder="yourname@upi"
              className="h-9"
            />
          </div>
        </div>

        {/* ── Payment Methods ── */}
        <div className="border border-border rounded-lg p-5 bg-card space-y-3">
          <h2 className="font-semibold text-sm">Enabled Payment Methods</h2>
          <div className="space-y-2.5">
            {ALL_METHODS.map((method) => (
              <div key={method} className="flex items-center gap-2.5">
                <Checkbox
                  id={method}
                  checked={paySettings.enabledMethods.includes(method)}
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
          onClick={handleSavePayment}
          className="bg-gold text-primary-foreground hover:bg-gold/90"
        >
          Save Payment Settings
        </Button>
      </div>
    </div>
  );
}
