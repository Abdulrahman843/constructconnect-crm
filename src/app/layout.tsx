import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { ChatBot } from "@/components/ChatBot";
import { ToastContainer } from "react-toastify"; // ✅ Add this
import "react-toastify/dist/ReactToastify.css"; // ✅ Add this

export const metadata = {
  title: "ConstructConnect CRM",
  description: "Modern CRM solution for the construction industry",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-[#f0f4f8]">
        <Navbar />
        <main className="flex-1 px-4 py-6 max-w-7xl mx-auto w-full">{children}</main>
        <ChatBot /> {/* Floating chatbot */}
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar newestOnTop /> {/* ✅ Toast Notifications */}
      </body>
    </html>
  );
}
