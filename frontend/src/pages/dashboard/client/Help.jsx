import React, { useState } from 'react';
import { 
  FiHelpCircle, FiMail, FiChevronDown, 
  FiChevronRight, FiSearch, FiUser, 
  FiLock, FiUpload, FiCreditCard 
} from 'react-icons/fi';

const HelpAndSupport = () => {
  const [activeTab, setActiveTab] = useState('faqs');
  const [expandedFaqs, setExpandedFaqs] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [ticketForm, setTicketForm] = useState({
    subject: '',
    category: 'General',
    description: ''
  });

  // Only 4 FAQ questions as requested
  const faqs = [
    {
      id: 'profile',
      icon: <FiUser className="text-[#076870] mr-3 flex-shrink-0" size={20} />,
      question: "How do I update my profile information?",
      answer: "You can update your profile information by navigating to the Profile section and clicking the 'Edit' button. Make your changes and click 'Save' when you're done."
    },
    {
      id: 'password',
      icon: <FiLock className="text-[#076870] mr-3 flex-shrink-0" size={20} />,
      question: "How do I change my password?",
      answer: "Go to the Security tab in your Profile settings. You'll find an option to change your password there."
    },
    {
      id: 'upload',
      icon: <FiUpload className="text-[#076870] mr-3 flex-shrink-0" size={20} />,
      question: "I'm having trouble uploading files. What could be wrong?",
      answer: "Make sure the files are in the correct format and within the size limit. If you're still having issues, try using a different browser or check your internet connection."
    }
  ];

  // Filter FAQs based on search query
  const filteredFaqs = faqs.filter(item => 
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Toggle FAQ expansion
  const toggleFaq = (id) => {
    setExpandedFaqs(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Handle ticket form changes
  const handleTicketChange = (e) => {
    const { name, value } = e.target;
    setTicketForm(prev => ({ ...prev, [name]: value }));
  };

  // Handle ticket submission
  const handleTicketSubmit = (e) => {
    e.preventDefault();
    alert('Your support ticket has been submitted successfully!');
    setTicketForm({
      subject: '',
      category: 'General',
      description: ''
    });
  };

  // Tab Navigation Component
  const TabNavigation = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 overflow-hidden">
      <div className="flex overflow-x-auto">
        {[
          { id: 'faqs', icon: <FiHelpCircle size={18} />, label: "FAQs" },
          { id: 'ticket', icon: <FiMail size={18} />, label: "Submit a Ticket" }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center px-6 py-4 text-sm font-medium transition-colors flex-shrink-0 ${
              activeTab === tab.id 
                ? 'text-[#076870] border-b-2 border-[#076870]' 
                : 'text-gray-600 hover:text-[#076870] hover:bg-gray-50'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );

  // FAQs Tab Component
  const FaqsTab = () => (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-6">
        {/* Header with Logo and Text */}
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 bg-[#076870] rounded-full flex items-center justify-center flex-shrink-0">
            <FiHelpCircle className="text-white text-xl" />
          </div>
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold text-[#076870]">HandyHome Support</h2>
            <p className="text-gray-600">We're here to help! Find solutions to common problems right here.</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search FAQs..."
            className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#076870] focus:border-[#076870] transition-all duration-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* FAQ List */}
        {filteredFaqs.length > 0 ? (
          <div className="space-y-3">
            {filteredFaqs.map((item) => (
              <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  className="w-full flex items-center p-4 text-left hover:bg-gray-50 transition-colors"
                  onClick={() => toggleFaq(item.id)}
                >
                  {item.icon}
                  <div className="flex-1">
                    <span className="font-medium text-gray-800">{item.question}</span>
                  </div>
                  {expandedFaqs[item.id] ? (
                    <FiChevronDown className="text-[#076870]" />
                  ) : (
                    <FiChevronRight className="text-gray-500" />
                  )}
                </button>
                {expandedFaqs[item.id] && (
                  <div className="p-4 bg-gray-50 text-gray-600 border-t border-gray-200 pl-14">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No FAQs found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );

  // Submit Ticket Tab Component
  const SubmitTicketTab = () => (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-5 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-[#076870]">Submit a Support Ticket</h2>
        <p className="text-gray-500 mt-1">We'll get back to you within 24 hours</p>
      </div>

      <form onSubmit={handleTicketSubmit} className="p-6">
        <div className="space-y-6">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Subject *</label>
            <input
              type="text"
              name="subject"
              value={ticketForm.subject}
              onChange={handleTicketChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#076870] focus:border-[#076870] transition-all duration-200"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Category *</label>
            <select
              name="category"
              value={ticketForm.category}
              onChange={handleTicketChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#076870] focus:border-[#076870] transition-all duration-200"
              required
            >
              <option value="General">General Inquiry</option>
              <option value="Technical">Technical Issue</option>
              <option value="Billing">Billing Question</option>
              <option value="Account">Account Help</option>
              <option value="Feature">Feature Request</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Description *</label>
            <textarea
              name="description"
              value={ticketForm.description}
              onChange={handleTicketChange}
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#076870] focus:border-[#076870] transition-all duration-200"
              placeholder="Please describe your issue in detail..."
              required
            ></textarea>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="flex items-center px-6 py-3 bg-[#076870] text-white rounded-lg hover:bg-[#054b52] transition-colors duration-200 shadow-md font-medium"
            >
              <FiMail className="mr-2" size={18} />
              Submit Ticket
            </button>
          </div>
        </div>
      </form>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#076870]">Help & Support</h1>
          <p className="text-gray-500">Get help with your account or contact our support team</p>
        </div>

        <TabNavigation />

        <div className="space-y-6">
          {activeTab === 'faqs' && <FaqsTab />}
          {activeTab === 'ticket' && <SubmitTicketTab />}
        </div>
      </div>
    </div>
  );
};

export default HelpAndSupport;