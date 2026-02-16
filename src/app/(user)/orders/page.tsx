"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

type LineItem = {
  name: string;
  quantity: number;
  price: number;
  image: string;
};

type Order = {
  _id: string;
  amount: number;
  currency?: string;
  createdAt?: string;
  status?: string;
  email?: string;
  userName?: string;
  paymentIntentId?: string;
  lineItems?: LineItem[];
};

export default function OrdersPage() {
  const { user, isLoaded } = useUser();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadOrders = async () => {
      if (!isLoaded) return;

      if (!user) {
        setError("Please sign in to view your orders");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("/api/orders");

        if (!res.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await res.json();
        setOrders(data.orders || []);
      } catch (err: any) {
        setError(err.message || "Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [user, isLoaded]);

  if (!isLoaded || loading) {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <div className="flex justify-center items-center h-40">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-primeColor rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-600">You have no orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="border rounded-lg p-4 shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-medium text-lg">
                    Order #{order._id.slice(-8).toUpperCase()}
                  </p>
                  <p className="text-sm text-gray-500">
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : ""}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    order.status === "paid"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {order.status || "Pending"}
                </span>
              </div>

              {/* Line Items */}
              {order.lineItems && order.lineItems.length > 0 && (
                <div className="mb-3 space-y-2">
                  {order.lineItems.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                      )}
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-gray-600">
                          Qty: {item.quantity} ×{" "}
                          {order.currency?.toUpperCase() || "NGN"}{" "}
                          {item.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Total */}
              <div className="border-t pt-3 flex justify-between items-center">
                <p className="text-gray-600">Total Amount</p>
                <p className="text-lg font-semibold">
                  {order.currency?.toUpperCase() || "NGN"}{" "}
                  {order.amount.toLocaleString()}
                </p>
              </div>

              {/* Payment ID */}
              {order.paymentIntentId && (
                <p className="text-xs text-gray-500 mt-2">
                  Payment ID: {order.paymentIntentId}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
