import { motion } from "framer-motion";
import { useState } from "react";
import { FiSend, FiCheckCircle, FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      
      // Reset submission status after 3 seconds
      setTimeout(() => setIsSubmitted(false), 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section
        className="relative py-32 bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://cdn.prod.website-files.com/663b34c56f05c8c9e12aafdc/664058919f21cfec93f3fe47_hero-bg.jpg")',
        }}
      >
        <div className="absolute inset-0 "></div>
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center">
            <motion.div
              className="inline-block border-x-4 border-[#076870] text-[#076870] rounded-md px-6 py-2 bg-gray-200 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl font-light">
                Contact Us
              </h2>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl font-bold text-black mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Interested in a service?
              <span className="text-[#076870] font-light block md:inline">
                {" "}Get <br /> in Touch
              </span>
              Today!
            </motion.h1>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2 
            className="text-3xl font-bold text-center text-gray-800 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            How to Reach Us
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Phone Card */}
            <motion.div 
              className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 text-center border border-gray-100"
              whileHover={{ y: -5 }}
            >
              <div className="bg-[#076870]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiPhone className="w-6 h-6 text-[#076870]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Phone Number</h3>
              <p className="text-gray-600 mb-4">Available 24/7 for emergencies</p>
              <a href="tel:+18001234567" className="text-[#076870] hover:text-[#06535a] text-lg font-medium">
                +1 (800) 123-4567
              </a>
            </motion.div>
            
            {/* Email Card */}
            <motion.div 
              className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 text-center border border-gray-100"
              whileHover={{ y: -5 }}
            >
              <div className="bg-[#076870]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiMail className="w-6 h-6 text-[#076870]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Email Address</h3>
              <p className="text-gray-600 mb-4">We respond within 24 hours</p>
              <a href="mailto:support@handyhome.com" className="text-[#076870] hover:text-[#06535a] text-lg font-medium">
                support@handyhome.com
              </a>
            </motion.div>
            
            {/* Location Card */}
            <motion.div 
              className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 text-center border border-gray-100"
              whileHover={{ y: -5 }}
            >
              <div className="bg-[#076870]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiMapPin className="w-6 h-6 text-[#076870]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Location</h3>
              <p className="text-gray-600 mb-4">Open Monday to Friday, 9am-5pm</p>
              <address className="text-[#076870] text-lg font-medium not-italic">
                123 Home Services Ave<br />
                New York, NY 10001
              </address>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Form and Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-md overflow-hidden"
            >
              <div className="p-8 sm:p-10">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Send Us a Message
                </h2>
                
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <FiCheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      Thank You!
                    </h3>
                    <p className="text-gray-600">
                      Your message has been sent successfully. We'll get back to you soon.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#076870] focus:border-transparent transition-all"
                          placeholder="John Doe"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#076870] focus:border-transparent transition-all"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#076870] focus:border-transparent transition-all"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                          Subject *
                        </label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#076870] focus:border-transparent transition-all"
                          placeholder="What's this about?"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Your Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="5"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#076870] focus:border-transparent transition-all"
                        placeholder="How can we help you?"
                      ></textarea>
                    </div>
                    
                    <div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full flex items-center justify-center px-6 py-3 rounded-lg text-white font-medium transition-all ${isSubmitting ? 'bg-[#076870]/80' : 'bg-[#076870] hover:bg-[#06535a]'}`}
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                          </>
                        ) : (
                          <>
                            <FiSend className="mr-2" />
                            Send Message
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
            
            {/* Map Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-md overflow-hidden h-full"
            >
              <div className="h-full w-full relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215373510873!2d-73.9878449241286!3d40.74844097138973!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1623862347218!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="Our Location"
                ></iframe>
                <div className="absolute bottom-4 left-4 bg-white px-4 py-2 rounded-lg shadow-md">
                  <div className="flex items-center">
                    <FiMapPin className="text-[#076870] mr-2" />
                    <span className="font-medium">Our Headquarters</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-[#076870] to-[#0f7780]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 bg-white rounded-2xl p-8 shadow-lg">
            <div className="text-[#076870] max-w-md">
              <h2 className="text-2xl sm:text-3xl font-bold leading-snug mb-4">
                Solve Your Home Problems With HandyHome!
              </h2>
              <p className="text-gray-600">
                Ready to elevate your living space? Subscribe to our newsletter for tips and offers.
              </p>
            </div>

            <div className="w-full md:w-auto">
              <form className="flex flex-col sm:flex-row items-center gap-3 w-full">
                <input
                  type="email"
                  placeholder="Enter your email..."
                  className="px-5 py-3 rounded-lg border border-gray-300 text-sm w-full focus:outline-none focus:ring-2 focus:ring-[#076870]"
                />
                <button
                  type="submit"
                  className="bg-[#076870] text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-[#06535a] transition-colors whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;