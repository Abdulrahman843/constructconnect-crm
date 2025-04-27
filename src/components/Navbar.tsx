"use client";

import Link from "next/link";
import Image from "next/image"; // ✅ Import Next.js optimized Image
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/projects", label: "Projects" },
    { href: "/clients", label: "Clients" },
    { href: "/subscriptions", label: "Subscriptions" },
    { href: "/settings", label: "Settings" },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Company Logo + Brand Name */}
        <Link href="/" className="flex items-center space-x-2">
          <Image 
            src="/images/constructconnectlogo.png"
            alt="ConstructConnect CRM Logo"
            width={40}
            height={40}
            className="rounded-full object-cover transition-transform hover:scale-110 duration-300"
            priority // ✅ faster loading
          />
          <span className="text-xl font-bold text-blue-600">ConstructConnect CRM</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${
                pathname === link.href
                  ? "text-blue-600 font-semibold"
                  : "text-gray-600 hover:text-blue-600"
              } transition-colors`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
