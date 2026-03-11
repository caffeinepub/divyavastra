import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getOrders, updateOrderStatus } from "@/lib/store";
import type { Order } from "@/lib/store";
import { useMemo, useState } from "react";
import { toast } from "sonner";

const STATUSES: Order["status"][] = [
  "Pending",
  "Confirmed",
  "Shipped",
  "Delivered",
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>(() => getOrders());

  const handleStatusChange = (id: string, status: Order["status"]) => {
    updateOrderStatus(id, status);
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    toast.success("Order status updated.");
  };

  return (
    <div>
      <h1 className="font-heading text-xl font-semibold mb-6">Orders</h1>

      {orders.length === 0 ? (
        <div
          data-ocid="admin.orders.empty_state"
          className="text-center py-16 text-muted-foreground text-sm border border-border rounded-lg bg-card"
        >
          No orders yet.
        </div>
      ) : (
        <div className="border border-border rounded-lg overflow-hidden bg-card">
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[600px]">
              <thead className="border-b border-border bg-muted/30">
                <tr>
                  <th className="text-left px-4 py-2.5 text-xs text-muted-foreground font-medium">
                    Customer
                  </th>
                  <th className="text-left px-4 py-2.5 text-xs text-muted-foreground font-medium">
                    Product
                  </th>
                  <th className="text-left px-4 py-2.5 text-xs text-muted-foreground font-medium">
                    Payment
                  </th>
                  <th className="text-left px-4 py-2.5 text-xs text-muted-foreground font-medium">
                    Price
                  </th>
                  <th className="text-left px-4 py-2.5 text-xs text-muted-foreground font-medium">
                    Date
                  </th>
                  <th className="text-left px-4 py-2.5 text-xs text-muted-foreground font-medium">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, i) => (
                  <tr
                    key={order.id}
                    data-ocid={`admin.orders.row.item.${i + 1}`}
                    className="border-b border-border last:border-0"
                  >
                    <td className="px-4 py-3">
                      <div className="font-medium text-xs">
                        {order.customerName}
                      </div>
                      <div className="text-[11px] text-muted-foreground">
                        {order.customerPhone}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground max-w-[120px] truncate">
                      {order.productName}
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">
                      {order.paymentMethod}
                    </td>
                    <td className="px-4 py-3 text-xs">{order.displayPrice}</td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">
                      {new Date(order.timestamp).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <Select
                        value={order.status}
                        onValueChange={(v) =>
                          handleStatusChange(order.id, v as Order["status"])
                        }
                      >
                        <SelectTrigger className="h-7 text-xs w-28">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {STATUSES.map((s) => (
                            <SelectItem key={s} value={s} className="text-xs">
                              {s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
