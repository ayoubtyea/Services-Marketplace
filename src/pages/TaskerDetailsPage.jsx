import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';

// Icons for skills (you can use any icon library like FontAwesome or Heroicons)
const SkillIcons = {
  Wiring: '🔌',
  'Lighting Installation': '💡',
  'Circuit Repair': '⚡',
  'Pipe Repair': '🚰',
  'Drain Cleaning': '🚿',
  'Water Heater Installation': '🔥',
  'Furniture Repair': '🪑',
  Cabinetry: '🔨',
  'Custom Built-Ins': '🛠️',
};

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
    bio: 'Emily Watson brings a wealth of expertise and experience to her role as an electrician at HandyHome.',
    skills: ['Wiring', 'Lighting Installation', 'Circuit Repair'],
    services: [
      { name: 'Wiring Installation', price: 150, description: 'Professional wiring installation for homes and offices.' },
      { name: 'Lighting Setup', price: 100, description: 'Installation of modern lighting solutions.' },
      { name: 'Circuit Repair', price: 200, description: 'Diagnosis and repair of electrical circuits.' },
    ],
    clientReviews: [
      { name: 'Alice', rating: 5, comment: 'Great work, very professional!', date: '2023-10-01' },
      { name: 'Bob', rating: 4, comment: 'Fixed my issue quickly.', date: '2023-09-25' },
      { name: 'Charlie', rating: 4.5, comment: 'Highly recommended.', date: '2023-09-20' },
    ],
  },
  // Add more taskers here...
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

      <section className='bg-white p-8 rounded-lg shadow-lg'>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Card */}
        <div className="">
          {/* First Flex Section: Picture and Info */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Picture Section */}
            <div className="w-full md:w-1/2">
              <img
                src={tasker.image}
                alt={tasker.name}
                className="w-full h-auto rounded-lg"
              />
            </div>

            {/* Info Section */}
            <div className="w-full md:w-2/3 bg-gray-200 px-6 py-6 rounded">
              <h1 className="text-3xl font-bold"><span className="font-light">Hello, I'm</span> <br />{tasker.name}</h1>
              <p className="text-xl text-[#076870] font-semibold">{tasker.taskType}</p>
              <div className="hidden md:block h-1 w-[50%] mt-2 mb-2 bg-gray-300"></div>
              <p className="text-gray-600">Department: {tasker.department}</p>
              <p className="text-gray-600">Experience: {tasker.experience}</p>
              <p className="text-gray-600">Email: {tasker.email}</p>
              <p className="text-gray-600">Phone: {tasker.phone}</p>

              {/* Buttons */}
              <div className="mt-6 flex gap-4">
                <button className="px-6 py-3 cursor-pointer bg-[#076870] text-white rounded-lg hover:bg-[#065f57] transition duration-300">
                  Book a Service
                </button>
                <button className="px-6 py-3 cursor-pointer bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition duration-300">
                  Message Provider
                </button>
              </div>
            </div>
          </div>

          {/* Second Flex Section: Skills and Experience */}
          <div className="mt-8 flex flex-col md:flex-row gap-8">
            {/* Skills Section */}
            <div className="w-full md:w-1/2">
              <h2 className="text-2xl font-bold">Professional Skills</h2>
              <div className="mt-4 space-y-2">
                {tasker.skills.map((skill, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span>{SkillIcons[skill]}</span>
                    <p className="text-gray-700">{skill}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience Section */}
            <div className="w-full md:w-1/2">
              <h2 className="text-2xl font-bold">Experience</h2>
              <p className="text-gray-700 mt-4">{tasker.bio}</p>
            </div>
          </div>

          {/* Third Flex Section: Services and Availability */}
          <div className="mt-8 flex flex-col md:flex-row gap-8">
            {/* Services Section */}
            <div className="w-full md:w-1/2">
              <h2 className="text-2xl font-bold">Services Offered</h2>
              <div className="mt-4 space-y-4">
                {tasker.services.map((service, index) => (
                  <div key={index} className="bg-gray-100 p-4 rounded-lg">
                    <p className="font-semibold">{service.name}</p>
                    <p className="text-gray-700">${service.price}</p>
                    <p className="text-gray-600 text-sm mt-2">{service.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Availability Section */}
            <div className="w-full md:w-1/2">
              <h2 className="text-2xl font-bold">Availability</h2>
              <div className="mt-4">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="p-2 text-left">Day</th>
                      <th className="p-2 text-left">Hours</th>
                      <th className="p-2 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(tasker.availability).map(([day, time]) => (
                      <tr key={day} className="border-b border-gray-200">
                        <td className="p-2">{day}</td>
                        <td className="p-2">
                          {typeof time === 'string' ? '-' : `${time.start} - ${time.end}`}
                        </td>
                        <td className="p-2">
                          <span
                            className={`px-2 py-1 rounded-full text-sm ${
                              time.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {time.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Client Reviews Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold">Client Reviews</h2>
            <div className="mt-4 space-y-4">
              {tasker.clientReviews.map((review, index) => (
                <div key={index} className="bg-gray-100 p-6 rounded-lg">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold">{review.name}</p>
                    <p className="text-gray-700">⭐ {review.rating}</p>
                  </div>
                  <p className="text-gray-600 text-sm mt-2">{review.date}</p>
                  <p className="text-gray-700 mt-2">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      </section>
    </>
  );
};

export default TaskerDetailsPage;