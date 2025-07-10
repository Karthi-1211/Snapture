import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => (
  <footer className="bg-gray-900 text-white py-10 px-4 mt-auto relative z-10">
    {/* 4‑column grid */}
    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

      {/* Brand */}
      <div>
        <h2 className="text-xl font-bold mb-4">📸 Snapture</h2>
        <p className="text-sm text-gray-400">
          Capture moments. Share memories. Built with creativity and style.
        </p>
      </div>

      {/* Quick Links */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
        <ul className="space-y-2 text-sm text-gray-300">
          <li><Link to="/"        className="hover:text-blue-400">Home</Link></li>
          <li><Link to="/about"   className="hover:text-blue-400">About</Link></li>
          <li><Link to="/contact" className="hover:text-blue-400">Contact</Link></li>
          <li><Link to="/feedback"className="hover:text-blue-400">Feedback</Link></li>
        </ul>
      </div>

      {/* Contact */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Contact</h3>
        <ul className="space-y-2 text-sm text-gray-300">
          <li>
            Email: <a href="mailto:balukarthik1308@gmail.com"
                      className="hover:text-blue-400">balukarthik1308@gmail.com</a>
          </li>
          <li>
            Phone: <a href="tel:+919515607788"
                      className="hover:text-blue-400">+91 95156 07788</a>
          </li>
          <li>Location: Visakhapatnam, India</li>
        </ul>
      </div>

      {/* Social */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
        <div className="flex space-x-4 text-xl text-gray-300">
          <a href="https://github.com/Karthi-1211"   target="_blank" rel="noopener noreferrer" className="hover:text-blue-400"><FaGithub /></a>
          <a href="https://linkedin.com/in/balu-karthik/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400"><FaLinkedin /></a>
          <a href="https://instagram.com/yourprofile" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400"><FaInstagram /></a>
        </div>
      </div>
    </div>

    {/* Bottom strip */}
    <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
      <p>
        Designed & Developed by&nbsp;
        <span className="font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Balu KarthiK
        </span>
      </p>
      <p className="mt-1">&copy; {new Date().getFullYear()} <span className="font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Snapture</span>   All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
