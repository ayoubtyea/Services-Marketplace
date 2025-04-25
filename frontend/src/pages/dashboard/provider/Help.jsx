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
  FiChevronRight
} from 'react-icons/fi';

const Help = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeTab, setActiveTab] = useState('faqs'); // 'faqs' or 'ticket'
  const [ticketSubmitted, setTicketSubmitted] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Account');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    priority: 'medium'
  });

  // FAQ data remains the same as before
  const faqs = [
    {
      id: 1,
      category: 'Account',
      icon: <FiHelpCircle className="text-[#076870] mr-2" />,
      questions: [
        {
          id: 'account-1',
          question: 'How do I reset my password?',
          answer: 'You can reset your password by clicking on "Forgot Password" on the login page. We\'ll send you an email with instructions to create a new password.'
        },
        // ... other questions
      ]
    },
    // ... other categories
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
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#076870]/10 to-[#076870]/5 rounded-full mb-6 shadow-sm">
          <FiHelpCircle className="text-[#076870] text-4xl" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Help Center</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Get instant answers to your questions or reach out to our dedicated support team.
        </p>
      </div>

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

      {/* FAQs Section - Only shown when activeTab is 'faqs' */}
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

          {/* Mobile Category Selector */}
          <div className="md:hidden mb-6">
            <select
              onChange={(e) => setActiveCategory(e.target.value)}
              value={activeCategory}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#076870] focus:border-[#076870] transition-colors"
            >
              {faqs.map((category) => (
                <option key={category.id} value={category.category}>{category.category}</option>
              ))}
            </select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {faqs.map((category) => (
              <div 
                key={category.id} 
                className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-md ${activeCategory !== category.category ? 'hidden md:block' : ''}`}
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

      {/* Submit Ticket Section - Only shown when activeTab is 'ticket' */}
      {activeTab === 'ticket' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-16">
          <div className="bg-gradient-to-r from-[#076870] to-[#065a60] p-6">
            <h2 className="text-xl font-bold text-white">Submit a Support Ticket</h2>
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

      {/* Additional Help Options - Shown on both tabs */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Other Ways to Get Help</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center hover:shadow-md transition-shadow">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-[#076870]/10 rounded-full mb-4 mx-auto">
              <FiMessageCircle className="text-[#076870] text-2xl" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Live Chat</h3>
            <p className="text-gray-600 mb-4">Chat instantly with our support agents during business hours</p>
            <button className="text-[#076870] hover:text-[#065a60] font-medium flex items-center justify-center mx-auto">
              Start Chat <FiChevronRight className="ml-1" />
            </button>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center hover:shadow-md transition-shadow">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-[#076870]/10 rounded-full mb-4 mx-auto">
              <FiPhone className="text-[#076870] text-2xl" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Phone Support</h3>
            <p className="text-gray-600 mb-4">Call us at <span className="font-medium">(800) 123-4567</span> Mon-Fri, 9am-5pm EST</p>
            <button className="text-[#076870] hover:text-[#065a60] font-medium flex items-center justify-center mx-auto">
              Call Now <FiChevronRight className="ml-1" />
            </button>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center hover:shadow-md transition-shadow">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-[#076870]/10 rounded-full mb-4 mx-auto">
              <FiBookOpen className="text-[#076870] text-2xl" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Knowledge Base</h3>
            <p className="text-gray-600 mb-4">Browse our comprehensive guides and tutorials</p>
            <button className="text-[#076870] hover:text-[#065a60] font-medium flex items-center justify-center mx-auto">
              Explore Articles <FiChevronRight className="ml-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Status Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start">
        <div className="bg-blue-100 p-2 rounded-full mr-4">
          <FiClock className="text-blue-600" />
        </div>
        <div>
          <h4 className="font-medium text-blue-900 mb-1">System Status</h4>
          <p className="text-blue-700 text-sm">All systems operational. <a href="#" className="underline">View status history</a></p>
        </div>
      </div>
    </div>
  );
};

export default Help;