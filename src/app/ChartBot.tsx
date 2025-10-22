"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function ChatButton() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Check if Smartsupp script has loaded
    const check = setInterval(() => {
      if (typeof (window as any).smartsupp !== "undefined") {
        setReady(true);
        clearInterval(check);
      }
    }, 1000);

    return () => clearInterval(check);
  }, []);

  const openChat = () => {
    if (typeof (window as any).smartsupp !== "undefined") {
      (window as any).smartsupp("chat:open");
    } else {
      alert("Chat is still loading, please wait...");
    }
  };

  return (
    <motion.button
      onClick={openChat}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white rounded-full p-4 shadow-lg z-50"
      aria-label="Open Chat"
    >
      <MessageCircle size={28} />
    </motion.button>
  );
}
