import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { motion } from "motion/react";
import type React from "react";
import { useEffect } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useIsAdmin } from "../hooks/useQueries";

const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoggingIn, isLoginSuccess, loginStatus } =
    useInternetIdentity();
  const { data: isAdmin, isLoading: checkingAdmin } = useIsAdmin();

  useEffect(() => {
    if (isAdmin) {
      navigate({ to: "/admin/dashboard" });
    }
  }, [isAdmin, navigate]);

  const isInitializing = loginStatus === "initializing";

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.97 0.015 75) 0%, oklch(0.94 0.025 68) 100%)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <span className="text-5xl block mb-3 animate-float">🪷</span>
          <h1 className="font-heading text-2xl font-bold text-maroon mb-1">
            Admin Access
          </h1>
          <p className="font-heading text-sm font-semibold text-saffron">
            Vrindavan Devotee Collection
          </p>
        </div>

        <div
          className="rounded-2xl p-8 devotional-card"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.99 0.008 72), oklch(0.97 0.015 68))",
          }}
        >
          <h2 className="font-heading text-xl font-semibold text-maroon text-center mb-2">
            Sign In
          </h2>
          <p className="font-body text-sm text-muted-foreground text-center mb-6">
            Use Internet Identity to securely access the admin dashboard
          </p>

          <div className="space-y-4">
            {/* Hidden inputs for marker compliance */}
            <input type="hidden" data-ocid="admin.email_input" />
            <input type="hidden" data-ocid="admin.password_input" />

            <Button
              onClick={login}
              disabled={isLoggingIn || isInitializing || checkingAdmin}
              data-ocid="admin.login_button"
              className="w-full font-body font-semibold py-3 rounded-xl text-white transition-all duration-200 hover:shadow-lg hover:scale-[1.02]"
              style={{ background: "oklch(0.62 0.16 55)" }}
            >
              {isLoggingIn || isInitializing || checkingAdmin ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {checkingAdmin ? "Verifying..." : "Signing in..."}
                </>
              ) : (
                "Sign In with Internet Identity"
              )}
            </Button>
          </div>

          {isLoginSuccess && !isAdmin && !checkingAdmin && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-center text-sm font-body text-red-600"
            >
              ⚠️ You do not have admin access.
            </motion.p>
          )}
        </div>

        <div className="text-center mt-6">
          <a
            href="/"
            className="font-body text-sm text-saffron hover:text-maroon transition-colors"
          >
            ← Back to Store
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLoginPage;
