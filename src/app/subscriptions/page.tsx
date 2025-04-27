"use client";

import { useState } from "react";

export default function SubscriptionsPage() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(""); // 📨 collect agent's email

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
        body: JSON.stringify({ email }), // 📨 Send email to backend
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url; // Redirect to Stripe onboarding
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
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Subscriptions</h1>
      <div className="space-y-6 text-center">
        <p className="text-gray-600">
          Connect to Stripe to manage subscription plans.
        </p>

        {/* Email input */}
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-lg w-80 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Connect button */}
        <button
          onClick={handleConnectStripe}
          disabled={loading}
          className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
        >
          {loading ? "Connecting..." : "Connect Stripe Account"}
        </button>
      </div>
    </div>
  );
}
