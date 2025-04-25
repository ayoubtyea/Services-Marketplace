import React, { useState } from 'react';
import { 
  FiHelpCircle, 
  FiMail, 
  FiMessageSquare, 
  FiChevronDown, 
  FiChevronUp,
  FiCheckCircle, 
  FiClock,
  FiMessageCircle,
  FiPhone,
  FiBookOpen,
  FiChevronRight,
  FiTool,
  FiUser
} from 'react-icons/fi';
import { FaMedium } from 'react-icons/fa';

const Help = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeTab, setActiveTab] = useState('faqs');
  const [ticketSubmitted, setTicketSubmitted] = useState(false);
  const [activeCategory, setActiveCategory] = useState('General');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    priority: 'medium'
  });

  const faqs = [
    {
      id: 1,
      category: 'General',
      icon: <FiHelpCircle className="text-[#076870] mr-2" />,
      questions: [
        {
          id: 'general-1',
          question: 'What is TaskRabbit and how does it work?',
          answer: 'TaskRabbit is a platform that connects you with skilled Taskers to help with everyday tasks. Simply post a task, receive bids from Taskers, choose who you want to work with, and get your task done.'
        },
        {
          id: 'general-2',
          question: 'How do I create an account?',
          answer: 'Click on "Sign Up" at the top right corner of the page. You can sign up using your email address or through your Google or Facebook account.'
        },
        {
          id: 'general-3',
          question: 'Is there a mobile app available?',
          answer: 'Yes! You can download our mobile app from the Apple App Store or Google Play Store. The app provides all the functionality of our website with added convenience.'
        },
        {
          id: 'general-4',
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit cards (Visa, MasterCard, American Express, Discover) as well as PayPal. All payments are processed securely through our platform.'
        }
      ]
    },
    {
      id: 2,
      category: 'Account',
      icon: <FiUser className="text-[#076870] mr-2" />,
      questions: [
        {
          id: 'account-1',
          question: 'How do I reset my password?',
          answer: 'You can reset your password by clicking on "Forgot Password" on the login page. We\'ll send you an email with instructions to create a new password.'
        },
        {
          id: 'account-2',
          question: 'How do I update my profile information?',
          answer: 'Navigate to "My Account" and click on "Profile Settings". From there you can update your personal information, profile picture, and notification preferences.'
        },
        {
          id: 'account-3',
          question: 'How do I delete my account?',
          answer: 'Account deletion can be requested through the "Account Settings" page. Please note that this action is irreversible and will permanently remove all your data from our system.'
        },
        {
          id: 'account-4',
          question: 'Why am I not receiving email notifications?',
          answer: 'First, check your spam folder. If the emails aren\'t there, go to your account settings to verify your notification preferences. You may also need to whitelist our email address.'
        }
      ]
    },
    {
      id: 3,
      category: 'Services',
      icon: <FiTool className="text-[#076870] mr-2" />,
      questions: [
        {
          id: 'services-1',
          question: 'What services can I find on TaskRabbit?',
          answer: 'We offer a wide range of services including cleaning, moving help, furniture assembly, handyman services, delivery help, personal assistance, and much more.'
        },
        {
          id: 'services-2',
          question: 'How are Taskers vetted?',
          answer: 'All Taskers go through an identity verification process and background check. We also review their profiles, skills, and customer ratings before they can join our platform.'
        },
        {
          id: 'services-3',
          question: 'Can I request a specific Tasker?',
          answer: 'Absolutely! If you\'ve worked with a Tasker before and had a good experience, you can request them specifically for your next task.'
        },
        {
          id: 'services-4',
          question: 'What if I\'m not satisfied with the service?',
          answer: 'We have a Happiness Pledge that guarantees your satisfaction. If you\'re not happy with the work, contact our support team within 48 hours and we\'ll help resolve the issue.'
        }
      ]
    },
    {
      id: 4,
      category: 'Payments',
      icon: <FiCheckCircle className="text-[#076870] mr-2" />,
      questions: [
        {
          id: 'payments-1',
          question: 'When am I charged for a task?',
          answer: 'Your payment method is authorized when you book a task, but you\'re only charged after the task is successfully completed and you\'ve approved the work.'
        },
        {
          id: 'payments-2',
          question: 'How do I get a receipt?',
          answer: 'Receipts are automatically emailed to you after payment is processed. You can also access all your receipts in the "Payment History" section of your account.'
        },
        {
          id: 'payments-3',
          question: 'What is your cancellation policy?',
          answer: 'You can cancel free of charge up to 24 hours before the scheduled task. Cancellations within 24 hours may incur a fee depending on the Tasker\'s cancellation policy.'
        },
        {
          id: 'payments-4',
          question: 'How do tips work?',
          answer: 'Tipping is optional but appreciated. You can add a tip when approving the task completion or up to 24 hours afterward through the app or website.'
        }
      ]
    }
  ];

  const toggleFaq = (id) => {
    setActiveFaq(activeFaq === id ? null : id);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Ticket submitted:', formData);
    setTicketSubmitted(true);
    setTimeout(() => {
      setTicketSubmitted(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        priority: 'medium'
      });
    }, 5000);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Hero Section with Logo */}
    

      {/* Navigation Tabs */}
      <div className="flex border-b border-gray-200 mb-8">
        <button
          onClick={() => setActiveTab('faqs')}
          className={`px-6 py-3 font-medium text-sm flex items-center border-b-2 transition-colors ${activeTab === 'faqs' ? 'border-[#076870] text-[#076870]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        >
          <FiMessageSquare className="mr-2" />
          FAQs
        </button>
        <button
          onClick={() => setActiveTab('ticket')}
          className={`px-6 py-3 font-medium text-sm flex items-center border-b-2 transition-colors ${activeTab === 'ticket' ? 'border-[#076870] text-[#076870]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        >
          <FiMail className="mr-2" />
          Submit a Ticket
        </button>
      </div>

      {/* FAQs Section */}
      {activeTab === 'faqs' && (
        <div className="mb-16">
          {/* Search Bar */}
          <div className="mb-8 max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search help articles..."
                className="w-full px-5 py-3 pr-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#076870] focus:border-[#076870] transition-colors shadow-sm"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#076870]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* FAQ Categories Grid */}
          <div className="grid grid-cols-1 gap-8">
            {faqs.map((category) => (
              <div 
                key={category.id} 
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-md"
              >
                <div className="bg-gradient-to-r from-[#076870] to-[#065a60] p-5 flex items-center">
                  {category.icon}
                  <h3 className="font-semibold text-white">{category.category}</h3>
                </div>
                <div className="p-5">
                  <ul className="space-y-4">
                    {category.questions.map((item) => (
                      <li key={item.id} className="border-b border-gray-100 last:border-0 pb-3 last:pb-0">
                        <button
                          onClick={() => toggleFaq(item.id)}
                          className="w-full text-left flex justify-between items-center text-base font-medium text-gray-800 hover:text-[#076870] transition-colors"
                        >
                          <span className="text-left">{item.question}</span>
                          {activeFaq === item.id ? 
                            <FiChevronUp className="text-[#076870] ml-2 flex-shrink-0" /> : 
                            <FiChevronDown className="text-gray-500 ml-2 flex-shrink-0" />
                          }
                        </button>
                        {activeFaq === item.id && (
                          <div className="mt-2 text-sm text-gray-600 pl-1 pr-2 animate-fadeIn">
                            <div className="bg-[#076870]/5 p-3 rounded-lg">
                              {item.answer}
                            </div>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Submit Ticket Section */}
      {activeTab === 'ticket' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-16">
          <div className="bg-gradient-to-r from-[#076870] to-[#065a60] p-6">
            <h2 className="text-xl font-bold text-white">Submit a Support Ticket</h2>
            <p className="text-[#076870]/80 mt-1">We typically respond within 2-4 business hours</p>
          </div>

          {ticketSubmitted ? (
            <div className="p-8 text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-50 mb-4">
                <FiCheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Ticket Submitted Successfully!</h3>
              <p className="text-gray-600 mb-4">
                We've received your request and will respond within 24 hours. You'll receive a confirmation email shortly.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg inline-block">
                <p className="text-sm font-mono text-gray-700">
                  Reference ID: #{Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Name*</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#076870] focus:border-[#076870] transition-colors"
                    required
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email*</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#076870] focus:border-[#076870] transition-colors"
                    required
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject*</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#076870] focus:border-[#076870] transition-colors"
                    required
                    placeholder="Briefly describe your issue"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority*</label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#076870] focus:border-[#076870] transition-colors"
                  >
                    <option value="low">Low (General Question)</option>
                    <option value="medium">Medium (Minor Issue)</option>
                    <option value="high">High (Service Impact)</option>
                    <option value="urgent">Urgent (Critical Problem)</option>
                  </select>
                </div>
              </div>
              
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">Message*</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#076870] focus:border-[#076870] transition-colors"
                  required
                  placeholder="Please describe your issue in detail..."
                />
              </div>
              
              <div className="flex flex-col sm:flex-row justify-between items-center">
                <p className="text-sm text-gray-500 mb-4 sm:mb-0">
                  Typical response time: <span className="font-medium">2-4 hours</span> during business hours
                </p>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#076870] to-[#065a60] hover:from-[#065a60] hover:to-[#054a50] text-white px-8 py-3 rounded-lg font-medium transition-colors shadow-md hover:shadow-lg"
                >
                  Submit Support Request
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default Help;