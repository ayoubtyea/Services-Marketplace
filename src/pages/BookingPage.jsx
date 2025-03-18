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

  // Example tasker data (replace with your actual data fetching logic)
  const tasker = {
    id: 1,
    name: 'John Doe',
    rating: 4.5,
    location: 'New York',
    price: 100,
    available: true,
    image: 'https://i.postimg.cc/76sV36ty/bob.jpg',
    taskType: 'Electrician',
    department: 'Electrical Engineering',
    experience: '5+ years',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    reviews: 120,
    availability: {
      Monday: { start: '09:00', end: '17:00', status: 'Available' },
      Tuesday: { start: '09:00', end: '17:00', status: 'Available' },
      Wednesday: { start: '09:00', end: '17:00', status: 'Booked' },
      Thursday: { start: '09:00', end: '17:00', status: 'Available' },
      Friday: { start: '09:00', end: '17:00', status: 'Available' },
      Saturday: { start: '10:00', end: '14:00', status: 'Available' },
      Sunday: { status: 'Not Available' },
    },
    bio: 'John Doe brings a wealth of expertise and experience to his role as an electrician at HandyHome.',
    skills: ['Wiring', 'Lighting Installation', 'Circuit Repair'],
    services: [
      { name: 'Wiring Installation', price: 150, description: 'Professional wiring installation for homes and offices.' },
      { name: 'Lighting Setup', price: 100, description: 'Installation of modern lighting solutions.' },
      { name: 'Circuit Repair', price: 200, description: 'Diagnosis and repair of electrical circuits.' },
    ],
    clientReviews: [
      { name: 'Alice', rating: "", comment: 'Great work, very professional!', date: '2023-10-01' },
      { name: 'Bob', rating: "", comment: 'Fixed my issue quickly.', date: '2023-09-25' },
      { name: 'Charlie', rating: "", comment: 'Highly recommended.', date: '2023-09-20' },
    ],
  };

  // Handle address input change
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };

  // Handle service selection
  const handleServiceSelection = (service) => {
    setSelectedService(service);
  };

  // Handle date and time selection
  const handleDateTimeSelection = (date, time) => {
    setSelectedDate(date);
    setSelectedTime(time);
  };

  // Handle task details input change
  const handleTaskDetailsChange = (e) => {
    setTaskDetails(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your booking logic here
    console.log('Booking confirmed!', {
      taskerId: id,
      address,
      selectedService,
      selectedDate,
      selectedTime,
      taskDetails,
      priceRange, // Include price range in the booking data
    });
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
            Select your preferred date and time to book an appointment with Emily Watson
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
                Book expert home services today and enjoy fast, reliable, and hassle-free solutions for your home
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
                src="https://cdn.prod.website-files.com/6641b18a77a92d76b329c2d5/6641b50e3a30a5d77c8578a8_electrical-problems.jpg"
                alt={tasker.name}
                className="w-full h-auto rounded-lg"
              />
            </div>
            <div className="w-full md:w-1/2 bg-gray-100 px-6 py-6 rounded-lg">
              <h1 className="text-3xl font-bold">
                <span className="font-light">Professional</span> <br />
                {tasker.name}
              </h1>
              <p className="text-xl text-[#076870] font-semibold">{tasker.taskType}</p>
              <div className="hidden md:block h-1 w-[50%] mt-2 mb-2 bg-gray-300"></div>
              <p className="text-gray-600">Department: {tasker.department}</p>
              <p className="text-gray-600">Experience: {tasker.experience}</p>
              <p className="text-gray-600">Email: {tasker.email}</p>
              <p className="text-gray-600">Phone: {tasker.phone}</p>
              <div className="mt-6 flex gap-4">
                <button
                  className="px-6 py-3 cursor-pointer bg-[#076870] text-white rounded-lg hover:bg-[#065f57] transition duration-300"
                >
                  Book a Service
                </button>
                <button className="px-6 py-3 cursor-pointer bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition duration-300">
                  Message Provider
                </button>
              </div>
            </div>
          </div>

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

            {/* Step 1: Address Input */}
            {step === 1 && (
              <div className="bg-white p-6 rounded-lg shadow-md mt-8">
                <h2 className="text-xl font-semibold mb-4">Enter Your Address</h2>
                <form>
                  <div className="mb-4">
                    <label className="block text-gray-700">Street Address</label>
                    <input
                      type="text"
                      name="street"
                      value={address.street}
                      onChange={handleAddressChange}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Unit/Apt</label>
                    <input
                      type="text"
                      name="unit"
                      value={address.unit}
                      onChange={handleAddressChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="bg-[#076870] text-white px-6 py-3 rounded-lg hover:bg-[#065f57] transition duration-300"
                  >
                    Continue
                  </button>
                </form>
              </div>
            )}

            {/* Step 2: Service and Date/Time Selection */}
            {step === 2 && (
              <div className="bg-white p-6 rounded-lg shadow-md mt-8">
                <h2 className="text-xl font-semibold mb-4">Select Service and Time</h2>
                <div className="mb-4">
                  <label className="block text-gray-700">Select Service</label>
                  <div className="space-y-2">
                    {tasker.services.map((service, index) => (
                      <div
                        key={index}
                        className={`p-4 border rounded cursor-pointer ${
                          selectedService?.name === service.name ? 'bg-blue-100' : ''
                        }`}
                        onClick={() => handleServiceSelection(service)}
                      >
                        <p className="font-semibold">{service.name}</p>
                        <p className="text-gray-600">${service.price}</p>
                      </div>
                    ))}
                  </div>
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
                  <label className="block text-gray-700">Select Time</label>
                  <input
                    type="time"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Price Range</label>
                  <Slider
                    range
                    min={0}
                    max={500}
                    defaultValue={priceRange}
                    onChange={(value) => setPriceRange(value)}
                    trackStyle={[{ backgroundColor: '#076870' }]}
                    handleStyle={[
                      { borderColor: '#076870', backgroundColor: '#076870' },
                      { borderColor: '#076870', backgroundColor: '#076870' },
                    ]}
                    railStyle={{ backgroundColor: '#ddd' }}
                  />
                  <p className="text-gray-600 mt-2">
                    Selected Price Range: ${priceRange[0]} - ${priceRange[1]}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="bg-[#076870] text-white px-6 py-3 rounded-lg hover:bg-[#065f57] transition duration-300"
                >
                  Continue
                </button>
              </div>
            )}

            {/* Step 3: Task Details */}
            {step === 3 && (
              <div className="bg-white p-6 rounded-lg shadow-md mt-8">
                <h2 className="text-xl font-semibold mb-4">Tell Us About Your Task</h2>
                <form>
                  <div className="mb-4">
                    <label className="block text-gray-700">Task Details</label>
                    <textarea
                      value={taskDetails}
                      onChange={handleTaskDetailsChange}
                      className="w-full p-2 border rounded"
                      rows="4"
                      required
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="bg-[#076870] text-white px-6 py-3 rounded-lg hover:bg-[#065f57] transition duration-300"
                  >
                    Confirm Booking
                  </button>
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