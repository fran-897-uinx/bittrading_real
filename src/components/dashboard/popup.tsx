"use client";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function WelcomePopup({ user }: { user: { username: string } }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const shown = sessionStorage.getItem("welcome_shown");
    if (!shown) {
      setOpen(true);
      sessionStorage.setItem("welcome_shown", "true");
    }
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md rounded-2xl shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-slate-800 dark:text-slate-100">
            Welcome back, {user?.username} 👋
          </DialogTitle>
          <DialogDescription className="text-slate-600 dark:text-slate-400 mt-2">
            Here’s your account summary and latest activity.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end mt-4">
          <Button onClick={() => setOpen(false)} className="bg-blue-600 hover:bg-blue-700 text-white">
            Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
