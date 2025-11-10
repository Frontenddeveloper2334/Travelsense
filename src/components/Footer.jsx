export default function Footer() {
  return (
    <footer className="bg-[#00205b] text-gray-300">
      <div className="max-w-[1280px] mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">TravelSense</h2>
          <p className="text-sm text-gray-400">
            Explore destinations, compare routes, and make your trips smarter.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-semibold text-[#ffdd00] mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/blog" className="hover:text-blue-400 transition">Blog</a></li>
            <li><a href="/forum" className="hover:text-blue-400 transition">Forum</a></li>
            <li><a href="/about" className="hover:text-blue-400 transition">About</a></li>
            <li><a href="/contact" className="hover:text-blue-400 transition">Contact</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold text-[#ffdd00] mb-3">Support</h3>
          <ul className="space-y-2">
            <li><a href="/help" className="hover:text-blue-400 transition">Help Center</a></li>
            <li><a href="/privacy" className="hover:text-blue-400 transition">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-blue-400 transition">Terms of Use</a></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold text-[#ffdd00] mb-3">Follow Us</h3>
          <div className="flex gap-4">
            <a href="#" className="hover:text-blue-400 text-xl"><i className="fab fa-facebook"></i></a>
            <a href="#" className="hover:text-blue-400 text-xl"><i className="fab fa-twitter"></i></a>
            <a href="#" className="hover:text-blue-400 text-xl"><i className="fab fa-instagram"></i></a>
            <a href="#" className="hover:text-blue-400 text-xl"><i className="fab fa-youtube"></i></a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} TravelSense. All rights reserved.
      </div>
    </footer>
  );
}
