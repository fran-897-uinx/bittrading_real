"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Grid,
  DollarSign,
  Banknote,
  ArrowUpCircle,
  ArrowDownCircle,
  ListChecks,
  User,
  Settings,
  LifeBuoy,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

/**
 * Sidebar navigation item
 */
type NavItem = {
  label: string;
  href: string;
  icon: React.ElementType;
};

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/private/dashboard", icon: Grid },
  { label: "Investments", href: "/private/investments", icon: DollarSign },
  { label: "Deposit", href: "/private/deposit", icon: Banknote },
  { label: "Withdraw", href: "/private/withdraw", icon: ArrowDownCircle },
  { label: "Transactions", href: "/private/transactions", icon: ListChecks },
  { label: "Profile", href: "/private/profile", icon: User },
  { label: "Settings", href: "/private/settings", icon: Settings },
  { label: "Support", href: "/dashboard/support", icon: LifeBuoy },
];

export default function Sidebar() {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    // TODO: replace with your auth signOut (supabase/auth/firebase) call
    // e.g. await supabase.auth.signOut();
    // For now just redirect to /login
    router.push("/login");
  };

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      {/* Mobile toggle */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="bg-white/95 backdrop-blur-sm p-2 rounded-full shadow-md border"
        >
          {open ? <X className="w-5 h-5 text-slate-900" /> : <Menu className="w-5 h-5 text-slate-900" />}
        </button>
      </div>

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 left-0 h-full z-40 transform transition-transform duration-300
         ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:w-72 w-64`}
        aria-label="Sidebar"
      >
        <div className="h-full flex flex-col bg-white/95 dark:bg-slate-900 border-r shadow-sm">
          {/* Header */}
          <div className="px-5 py-6 flex items-center gap-3 border-b">
            <Avatar className="w-10 h-10">
              {/* replace with <Image> or initials */}
              <div className="w-10 h-10 rounded-full bg-blue-700 text-white flex items-center justify-center">
                B
              </div>
            </Avatar>
            <div>
              <div className="text-slate-900 dark:text-white font-semibold">BitTrading</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Pro Account</div>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 overflow-y-auto px-2 py-6">
            <ul className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`group flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition
                        ${active ? "bg-blue-600 text-white shadow" : "text-slate-700 hover:bg-slate-100"}
                      `}
                      onClick={() => setOpen(false)} // close on mobile when navigating
                    >
                      <Icon className={`w-5 h-5 ${active ? "text-white" : "text-slate-500 group-hover:text-slate-700"}`} />
                      <span className="truncate">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* divider */}
            <div className="my-5 border-t" />

            {/* secondary actions */}
            <ul className="space-y-1 px-1">
              <li>
                <Link
                  href="/dashboard/referrals"
                  className={`group flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition text-slate-700 hover:bg-slate-100`}
                  onClick={() => setOpen(false)}
                >
                  <ArrowUpCircle className="w-5 h-5 text-slate-500 group-hover:text-slate-700" />
                  Referrals
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/balance"
                  className={`group flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition text-slate-700 hover:bg-slate-100`}
                  onClick={() => setOpen(false)}
                >
                  <Banknote className="w-5 h-5 text-slate-500 group-hover:text-slate-700" />
                  Balance
                </Link>
              </li>
            </ul>
          </nav>

          {/* Footer (logout) */}
          <div className="px-4 py-4 border-t">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-sm font-medium text-slate-700">Hello, User</div>
                <div className="text-xs text-slate-500">user@example.com</div>
              </div>

              <Button
                variant="ghost"
                onClick={handleLogout}
                className="flex items-center gap-2 text-slate-700 hover:bg-slate-100"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden md:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </aside>

      {/* Backdrop for mobile when open */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/30 md:hidden z-30"
          aria-hidden
        />
      )}
    </>
  );
}
