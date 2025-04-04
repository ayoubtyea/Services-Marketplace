import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaArrowRight, FaUserTie, FaTools, FaMoneyBillWave, 
  FaCheck, FaQuestionCircle, FaTimes, FaUser, FaPhone,FaIdCard,FaUserCircle, 
  FaLock, FaCalendarAlt, FaBriefcase, FaCertificate, FaCamera
} from 'react-icons/fa';
import { 
  MdLocationOn, MdWorkOutline, MdVerifiedUser,
  MdAccountCircle, MdSchedule, MdPayment, MdEmail,
  MdDescription, MdPhotoCamera
} from 'react-icons/md';
import ProviderRegistrationModal from '../components/ProviderRegistrationModal';

const BecomeTasker = () => {
  const [step, setStep] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(null);


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
    <div className="min-h-screen flex flex-col font-sans mt-12">
      {/* Hero Section */}
      <section className="relative text-white">
        <div className="container mx-auto px-6 py-12 md:py-20">
          <div className="flex flex-col md:flex-row items-stretch gap-8 min-h-[70vh]">
            {/* Image Column */}
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="md:w-1/2 flex"
            >
              <div className="relative w-full rounded-xl shadow-2xl overflow-hidden flex-1">
                <img 
                  src="https://i.postimg.cc/XNgLYBgK/handy-Home.jpg" 
                  alt="HandyHome professionals at work"
                  className="w-full h-full object-cover min-h-[500px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">Build Your Business With HandyHome</h1>
                    <p className="text-lg opacity-90">Join Morocco's most trusted home services network</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Form Column */}
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="md:w-1/2 flex"
            >
              <div className="bg-white rounded-xl shadow-2xl p-8 text-gray-800 w-full flex flex-col justify-center">
                <div className="mb-8">
                  <h2 className="text-4xl font-medium text-[#076870]">Earn money your way</h2>
                  <p className="text-gray-600 mt-2">See how much you can make tasking on HandyHome</p>
                </div>
                
                <button 
        onClick={() => setIsModalOpen(true)}
        className="px-6 py-3 bg-[#076870] text-white font-medium rounded-lg hover:bg-[#054a52] transition-colors"
      >
        Get Started as a Provider
      </button>

      <ProviderRegistrationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
                
                <div className="text-center pt-4">
                  <p className="text-gray-600 text-sm border-t border-gray-200 pt-4">
                    Already have an account?{' '}
                    <Link to="/provider-login" className="text-[#076870] font-medium hover:underline">
                      Sign In
                    </Link>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

    

      {/* Partners Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-16 bg-gray-50 border-b"
      >
        <div className="container mx-auto px-6">
          <h3 className="text-center text-gray-500 mb-10 font-medium uppercase tracking-wider text-xs">
            Trusted By Leading Moroccan Companies
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-center w-32 h-16"
              >
                <img 
                  src={partner.logo} 
                  alt={partner.name}
                  className="h-full w-full object-contain opacity-70 hover:opacity-100 transition duration-300"
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
          <motion.div variants={itemVariants} className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#076870] mb-4">Why Choose HandyHome?</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Join Morocco's most trusted home services platform and enjoy the freedom to work on your own terms while we handle the clients and payments.
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
                className="bg-white p-8 rounded-xl border border-gray-100 hover:shadow-lg transition duration-300 h-full flex flex-col"
              >
                <div className="flex justify-center mb-5">
                  <div className="bg-[#E6F2F3] w-16 h-16 rounded-full flex items-center justify-center">
                    {benefit.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-center text-gray-800">{benefit.title}</h3>
                <p className="text-gray-600 text-center leading-relaxed flex-grow">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      {/* About Section - Perfectly Matched Image/Content */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="py-20 bg-gray-50"
      >
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-stretch gap-8">
            <motion.div variants={itemVariants} className="md:w-1/2 flex">
              <div className="relative w-full rounded-xl shadow-lg overflow-hidden flex-1">
                <img 
                  src="https://i.postimg.cc/XNgLYBgK/handy-Home.jpg" 
                  alt="HandyHome team working"
                  className="w-full h-full object-cover min-h-[400px]"
                />
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="md:w-1/2 flex items-center">
              <div className="max-w-lg w-full">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-1 bg-[#076870] mr-4"></div>
                  <span className="text-sm font-medium text-[#076870] uppercase tracking-wider">About Us</span>
                </div>
                <h2 className="text-3xl font-bold text-[#076870] mb-6">What is HandyHome?</h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  HandyHome connects busy people in need of help with trusted local professionals who can assist with everything from home repairs to errands.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
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
              </div>
            </motion.div>
          </div>
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
                  className="flex flex-col items-center text-center h-full"
                >
                  <div className="bg-[#076870] text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mb-5 z-10">
                    {item.icon}
                  </div>
                  <div className="bg-white p-6 rounded-xl h-full border border-gray-100 shadow-sm hover:shadow-md transition duration-300 w-full">
                    <div className="text-xs font-bold text-[#076870] mb-2">STEP {item.step}</div>
                    <h3 className="text-xl font-bold mb-3 text-gray-800">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Testimonial Section - Matched Heights */}
      <motion.section 
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={containerVariants}
  className="py-20 bg-gray-50"
>
  <div className="container mx-auto px-6">
    <motion.div variants={itemVariants} className="text-center mb-16">
      <h2 className="text-3xl font-bold text-[#076870] mb-4">What Our Providers Say</h2>
      <p className="text-gray-600 max-w-2xl mx-auto">
        Hear from professionals who've grown their business with HandyHome
      </p>
    </motion.div>

    <div className="max-w-4xl mx-auto">
      <motion.div 
        variants={itemVariants}
        className="bg-white rounded-xl shadow-md p-8 md:p-10"
      >
        <div className="flex flex-col md:flex-row items-start gap-6">
          {/* Compact Avatar */}
          <div className="flex-shrink-0">
            <div className="relative h-20 w-20 rounded-full overflow-hidden border-4 border-[#076870]/10">
              <img 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" 
                alt="Mohamed E."
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-[#076870]/10"></div>
            </div>
          </div>

          {/* Testimonial Content */}
          <div className="flex-1">
            <div className="flex items-center mb-4">
              <div className="w-8 h-1 bg-[#076870] mr-3"></div>
              <span className="text-xs font-medium text-[#076870] uppercase tracking-wider">Success Story</span>
            </div>
            
            <blockquote className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">
              "Before HandyHome, I struggled to find consistent work. Now I have a full schedule of clients and earn 3x what I made before. The platform is easy to use and payments always arrive on time."
            </blockquote>
            
            <div className="mb-6">
              <p className="font-bold text-gray-900">Mohamed E.</p>
              <p className="text-gray-600 text-sm">Professional Plumber • Casablanca</p>
              <p className="text-xs text-gray-500 mt-1">HandyHome Provider since 2021</p>
            </div>

            <div className="flex flex-wrap gap-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg 
                  key={star}
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="text-[#076870] font-medium hover:underline flex items-center"
          >
            Read more success stories
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>
      </motion.div>
    </div>
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
                  className="flex justify-between items-center w-full py-4 text-left focus:outline-none group"
                >
                  <h3 className="text-lg font-medium text-gray-800 flex items-center group-hover:text-[#076870] transition">
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
                    className="pl-8 pr-4 pb-2 text-gray-600 leading-relaxed"
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
  className="py-12 md:py-20 text-white"
  style={{ backgroundImage: "url('https://i.postimg.cc/3xdk0rpv/bghandyhome.jpg')" }}
>
  <div className="container mx-auto px-4 md:px-6 text-center">
    <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6 text-black">
      Ready to make money your way?
    </h2>
    <p className="text-base md:text-xl mb-6 md:mb-8 max-w-2xl mx-auto text-gray-600">
      Join Morocco's fastest growing network of home service professionals
    </p>
    <div className="flex justify-center">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="bg-gradient-to-r from-[#076870] to-[#054a52] text-white font-bold py-3 px-6 md:py-4 md:px-8 rounded-full hover:bg-white/10 transition shadow-lg hover:shadow-xl text-sm md:text-base"
      >
        Get Started
      </motion.button>
    </div>
  </div>
</motion.section>
    </div>
  );
};

export default BecomeTasker;