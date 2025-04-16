import React, { useState } from 'react';
import { FiUsers,FiMail, FiUserPlus, FiUserX, FiClock, FiSearch, FiFilter, FiChevronDown, FiChevronRight, FiEdit2, FiEye,FiX,FiPhone,FiMapPin,FiCalendar,FiCheckCircle,FiFileText,FiStar } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaCheck, FaUser, FaTools, FaCalendarAlt, FaFileSignature,
  FaArrowRight, FaPaperPlane, FaIdCard, FaCamera, FaUserCircle,
  FaInfoCircle
} from 'react-icons/fa';
import { MdVerifiedUser } from 'react-icons/md';

// Custom circular progress component
const CircularProgress = ({ value, maxValue, size = 60, strokeWidth = 6 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = Math.min((value / maxValue) * 100, 100);
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="w-full h-full" viewBox={`0 0 ${size} ${size}`}>
        <circle
          className="text-gray-200"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className="text-[#276e76] transition-all duration-500 ease-in-out"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[#276e76] font-bold text-lg">{value}</span>
      </div>
    </div>
  );
};

// Provider Card Modal Component
const ProviderCardModal = ({ tasker, onClose }) => {
  if (!tasker) return null;

  // Mock data for services, reviews, and documents
  const servicesOffered = [
    { name: "Home Cleaning", category: "Cleaning", price: "120 MAD/h" },
    { name: "Furniture Assembly", category: "Handyman", price: "80 MAD/h" },
    { name: "Moving Help", category: "Moving", price: "150 MAD/h" }
  ];

  const reviews = [
    { user: "Ahmed K.", rating: 5, comment: "Excellent service, very professional!", date: "2 weeks ago" },
    { user: "Fatima Z.", rating: 4, comment: "Did a great job cleaning my apartment", date: "1 month ago" }
  ];

  const documents = [
    { type: "ID Card", verified: true, date: "2023-05-15" },
    { type: "Background Check", verified: true, date: "2023-05-20" },
    { type: "Professional License", verified: false, date: "Pending" }
  ];

  const profileCompletion = 85; // Example completion percentage

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 400 }}
          className="bg-white rounded-xl max-w-4xl w-full border border-gray-200 shadow-lg overflow-hidden max-h-[90vh] overflow-y-auto"
        >
          <div className="p-6">
            {/* Header with close button */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-800">Provider Details</h3>
                <p className="text-sm text-gray-500">ID: {tasker.id}</p>
              </div>
              <button 
                onClick={onClose} 
                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
              >
                <FiX size={24} />
              </button>
            </div>

            {/* Main content divided into two columns */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Profile Info */}
              <div className="lg:col-span-1 space-y-6">
                {/* Profile Picture and Basic Info */}
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="flex flex-col items-center">
                    <div className="relative mb-4">
                      <img 
                        src={tasker.profilePic || "https://randomuser.me/api/portraits/men/32.jpg"} 
                        alt={tasker.name}
                        className="w-32 h-32 rounded-full object-cover border-4 border-[#276e76]"
                      />
                      <span className={`absolute bottom-0 right-0 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        tasker.status === 'approved' ? 'bg-green-100 text-green-800' :
                        tasker.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {tasker.status.charAt(0).toUpperCase() + tasker.status.slice(1)}
                      </span>
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900">{tasker.name}</h4>
                    <p className="text-sm text-gray-500">Joined {new Date(tasker.joinDate).toLocaleDateString()}</p>
                  </div>

                  {/* Profile Completion */}
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Profile Completion</span>
                      <span className="font-medium text-[#276e76]">{profileCompletion}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-[#276e76] to-[#1e565d] h-2 rounded-full" 
                        style={{ width: `${profileCompletion}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="bg-gray-50 p-4 rounded-xl">
                  <h5 className="font-medium text-gray-800 mb-3 flex items-center">
                    <FiMail className="mr-2 text-[#276e76]" /> Contact Information
                  </h5>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <FiMail className="mr-2 text-gray-500" />
                      <span className="text-gray-700">{tasker.email || "provider@example.com"}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <FiPhone className="mr-2 text-gray-500" />
                      <span className="text-gray-700">{tasker.phone || "+212 6XX-XXXXXX"}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <FiMapPin className="mr-2 text-gray-500" />
                      <span className="text-gray-700">{tasker.location || "Casablanca, Morocco"}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <FiCalendar className="mr-2 text-gray-500" />
                      <span className="text-gray-700">Member since {new Date(tasker.joinDate).getFullYear()}</span>
                    </div>
                  </div>
                </div>

               
              </div>

              {/* Right Column - Services and Reviews */}
              <div className="lg:col-span-2 space-y-6">
                {/* Services Offered */}
               

                {/* Ratings and Reviews */}
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="flex justify-between items-center mb-3">
                    <h5 className="font-medium text-gray-800">Ratings & Reviews</h5>
                    <div className="flex items-center">
                      <FiStar className="text-yellow-400 mr-1" />
                      <span className="font-medium">{tasker.rating ? tasker.rating.toFixed(1) : 'N/A'}</span>
                      <span className="text-gray-500 text-sm ml-1">({reviews.length} reviews)</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {reviews.map((review, index) => (
                      <div key={index} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                        <div className="flex justify-between">
                          <p className="font-medium text-gray-800">{review.user}</p>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <FiStar 
                                key={i} 
                                className={`${i < review.rating ? 'text-yellow-400' : 'text-gray-300'} w-4 h-4`} 
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{review.comment}</p>
                        <p className="text-xs text-gray-400 mt-2">{review.date}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Verification Documents */}
                <div className="bg-gray-50 p-4 rounded-xl">
                  <h5 className="font-medium text-gray-800 mb-3 flex items-center">
                    <FiCheckCircle className="mr-2 text-[#276e76]" /> Verification
                  </h5>
                  <div className="space-y-3">
                    {documents.map((doc, index) => (
                      <div key={index} className="flex justify-between items-center text-sm">
                        <div className="flex items-center">
                          <FiFileText className="mr-2 text-gray-500" />
                          <span className="text-gray-700">{doc.type}</span>
                        </div>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          doc.verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {doc.verified ? 'Verified' : 'Pending'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer with Action Buttons */}
            <div className="mt-6 pt-4 border-t border-gray-200 flex space-x-3">
            
              <button
                onClick={onClose}
                className="flex-1 border border-gray-300 text-gray-800 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const moroccanCities = [
  "Casablanca", "Rabat", "Marrakech", "Fes", "Tangier",
  "Agadir", "Meknes", "Oujda", "Kenitra", "Tetouan",
  "Safi", "El Jadida", "Nador", "Beni Mellal", "Taza",
  "Khouribga", "Mohammedia", "Laayoune", "Dakhla", "Essaouira"
];

const AddTaskerModal = ({ isOpen, onClose, onAddTasker }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dob: '',
    address: '',
    city: '',
    zip: '',
    idPhoto: null,
    selfiePhoto: null,
    backgroundCheck: false,
    services: [],
    otherSkills: '',
    experience: '',
    availability: '',
    serviceAreas: [],
    rate: '',
    profilePhoto: null,
    bio: '',
    terms: false,
    communications: false,
    isSubmitted: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleArrayChange = (field, value, isChecked) => {
    setFormData(prev => {
      const currentArray = prev[field] || [];
      return {
        ...prev,
        [field]: isChecked 
          ? [...currentArray, value] 
          : currentArray.filter(item => item !== value)
      };
    });
  };

  const handleFileChange = (field, file) => {
    setFormData(prev => ({
      ...prev,
      [field]: file
    }));
  };

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      // Generate a mock ID and join date for the new tasker
      const newTasker = {
        id: Math.floor(Math.random() * 1000) + 1000,
        name: `${formData.firstName} ${formData.lastName}`,
        status: 'pending',
        joinDate: new Date().toISOString().split('T')[0],
        tasksCompleted: 0,
        rating: null,
        lastActive: 'Just now',
        ...formData
      };
      
      onAddTasker(newTasker);
      setFormData(prev => ({ ...prev, isSubmitted: true }));
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 400 }}
        className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden max-h-[90vh] flex flex-col"
      >
        {formData.isSubmitted ? (
          <div className="p-6 text-center flex flex-col items-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-3">
              <FaCheck className="h-5 w-5 text-green-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">Application Received!</h3>
            <p className="text-sm text-gray-600 mb-3">
              Thank you for applying to become a HandyHome provider.
            </p>
            <div className="bg-blue-50 rounded-lg p-2 mb-4 text-left w-full">
              <div className="flex items-start">
                <FaInfoCircle className="text-blue-500 mt-0.5 mr-2 flex-shrink-0 text-xs" />
                <p className="text-xs text-blue-700">
                  Our team will verify your information and notify you via email within 2-3 business days.
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-[#076870] text-white text-sm font-medium rounded-lg hover:bg-[#054a52] transition-colors"
            >
              Continue to Dashboard
            </button>
          </div>
        ) : (
          <>
            <div className="border-b border-gray-100 p-4 relative">
              <h2 className="text-lg font-bold text-[#076870] text-center">Add New Tasker</h2>
              <div className="absolute top-3 right-3">
                <span className="text-xs bg-[#076870]/10 text-[#076870] px-2 py-0.5 rounded-full">
                  Step {step} of 5
                </span>
              </div>
            </div>

            <div className="p-4 overflow-y-auto flex-grow">
              <div className="mb-3">
                <div className="flex overflow-hidden rounded-full bg-gray-100 mb-1">
                  <div 
                    className="h-1 bg-[#076870] transition-all duration-300"
                    style={{ width: `${((step - 1) / 4) * 100}%` }}
                  ></div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                {/* Step 1: Personal Information */}
                {step === 1 && (
                  <motion.div
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className="space-y-3"
                  >
                    <div className="bg-[#076870]/5 p-3 rounded-lg">
                      <div className="flex items-center mb-1">
                        <FaUser className="text-[#076870] mr-1 text-sm" />
                        <h3 className="font-medium text-[#076870] text-sm">Personal Details</h3>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className="w-full px-2.5 py-1.5 border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#076870] focus:border-[#076870] outline-none transition text-xs"
                          required
                          placeholder="First Name*"
                        />
                        <input
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className="w-full px-2.5 py-1.5 border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#076870] focus:border-[#076870] outline-none transition text-xs"
                          required
                          placeholder="Last Name*"
                        />
                      </div>

                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full mt-2 px-2.5 py-1.5 border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#076870] focus:border-[#076870] outline-none transition text-xs"
                        required
                        placeholder="Email*"
                      />

                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-2.5 py-1.5 border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#076870] focus:border-[#076870] outline-none transition text-xs"
                          required
                          placeholder="Phone*"
                        />
                        <input
                          type="date"
                          name="dob"
                          value={formData.dob}
                          onChange={handleChange}
                          className="w-full px-2.5 py-1.5 border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#076870] focus:border-[#076870] outline-none transition text-xs"
                          required
                          placeholder="Date of Birth*"
                        />
                      </div>

                      <input
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full mt-2 px-2.5 py-1.5 border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#076870] focus:border-[#076870] outline-none transition text-xs"
                        required
                        placeholder="Street Address*"
                      />

                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <input
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          className="w-full px-2.5 py-1.5 border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#076870] focus:border-[#076870] outline-none transition text-xs"
                          required
                          placeholder="City*"
                        />
                        <input
                          name="zip"
                          value={formData.zip}
                          onChange={handleChange}
                          className="w-full px-2.5 py-1.5 border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#076870] focus:border-[#076870] outline-none transition text-xs"
                          required
                          placeholder="ZIP Code*"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Identity Verification */}
                {step === 2 && (
                  <motion.div
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className="space-y-3"
                  >
                    <div className="bg-[#076870]/5 p-3 rounded-lg">
                      <div className="flex items-center mb-1">
                        <MdVerifiedUser className="text-[#076870] mr-1 text-sm" />
                        <h3 className="font-medium text-[#076870] text-sm">Identity Verification</h3>
                      </div>

                      <div className="mb-2">
                        <label className="block text-xs font-medium text-gray-600 mb-1">Government ID*</label>
                        <div className={`border border-dashed rounded-lg p-2 text-center transition ${
                          formData.idPhoto ? 'border-[#076870] bg-[#076870]/5' : 'border-gray-200 hover:border-gray-300'
                        }`}>
                          {formData.idPhoto ? (
                            <div className="flex flex-col items-center">
                              <FaIdCard className="text-xl text-[#076870] mb-0.5" />
                              <p className="text-[11px] font-medium text-gray-700 mb-0.5 truncate max-w-full">{formData.idPhoto.name}</p>
                              <button 
                                type="button"
                                onClick={() => handleFileChange('idPhoto', null)}
                                className="text-[11px] text-[#076870] hover:text-[#054a52] font-medium"
                              >
                                Change File
                              </button>
                            </div>
                          ) : (
                            <label className="cursor-pointer">
                              <div className="flex flex-col items-center">
                                <FaIdCard className="text-xl text-gray-400 mb-0.5" />
                                <p className="text-[11px] font-medium text-gray-700 mb-0.5">Upload ID Document</p>
                                <p className="text-[10px] text-gray-500 mb-1">Driver's License, Passport, or National ID</p>
                                <span className="inline-flex items-center px-2 py-1 bg-[#076870] text-white text-[11px] font-medium rounded-md hover:bg-[#054a52] transition-colors">
                                  Select File
                                  <input 
                                    type="file" 
                                    className="hidden" 
                                    onChange={(e) => handleFileChange('idPhoto', e.target.files[0])}
                                    accept="image/*,.pdf"
                                    required
                                  />
                                </span>
                              </div>
                            </label>
                          )}
                        </div>
                      </div>

                      <div className="mb-2">
                        <label className="block text-xs font-medium text-gray-600 mb-1">Live Selfie Verification*</label>
                        <div className={`border border-dashed rounded-lg p-2 text-center transition ${
                          formData.selfiePhoto ? 'border-[#076870] bg-[#076870]/5' : 'border-gray-200 hover:border-gray-300'
                        }`}>
                          {formData.selfiePhoto ? (
                            <div className="flex flex-col items-center">
                              <FaCamera className="text-xl text-[#076870] mb-0.5" />
                              <p className="text-[11px] font-medium text-gray-700 mb-0.5 truncate max-w-full">{formData.selfiePhoto.name}</p>
                              <button 
                                type="button"
                                onClick={() => handleFileChange('selfiePhoto', null)}
                                className="text-[11px] text-[#076870] hover:text-[#054a52] font-medium"
                              >
                                Retake
                              </button>
                            </div>
                          ) : (
                            <label className="cursor-pointer">
                              <div className="flex flex-col items-center">
                                <FaUserCircle className="text-xl text-gray-400 mb-0.5" />
                                <p className="text-[11px] font-medium text-gray-700 mb-0.5">Take a selfie holding your ID</p>
                                <p className="text-[10px] text-gray-500 mb-1">Clear face and ID must be visible</p>
                                <span className="inline-flex items-center px-2 py-1 bg-[#076870] text-white text-[11px] font-medium rounded-md hover:bg-[#054a52] transition-colors">
                                  Open Camera
                                  <input 
                                    type="file" 
                                    className="hidden" 
                                    onChange={(e) => handleFileChange('selfiePhoto', e.target.files[0])}
                                    accept="image/*"
                                    required
                                    capture="user"
                                  />
                                </span>
                              </div>
                            </label>
                          )}
                        </div>
                      </div>

                      <div className="flex items-start mt-2">
                        <div className="flex items-center h-3">
                          <input
                            type="checkbox"
                            id="backgroundCheck"
                            name="backgroundCheck"
                            checked={formData.backgroundCheck}
                            onChange={handleChange}
                            className="h-3 w-3 text-[#076870] focus:ring-[#076870] border-gray-300 rounded"
                            required
                          />
                        </div>
                        <div className="ml-1.5">
                          <label htmlFor="backgroundCheck" className="text-[11px] text-gray-700">
                            I consent to a background check as part of the verification process*
                          </label>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Skills & Services */}
                {step === 3 && (
                  <motion.div
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className="space-y-3"
                  >
                    <div className="bg-[#076870]/5 p-3 rounded-lg">
                      <div className="flex items-center mb-1">
                        <FaTools className="text-[#076870] mr-1 text-sm" />
                        <h3 className="font-medium text-[#076870] text-sm">Your Skills & Services</h3>
                      </div>

                      <div className="mb-2">
                        <label className="block text-xs font-medium text-gray-600 mb-1">Select Service Categories*</label>
                        <div className="space-y-1">
                          {[
                            "Handyman Work (Repairs, Plumbing, Electrical)",
                            "Furniture Assembly (IKEA & other brands)",
                            "Moving Services (Packing, Heavy Lifting)",
                            "Cleaning (House, Office, Deep Cleaning)",
                            "Delivery & Errands (Grocery Shopping)",
                            "Personal Assistance (Virtual Assistance)"
                          ].map((service, index) => (
                            <div key={index} className="flex items-center">
                              <input
                                type="checkbox"
                                id={`service-${index}`}
                                checked={formData.services.includes(service)}
                                onChange={(e) => handleArrayChange('services', service, e.target.checked)}
                                className="h-3 w-3 text-[#076870] focus:ring-[#076870] border-gray-300 rounded"
                              />
                              <label htmlFor={`service-${index}`} className="ml-1.5 text-[11px] text-gray-700">
                                {service}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-2">
                        <label className="block text-xs font-medium text-gray-600 mb-1">Other Skills (Optional)</label>
                        <textarea
                          name="otherSkills"
                          value={formData.otherSkills}
                          onChange={handleChange}
                          className="w-full px-2.5 py-1.5 border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#076870] focus:border-[#076870] outline-none transition text-xs min-h-[50px]"
                          placeholder="List any other skills or services you offer"
                        />
                      </div>

                      <div className="mt-2">
                        <label className="block text-xs font-medium text-gray-600 mb-1">Years of Experience*</label>
                        <select
                          name="experience"
                          value={formData.experience}
                          onChange={handleChange}
                          className="w-full px-2.5 py-1.5 border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#076870] focus:border-[#076870] outline-none transition text-xs appearance-none bg-white bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM2NzY3NjciIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1jaGV2cm9uLWRvd24iPjxwYXRoIGQ9Im02IDkgNiA2IDYtNiIvPjwvc3ZnPg==')] bg-no-repeat bg-right-2"
                          required
                        >
                          <option value="">Select experience level</option>
                          <option value="0-1">0-1 years</option>
                          <option value="1-3">1-3 years</option>
                          <option value="3-5">3-5 years</option>
                          <option value="5+">5+ years</option>
                        </select>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Availability & Profile */}
                {step === 4 && (
                  <motion.div
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className="space-y-3"
                  >
                    <div className="bg-[#076870]/5 p-3 rounded-lg">
                      <div className="flex items-center mb-1">
                        <FaCalendarAlt className="text-[#076870] mr-1 text-sm" />
                        <h3 className="font-medium text-[#076870] text-sm">Availability</h3>
                      </div>

                      <div className="mb-2">
                        <label className="block text-xs font-medium text-gray-600 mb-1">Work Preference*</label>
                        <div className="grid grid-cols-2 gap-1">
                          {["Full-time", "Part-time", "Weekends Only", "Evenings Only"].map((option, index) => (
                            <div key={index} className="flex items-center">
                              <input
                                type="radio"
                                id={`availability-${index}`}
                                name="availability"
                                value={option}
                                checked={formData.availability === option}
                                onChange={handleChange}
                                className="h-3 w-3 text-[#076870] focus:ring-[#076870] border-gray-300"
                                required
                              />
                              <label htmlFor={`availability-${index}`} className="ml-1.5 text-[11px] text-gray-700">
                                {option}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mb-2">
                        <label className="block text-xs font-medium text-gray-600 mb-1">Service Areas*</label>
                        <select
                          multiple
                          name="serviceAreas"
                          value={formData.serviceAreas}
                          onChange={(e) => {
                            const options = [...e.target.selectedOptions];
                            const values = options.map(option => option.value);
                            setFormData(prev => ({ ...prev, serviceAreas: values }));
                          }}
                          className="w-full px-2.5 py-1.5 border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#076870] focus:border-[#076870] outline-none transition text-xs h-[80px]"
                          required
                        >
                          {moroccanCities.map(city => (
                            <option key={city} value={city}>{city}</option>
                          ))}
                        </select>
                        <p className="text-[10px] text-gray-500 mt-0.5">Hold Ctrl/Cmd to select multiple cities</p>
                      </div>
                    </div>

                    <div className="bg-[#076870]/5 p-3 rounded-lg">
                      <div className="flex items-center mb-1">
                        <FaUser className="text-[#076870] mr-1 text-sm" />
                        <h3 className="font-medium text-[#076870] text-sm">Profile Setup</h3>
                      </div>

                      <div className="mb-2">
                        <label className="block text-xs font-medium text-gray-600 mb-1">Profile Photo*</label>
                        <div className={`border border-dashed rounded-lg p-2 text-center transition ${
                          formData.profilePhoto ? 'border-[#076870] bg-[#076870]/5' : 'border-gray-200 hover:border-gray-300'
                        }`}>
                          {formData.profilePhoto ? (
                            <div className="flex flex-col items-center">
                              <FaUser className="text-xl text-[#076870] mb-0.5" />
                              <p className="text-[11px] font-medium text-gray-700 mb-0.5 truncate max-w-full">{formData.profilePhoto.name}</p>
                              <button 
                                type="button"
                                onClick={() => handleFileChange('profilePhoto', null)}
                                className="text-[11px] text-[#076870] hover:text-[#054a52] font-medium"
                              >
                                Change Photo
                              </button>
                            </div>
                          ) : (
                            <label className="cursor-pointer">
                              <div className="flex flex-col items-center">
                                <FaCamera className="text-xl text-gray-400 mb-0.5" />
                                <p className="text-[11px] font-medium text-gray-700 mb-0.5">Upload Professional Photo</p>
                                <p className="text-[10px] text-gray-500 mb-1">Clear face, professional appearance</p>
                                <span className="inline-flex items-center px-2 py-1 bg-[#076870] text-white text-[11px] font-medium rounded-md hover:bg-[#054a52] transition-colors">
                                  Select Photo
                                  <input 
                                    type="file" 
                                    className="hidden" 
                                    onChange={(e) => handleFileChange('profilePhoto', e.target.files[0])}
                                    accept="image/*"
                                    required
                                  />
                                </span>
                              </div>
                            </label>
                          )}
                        </div>
                      </div>

                      <div className="mt-2">
                        <label className="block text-xs font-medium text-gray-600 mb-1">Professional Bio*</label>
                        <textarea
                          name="bio"
                          value={formData.bio}
                          onChange={handleChange}
                          className="w-full px-2.5 py-1.5 border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#076870] focus:border-[#076870] outline-none transition text-xs min-h-[60px]"
                          required
                          placeholder="Tell clients about your experience and skills"
                        />
                        <p className="text-[10px] text-gray-500 mt-0.5">50-200 characters recommended</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 5: Final Agreement */}
                {step === 5 && (
                  <motion.div
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className="space-y-3"
                  >
                    <div className="bg-[#076870]/5 p-3 rounded-lg">
                      <div className="flex items-center mb-1">
                        <FaFileSignature className="text-[#076870] mr-1 text-sm" />
                        <h3 className="font-medium text-[#076870] text-sm">Final Agreement</h3>
                      </div>

                      <div className="mb-2">
                        <div className="border border-gray-200 rounded-lg p-2 max-h-[150px] overflow-y-auto text-xs">
                          <h4 className="font-medium mb-1">HandyHome Provider Agreement</h4>
                          <p className="text-gray-600 mb-1">
                            By submitting this application, you agree to provide accurate information and maintain professional standards while using our platform.
                          </p>
                          <p className="text-gray-600 mb-1">
                            You understand that all jobs must be completed to client satisfaction and that HandyHome may take a service fee from each completed job.
                          </p>
                          <p className="text-gray-600">
                            Your profile will be reviewed within 2-3 business days. Upon approval, you'll gain access to our provider dashboard.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start mt-2">
                        <div className="flex items-center h-3">
                          <input
                            type="checkbox"
                            id="terms"
                            name="terms"
                            checked={formData.terms}
                            onChange={handleChange}
                            className="h-3 w-3 text-[#076870] focus:ring-[#076870] border-gray-300 rounded"
                            required
                          />
                        </div>
                        <div className="ml-1.5">
                          <label htmlFor="terms" className="text-[11px] text-gray-700">
                            I agree to the HandyHome <a href="#" className="text-[#076870] hover:underline">Terms</a> and{' '}
                            <a href="#" className="text-[#076870] hover:underline">Privacy Policy</a>*
                          </label>
                        </div>
                      </div>

                      <div className="flex items-start mt-2">
                        <div className="flex items-center h-3">
                          <input
                            type="checkbox"
                            id="communications"
                            name="communications"
                            checked={formData.communications}
                            onChange={handleChange}
                            className="h-3 w-3 text-[#076870] focus:ring-[#076870] border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-1.5">
                          <label htmlFor="communications" className="text-[11px] text-gray-700">
                            I agree to receive important updates via email and SMS
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-2 text-left">
                      <div className="flex items-start">
                        <FaInfoCircle className="text-blue-500 mt-0.5 mr-1.5 flex-shrink-0 text-xs" />
                        <p className="text-[11px] text-blue-700">
                          After submission, your application will be reviewed by our team within 2-3 business days.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-4 pt-3 border-t border-gray-100">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="px-3 py-1.5 text-[11px] font-medium text-[#076870] hover:text-[#054a52] hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      Back
                    </button>
                  ) : (
                    <div></div>
                  )}

                  {step < 5 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="ml-auto px-3 py-1.5 bg-[#076870] hover:bg-[#054a52] text-white text-[11px] font-medium rounded-lg transition-colors flex items-center"
                    >
                      Continue <FaArrowRight className="ml-1" size={10} />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`ml-auto px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-[11px] font-medium rounded-lg transition-colors flex items-center ${
                        isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit'} <FaPaperPlane className="ml-1" size={10} />
                    </button>
                  )}
                </div>
              </form>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};
const TaskerCardModal = ({ tasker, onClose }) => {
  if (!tasker) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 400 }}
          className="bg-white bg-opacity-90 backdrop-blur-sm rounded-xl max-w-md w-full border border-gray-200 shadow-lg overflow-hidden"
        >
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-gray-800">Tasker Details</h3>
                <p className="text-sm text-gray-500">ID: {tasker.id}</p>
              </div>
              <button 
                onClick={onClose} 
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FiX size={24} />
              </button>
            </div>
            
            <div className="mt-6 space-y-5">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 h-16 w-16 rounded-full bg-gradient-to-br from-[#276e76] to-[#1e565d] flex items-center justify-center text-white font-medium text-2xl">
                  {tasker.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{tasker.name}</h4>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                    tasker.status === 'approved' ? 'bg-green-100 text-green-800' :
                    tasker.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {tasker.status.charAt(0).toUpperCase() + tasker.status.slice(1)}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white bg-opacity-70 p-3 rounded-lg border border-gray-100">
                  <p className="text-xs text-gray-500">Join Date</p>
                  <p className="mt-1 text-sm font-medium text-gray-900">
                    {new Date(tasker.joinDate).toLocaleDateString()}
                  </p>
                </div>
                
                <div className="bg-white bg-opacity-70 p-3 rounded-lg border border-gray-100">
                  <p className="text-xs text-gray-500">Last Active</p>
                  <p className="mt-1 text-sm font-medium text-gray-900">
                    {tasker.lastActive}
                  </p>
                </div>
                
                <div className="bg-white bg-opacity-70 p-3 rounded-lg border border-gray-100">
                  <p className="text-xs text-gray-500">Tasks Completed</p>
                  <p className="mt-1 text-sm font-medium text-gray-900">
                    {tasker.tasksCompleted}
                  </p>
                </div>
                
                <div className="bg-white bg-opacity-70 p-3 rounded-lg border border-gray-100">
                  <p className="text-xs text-gray-500">Rating</p>
                  <p className="mt-1 text-sm font-medium text-gray-900">
                    {tasker.rating ? `${tasker.rating.toFixed(1)}/5` : 'N/A'}
                  </p>
                </div>
              </div>
              
              <div className="bg-white bg-opacity-70 p-3 rounded-lg border border-gray-100">
                <p className="text-xs text-gray-500">Activity Progress</p>
                <div className="mt-2 flex items-center space-x-2">
                  <div className="flex-1 bg-gray-100 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-[#276e76] to-[#1e565d] h-2 rounded-full" 
                      style={{ width: `${Math.min((tasker.tasksCompleted / 50) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500">
                    {Math.min(tasker.tasksCompleted, 50)}/50 tasks
                  </span>
                </div>
              </div>
              
              <div className="flex space-x-3 pt-2">
                <button className="flex-1 bg-gradient-to-r from-[#276e76] to-[#1e565d] text-white py-2 rounded-lg hover:opacity-90 transition-opacity">
                  Edit Profile
                </button>
                <button className="flex-1 bg-white border border-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const TaskersManagement = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedTasker, setSelectedTasker] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [taskersData, setTaskersData] = useState([
    { id: 1, name: 'John Doe', status: 'approved', joinDate: '2023-01-15', tasksCompleted: 24, rating: 4.8, lastActive: '2 hours ago' },
    { id: 2, name: 'Jane Smith', status: 'pending', joinDate: '2023-02-20', tasksCompleted: 0, rating: null, lastActive: '1 week ago' },
    { id: 3, name: 'Mike Johnson', status: 'suspended', joinDate: '2023-03-10', tasksCompleted: 12, rating: 3.2, lastActive: '3 weeks ago' },
    { id: 4, name: 'Sarah Williams', status: 'approved', joinDate: '2023-04-05', tasksCompleted: 18, rating: 4.9, lastActive: '5 hours ago' },
    { id: 5, name: 'David Brown', status: 'approved', joinDate: '2023-05-12', tasksCompleted: 32, rating: 4.7, lastActive: '1 day ago' },
    { id: 6, name: 'Emily Davis', status: 'pending', joinDate: '2023-06-18', tasksCompleted: 0, rating: null, lastActive: '2 days ago' },
  ]);

  const taskerStats = {
    total: taskersData.length,
    pending: taskersData.filter(t => t.status === 'pending').length,
    suspended: taskersData.filter(t => t.status === 'suspended').length,
    approved: taskersData.filter(t => t.status === 'approved').length,
    monthlyTarget: 150,
    newThisWeek: taskersData.filter(t => {
      const joinDate = new Date(t.joinDate);
      const now = new Date();
      const oneWeekAgo = new Date(now.setDate(now.getDate() - 7));
      return joinDate >= oneWeekAgo;
    }).length
  };

  const filteredTaskers = taskersData.filter(tasker => 
    tasker.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (activeTab === 'all' || tasker.status === activeTab)
  );

  const statusCounts = {
    all: taskersData.length,
    approved: taskersData.filter(t => t.status === 'approved').length,
    pending: taskersData.filter(t => t.status === 'pending').length,
    suspended: taskersData.filter(t => t.status === 'suspended').length
  };

  const handleAddTasker = (newTasker) => {
    setTaskersData(prev => [...prev, newTasker]);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Taskers Management</h1>
            <p className="text-sm text-gray-500 mt-1">Monitor and manage your service providers</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative flex-grow">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search taskers..."
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-full focus:border-[#276e76] focus:ring-1 focus:ring-[#276e76]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button 
              className="bg-[#276e76] text-white px-4 py-2 rounded-lg hover:bg-[#1e565d] transition-colors flex items-center justify-center gap-2"
              onClick={() => setIsAddModalOpen(true)}
            >
              <FiUserPlus /> Add Tasker
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total Taskers */}
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Taskers</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{taskerStats.total}</p>
                <div className="flex items-center mt-3">
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    +{taskerStats.newThisWeek} this week
                  </span>
                </div>
              </div>
              <div className="bg-[#276e76] bg-opacity-10 p-3 rounded-full">
                <FiUsers className="text-xl text-[#276e76]" />
              </div>
            </div>
            <div className="mt-4">
              <CircularProgress value={taskerStats.total} maxValue={taskerStats.monthlyTarget} size={80} />
              <p className="text-xs text-gray-500 mt-2 text-center">
                {Math.round((taskerStats.total / taskerStats.monthlyTarget) * 100)}% of monthly target
              </p>
            </div>
          </div>

          {/* Pending Approvals */}
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Pending Approval</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{taskerStats.pending}</p>
                <div className="flex items-center mt-3">
                  <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">
                    Needs review
                  </span>
                </div>
              </div>
              <div className="bg-amber-100 p-3 rounded-full">
                <FiClock className="text-xl text-amber-600" />
              </div>
            </div>
            <div className="mt-4">
              <button 
                className="w-full bg-amber-50 text-amber-700 py-2 rounded-lg text-sm font-medium hover:bg-amber-100 transition-colors"
                onClick={() => setActiveTab('pending')}
              >
                Review Applications
              </button>
            </div>
          </div>

          {/* Approved Taskers */}
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Approved</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{taskerStats.approved}</p>
                <div className="flex items-center mt-3">
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    Active
                  </span>
                </div>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <FiUsers className="text-xl text-green-600" />
              </div>
            </div>
            <div className="mt-4">
              <button 
                className="w-full bg-green-50 text-green-700 py-2 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors"
                onClick={() => setActiveTab('approved')}
              >
                View All
              </button>
            </div>
          </div>

          {/* Suspended Taskers */}
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Suspended</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{taskerStats.suspended}</p>
                <div className="flex items-center mt-3">
                  <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                    Inactive
                  </span>
                </div>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <FiUserX className="text-xl text-red-600" />
              </div>
            </div>
            <div className="mt-4">
              <button 
                className="w-full bg-red-50 text-red-700 py-2 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
                onClick={() => setActiveTab('suspended')}
              >
                Manage Suspensions
              </button>
            </div>
          </div>
        </div>

        {/* Taskers Table Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Table Header */}
          <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-semibold text-gray-800">Taskers List</h2>
              <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                {statusCounts[activeTab]} {activeTab === 'all' ? 'total' : activeTab}
              </span>
            </div>
            
            {/* Tabs and Filters */}
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="flex bg-gray-100 p-1 rounded-lg">
                {['all', 'approved', 'pending', 'suspended'].map((tab) => (
                  <button
                    key={tab}
                    className={`px-3 py-1 text-xs rounded-md transition-all ${
                      activeTab === tab 
                        ? 'bg-white shadow-sm text-[#276e76] font-medium' 
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
              
              <div className="relative">
                <button 
                  className="flex items-center px-3 py-1.5 border border-gray-200 rounded-lg text-gray-600 text-sm hover:border-[#276e76]"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                  <FiFilter className="mr-2" />
                  Filter
                  <FiChevronDown className={`ml-1 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isFilterOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-10 p-3">
                    <div className="text-xs font-medium text-gray-500 mb-2">Filter by:</div>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2 text-sm text-gray-700">
                        <input type="checkbox" className="rounded text-[#276e76]" />
                        <span>New This Week</span>
                      </label>
                      <label className="flex items-center space-x-2 text-sm text-gray-700">
                        <input type="checkbox" className="rounded text-[#276e76]" />
                        <span>High Rating (4.5+)</span>
                      </label>
                      <label className="flex items-center space-x-2 text-sm text-gray-700">
                        <input type="checkbox" className="rounded text-[#276e76]" />
                        <span>Completed 10+ Tasks</span>
                      </label>
                    </div>
                    <div className="flex justify-between mt-4 pt-3 border-t border-gray-100">
                      <button className="text-xs text-gray-500 hover:text-gray-700">
                        Reset
                      </button>
                      <button className="text-xs bg-[#276e76] text-white px-3 py-1 rounded hover:bg-[#1e565d]">
                        Apply
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Taskers Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tasker</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tasks Completed</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Active</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTaskers.map((tasker) => (
                  <tr key={tasker.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-[#276e76] bg-opacity-10 rounded-full flex items-center justify-center text-[#276e76] font-medium">
                          {tasker.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{tasker.name}</div>
                          <div className="text-xs text-gray-500">ID: {tasker.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        tasker.status === 'approved' ? 'bg-green-100 text-green-800' :
                        tasker.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {tasker.status.charAt(0).toUpperCase() + tasker.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(tasker.joinDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{tasker.tasksCompleted}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {tasker.rating ? (
                        <div className="flex items-center">
                          <div className="h-2 w-16 bg-gray-200 rounded-full overflow-hidden mr-2">
                            <div 
                              className="h-full bg-amber-400" 
                              style={{ width: `${(tasker.rating / 5) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600">{tasker.rating.toFixed(1)}</span>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400">N/A</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {tasker.lastActive}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-3">
                        <button 
                          className="text-[#276e76] hover:text-[#1e565d] flex items-center"
                          onClick={() => setSelectedTasker(tasker)}
                        >
                          <FiEye className="mr-1" /> View
                        </button>
                        <button className="text-gray-600 hover:text-gray-800 flex items-center">
                          <FiEdit2 className="mr-1" /> Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredTaskers.length}</span> of{' '}
              <span className="font-medium">{taskersData.length}</span> taskers
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50" disabled>
                Previous
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-100">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ProviderCardModal 
        tasker={selectedTasker} 
        onClose={() => setSelectedTasker(null)} 
      />
      
      <AddTaskerModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onAddTasker={handleAddTasker}
      />
    </div>
  );
};

export default TaskersManagement;