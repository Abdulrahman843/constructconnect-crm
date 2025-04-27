import { NextResponse } from "next/server";
import Stripe from "stripe";
import mongoose from "mongoose";

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI!);

// Define a User schema
const UserSchema = new mongoose.Schema({
  email: String,
  stripeAccountId: String,
});
const User = mongoose.models.User || mongoose.model("User", UserSchema);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // 1. Create a new Stripe Connected Account
    const account = await stripe.accounts.create({
      type: "express",
      email,
      country: "GB", // ✅ United Kingdom setup!
    });

    // 2. Save the account ID to MongoDB
    await User.findOneAndUpdate(
      { email },
      { stripeAccountId: account.id },
      { upsert: true, new: true }
    );

    // 3. Create an account onboarding link
    const accountLink = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: `${process.env.NEXT_PUBLIC_APP_URL}/subscriptions`,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/subscriptions/success`,
      type: "account_onboarding",
    });

    return NextResponse.json({ url: accountLink.url });
  } catch (error) {
    console.error("Stripe Connect error:", error);
    return NextResponse.json(
      { error: "Failed to create Stripe connection." },
      { status: 500 }
    );
  }
}
