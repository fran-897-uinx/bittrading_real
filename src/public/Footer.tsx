export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-10 text-center">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 px-6">
        <div>
          <h3 className="font-bold text-xl mb-2">BitTrading</h3>
          <p className="text-gray-300">Profitable investments for all investors worldwide.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1 text-gray-300">
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#plans">Plans</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Contact Us</h4>
          <p>Email: support@bittrading.io</p>
          <p>Phone: +1 (800) 123-4567</p>
        </div>
      </div>
      <div className="mt-8 border-t border-blue-700 pt-4 text-gray-400 text-sm">
        © {new Date().getFullYear()} BitTrading. All Rights Reserved.
      </div>
    </footer>
  );
}
