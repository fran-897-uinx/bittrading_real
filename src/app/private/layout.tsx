"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import Sidebar from "@/components/sidebar";
import Topbar from "@/components/dashboard/Topbar";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { apiUrl } from "../api/route";

interface User {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  phone: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      toast.error("Please log in first.");
      router.push("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch(`${apiUrl}profile/`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          toast.error("Session expired. Please log in again.");
          localStorage.removeItem("access_token");
          router.push("/login");
          return;
        }

        const data: User = await res.json();
        setUser(data);
      } catch (error) {
        toast.error("Failed to fetch user profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      <div className="w-full bg-slate-100 dark:bg-slate-900 text-slate-950 dark:text-slate-100 flex h-screen">
        <Sidebar />
        <div className="flex flex-col h-screen w-full">
          <Topbar />
          <main className="overflow-y-scroll pt-3.5 px-3">{children}</main>
        </div>
      </div>
    </AuthContext.Provider>
  );
}
