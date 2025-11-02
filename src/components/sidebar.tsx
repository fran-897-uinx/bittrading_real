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
  User,
  Settings,
  LifeBuoy,
  LogOut,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  ActivitySquare,
  GaugeIcon,
  LucideLogs,
  UsersRound,
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { League_Gothic } from "next/font/google";
import { useAuth } from "@/app/private/layout";
export default function Sidebar() {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { user, loading } = useAuth();

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

  // 💡 This will close the sidebar only on mobile
  const handleLinkClick = () => {
    if (window.innerWidth < 768) {
      setOpen(false);
    }
  };

  return (
    <>
      {/* Mobile toggle */}
      <div className=" md:block lg:hidden fixed top-4 left-4 z-50">
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
           open ? "translate-x-0" : "-translate-x-full sm:-translate-x-full"
         } lg:translate-x-0 lg:static lg:w-72 w-80 sm:80`}
        aria-label="Sidebar"
      >
        <div className="h-full flex flex-col bg-white/95 dark:bg-slate-900 border-r shadow-sm">
          {/* Header */}
          <div className="px-5 py-6 flex items-center gap-3 border-b">
            <Avatar className="w-10 h-10">
              <div className="w-10 h-10 rounded-full bg-blue-700 text-white flex items-center justify-center">
                {user?.username?.[0] || "U"}
              </div>
            </Avatar>
            <div>
              <div className="text-slate-900 dark:text-white font-semibold">
                {user?.username}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                {user?.email}
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
                  onClick={handleLinkClick}
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
                        onClick={handleLinkClick}
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
                        href="/private/investments-log"
                        onClick={handleLinkClick}
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
                        onClick={handleLinkClick}
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
                        onClick={handleLinkClick}
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
                        onClick={handleLinkClick}
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
                        onClick={handleLinkClick}
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
                        onClick={handleLinkClick}
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
                        onClick={handleLinkClick}
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
              <li>
                <Link
                  href="/private/transaction"
                  onClick={handleLinkClick}
                  className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-slate-700 hover:bg-slate-100"
                >
                  <LucideLogs className="w-5 h-5 text-slate-500" />
                  Transaction Log
                </Link>
              </li>
              <li>
                <Link
                  href="/private/activeinvests"
                  onClick={handleLinkClick}
                  className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-slate-700 hover:bg-slate-100"
                >
                  <GaugeIcon className="w-5 h-5 text-slate-500" />
                  Interest Log
                </Link>
              </li>
            </ul>

            <div className="my-5 border-t" />

            {/* Static Links */}
            <ul className="space-y-1 px-1">
              <li>
                <Link
                  href="/private/profile"
                  onClick={handleLinkClick}
                  className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-slate-700 hover:bg-slate-100"
                >
                  <User className="w-5 h-5 text-slate-500" />
                  2FA Authentication
                </Link>
              </li>
              <li>
                <Link
                  href="/private/settings"
                  onClick={handleLinkClick}
                  className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-slate-700 hover:bg-slate-100"
                >
                  <UsersRound className="w-5 h-5 text-slate-500" />
                  Referral Log
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/support"
                  onClick={handleLinkClick}
                  className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-slate-700 hover:bg-slate-100"
                >
                  <LifeBuoy className="w-5 h-5 text-slate-500" />
                  Support
                </Link>
              </li>
              <li>
                <Link
                  href="/private/activeinvests"
                  onClick={handleLinkClick}
                  className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-slate-700 hover:bg-slate-100"
                >
                  <ActivitySquare className="w-5 h-5 text-slate-500" />
                  ActiveInvestment
                </Link>
              </li>
            </ul>
          </nav>

          {/* Footer */}
          <div className="px-4 py-4 border-t">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-sm font-medium text-slate-700">
                  Hello, {user?.username}
                </div>
                <div className="text-xs text-slate-500">{user?.email}</div>
              </div>

              <Button
                variant="ghost"
                onClick={handleLogout}
                className="flex items-center gap-2 text-slate-700 hover:bg-slate-100 cursor-pointer"
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
