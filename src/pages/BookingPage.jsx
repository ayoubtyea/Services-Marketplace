import React, { useState } from 'react';
import Slider from 'react-slider';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

const BookingPage = () => {
  const { id } = useParams(); // Get the tasker ID from the URL
  const [step, setStep] = useState(1); // Step for the booking process
  const [address, setAddress] = useState({ street: '', unit: '' });
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [taskDetails, setTaskDetails] = useState('');

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
    });
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Book {tasker.name}</h1>

        {/* Step 1: Address Input */}
        {step === 1 && (
          <div className="bg-white p-6 rounded-lg shadow-md">
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
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Continue
              </button>
            </form>
          </div>
        )}

        {/* Step 2: Service and Date/Time Selection */}
        {step === 2 && (
          <div className="bg-white p-6 rounded-lg shadow-md">
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
            <button
              type="button"
              onClick={() => setStep(3)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Continue
            </button>
          </div>
        )}

        {/* Step 3: Task Details */}
        {step === 3 && (
          <div className="bg-white p-6 rounded-lg shadow-md">
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
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Confirm Booking
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default BookingPage;