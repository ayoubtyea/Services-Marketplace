import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

// Example taskers data (you can import this from a shared file)
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
    bio: 'Experienced electrician with over 10 years of experience in residential and commercial projects.',
    skills: ['Wiring', 'Lighting Installation', 'Circuit Repair'],
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
    bio: 'Professional plumber specializing in leak repairs and pipe installations.',
    skills: ['Pipe Repair', 'Drain Cleaning', 'Water Heater Installation'],
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
    bio: 'Skilled carpenter with expertise in custom furniture and home renovations.',
    skills: ['Furniture Repair', 'Cabinetry', 'Custom Built-Ins'],
  },
];

const TaskerDetailsPage = () => {
  const { id } = useParams(); // Get the tasker ID from the URL
  const tasker = taskersData.find((tasker) => tasker.id === parseInt(id));

  if (!tasker) {
    return <div>Tasker not found!</div>;
  }

  return (
  <>
  
    <Navbar />
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="text-center">
          <img
            src={tasker.image}
            alt={tasker.name}
            className="w-48 h-48 object-cover rounded-full mx-auto"
          />
          <h1 className="text-3xl font-bold mt-4">{tasker.name}</h1>
          <p className="text-xl text-[#076870] font-semibold">{tasker.taskType}</p>
          <p className="text-gray-600 mt-2">⭐ {tasker.rating} ({tasker.reviews} reviews)</p>
          <p className="text-gray-600">📍 {tasker.location}</p>
          <p className="text-gray-600">
            🕒 {tasker.availableThisWeekend ? 'Available this weekend' : 'Not available this weekend'}
          </p>
          <p className="text-gray-600">${tasker.price} / hour</p>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold">About {tasker.name}</h2>
          <p className="text-gray-700 mt-2">{tasker.bio}</p>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold">Skills</h2>
          <ul className="mt-2">
            {tasker.skills.map((skill, index) => (
              <li key={index} className="text-gray-700">
                - {skill}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 text-center">
          <button className="px-6 py-3 bg-[#076870] text-white rounded-lg hover:bg-[#065f57] transition duration-300">
            Contact {tasker.name}
          </button>
        </div>
      </div>
    </div>
</>  
);
};

export default TaskerDetailsPage;