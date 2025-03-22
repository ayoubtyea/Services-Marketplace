import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { motion } from 'framer-motion';

const BookingPage = () => {
  const { id } = useParams(); // Get the tasker ID from the URL
  const [step, setStep] = useState(1); // Step for the booking process
  const [address, setAddress] = useState({ street: '', unit: '' });
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [taskDetails, setTaskDetails] = useState('');
  const [priceRange, setPriceRange] = useState([0, 500]); // Example price range for rc-slider
  const [errors, setErrors] = useState({}); // Store validation errors
  const [taskSize, setTaskSize] = useState(''); // New state for task size
  const [vehicleRequirements, setVehicleRequirements] = useState(''); // New state for vehicle requirements

  // Example tasker data (replace with your actual data fetching logic)
  const tasker = {
    id: 1,
    name: 'John Doe',
    services: [
      { name: 'Wiring Installation', price: 150 },
      { name: 'Lighting Setup', price: 100 },
      { name: 'Circuit Repair', price: 200 },
    ],
  };

  // Generate time slots from 8 AM to 6 PM
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour <= 18; hour++) {
      slots.push(`${hour < 10 ? '0' + hour : hour}:00`);
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  // Handle address input change
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };

  // Handle service selection
  const handleServiceSelection = (e) => {
    const service = tasker.services.find((s) => s.name === e.target.value);
    setSelectedService(service);
  };

  // Handle task details input change
  const handleTaskDetailsChange = (e) => {
    setTaskDetails(e.target.value);
  };

  // Handle task size selection
  const handleTaskSizeChange = (e) => {
    setTaskSize(e.target.value);
  };

  // Handle vehicle requirements selection
  const handleVehicleRequirementsChange = (e) => {
    setVehicleRequirements(e.target.value);
  };

  // Validate form inputs
  const validateStep = () => {
    const newErrors = {};

    if (step === 1) {
      if (!address.street.trim()) newErrors.street = 'Street address is required.';
    }

    if (step === 2) {
      if (!selectedService) newErrors.service = 'Please select a service.';
      if (!selectedTime) newErrors.time = 'Please select a time.';
    }

    if (step === 3) {
      if (!taskSize) newErrors.taskSize = 'Please select the size of your task.';
      if (!vehicleRequirements) newErrors.vehicleRequirements = 'Please select vehicle requirements.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) {
      if (step < 4) {
        setStep(step + 1); // Move to the next step
      } else {
        // Submit the form
        console.log('Booking confirmed!', {
          taskerId: id,
          address,
          selectedService,
          selectedDate,
          selectedTime,
          taskDetails,
          priceRange,
          taskSize,
          vehicleRequirements,
        });
      }
    }
  };

  return (
    <>
      <Navbar />
      {/* Hero Section */}
      <section
        className="bg-cover bg-center h-96"
        style={{
          backgroundImage:
            'url("https://cdn.prod.website-files.com/663b34c56f05c8c9e12aafdc/664058919f21cfec93f3fe47_hero-bg.jpg")',
        }}
      >
        <div className="text-center text-black pt-24">
          <motion.div
            className="inline-block border-x-4 border-[#076870] text-[#076870] rounded-md px-6 py-2 cursor-pointer bg-[#EAF4F4]"
            initial={{ opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h2
              className="text-sm font-light sm:text-sm md:text-sm"
              initial={{ opacity: 0, y: 70 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Booking
            </motion.h2>
          </motion.div>
          <motion.h2
            className="text-xl md:text-5xl font-light mt-6"
            initial={{ opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Schedule Your Appointment
          </motion.h2>
          <motion.p
            className="text-sm mt-4"
            initial={{ opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Select your preferred date and time to book an appointment with {tasker.name}.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* About Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center text-center mb-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-center md:text-left">
                <p className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-semibold text-black">
                  Confirm <span className="text-[#076870] font-light">Your</span> <br />
                  <span className="text-[#076870] font-light">Booking</span>
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="text-center md:text-left">
                <p className="text-sm font-light sm:text-sm lg:text-base text-gray-600">
                  Book expert home services today and enjoy fast, reliable, and hassle-free solutions for your home.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Divider */}
          <div className="hidden md:block h-1 w-full mt-8 bg-gray-200 mx-auto"></div>

          {/* Service Selected Section */}
          <section className="mt-12">
            <div className="text-center">
              <motion.div
                className="inline-block border-x-4 border-[#076870] text-[#076870] rounded-md px-6 py-2 cursor-pointer bg-[#EAF4F4]"
                initial={{ opacity: 0, y: 70 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.h2
                  className="text-sm font-light sm:text-sm md:text-sm"
                  initial={{ opacity: 0, y: 70 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Service Selected
                </motion.h2>
              </motion.div>
            </div>
          </section>

          {/* Tasker Details Section */}
          <div className="flex flex-col md:flex-row gap-8 mt-8">
            <div className="w-full md:w-1/2">
              <img
                src="https://i.postimg.cc/853rTD8m/bobworking.jpg"
                alt={tasker.name}
                className="w-full h-64 object-cover rounded-lg" // Adjusted image height
              />
            </div>
            <div className="w-full md:w-1/2 bg-gray-100 px-6 py-6 rounded-lg">
              <h1 className="text-3xl font-bold">
                <span className="font-light">Professional</span> <br />
                {tasker.name}
              </h1>
              <p className="text-xl text-[#076870] font-semibold">{tasker.taskType}</p>
              <div className="hidden md:block h-1 w-[50%] mt-2 mb-2 bg-gray-300"></div>
              <p className="text-gray-600">
                Our expert electricians provide comprehensive electrical services for your home. From repairs and installations to safety inspections and upgrades. All work is performed by licensed professionals and backed by our satisfaction guarantee.
              </p>
              <div className="hidden md:block h-1 w-[50%] mt-8 bg-gray-200"></div>
              <p className="text-[#076870] text-3xl mt-2">
                $85 - $120 / <span className="text-gray-900">hour</span>
              </p>
            </div>
          </div>

          {/* Provider Selected Section */}
          <section className="mt-12">
            <div className="text-center">
              <motion.div
                className="inline-block border-x-4 border-[#076870] text-[#076870] rounded-md px-6 py-2 cursor-pointer bg-[#EAF4F4]"
                initial={{ opacity: 0, y: 70 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.h2
                  className="text-sm font-light sm:text-sm md:text-sm"
                  initial={{ opacity: 0, y: 70 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Provider Selected
                </motion.h2>
              </motion.div>
            </div>

            <div className="flex flex-col md:flex-row gap-8 mt-8">
              <div className="w-full md:w-1/2 bg-gray-100 px-6 py-6 rounded-lg">
                <h1 className="text-3xl font-bold">
                  <span className="font-bold">Emily Watson</span> <br />
                  <p className="text-xl text-gray-500 font-light mt-2">Electrician {tasker.taskType}</p>
                  <p className="text-gray-700">⭐⭐⭐ {tasker.rating}</p>
                </h1>
                <div className="hidden md:block h-1 w-[50%] mt-2 mb-2 bg-gray-300"></div>
                <p className="text-gray-600">
                  Services Included:
                </p>
                <p className="text-gray-600 w-2/2 mt-2">
                  Our professional offers a wide range of services to meet your needs. In the next step, you can select the specific service required. If you don’t find what you're looking for, you can contact the provider to discuss additional tasks.
                </p>
              </div>

              <div className="w-full md:w-1/2">
                <img
                  src="https://i.postimg.cc/QM1Q4HRZ/bobworking.png"
                  alt={tasker.name}
                  className="w-full h-64 object-cover rounded-lg" // Adjusted image height
                />
              </div>
            </div>
          </section>

          {/* Booking Form Section */}
          <section className="mt-12">
            <div className="text-center">
              <motion.div
                className="inline-block border-x-4 border-[#076870] text-[#076870] rounded-md px-6 py-2 cursor-pointer bg-[#EAF4F4]"
                initial={{ opacity: 0, y: 70 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.h2
                  className="text-sm font-light sm:text-sm md:text-sm"
                  initial={{ opacity: 0, y: 70 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Book Your Appointment
                </motion.h2>
              </motion.div>
            </div>

            <div>
              <div className="flex flex-col items-center justify-center mt-4">
                <motion.div>
                  <motion.h2>
                    <img
                      className="h-8"
                      src="https://i.postimg.cc/JnkRBHYv/ixon.png"
                      alt="icon"
                    />
                  </motion.h2>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-center mt-4"
                >
                  <motion.p>
                    <h2 className="text-sm font-semibold mb-4 w-1/2 mx-auto">
                      Tell us about your task so we can share the details with your chosen
                      Tasker and ensure they understand your needs.
                    </h2>
                  </motion.p>
                </motion.div>
              </div>
            </div>

            {/* Step 1: Address Input */}
            {step === 1 && (
              <div className="bg-white p-6 rounded-lg shadow-md mt-8">
                <h2 className="text-3xl font-medium mb-4 text-[#065f57]">Your task location</h2>
                <form>
                  <div className="mb-4 ">
                    <label className="block text-gray-700"></label>
                    <input
                      type="text"
                      name="street"
                      value={address.street}
                      onChange={handleAddressChange}
                      className="w-full p-2 border rounded"
                      required
                      placeholder="Street Address"
                    />
                    {errors.street && <p className="text-red-500 text-sm mt-1">{errors.street}</p>}
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700"></label>
                    <input
                      type="text"
                      name="unit"
                      value={address.unit}
                      onChange={handleAddressChange}
                      className="w-full p-2 border rounded"
                      placeholder="Unit/Apt"
                    />
                  </div>
                  <div className="flex justify-center">
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="bg-[#076870] text-white px-6 py-3 rounded-lg hover:bg-[#065f57] transition duration-300 cursor-pointer"
                    >
                      Continue
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Step 2: Service and Date/Time Selection */}
            {step === 2 && (
              <div className="bg-white p-6 rounded-lg shadow-md mt-8">
                <h2 className="text-3xl font-medium mb-4 text-[#065f57]">Service & Date & time selection</h2>
                <div className="mb-4">
                  <label className="block text-gray-700">Select Service Type</label>
                  <select
                    value={selectedService?.name || ''}
                    onChange={handleServiceSelection}
                    className="w-full p-2 border rounded"
                  >
                    <option value="" disabled>
                      Choose a service
                    </option>
                    {tasker.services.map((service, index) => (
                      <option key={index} value={service.name}>
                        {service.name} (${service.price})
                      </option>
                    ))}
                  </select>
                  {errors.service && <p className="text-red-500 text-sm mt-1">{errors.service}</p>}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Select Date</label>
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Availible Time Slotes</label>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                    {timeSlots.map((time, index) => (
                      <motion.button
                        key={index}
                        type="button"
                        onClick={() => setSelectedTime(time)}
                        className={`p-4 border rounded-lg text-center transition-all duration-300 ${
                          selectedTime === time
                            ? 'bg-[#076870] text-white border-[#076870]'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-[#076870]'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {time}
                      </motion.button>
                    ))}
                  </div>
                  {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
                </div>
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="bg-[#076870] text-white px-6 py-3 rounded-lg hover:bg-[#065f57] transition duration-300 cursor-pointer"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Task Size and Vehicle Requirements */}
            {step === 3 && (
            <div className="bg-white p-6 rounded-lg shadow-md mt-8">
            <h2 className="text-3xl font-medium mb-4 text-[#065f57]">Task Options</h2>
            <form>
              {/* Task Size Radio Buttons */}
              <div className="mb-6">
                <label className="block text-gray-700 text-lg font-medium mb-2">How big is your task?</label>
                <div className="space-y-3">
                  {/* Small Task */}
                  <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition duration-300">
                    <input
                      type="radio"
                      name="taskSize"
                      value="small"
                      checked={taskSize === 'small'}
                      onChange={handleTaskSizeChange}
                      className="form-radio h-5 w-5 text-[#076870]"
                    />
                    <span className="ml-3 text-gray-700">Small (Est. 1hr)</span>
                  </label>
          
                  {/* Medium Task */}
                  <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition duration-300">
                    <input
                      type="radio"
                      name="taskSize"
                      value="medium"
                      checked={taskSize === 'medium'}
                      onChange={handleTaskSizeChange}
                      className="form-radio h-5 w-5 text-[#076870]"
                    />
                    <span className="ml-3 text-gray-700">Medium (Est. 2-3hrs)</span>
                  </label>
          
                  {/* Large Task */}
                  <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition duration-300">
                    <input
                      type="radio"
                      name="taskSize"
                      value="large"
                      checked={taskSize === 'large'}
                      onChange={handleTaskSizeChange}
                      className="form-radio h-5 w-5 text-[#076870]"
                    />
                    <span className="ml-3 text-gray-700">Large (Est. 4+ hrs)</span>
                  </label>
                </div>
                {errors.taskSize && <p className="text-red-500 text-sm mt-1">{errors.taskSize}</p>}
              </div>
          
              {/* Vehicle Requirements Radio Buttons */}
              <div className="mb-6">
                <label className="block text-gray-700 text-lg font-medium mb-2">Vehicle Requirements</label>
                <div className="space-y-3">
                  {/* Not Needed */}
                  <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition duration-300">
                    <input
                      type="radio"
                      name="vehicleRequirements"
                      value="not_needed"
                      checked={vehicleRequirements === 'not_needed'}
                      onChange={handleVehicleRequirementsChange}
                      className="form-radio h-5 w-5 text-[#076870]"
                    />
                    <span className="ml-3 text-gray-700">Not needed for task</span>
                  </label>
          
                  {/* Requires a Car */}
                  <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition duration-300">
                    <input
                      type="radio"
                      name="vehicleRequirements"
                      value="car"
                      checked={vehicleRequirements === 'car'}
                      onChange={handleVehicleRequirementsChange}
                      className="form-radio h-5 w-5 text-[#076870]"
                    />
                    <span className="ml-3 text-gray-700">Task requires a car</span>
                  </label>
          
                  {/* Requires a Truck */}
                  <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition duration-300">
                    <input
                      type="radio"
                      name="vehicleRequirements"
                      value="truck"
                      checked={vehicleRequirements === 'truck'}
                      onChange={handleVehicleRequirementsChange}
                      className="form-radio h-5 w-5 text-[#076870]"
                    />
                    <span className="ml-3 text-gray-700">Task requires a truck</span>
                  </label>
                </div>
                {errors.vehicleRequirements && <p className="text-red-500 text-sm mt-1">{errors.vehicleRequirements}</p>}
              </div>
          
              {/* Continue Button */}
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="bg-[#076870] text-white px-6 py-3 rounded-lg hover:bg-[#065f57] transition duration-300 cursor-pointer"
                >
                  Continue
                </button>
              </div>
            </form>
          </div>
            )}

            {/* Step 4: Task Details */}
            {step === 4 && (
              <div className="bg-white p-6 rounded-lg shadow-md mt-8">
                <h2 className="text-3xl font-medium mb-4 text-[#065f57]">Tell Us the details of your task</h2>
                <form>
                  <div className="mb-4">
                    <label className="block text-gray-700">Start the conversation and let your Tasker know what you need done. This ensures they understand your requirements. Don't worry, you can edit the details later.</label>
                    <textarea
                      value={taskDetails}
                      onChange={handleTaskDetailsChange}
                      className="w-full p-2 border rounded"
                      rows="4"
                      required
                    />
                    {errors.taskDetails && <p className="text-red-500 text-sm mt-1">{errors.taskDetails}</p>}
                  </div>
                  <div className="flex justify-center">
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="bg-[#076870] text-white px-6 py-3 rounded-lg hover:bg-[#065f57] transition duration-300 cursor-pointer"
                    >
                      Confirm Booking
                    </button>
                  </div>
                </form>
              </div>
            )}
          </section>
        </div>
      </section>
    </>
  );
};

export default BookingPage;