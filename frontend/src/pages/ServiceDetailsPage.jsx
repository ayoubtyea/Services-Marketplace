import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';


// Example data for taskers
const taskersData = [
  {
    id: 1,
    name: 'John Doe',
    rating: 4.5,
    location: 'New York',
    price: 100,
    available: true,
    image: 'https://cdn.prod.website-files.com/6641b18a77a92d76b329c2d5/6641b50e3a30a5d77c8578a8_electrical-problems.jpg',
    taskType: 'Electrician',
    reviews: 120,
    availableThisWeekend: true,
  },
  {
    id: 2,
    name: 'Jane Smith',
    rating: 4.8,
    location: 'California',
    price: 200,
    available: false,
    image: 'https://cdn.prod.website-files.com/6641b18a77a92d76b329c2d5/6641b4ed7288e84197d4a6b7_plumbing-solutions.jpg',
    taskType: 'Plumber',
    reviews: 95,
    availableThisWeekend: false,
  },
  {
    id: 3,
    name: 'Bob Brown',
    rating: 3.9,
    location: 'Texas',
    price: 50,
    available: true,
    image: 'https://cdn.prod.website-files.com/6641b18a77a92d76b329c2d5/6641b4c384a3010ab6bf5e72_carpentry-services.jpg',
    taskType: 'Carpenter',
    reviews: 80,
    availableThisWeekend: true,
  },
];

// Example services data
const servicesData = [
  { id: '1', name: 'Electrical Problems', description: 'From simple repairs to complete rewiring projects.' },
  { id: '2', name: 'Plumbing Solutions', description: 'Fix leaks, pipe issues, and plumbing installation.' },
  { id: '3', name: 'Carpentry Services', description: 'Custom built-ins, furniture repair, and cabinetry.' },
  { id: '4', name: 'Painting Services', description: 'Interior and exterior painting services for your home.' },
  { id: '5', name: 'Gardening Services', description: 'Garden design and maintenance for a beautiful landscape.' },
  { id: '6', name: 'Home Renovations', description: 'Complete home remodeling, from kitchens to bathrooms.' },
];

