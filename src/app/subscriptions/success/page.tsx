"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function StripeSuccessPage() {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (countdown <= 0) {
      window.location.href = "/dashboard"; // 🚀 Auto redirect
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center text-center p-8">
      <h1 className="text-4xl font-bold text-green-700 mb-6">🎉 Stripe Connected Successfully!</h1>

      <p className="text-lg text-green-800 mb-4">
        Thank you! Your Stripe account is now fully connected.
      </p>

      <p className="text-gray-600 mb-8">
        Redirecting to your dashboard in <span className="font-bold">{countdown}</span> seconds...
      </p>

      <Link
        href="/dashboard"
        className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-full shadow-md transition"
      >
        🚀 Go to Dashboard Now
      </Link>
    </div>
  );
}
