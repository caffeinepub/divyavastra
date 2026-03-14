import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  getAdminSettings,
  saveAdminSettings,
  setAdminSession,
} from "@/lib/store";
import { useNavigate } from "@tanstack/react-router";
import { Copy, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type Mode = "login" | "setup" | "forgotPassword";

function generateRecoveryCode(): string {
  return Math.random().toString(36).slice(2, 10).toUpperCase();
}

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const settings = getAdminSettings();

  const [mode, setMode] = useState<Mode>(settings.isSetup ? "login" : "setup");

  // Setup fields
  const [setupUsername, setSetupUsername] = useState("divyash123");
  const [setupPassword, setSetupPassword] = useState("");
  const [setupConfirm, setSetupConfirm] = useState("");
  const [recoveryCode, setRecoveryCode] = useState("");
  const [showRecovery, setShowRecovery] = useState(false);

  // Login fields
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPass, setShowLoginPass] = useState(false);
  const [loading, setLoading] = useState(false);

  // Forgot password fields
  const [forgotCode, setForgotCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleSetup = () => {
    if (!setupUsername.trim()) {
      toast.error("Username is required.");
      return;
    }
    if (!setupPassword || setupPassword.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    if (setupPassword !== setupConfirm) {
      toast.error("Passwords do not match.");
      return;
    }
    const code = generateRecoveryCode();
    setRecoveryCode(code);
    setShowRecovery(true);
  };

  const handleSaveAfterRecovery = () => {
    const currentSettings = getAdminSettings();
    saveAdminSettings({
      ...currentSettings,
      passwordHash: btoa(setupPassword),
      isSetup: true,
      username: setupUsername,
      recoveryCode,
    });
    setAdminSession(true);
    toast.success("Admin account created!");
    navigate({ to: "/admin/dashboard" as const });
  };

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      const current = getAdminSettings();
      if (
        loginUsername === current.username &&
        btoa(loginPassword) === current.passwordHash
      ) {
        setAdminSession(true);
        navigate({ to: "/admin/dashboard" as const });
      } else {
        toast.error("Incorrect username or password.");
      }
      setLoading(false);
    }, 400);
  };

  const handleForgotReset = () => {
    const current = getAdminSettings();
    if (
      forgotCode.trim().toUpperCase() !== current.recoveryCode.toUpperCase()
    ) {
      toast.error("Invalid recovery code.");
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    saveAdminSettings({ ...current, passwordHash: btoa(newPassword) });
    toast.success("Password reset successfully! Please login.");
    setMode("login");
    setForgotCode("");
    setNewPassword("");
    setConfirmNewPassword("");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="font-heading text-2xl font-semibold text-gold">
            Divya Vastra
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            {mode === "setup"
              ? "Create Admin Account"
              : mode === "forgotPassword"
                ? "Reset Password"
                : "Admin Login"}
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          {/* ── SETUP MODE ── */}
          {mode === "setup" && !showRecovery && (
            <>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">
                  Username
                </Label>
                <Input
                  data-ocid="admin.setup.username.input"
                  placeholder="Username"
                  value={setupUsername}
                  onChange={(e) => setSetupUsername(e.target.value)}
                  className="h-9"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">
                  Password
                </Label>
                <Input
                  data-ocid="admin.setup.password.input"
                  type="password"
                  placeholder="At least 6 characters"
                  value={setupPassword}
                  onChange={(e) => setSetupPassword(e.target.value)}
                  className="h-9"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">
                  Confirm Password
                </Label>
                <Input
                  data-ocid="admin.setup.confirm.input"
                  type="password"
                  placeholder="Repeat password"
                  value={setupConfirm}
                  onChange={(e) => setSetupConfirm(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSetup()}
                  className="h-9"
                />
              </div>
              <Button
                data-ocid="admin.setup.submit.button"
                onClick={handleSetup}
                className="w-full bg-gold text-primary-foreground hover:bg-gold/90 h-9"
              >
                Create Account
              </Button>
            </>
          )}

          {/* ── SETUP: Recovery Code Screen ── */}
          {mode === "setup" && showRecovery && (
            <div className="space-y-4">
              <div className="bg-amber-50 border border-amber-300 rounded-lg p-4 space-y-3">
                <p className="text-xs font-semibold text-amber-800">
                  ⚠️ Save this recovery code — you will need it to reset your
                  password if forgotten.
                </p>
                <div className="flex items-center gap-2 bg-white border border-amber-200 rounded px-3 py-2">
                  <span className="font-mono text-base font-bold tracking-widest text-amber-900 flex-1">
                    {recoveryCode}
                  </span>
                  <button
                    type="button"
                    data-ocid="admin.recovery.copy.button"
                    onClick={() => {
                      navigator.clipboard.writeText(recoveryCode);
                      toast.success("Recovery code copied!");
                    }}
                    className="text-amber-700 hover:text-amber-900"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-amber-700">
                  Store this code somewhere safe. It cannot be shown again.
                </p>
              </div>
              <Button
                data-ocid="admin.recovery.confirm.button"
                onClick={handleSaveAfterRecovery}
                className="w-full bg-gold text-primary-foreground hover:bg-gold/90 h-9"
              >
                I've Saved My Code – Continue
              </Button>
            </div>
          )}

          {/* ── LOGIN MODE ── */}
          {mode === "login" && (
            <>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">
                  Username
                </Label>
                <Input
                  data-ocid="admin.login.username.input"
                  placeholder="Enter username"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  className="h-9"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    data-ocid="admin.login.password.input"
                    type={showLoginPass ? "text" : "password"}
                    placeholder="Enter password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                    className="h-9 pr-9"
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPass((v) => !v)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showLoginPass ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
              <button
                type="button"
                data-ocid="admin.login.forgot.button"
                onClick={() => setMode("forgotPassword")}
                className="text-xs text-gold hover:underline w-full text-right"
              >
                Forgot password?
              </button>
              <Button
                data-ocid="admin.login.submit.button"
                onClick={handleLogin}
                disabled={loading}
                className="w-full bg-gold text-primary-foreground hover:bg-gold/90 h-9"
              >
                {loading ? "Verifying..." : "Login"}
              </Button>
            </>
          )}

          {/* ── FORGOT PASSWORD MODE ── */}
          {mode === "forgotPassword" && (
            <>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">
                  Recovery Code
                </Label>
                <Input
                  data-ocid="admin.forgot.code.input"
                  placeholder="Enter your recovery code"
                  value={forgotCode}
                  onChange={(e) => setForgotCode(e.target.value)}
                  className="h-9 font-mono tracking-widest uppercase"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">
                  New Password
                </Label>
                <Input
                  data-ocid="admin.forgot.newpassword.input"
                  type="password"
                  placeholder="New password"
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
                  data-ocid="admin.forgot.confirm.input"
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleForgotReset()}
                  className="h-9"
                />
              </div>
              <Button
                data-ocid="admin.forgot.submit.button"
                onClick={handleForgotReset}
                className="w-full bg-gold text-primary-foreground hover:bg-gold/90 h-9"
              >
                Reset Password
              </Button>
              <button
                type="button"
                data-ocid="admin.forgot.back.button"
                onClick={() => setMode("login")}
                className="text-xs text-muted-foreground hover:text-foreground w-full text-center"
              >
                ← Back to login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
