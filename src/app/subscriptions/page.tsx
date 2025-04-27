"use client";

import { useState } from "react";

export default function SubscriptionsPage() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleConnectStripe = async () => {
    if (!email) {
      alert("Please enter your email first!");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/subscriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Failed to connect.");
      }
    } catch (error) {
      console.error("Connection error:", error);
      alert("Error connecting to Stripe.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md space-y-8">
        <h1 className="text-3xl font-extrabold text-center text-blue-700">
          Subscriptions
        </h1>

        <p className="text-center text-gray-600">
          Connect to Stripe to manage your subscription plans.
        </p>

        {/* Email input */}
        <div>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-400 focus:border-blue-400 p-3 sm:text-sm"
          />
        </div>

        {/* Connect button */}
        <div>
          <button
            onClick={handleConnectStripe}
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-md transition-all duration-300 disabled:opacity-50"
          >
            {loading ? "Connecting..." : "Connect Stripe Account"}
          </button>
        </div>
      </div>
    </div>
  );
}
