import { isAdminLoggedIn, setAdminSession } from "@/lib/store";
import { Link, Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import {
  LayoutDashboard,
  LogOut,
  Package,
  Settings,
  ShoppingBag,
} from "lucide-react";
import { useEffect } from "react";

const navItems = [
  {
    to: "/admin/dashboard" as const,
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  { to: "/admin/products" as const, label: "Products", icon: Package },
  { to: "/admin/orders" as const, label: "Orders", icon: ShoppingBag },
  { to: "/admin/settings" as const, label: "Settings", icon: Settings },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAdminLoggedIn()) {
      navigate({ to: "/admin" });
    }
  }, [navigate]);

  const handleLogout = () => {
    setAdminSession(false);
    navigate({ to: "/admin" });
  };

  const isActive = (to: string) => location.pathname === to;

  return (
    <div className="min-h-screen bg-background flex">
      <aside className="hidden md:flex flex-col w-52 bg-card border-r border-border">
        <div className="p-5 border-b border-border">
          <span className="font-heading text-base font-semibold text-gold">
            DivyaVastra
          </span>
          <p className="text-[10px] text-muted-foreground mt-0.5">
            Admin Panel
          </p>
        </div>
        <nav className="flex-1 p-3 space-y-0.5">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-2.5 px-3 py-2 rounded text-sm transition-colors ${
                isActive(item.to)
                  ? "bg-gold-pale text-gold font-medium"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <item.icon size={15} />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t border-border">
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-2.5 px-3 py-2 rounded text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors w-full"
          >
            <LogOut size={15} />
            Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-h-screen">
        <div className="md:hidden flex items-center justify-between p-4 border-b border-border bg-card">
          <span className="font-heading font-semibold text-gold">Admin</span>
          <div className="flex gap-1">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`p-2 rounded transition-colors ${
                  isActive(item.to)
                    ? "bg-gold-pale text-gold"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                <item.icon size={16} />
              </Link>
            ))}
            <button
              type="button"
              onClick={handleLogout}
              className="p-2 rounded text-muted-foreground hover:bg-muted transition-colors"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>

        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
