import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-black bg-cover bg-center py-16 px-6 md:px-16" 
    style={{ backgroundImage: 'url("https://cdn.prod.website-files.com/663b34c56f05c8c9e12aafdc/665bf81b5bc17a6b8ecdea5f_footer-bg.png")' }}>
    <div className="container mx-auto">
      {/* Footer Top Block */}
      <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-5 gap-10">
        {/* Footer Logo and Newsletter */}
        <div className="footer-widget text-white">
          <div className="footer-logo-block mb-6">
            <img
              src="https://i.postimg.cc/C5dQgh9H/MAIN-1.png"
              alt="Footer Logo"
              className="max-w-[200px]"
            />
          </div>
          <p className="footer-widget-summary mb-4">Home solutions <br />
          with HandyHome</p>
          <div className="widget-newsletter-block">
            <p className="newsletter-description mb-4">Need Urgent Service?</p>
            <form className="newsletter-form">

              <button
  type="submit"
  className="text-white rounded-3xl border border-[#076870] px-4 py-2 mb-2 w-full md:w-auto flex items-center justify-center space-x-2"
>
  <span className='text-sm'>Your Email Address</span>
  <span className="transform rotate-[-50deg] text-sm bg-[#076870] rounded-full">→</span>
</button>

            </form>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-widget text-white">
          <h2 className="footer-widget-title text-xl font-semibold mb-4">Company</h2>
          <ul className="space-y-2">
            <li><a href="/home" className="hover:text-[#076870]">Home</a></li>
            <li><a href="/about" className="hover:text-[#076870]">About Us</a></li>
            <li><a href="/service" className="hover:text-[#076870]">Services</a></li>
            <li><a href="/contact" className="hover:text-[#076870]">Contact</a></li>
          </ul>
        </div>


        {/* Utility Pages */}
        <div className="footer-widget text-white">
          <h2 className="footer-widget-title text-xl font-semibold mb-4">Discover</h2>
          <ul className="space-y-2">
            <li><a href="https://sapruin.webflow.io/401" className="hover:text-[#076870]">Become A Tasker</a></li>
            <li><a href="https://sapruin.webflow.io/404" className="hover:text-[#076870]">404 Not Found</a></li>
            <li><a href="/template-info/style-guide" className="hover:text-[#076870]">Style Guide</a></li>
            <li><a href="/template-info/license" className="hover:text-[#076870]">License</a></li>
            <li><a href="/template-info/changelog" className="hover:text-[#076870]">Changelog</a></li>
          </ul>
        </div>

        {/* Contact Block */}
        <div className="footer-widget contact-block text-white">
          <h2 className="footer-widget-title text-xl font-semibold mb-4">Contact</h2>
          <a href="mailto:contact@sapruin.com" className="block mb-2 hover:text-[#076870]">
            contact@HandyHome.com
          </a>
          <a href="tel:(316)555-0116" className="block mb-2 hover:text-[#076870]">
            (212) 0290-0116
          </a>
          <p className="widget-address">1901 . Talberjt, Agadir 333437</p>
        </div>
      </div>

      {/* Footer Bottom Block */}
      <div className="footer-bottom-wrapper mt-12 border-t border-gray-600 pt-4">
        <div className="flex justify-between items-center">
          <div className="footer-copyright text-sm text-white">
            Copyright © <a href="/" className="text-[#076870]">HandyHome</a> | 2025

          </div>
          <div className="flex gap-4">
            {/* Social Links */}
            <a
              title="X"
              href="https://twitter.com/"
              target="_blank"
              className="text-gray-400 hover:text-[#076870]"
            >
              X
            </a>
            <a
              title="Instagram"
              href="https://www.instagram.com/"
              target="_blank"
              className="text-gray-400 hover:text-[#076870]"
            >
              Instagram
            </a>
            <a
              title="Facebook"
              href="https://www.facebook.com/"
              target="_blank"
              className="text-gray-400 hover:text-[#076870]"
            >
              Facebook
            </a>
            <a
              title="LinkedIn"
              href="https://linkedin.com/"
              target="_blank"
              className="text-gray-400 hover:text-[#076870]"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
  )
}

export default Footer