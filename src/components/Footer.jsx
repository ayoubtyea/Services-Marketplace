import React from 'react';
import { FaTwitter, FaInstagram, FaFacebookF, FaLinkedinIn } from 'react-icons/fa'; // Import icons

const Footer = () => {
  return (
    <footer
      className="bg-white bg-cover bg-center py-16 px-6 md:px-16"
      style={{
        backgroundImage:
          'url("https://cdn.prod.website-files.com/663b34c56f05c8c9e12aafdc/665bf81b5bc17a6b8ecdea5f_footer-bg.png")',
      }}
    >
      <div className="container mx-auto">
        {/* Footer Top Block */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Footer Logo and Newsletter */}
          <div className="footer-widget text-black">
            <div className="footer-logo-block mb-6">
              <img
                src="https://i.postimg.cc/C5dQgh9H/MAIN-1.png"
                alt="Footer Logo"
                className="max-w-[200px]"
              />
            </div>
            <p className="footer-widget-summary mb-4 text-sm text-gray-600">
              By organizing information effectively, using clear language, and following best practices, anyone can improve their communication and reach a wider audience.
            </p>
            <div className="flex gap-4">
              {/* Social Links with Icons */}
              <a
                title="Twitter"
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#076870] transition duration-300"
              >
                <FaTwitter className="w-5 h-5" />
              </a>
              <a
                title="Instagram"
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#076870] transition duration-300"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
              <a
                title="Facebook"
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#076870] transition duration-300"
              >
                <FaFacebookF className="w-5 h-5" />
              </a>
              <a
                title="LinkedIn"
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#076870] transition duration-300"
              >
                <FaLinkedinIn className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-widget text-black">
            <h2 className="footer-widget-title text-lg font-medium mb-4">About Link</h2>
            <ul className="space-y-2">
              <li>
                <a href="/home" className="text-sm text-gray-600 hover:text-[#076870] transition duration-300">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="text-sm text-gray-600 hover:text-[#076870] transition duration-300">
                  About Us
                </a>
              </li>
              <li>
                <a href="/services" className="text-sm text-gray-600 hover:text-[#076870] transition duration-300">
                  Services
                </a>
              </li>
              <li>
                <a href="/contact" className="text-sm text-gray-600 hover:text-[#076870] transition duration-300">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Block */}
          <div className="footer-widget text-black">
            <h2 className="footer-widget-title text-lg font-medium mb-4">Get In Touch</h2>
            <a
              href="mailto:contact@handyhome.com"
              className="block text-sm text-gray-600 mb-2 hover:text-[#076870] transition duration-300"
            >
              contact@HandyHome.com
            </a>
            <a
              href="tel:(212)0290-0116"
              className="block text-sm text-gray-600 mb-2 hover:text-[#076870] transition duration-300"
            >
              (212) 0290-0116
            </a>
            <p className="text-sm text-gray-600">1901 Talberjt, Agadir 333437</p>
          </div>

          {/* Newsletter Block */}
          <div className="footer-widget text-black">
            <h2 className="footer-widget-title text-lg font-medium mb-4">Subscribe Our Newsletter</h2>
            <div className="footer-newsletter-form">
              <form action="#" method="post" className="flex items-center">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  className="w-full py-2 px-4 rounded-l-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#076870] focus:border-transparent text-sm"
                />
                <button
                  type="submit"
                  className="py-2 px-4 bg-[#076870] text-white rounded-r-full hover:bg-[#065f57] transition duration-300 focus:outline-none focus:ring-2 focus:ring-[#076870] focus:border-transparent text-sm"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Footer Bottom Block */}
        <div className="footer-bottom-wrapper mt-12 border-t border-gray-300 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="footer-copyright text-sm text-gray-600 text-center md:text-left">
              ⓒ Copyright 2025{' '}
              <a href="/home" className="text-[#076870] hover:text-[#065f57] transition duration-300">
                HandyHome
              </a>{' '}
              . All rights reserved
            </div>
            <div className="flex gap-4">
              <p className="text-sm text-gray-600 hover:text-[#076870] transition duration-300 cursor-pointer">
                Terms and Conditions
              </p>
              <p className="text-sm text-gray-600 hover:text-[#076870] transition duration-300 cursor-pointer">
                Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;