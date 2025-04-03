import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaArrowRight, FaUserTie, FaTools, FaRegClock, 
  FaMoneyBillWave, FaCheck, FaQuestionCircle 
} from 'react-icons/fa';
import { 
  MdLocationOn, MdWorkOutline, MdVerifiedUser,
  MdAccountCircle, MdSchedule, MdPayment 
} from 'react-icons/md';

const BecomeTasker = () => {
  const [formData, setFormData] = useState({
    city: '',
    category: '',
    email: ''
  });

  const [activeQuestion, setActiveQuestion] = useState(null);

  const moroccanCities = [
    "Casablanca", "Rabat", "Marrakech", "Fes", "Tangier",
    "Agadir", "Meknes", "Oujda", "Kenitra", "Tetouan",
    "Safi", "Mohammedia", "El Jadida", "Beni Mellal", "Nador"
  ];

  const serviceCategories = [
    "Cleaning", "Plumbing", "Electrical", "Handyman",
    "Painting", "Carpentry", "AC Repair", "Moving Help",
    "Landscaping", "Appliance Repair", "Pest Control"
  ];

  const partners = [
    { name: "Maroc Telecom", logo: "https://i.postimg.cc/TPYGBDQk/maroc.png" },
    { name: "Banque Populaire", logo: "https://i.postimg.cc/pTHr9TBz/banq.png" },
    { name: "ONEE", logo: "https://i.postimg.cc/QtJtc36P/LOGO2.png" },
    { name: "RMA", logo: "https://i.postimg.cc/wTvvRnDf/rmalogo.png" }
  ];

  const faqs = [
    {
      question: "How much can I earn as a HandyHome Tasker?",
      answer: "Top taskers in Morocco earn between 5,000-15,000 MAD per month depending on their skills and availability."
    },
    {
      question: "What documents do I need to get verified?",
      answer: "You'll need a government ID and any professional certifications for your service category."
    },
    {
      question: "How quickly will I get paid?",
      answer: "Payments are processed weekly every Monday via bank transfer or mobile money."
    },
    {
      question: "Can I choose which jobs to accept?",
      answer: "Yes! You'll see job details and can accept or decline based on your schedule and preferences."
    }
  ];

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/provider/signup', { state: formData });
  };

  const toggleQuestion = (index) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white">
      {/* Hero Section with Split Layout */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative bg-gradient-to-r from-[#076870] to-[#054a52] text-white overflow-hidden"
      >
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container mx-auto px-6 py-24 md:py-32 relative z-10 flex flex-col md:flex-row items-center">
          {/* Left Side - Content */}
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 mb-12 md:mb-0 md:pr-12"
          >
            <img 
              src="https://i.postimg.cc/XNgLYBgK/handy-Home.jpg" 
              alt="HandyHome service"
              className="rounded-xl shadow-lg w-full h-auto"
            />
          </motion.div>
          
          {/* Right Side - Quick Start Form */}
          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:w-1/2 bg-white rounded-xl shadow-2xl p-8 text-gray-800 transform md:-translate-y-4"
          >
            <h2 className="text-2xl font-bold mb-6 text-[#076870]">Earn money your way</h2>
            <p className='text-sm font-light mb-6 text-[#076870]'>See how much you can make tasking on HandyHome</p>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <motion.div variants={itemVariants}>
                <label className="block text-gray-700 mb-2 font-medium">Select Your City</label>
                <div className="relative">
                  <MdLocationOn className="absolute left-3 top-3 text-gray-400 text-xl" />
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#076870] focus:border-transparent appearance-none"
                    required
                  >
                    <option value="">Choose your city</option>
                    {moroccanCities.map((city, index) => (
                      <option key={index} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <label className="block text-gray-700 mb-2 font-medium">Choose a Category</label>
                <div className="relative">
                  <MdWorkOutline className="absolute left-3 top-3 text-gray-400 text-xl" />
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#076870] focus:border-transparent appearance-none"
                    required
                  >
                    <option value="">Select your service</option>
                    {serviceCategories.map((category, index) => (
                      <option key={index} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-gray-700 mb-2 font-medium">Email Address</label>
                <input
                  type="email"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#076870] focus:border-transparent"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </motion.div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-[#076870] text-white py-4 px-6 rounded-lg hover:bg-[#054a52] transition flex items-center justify-center font-bold shadow-lg"
              >
                Continue <FaArrowRight className="ml-2" />
              </motion.button>
              
              <motion.div variants={itemVariants} className="text-center pt-2">
                <p className="text-gray-600">
                  Already have an account?{' '}
                  <Link to="/provider-login" className="text-[#076870] font-medium hover:underline">
                    Sign In
                  </Link>
                </p>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </motion.section>

      {/* Partners Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-12 bg-gray-50 border-b"
      >
        <div className="container mx-auto px-6">
          <h3 className="text-center text-gray-500 mb-8 font-medium uppercase tracking-wider text-sm">Trusted By Leading Moroccan Companies</h3>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src={partner.logo} 
                  alt={partner.name}
                  className="h-10 md:h-12 object-contain opacity-70 hover:opacity-100 transition duration-300"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Benefits Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-6">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-[#076870] mb-4">Flexible work, at your fingertips</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Find local jobs that fit your skills and schedule. With HandyHome, you have the freedom and support to be your own boss.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <FaUserTie className="text-3xl text-[#076870]" />,
                title: "Be your own boss",
                desc: "Work how, when, and where you want. Offer services in 50+ categories and set a flexible schedule."
              },
              {
                icon: <FaMoneyBillWave className="text-3xl text-[#076870]" />,
                title: "Set your own rates",
                desc: "You keep 100% of what you charge, plus tips! Get paid directly through our secure payment system."
              },
              {
                icon: <FaTools className="text-3xl text-[#076870]" />,
                title: "Grow your business",
                desc: "We connect you with clients in your area and provide tools to help you market your services."
              }
            ].map((benefit, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition duration-300"
              >
                <div className="flex justify-center mb-5">
                  <div className="bg-[#E6F2F3] w-16 h-16 rounded-full flex items-center justify-center">
                    {benefit.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">{benefit.title}</h3>
                <p className="text-gray-600 text-center">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="py-20 bg-gray-50"
      >
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
          <motion.div variants={itemVariants} className="md:w-1/2 mb-12 md:mb-0 md:pr-12">
            <img 
              src="https://i.postimg.cc/XNgLYBgK/handy-Home.jpg" 
              alt="HandyHome service"
              className="rounded-xl shadow-lg w-full h-auto"
            />
          </motion.div>
          <motion.div variants={itemVariants} className="md:w-1/2">
            <h2 className="text-3xl font-bold text-[#076870] mb-6">What is HandyHome?</h2>
            <p className="text-lg text-gray-700 mb-6">
              HandyHome connects busy people in need of help with trusted local professionals who can assist with everything from home repairs to errands.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              As a Tasker, you'll get paid to do what you love, when and where you want — all while helping clients in your community.
            </p>
            <ul className="space-y-3">
              {[
                "Choose your own hours and service area",
                "Keep 100% of your earnings plus tips",
                "Get paid securely through our platform",
                "Build your reputation with client reviews"
              ].map((item, index) => (
                <motion.li 
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start"
                >
                  <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.section>

      {/* How It Works Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-6">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#076870] mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Start earning in just a few simple steps
            </p>
          </motion.div>
          
          <div className="relative">
            {/* Timeline bar */}
            <div className="hidden md:block absolute left-0 right-0 top-16 h-1 bg-gray-200 mx-auto w-4/5"></div>
            
            <div className="grid md:grid-cols-4 gap-8 relative">
              {[
                {
                  icon: <MdAccountCircle className="text-3xl" />,
                  step: "1",
                  title: "Create Your Profile",
                  desc: "Sign up and tell us about your skills and experience"
                },
                {
                  icon: <MdVerifiedUser className="text-3xl" />,
                  step: "2",
                  title: "Get Verified",
                  desc: "Complete our quick verification process"
                },
                {
                  icon: <MdSchedule className="text-3xl" />,
                  step: "3",
                  title: "Set Your Schedule",
                  desc: "Choose when and where you want to work"
                },
                {
                  icon: <MdPayment className="text-3xl" />,
                  step: "4",
                  title: "Start Earning",
                  desc: "Accept jobs and get paid weekly"
                }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="bg-[#076870] text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mb-5 z-10">
                    {item.icon}
                  </div>
                  <div className="bg-white p-6 rounded-xl h-full border border-gray-100">
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Testimonial Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="py-20 bg-gray-50"
      >
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
          <motion.div variants={itemVariants} className="md:w-1/2 mb-12 md:mb-0 md:pr-12">
            <img 
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
              alt="Mohamed, HandyHome Provider"
              className="rounded-xl shadow-lg w-full h-auto object-cover"
            />
          </motion.div>
          <motion.div variants={itemVariants} className="md:w-1/2">
            <div className="p-8 md:p-12 bg-white rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-1 bg-[#076870] mr-4"></div>
                <span className="text-sm font-medium text-[#076870] uppercase tracking-wider">Success Story</span>
              </div>
              <blockquote className="text-xl italic mb-6">
                "Before HandyHome, I struggled to find consistent work. Now I have a full schedule of clients and earn 3x what I made before. The platform is easy to use and payments always arrive on time."
              </blockquote>
              <div className="mb-8">
                <p className="font-bold">Mohamed E.</p>
                <p className="text-gray-600">Professional Plumber in Casablanca</p>
                <p className="text-sm text-gray-500 mt-2">HandyHome Provider since 2021</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#076870] text-white font-bold py-3 px-6 rounded-lg hover:bg-[#054a52] transition"
              >
                View More Success Stories
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#076870] mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about becoming a HandyHome Tasker
            </p>
          </motion.div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="border-b border-gray-200 pb-4"
              >
                <button
                  onClick={() => toggleQuestion(index)}
                  className="flex justify-between items-center w-full py-4 text-left focus:outline-none"
                >
                  <h3 className="text-lg font-medium text-gray-800 flex items-center">
                    <FaQuestionCircle className="text-[#076870] mr-3" />
                    {faq.question}
                  </h3>
                  <span className="text-[#076870] text-xl">
                    {activeQuestion === index ? '−' : '+'}
                  </span>
                </button>
                {activeQuestion === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="pl-8 pr-4 pb-2 text-gray-600"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-[#F2EADD]"
      >
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Take Control of Your Career?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join Morocco's fastest growing network of home service professionals
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-[#076870] text-white font-bold py-4 px-8 rounded-full hover:bg-[#054a52] transition shadow-lg hover:shadow-xl"
          >
            Become a Provider Today
          </motion.button>
        </div>
      </motion.section>
    </div>
  );
};

export default BecomeTasker;