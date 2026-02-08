"use client";

import { useEffect, useState } from "react";

type Order = {
  _id: string;
  amount: number;
  currency?: string;
  createdAt?: string;
  status?: string;
  title?: string;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const res = await fetch("/api/orders");
        const data = await res.json();
        setOrders(data.orders || []);
      } finally {
        setLoading(false);
      }
    };
    loadOrders();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">My Orders</h1>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-primeColor rounded-full animate-spin"></div>
        </div>
      ) : orders.length === 0 ? (
        <p className="text-gray-600">You have no orders yet.</p>
      ) : (
        <div className="space-y-3">
          {orders.map((o) => (
            <div key={o._id} className="border rounded-lg p-4">
              <div className="flex justify-between">
                <p className="font-medium">
                  {o.title || `Order ${o._id.slice(0, 8)}`}
                </p>
                <p className="text-sm text-gray-600">{o.status}</p>
              </div>
              <p className="text-sm text-gray-600">
                Total: {(o.currency || "NGN").toUpperCase()} {o.amount}
              </p>
              <p className="text-xs text-gray-500">
                {o.createdAt ? new Date(o.createdAt).toLocaleString() : ""}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
