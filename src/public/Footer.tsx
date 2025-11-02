import { ChevronRight } from "lucide-react";
import Link from "next/link";
import next from "next";
export default function Footer() {
  return (
    <footer className="bg-blue-950/100 text-white py-10 text-center">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-14 px-6">
        <div className="grid gap-3.5 text-start">
          <h3 className="font-bold text-xl mb-2">BitTrading</h3>
          <p className="text-gray-300">
            Bit Trading is a global consulting firm with a twist. We bring ideas
            and clients, not against them
          </p>
          <div className="bg-white text-start rounded-2xl text-black p-4 w-71 h-33 font-bold font-serif ">
            <h4 className="font-extrabold mb-2">Contact Us</h4>
            <p>Esplanadi 22 B, 00130 Helsinki, Finland</p>
            <a href="mailto:support@bittrading.icu" className="text-blue-900">
              support@bittrading.com
            </a>
            <Link href="#" className="relative bottom-17 left-55">
              <ChevronRight
                className="bg-blue-200 rounded-full p-2"
                size={32}
              />
            </Link>
          </div>
        </div>
        <div className="text-start font-mono text-xs space-y-20">
          <h4 className="font-semibold mb-2">Links</h4>
          <ul className="space-y-1 text-gray-300">
            <li>
              <Link href="#faq">FAQ</Link>
            </li>
            <li>
              <Link href="#plans">Privacy Policy</Link>
            </li>
            <li>
              <Link href="#contact">Contact</Link>
            </li>
            <li>
              <Link href="/login/">Login</Link>
            </li>
            <li>
              <Link href="/signup/">Register</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-5">Company Certificate</h4>
          <Link
            href="/signup/"
            className="border-b border-blue-600 text-white px-4 py-2 rounded-full hover:font-semibold hover:scale-105 transition-all bg-blue-600"
          >
            see Certificate
          </Link>
        </div>
      </div>
      <div className="mt-8 border-t border-blue-700 pt-4 text-gray-400 text-sm">
        © {new Date().getFullYear()} BitTrading. All Rights Reserved.
      </div>
    </footer>
  );
}
