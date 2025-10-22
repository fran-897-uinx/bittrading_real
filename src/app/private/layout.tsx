// app/private/layout.tsx
import React from "react";
import Sidebar from "@/components/sidebar";
import Topbar from "@/components/dashboard/Topbar";

export const metadata = {
  title: "Dashboard - BitTrading",
};

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full bg-slate-100 dark:bg-slate-900 text-slate-950 dark:text-slate-100 flex h-screen">
      <Sidebar />
      <div className="flex flex-col h-screen w-full">
        <Topbar />
        <main className=" overflow-y-scroll pt-3.5 px-3">
          {children}
        </main>
      </div>
    </div>
  );
}
