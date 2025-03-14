// ServiceDetailsPage.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

// Example data
const taskersData = [
  { id: 1, name: 'John Doe', rating: 4.5, location: 'New York', price: 100, available: true },
  { id: 2, name: 'Jane Smith', rating: 4.8, location: 'California', price: 200, available: false },
  { id: 3, name: 'Bob Brown', rating: 3.9, location: 'Texas', price: 50, available: true },
];

const ServiceDetailsPage = () => {
  const { id } = useParams(); // Get service ID from URL
  const [filters, setFilters] = useState({
    location: '',
    rating: 0,
    available: false,
    priceRange: [0, 500],
  });

  // Example service details based on the service ID
  const service = {
    id,
    name: 'Electrical Problems',
    description: 'From simple repairs to complete rewiring projects.',
    // Add other service-related details here
  };

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
    const { name, value } = e.target;
    setFilters({
      ...filters,
      priceRange: [Math.min(filters.priceRange[0], value), Math.max(filters.priceRange[1], value)],
    });
  };

  const applyFilters = () => {
    // Here you could also trigger an API call to fetch filtered taskers
    console.log('Filters applied:', filters);
  };

  return (
    
    <>
    <Navbar />
    
    <div className="container mx-auto p-4 flex">
      {/* Left Sidebar - Filters */}
      <div className="w-1/4 p-4 bg-gray-100 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>

        {/* Location Filter */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Location</label>
          <input
            type="text"
            className="mt-1 p-2 w-full border rounded-md"
            name="location"
            value={filters.location}
            onChange={handleFilterChange}
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

        {/* Apply Filter Button */}
        <button
          onClick={applyFilters}
          className="px-6 py-3 bg-[#076870] text-white rounded-lg mt-4 w-full"
        >
          Apply Filters
        </button>
      </div>

      {/* Service Details and Taskers */}
      <div className="w-3/4 p-4">
        <h2 className="text-2xl font-semibold mb-4">{service.name}</h2>
        <p className="mb-4">{service.description}</p>

        <h3 className="text-xl font-semibold mb-4">Taskers Available</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTaskers.length > 0 ? (
            filteredTaskers.map((tasker) => (
              <div key={tasker.id} className="bg-white p-4 rounded-lg shadow-lg">
                <h4 className="text-lg font-semibold">{tasker.name}</h4>
                <p>Rating: {tasker.rating}</p>
                <p>Location: {tasker.location}</p>
                <p>Price: ${tasker.price}</p>
                <p>{tasker.available ? 'Available' : 'Not Available'}</p>
              </div>
            ))
          ) : (
            <p>No taskers found based on your filters.</p>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default ServiceDetailsPage;
