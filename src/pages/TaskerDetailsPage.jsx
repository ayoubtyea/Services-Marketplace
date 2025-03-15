import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';

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
    <section
        className="bg-cover bg-center h-96"
        style={{
          backgroundImage:
            'url("https://cdn.prod.website-files.com/663b34c56f05c8c9e12aafdc/664058919f21cfec93f3fe47_hero-bg.jpg")',
        }}
      >
        <div className="text-center text-black pt-24">
          
        <motion.div
              className="inline-block border-x-4 border-[#076870] text-[#076870] rounded-md px-6 py-2 cursor-pointer bg-gray-300"
              initial={{ opacity: 0, y: 70 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.h2
                className="text-xl font-light sm:text-xl md:text-xl"
                initial={{ opacity: 0, y: 70 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Team Details
              </motion.h2>
            </motion.div>
          <motion.h2
            className="text-xl md:text-5xl font-bold"
            initial={{ opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {tasker.name}
            </motion.h2>
          <motion.p
            className="text-sm mt-4"
            initial={{ opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {tasker.bio}
            </motion.p>
        </div>
      </section>
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