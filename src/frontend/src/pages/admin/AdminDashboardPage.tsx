import { Button } from "@/components/ui/button";
import { getOrders, getProducts } from "@/lib/store";
import { Link } from "@tanstack/react-router";
import { Clock, Package, Plus, ShoppingBag } from "lucide-react";
import { useMemo } from "react";

export default function AdminDashboardPage() {
  const products = useMemo(() => getProducts(), []);
  const orders = useMemo(() => getOrders(), []);
  const pendingOrders = orders.filter((o) => o.status === "Pending");

  const stats = [
    {
      label: "Total Products",
      value: products.length,
      icon: Package,
      to: "/admin/products",
    },
    {
      label: "Total Orders",
      value: orders.length,
      icon: ShoppingBag,
      to: "/admin/orders",
    },
    {
      label: "Pending Orders",
      value: pendingOrders.length,
      icon: Clock,
      to: "/admin/orders",
    },
  ];

  return (
    <div>
      <h1 className="font-heading text-xl font-semibold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            to={stat.to}
            className="block border border-border rounded-lg p-5 bg-card hover:border-gold/40 hover:shadow-sm transition-all"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-2xl font-semibold text-foreground">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.label}
                </p>
              </div>
              <stat.icon size={18} className="text-gold" />
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Action */}
      <div className="mb-8">
        <Button
          asChild
          data-ocid="admin.dashboard.add_product.button"
          className="bg-gold text-primary-foreground hover:bg-gold/90 gap-2"
        >
          <Link to="/admin/products">
            <Plus size={15} />
            Add New Product
          </Link>
        </Button>
      </div>

      {/* Recent Orders */}
      <h2 className="font-heading text-base font-semibold mb-3">
        Recent Orders
      </h2>
      {orders.length === 0 ? (
        <div
          data-ocid="orders.empty_state"
          className="text-center py-10 text-muted-foreground text-sm border border-border rounded-lg bg-card"
        >
          No orders yet.
        </div>
      ) : (
        <div className="border border-border rounded-lg overflow-hidden bg-card">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-muted/30">
              <tr>
                <th className="text-left px-4 py-2 text-xs text-muted-foreground font-medium">
                  Customer
                </th>
                <th className="text-left px-4 py-2 text-xs text-muted-foreground font-medium">
                  Product
                </th>
                <th className="text-left px-4 py-2 text-xs text-muted-foreground font-medium">
                  Status
                </th>
                <th className="text-left px-4 py-2 text-xs text-muted-foreground font-medium hidden sm:table-cell">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 5).map((order, i) => (
                <tr
                  key={order.id}
                  data-ocid={`orders.row.item.${i + 1}`}
                  className="border-b border-border last:border-0"
                >
                  <td className="px-4 py-2.5">
                    <div className="font-medium text-xs">
                      {order.customerName}
                    </div>
                    <div className="text-[11px] text-muted-foreground">
                      {order.customerPhone}
                    </div>
                  </td>
                  <td className="px-4 py-2.5 text-xs text-muted-foreground">
                    {order.productName}
                  </td>
                  <td className="px-4 py-2.5">
                    <span
                      className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${
                        order.status === "Pending"
                          ? "bg-yellow-50 text-yellow-700"
                          : order.status === "Delivered"
                            ? "bg-green-50 text-green-700"
                            : "bg-blue-50 text-blue-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-xs hidden sm:table-cell">
                    {order.displayPrice}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
