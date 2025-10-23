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
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function Sidebar() {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const [open, setOpen] = useState(false);

  // Dropdown states
  const [openDeposit, setOpenDeposit] = useState(false);
  const [openWithdraw, setOpenWithdraw] = useState(false);
  const [openInvestment, setOpenInvestment] = useState(false);
  const [openTransfer, setOpenTransfer] = useState(false);

  const handleLogout = async () => {
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
          {open ? (
            <X className="w-5 h-5 text-slate-900" />
          ) : (
            <Menu className="w-5 h-5 text-slate-900" />
          )}
        </button>
      </div>

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 left-0 h-full z-40 transform transition-transform duration-300
         ${
           open ? "translate-x-0" : "-translate-x-full"
         } md:translate-x-0 md:static md:w-72 w-64`}
        aria-label="Sidebar"
      >
        <div className="h-full flex flex-col bg-white/95 dark:bg-slate-900 border-r shadow-sm">
          {/* Header */}
          <div className="px-5 py-6 flex items-center gap-3 border-b">
            <Avatar className="w-10 h-10">
              <div className="w-10 h-10 rounded-full bg-blue-700 text-white flex items-center justify-center">
                B
              </div>
            </Avatar>
            <div>
              <div className="text-slate-900 dark:text-white font-semibold">
                BitTrading
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Pro Account
              </div>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 overflow-y-auto px-2 py-6">
            <ul className="space-y-1">
              {/* Dashboard */}
              <li>
                <Link
                  href="/private/dashboard"
                  className={`group flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition ${
                    isActive("/private/dashboard")
                      ? "bg-blue-600 text-white shadow"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <Grid className="w-5 h-5" />
                  Dashboard
                </Link>
              </li>

              {/* Investment Dropdown */}
              <li>
                <button
                  onClick={() => setOpenInvestment(!openInvestment)}
                  className="flex w-full items-center justify-between px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-md"
                >
                  <span className="flex items-center gap-3">
                    <DollarSign className="w-5 h-5 text-slate-500" />
                    Investment
                  </span>
                  {openInvestment ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>
                {openInvestment && (
                  <ul className="ml-9 mt-1 space-y-1">
                    <li>
                      <Link
                        href="/private/investments"
                        className={`block px-2 py-1 text-sm rounded-md ${
                          isActive("/private/investments")
                            ? "bg-blue-100 text-blue-700"
                            : "text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        Investments
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/private/investment-log"
                        className={`block px-2 py-1 text-sm rounded-md ${
                          isActive("/private/investment-log")
                            ? "bg-blue-100 text-blue-700"
                            : "text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        Investment Log
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              {/* Deposit Dropdown */}
              <li>
                <button
                  onClick={() => setOpenDeposit(!openDeposit)}
                  className="flex w-full items-center justify-between px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-md"
                >
                  <span className="flex items-center gap-3">
                    <Banknote className="w-5 h-5 text-slate-500" />
                    Deposit
                  </span>
                  {openDeposit ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>
                {openDeposit && (
                  <ul className="ml-9 mt-1 space-y-1">
                    <li>
                      <Link
                        href="/private/deposit"
                        className={`block px-2 py-1 text-sm rounded-md ${
                          isActive("/private/deposit")
                            ? "bg-blue-100 text-blue-700"
                            : "text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        Deposit
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/private/deposit-log"
                        className={`block px-2 py-1 text-sm rounded-md ${
                          isActive("/private/deposit-log")
                            ? "bg-blue-100 text-blue-700"
                            : "text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        Deposit Log
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              {/* Withdraw Dropdown */}
              <li>
                <button
                  onClick={() => setOpenWithdraw(!openWithdraw)}
                  className="flex w-full items-center justify-between px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-md"
                >
                  <span className="flex items-center gap-3">
                    <ArrowDownCircle className="w-5 h-5 text-slate-500" />
                    Withdraw
                  </span>
                  {openWithdraw ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>
                {openWithdraw && (
                  <ul className="ml-9 mt-1 space-y-1">
                    <li>
                      <Link
                        href="/private/withdraw"
                        className={`block px-2 py-1 text-sm rounded-md ${
                          isActive("/private/withdraw")
                            ? "bg-blue-100 text-blue-700"
                            : "text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        Withdraw
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/private/withdraw-log"
                        className={`block px-2 py-1 text-sm rounded-md ${
                          isActive("/private/withdraw-log")
                            ? "bg-blue-100 text-blue-700"
                            : "text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        Withdraw Log
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              {/* Transfer Dropdown */}
              <li>
                <button
                  onClick={() => setOpenTransfer(!openTransfer)}
                  className="flex w-full items-center justify-between px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-md"
                >
                  <span className="flex items-center gap-3">
                    <ArrowUpCircle className="w-5 h-5 text-slate-500" />
                    Transfer
                  </span>
                  {openTransfer ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>
                {openTransfer && (
                  <ul className="ml-9 mt-1 space-y-1">
                    <li>
                      <Link
                        href="/private/transfer"
                        className={`block px-2 py-1 text-sm rounded-md ${
                          isActive("/private/transfer")
                            ? "bg-blue-100 text-blue-700"
                            : "text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        Transfer
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/private/transfer-log"
                        className={`block px-2 py-1 text-sm rounded-md ${
                          isActive("/private/transfer-log")
                            ? "bg-blue-100 text-blue-700"
                            : "text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        Transfer Log
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            </ul>

            {/* Divider */}
            <div className="my-5 border-t" />

            {/* Static Links */}
            <ul className="space-y-1 px-1">
              <li>
                <Link
                  href="/private/profile"
                  className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-slate-700 hover:bg-slate-100"
                >
                  <User className="w-5 h-5 text-slate-500" />
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  href="/private/settings"
                  className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-slate-700 hover:bg-slate-100"
                >
                  <Settings className="w-5 h-5 text-slate-500" />
                  Settings
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/support"
                  className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-slate-700 hover:bg-slate-100"
                >
                  <LifeBuoy className="w-5 h-5 text-slate-500" />
                  Support
                </Link>
              </li>
            </ul>
          </nav>

          {/* Footer */}
          <div className="px-4 py-4 border-t">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-sm font-medium text-slate-700">
                  Hello, User
                </div>
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

      {/* Mobile backdrop */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/30 md:hidden z-30"
        />
      )}
    </>
  );
}
