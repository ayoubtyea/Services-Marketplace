import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaCheck, FaUser, FaTools, FaCalendarAlt, FaFileSignature,
  FaArrowRight, FaPaperPlane, FaIdCard, FaCamera, FaUserCircle,
  FaInfoCircle, FaLock
} from 'react-icons/fa';
import { MdVerifiedUser } from 'react-icons/md';

const moroccanCities = [
  "Casablanca", "Rabat", "Marrakech", "Fes", "Tangier",
  "Agadir", "Meknes", "Oujda", "Kenitra", "Tetouan",
  "Safi", "El Jadida", "Nador", "Beni Mellal", "Taza",
  "Khouribga", "Mohammedia", "Laayoune", "Dakhla", "Essaouira"
];

const ProviderRegistrationModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
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

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return {
      isValid: password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChars,
      minLength,
      hasUpperCase,
      hasLowerCase,
      hasNumbers,
      hasSpecialChars
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    // Validate required fields
    if (!formData.password || !formData.confirmPassword) {
      alert('Password and confirmation are required');
      setIsSubmitting(false);
      return;
    }
  
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      setIsSubmitting(false);
      return;
    }
  
    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      alert('Password must be at least 8 characters and contain uppercase, lowercase, numbers, and special characters');
      setIsSubmitting(false);
      return;
    }
  
    // Check if all required files are uploaded
    if (!formData.idPhoto || !formData.selfiePhoto || !formData.profilePhoto) {
      alert('Please upload all required photos (ID, Selfie, and Profile Photo)');
      setIsSubmitting(false);
      return;
    }
  
    try {
      const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const formDataToSend = new FormData();
      
      // Append all form data
      formDataToSend.append('firstName', formData.firstName);
      formDataToSend.append('lastName', formData.lastName);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('password', formData.password);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('dob', formData.dob);
      formDataToSend.append('address', formData.address);
      formDataToSend.append('city', formData.city);
      formDataToSend.append('zip', formData.zip);
      formDataToSend.append('services', JSON.stringify(formData.services));
      formDataToSend.append('otherSkills', formData.otherSkills || '');
      formDataToSend.append('experience', formData.experience);
      formDataToSend.append('availability', formData.availability);
      formDataToSend.append('serviceAreas', JSON.stringify(formData.serviceAreas));
      formDataToSend.append('bio', formData.bio);
      formDataToSend.append('terms', formData.terms.toString());
      formDataToSend.append('communications', formData.communications.toString());
      formDataToSend.append('backgroundCheck', formData.backgroundCheck.toString());
  
      // Append files
      formDataToSend.append('idPhoto', formData.idPhoto);
      formDataToSend.append('selfiePhoto', formData.selfiePhoto);
      formDataToSend.append('profilePhoto', formData.profilePhoto);
  
      const response = await fetch(`${API_BASE_URL}/provider/register`, {
        method: 'POST',
        body: formDataToSend,
        // Don't set Content-Type header - the browser will set it automatically with the correct boundary
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || errorData.message || 'Registration failed');
      }
  
      const data = await response.json();
      
      // Save auth data
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('userData', JSON.stringify({
        id: data.provider.id,
        email: data.provider.email,
        firstName: data.provider.firstName,
        lastName: data.provider.lastName,
        role: 'provider',
        status: data.provider.status,
        profilePhoto: data.provider.profilePhoto
      }));
      
      setFormData(prev => ({ ...prev, isSubmitted: true }));
      
      // Redirect to dashboard or appropriate page
      setTimeout(() => {
        navigate('/provider/dashboard', { replace: true });
      }, 2000);
  
    } catch (error) {
      console.error('Registration error:', error);
      alert(error.message || 'Registration failed. Please try again.');
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
              Continue to Home
            </button>
          </div>
        ) : (
          <>
            <div className="border-b border-gray-100 p-4 relative">
              <h2 className="text-lg font-bold text-[#076870] text-center">Join Our Professional Network</h2>
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

                      <div className="mt-2">
                        <div className="flex items-center mb-1">
                          <FaLock className="text-[#076870] mr-1 text-xs" />
                          <label className="text-xs font-medium text-gray-600">Password*</label>
                        </div>
                        <input
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          className="w-full px-2.5 py-1.5 border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#076870] focus:border-[#076870] outline-none transition text-xs"
                          required
                          placeholder="Create a password"
                        />
                        <p className="text-[10px] text-gray-500 mt-1">
                          Must be at least 8 characters with uppercase, lowercase, numbers, and special characters
                        </p>
                      </div>

                      <div className="mt-2">
                        <input
                          type="password"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className="w-full px-2.5 py-1.5 border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#076870] focus:border-[#076870] outline-none transition text-xs"
                          required
                          placeholder="Confirm Password*"
                        />
                      </div>

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

export default ProviderRegistrationModal;