const ServiceDetailsPage = () => {
  const { id } = useParams(); // Get service ID from URL
  const [filters, setFilters] = useState({
    location: '',
    rating: 0,
    available: false,
    priceRange: [0, 500],
  });

  // Find service details based on the ID from the URL
  const service = servicesData.find((service) => service.id === id);

  if (!service) {
    return <div>Service not found!</div>; // If no service is found with the given id
  }

  const filteredTaskers = taskersData.filter((tasker) => {
    return (
      (filters.location === '' || tasker.location.includes(filters.location)) &&
      tasker.rating >= filters.rating &&
      (filters.available === false || tasker.available === filters.available) &&
      tasker.price >= filters.priceRange[0] &&
      tasker.price <= filters.priceRange[1]
    );
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handlePriceRangeChange = (e) => {
    const { value } = e.target;
    setFilters({
      ...filters,
      priceRange: [Math.min(filters.priceRange[0], value), Math.max(filters.priceRange[1], value)],
    });
  };

  const applyFilters = () => {
    // Apply filters logic here (or API call)
    console.log('Filters applied:', filters);
  };
    // State for toggling dropdown visibility
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
  
    // Toggle functions for dropdown visibility
    const toggleSortDropdown = () => setIsSortOpen(!isSortOpen);
    const toggleFilterDropdown = () => setIsFilterOpen(!isFilterOpen);

  return (
    <>

      {/* Hero Section */}
      <section
        className="bg-cover bg-center h-96"
        style={{
          backgroundImage:
            'url("https://cdn.prod.website-files.com/663b34c56f05c8c9e12aafdc/664058919f21cfec93f3fe47_hero-bg.jpg")',
        }}
      >
        <div className="text-center text-black pt-24">
          <motion.h2
            className="text-xl md:text-5xl font-bold"
            initial={{ opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {service.name}
          </motion.h2>
          <motion.p
            className="text-sm mt-4"
            initial={{ opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {service.description}
          </motion.p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="bg-white py-12">
    
      <div className="max-w-6xl 2xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center text-center">
          {/* Left Side: About Us Heading */}
          <motion.div
            initial={{ opacity: 0, x: -50 }} // Start off-screen to the left
            whileInView={{ opacity: 1, x: 0 }} // Animate to visible
            transition={{ duration: 0.6, delay: 0.2 }} // Smooth transition
            viewport={{ once: true }} // Animate only once
          >
            <div className="text-center md:text-left">
             
              <p className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-semibold text-black">
                Your Trusted <span className="text-[#076870]">Home</span> <br />
                 <span className="text-[#076870]">Solutions </span>Partner
              </p>
            </div>
          </motion.div>

          {/* Right Side: Description */}
          <motion.div
            initial={{ opacity: 0, x: 50 }} // Start off-screen to the right
            whileInView={{ opacity: 1, x: 0 }} // Animate to visible
            transition={{ duration: 0.6, delay: 0.4 }} // Smooth transition
            viewport={{ once: true }} // Animate only once
          >
            <div className="text-center md:text-left">
              <p className="text-sm font-light sm:text-sm lg:text-base text-gray-600">
              At HandyHome, we provide all service categories with high quality, ensuring your home remains a place of comfort,
               efficiency, and reliability.
              </p>
            </div>
          </motion.div>
        </div>
        <div className="hidden md:block h-1 w-[100%] mt-8 bg-gray-200 mx-auto"></div>
     
      </div>


{/* Search Bar with Icon */}
<div className="mt-12 flex justify-center items-center gap-4 mb-12">
  <div className="relative w-full max-w-lg">
    <input
      type="text"
      className="w-full py-3 pl-12 pr-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#076870] text-gray-700"
      placeholder="Search For Provider..."
    />
    <svg fill="#000000" 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-500"

    version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 488.4 488.4" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M0,203.25c0,112.1,91.2,203.2,203.2,203.2c51.6,0,98.8-19.4,134.7-51.2l129.5,129.5c2.4,2.4,5.5,3.6,8.7,3.6 s6.3-1.2,8.7-3.6c4.8-4.8,4.8-12.5,0-17.3l-129.6-129.5c31.8-35.9,51.2-83,51.2-134.7c0-112.1-91.2-203.2-203.2-203.2 S0,91.15,0,203.25z M381.9,203.25c0,98.5-80.2,178.7-178.7,178.7s-178.7-80.2-178.7-178.7s80.2-178.7,178.7-178.7 S381.9,104.65,381.9,203.25z"></path> </g> </g> </g></svg>
  </div>

  {/* Sort and Filter Buttons */}
  <div className="flex gap-4">
    {/* Sort By Button */}
    <div className="relative">
      <button
        onClick={toggleSortDropdown}
        className="px-12 py-3 bg-[#076870] text-white rounded cursor-pointer font-semibold hover:bg-[#065f57] transition duration-300"
      >
        Sort By
      </button>
      {isSortOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-10">
          <ul className="text-gray-700">
            <li className="cursor-pointer hover:bg-[#076870] hover:text-white px-4 py-2 text-sm">
              Price: Low to High
            </li>
            <li className="cursor-pointer hover:bg-[#076870] hover:text-white px-4 py-2 text-sm">
              Price: High to Low
            </li>
            <li className="cursor-pointer hover:bg-[#076870] hover:text-white px-4 py-2 text-sm">
              Rating: High to Low
            </li>
            <li className="cursor-pointer hover:bg-[#076870] hover:text-white px-4 py-2 text-sm">
              Rating: Low to High
            </li>
            <li className="cursor-pointer hover:bg-[#076870] hover:text-white px-4 py-2 text-sm">
              Date: Newest First
            </li>
            <li className="cursor-pointer hover:bg-[#076870] hover:text-white px-4 py-2 text-sm">
              Date: Oldest First
            </li>
          </ul>
        </div>
      )}
    </div>

    <div className="relative">
      <button
        onClick={toggleFilterDropdown}
        className="px-12 py-3 bg-[#f3f4f6] text-[#076870] rounded cursor-pointer font-semibold border border-[#076870] hover:bg-[#076870] hover:text-white transition duration-300"
      >
        Filter By
      </button>
      {isFilterOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-10">
          <ul className="text-gray-700">
            <li className="cursor-pointer hover:bg-[#076870] hover:text-white px-4 py-2 text-sm">
              Category: Electrical
            </li>
            <li className="cursor-pointer hover:bg-[#076870] hover:text-white px-4 py-2 text-sm">
              Category: Plumbing
            </li>
            <li className="cursor-pointer hover:bg-[#076870] hover:text-white px-4 py-2 text-sm">
              Category: Carpentry
            </li>
            <li className="cursor-pointer hover:bg-[#076870] hover:text-white px-4 py-2 text-sm">
              Location: Nearby
            </li>
            <li className="cursor-pointer hover:bg-[#076870] hover:text-white px-4 py-2 text-sm">
              Rating: 4 Stars & Up
            </li>
            <li className="cursor-pointer hover:bg-[#076870] hover:text-white px-4 py-2 text-sm">
              Price Range: $50 - $200
            </li>
          </ul>
        </div>
      )}
    </div>
  </div>
  
</div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Section */}
            <div className="lg:col-span-1 bg-gray-100 p-6 rounded-lg shadow-lg">
              <h4 className="text-xl font-semibold mb-4">Filters</h4>

              {/* Location Filter */}
              <div className="mb-4">
                <label className="block text-sm font-medium">Location</label>
                <input
                  type="text"
                  className="mt-1 p-2 w-full border rounded-md"
                  name="location"
                  value={filters.location}
                  onChange={handleFilterChange}
                  placeholder="Filter by location"
                />
              </div>

              {/* Rating Filter */}
              <div className="mb-4">
                <label className="block text-sm font-medium">Minimum Rating</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  step="0.1"
                  className="mt-1 p-2 w-full border rounded-md"
                  name="rating"
                  value={filters.rating}
                  onChange={handleFilterChange}
                  placeholder="Rating"
                />
              </div>

              {/* Availability Filter */}
              <div className="mb-4">
                <label className="block text-sm font-medium">Availability</label>
                <select
                  className="mt-1 p-2 w-full border rounded-md"
                  name="available"
                  value={filters.available}
                  onChange={handleFilterChange}
                >
                  <option value="false">Not Available</option>
                  <option value="true">Available</option>
                </select>
              </div>

              {/* Price Range Filter */}
              <div className="mb-4">
                <label className="block text-sm font-medium">Price Range</label>
                <input
                  type="range"
                  min="0"
                  max="500"
                  value={filters.priceRange[1]}
                  onChange={handlePriceRangeChange}
                  className="mt-1 w-full"
                />
                <div className="flex justify-between text-xs">
                  <span>${filters.priceRange[0]}</span>
                  <span>${filters.priceRange[1]}</span>
                </div>
              </div>

              <button
                onClick={applyFilters}
                className="w-full px-6 py-3 bg-[#076870] text-white rounded-lg mt-4 hover:bg-[#065f57] transition duration-300"
              >
                Apply Filters
              </button>
            </div>

            {/* Taskers Section */}
            <div className="lg:col-span-3">
              <h4 className="text-xl font-semibold mb-6">Available Taskers</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTaskers.length > 0 ? (
                  filteredTaskers.map((tasker) => (
                    <div key={tasker.id} className="bg-white p-4 rounded-lg shadow-lg text-center">
                      <img
                        src={tasker.image}
                        alt={tasker.name}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <h5 className="text-lg font-semibold mt-4">{tasker.name}</h5>
                      <p className="text-2xl text-black font-bold">{tasker.taskType}</p>
                      <p className="text-sm text-gray-600">⭐ {tasker.rating} ({tasker.reviews} reviews)</p>
                      <p className="text-sm text-gray-600">📍 {tasker.location}</p>
                      <p className="text-sm text-gray-600">
                      🕒 {tasker.availableThisWeekend ? 'Available this weekend' : 'Not available this weekend'}
                      </p>
                      <p className="text-sm text-gray-600">${tasker.price} / hour</p>
                      <Link
      to={`/taskers/${tasker.id}`} // Navigate to the Tasker Details Page
      className="mt-4 w-full px-4 py-2 bg-[#076870] text-white rounded-lg hover:bg-[#065f57] transition duration-300 block"
    >
      View Profile
    </Link>
                    </div>
                  ))
                ) : (
                  <p>No taskers found based on your filters.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServiceDetailsPage;