import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  getAdminSettings,
  saveAdminSettings,
  setAdminSession,
} from "@/lib/store";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const settings = getAdminSettings();
  const isSetup = settings.isSetup;

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSetup = () => {
    if (!password || password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirm) {
      toast.error("Passwords do not match.");
      return;
    }
    saveAdminSettings({ passwordHash: btoa(password), isSetup: true });
    setAdminSession(true);
    toast.success("Admin account created!");
    navigate({ to: "/admin/dashboard" as const });
  };

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      if (btoa(password) === settings.passwordHash) {
        setAdminSession(true);
        navigate({ to: "/admin/dashboard" as const });
      } else {
        toast.error("Incorrect password.");
      }
      setLoading(false);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="font-heading text-2xl font-semibold text-gold">
            DivyaVastra
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            {isSetup ? "Admin Login" : "Setup Admin Account"}
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Password</Label>
            <Input
              data-ocid="admin.login.input"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && (isSetup ? handleLogin() : handleSetup())
              }
              className="h-9"
            />
          </div>

          {!isSetup && (
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">
                Confirm Password
              </Label>
              <Input
                type="password"
                placeholder="Confirm password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSetup()}
                className="h-9"
              />
            </div>
          )}

          <Button
            data-ocid="admin.login.submit.button"
            onClick={isSetup ? handleLogin : handleSetup}
            disabled={loading}
            className="w-full bg-gold text-primary-foreground hover:bg-gold/90 h-9"
          >
            {loading ? "Verifying..." : isSetup ? "Login" : "Create Account"}
          </Button>
        </div>
      </div>
    </div>
  );
}
