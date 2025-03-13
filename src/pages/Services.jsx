import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ServicesPage = () => {
  return (
   <>
   <Navbar />
  
   <section
          className="Services"
          style={{
            backgroundImage:
              'url("https://cdn.prod.website-files.com/663b34c56f05c8c9e12aafdc/664058919f21cfec93f3fe47_hero-bg.jpg")',
          }}
        >
            <div className="max-w-6xl lg:max-w-7xl mx-auto px-4 py-12">
          <div className="text-center mt-8">
      <motion.div
        className="inline-block border-x-4 border-[#076870] text-[#076870] rounded-md px-6 py-2 cursor-pointer bg-gray-100"
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
          Our Services
        </motion.h2>
      </motion.div>

      <motion.p
        className="text-2xl font-bold mt-4 text-gray-900 sm:text-3xl md:text-4xl"
        initial={{ opacity: 0, y: 70 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Get Comprehensive{" "}
        <span className="text-[#076870] font-light">
          Home <br /> Solutions
        </span>{" "}
        Services
      </motion.p>
       </div>
        </div>
        
      </section>
      <div className="max-w-6xl 2xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Side: About Us Heading */}
          <motion.div
            initial={{ opacity: 0, x: -50 }} // Start off-screen to the left
            whileInView={{ opacity: 1, x: 0 }} // Animate to visible
            transition={{ duration: 0.6, delay: 0.2 }} // Smooth transition
            viewport={{ once: true }} // Animate only once
          >
            <div className="text-center md:text-left">
             
              <p className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-semibold text-black">
              Browse <span className="text-[#076870] font-light">Service </span> <br />
                 <span className="text-[#076870] font-light">Categories</span>
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
              <p className="text-lg font-light sm:text-xl lg:text-xl text-gray-600">
              At HandyHome, we provide all service categories with high quality, ensuring your home remains a place of comfort, efficiency, and reliability.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="hidden md:block h-1 w-[85%] mt-8 bg-gray-200 mx-auto"></div>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">


  {/* Search Bar with Icon and Buttons */}
  <div className="mt-12 flex justify-center items-center gap-4">
    {/* Search Input */}
    <div className="relative w-full max-w-lg">
      <input
        type="text"
        className="w-full py-3 pl-12 pr-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#076870] text-gray-700"
        placeholder="Search services..."
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M11 16a7 7 0 100-14 7 7 0 000 14zm0 0l5 5m-5-5h.01"
        />
      </svg>
    </div>

    {/* Sort and Filter Buttons */}
    <div className="flex gap-4">
      <button
        className="px-6 py-3 bg-[#076870] text-white rounded-full font-semibold hover:bg-[#065f57] transition duration-300"
      >
        Sort
      </button>
      <button
        className="px-6 py-3 bg-[#f3f4f6] text-[#076870] rounded-full font-semibold border border-[#076870] hover:bg-[#076870] hover:text-white transition duration-300"
      >
        Filter By
      </button>
    </div>
  </div>
</section>


      {/* Services Cards */}
      <section className="services-cards py-16 sm:py-20 lg:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
           
            {/* Service Card 1 */}
            <motion.div
              className="bg-white border border-gray-200 rounded-lg shadow-lg hover:scale-105 hover:bg-[#076870] hover:text-white transform transition duration-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <a href="#">
                <img
                  className="rounded-t-lg w-full h-56 object-cover"
                  src="https://cdn.prod.website-files.com/6641b18a77a92d76b329c2d5/6641b50e3a30a5d77c8578a8_electrical-problems.jpg"
                  alt="Electrical Problems"
                />
              </a>
              <div className="p-6 text-center">
                <a href="#">
                  <h5 className="text-2xl font-semibold text-gray-900 hover:text-white">
                    Electrical Problems
                  </h5>
                </a>
                <p className="mt-3 text-gray-700 hover:text-white">
                  From simple repairs to complete rewiring projects, our
                  electrical solutions are designed to keep your home safe and
                  powered.
                </p>
                <div className="mt-4 text-center">
                  <a
                    href="/about"
                    className="inline-flex items-center px-6 py-3 border border-[#076870] text-[#076870] rounded-full hover:bg-[#076870] hover:text-white transition-colors"
                  >
                    More Details
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 ml-2"
                      fill="currentColor"
                      viewBox="0 0 12 12"
                    >
                      <path d="M6.80182 8.45459C6.67915 8.46603 6.55599 8.43835 6.45 8.37549C6.37256 8.29599 6.33544 8.18563 6.3491 8.07549C6.35196 7.98381 6.36291 7.89254 6.38182 7.80277C6.40013 7.69979 6.42377 7.59784 6.45272 7.49731L6.77454 6.39003C6.80773 6.28074 6.82966 6.16834 6.84 6.05457C6.84 5.93185 6.85636 5.84729 6.85636 5.79821C6.8632 5.57947 6.76981 5.36956 6.60272 5.22821C6.3972 5.07043 6.14126 4.99288 5.88272 5.01003C5.69745 5.01282 5.5136 5.04315 5.33726 5.10003C5.14453 5.16003 4.9418 5.23184 4.72908 5.31549L4.63636 5.67549C4.69908 5.65367 4.77546 5.62913 4.86272 5.60185C4.94597 5.5772 5.03227 5.56433 5.11908 5.56367C5.24086 5.55048 5.36344 5.58038 5.46544 5.64821C5.53472 5.73088 5.56723 5.83827 5.55544 5.94549C5.55513 6.0372 5.54508 6.12863 5.52544 6.21821C5.50634 6.31367 5.4818 6.41457 5.4518 6.52093L5.12726 7.63365C5.1011 7.73708 5.08017 7.84175 5.06454 7.94729C5.05179 8.03764 5.04542 8.12877 5.04544 8.22001C5.0441 8.44025 5.14481 8.6487 5.31816 8.78455C5.52684 8.94479 5.78644 9.02422 6.04906 9.00819C6.23398 9.01198 6.41827 8.98527 6.59452 8.92909C6.74906 8.87635 6.95543 8.80091 7.21362 8.70273L7.3009 8.35909C7.23096 8.3881 7.15894 8.4118 7.08544 8.42999C6.99249 8.45122 6.89705 8.45947 6.80182 8.45459Z" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Service Card 2 */}
            <motion.div
              className="bg-white border border-gray-200 rounded-lg shadow-lg hover:scale-105 hover:bg-[#076870] hover:text-white transition-all duration-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <a href="#">
                <img
                  className="rounded-t-lg w-full h-56 object-cover"
                  src="https://cdn.prod.website-files.com/6641b18a77a92d76b329c2d5/6641b4ed7288e84197d4a6b7_plumbing-solutions.jpg"
                  alt="Plumbing Solutions"
                />
              </a>
              <div className="p-6 text-center">
                <h5 className="text-2xl font-semibold text-gray-900 hover:text-white">
                  Plumbing Solutions
                </h5>
                <p className="mt-3 text-gray-700 hover:text-white">
                  Don't let plumbing issues disrupt your daily routine. Our
                  plumbing solutions cover everything from leaky faucets to
                  complete installations.
                </p>
                <a
                  href="/about"
                  className="inline-flex items-center px-6 py-3 border border-[#076870] text-[#076870] rounded-full hover:bg-[#076870] hover:text-white transition-colors"
                >
                  More Details
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 ml-2"
                    fill="currentColor"
                    viewBox="0 0 12 12"
                  >
                    <path d="M6.80182 8.45459C6.67915 8.46603 6.55599 8.43835 6.45 8.37549C6.37256 8.29599 6.33544 8.18563 6.3491 8.07549C6.35196 7.98381 6.36291 7.89254 6.38182 7.80277C6.40013 7.69979 6.42377 7.59784 6.45272 7.49731L6.77454 6.39003C6.80773 6.28074 6.82966 6.16834 6.84 6.05457C6.84 5.93185 6.85636 5.84729 6.85636 5.79821C6.8632 5.57947 6.76981 5.36956 6.60272 5.22821C6.3972 5.07043 6.14126 4.99288 5.88272 5.01003C5.69745 5.01282 5.5136 5.04315 5.33726 5.10003C5.14453 5.16003 4.9418 5.23184 4.72908 5.31549L4.63636 5.67549C4.69908 5.65367 4.77546 5.62913 4.86272 5.60185C4.94597 5.5772 5.03227 5.56433 5.11908 5.56367C5.24086 5.55048 5.36344 5.58038 5.46544 5.64821C5.53472 5.73088 5.56723 5.83827 5.55544 5.94549C5.55513 6.0372 5.54508 6.12863 5.52544 6.21821C5.50634 6.31367 5.4818 6.41457 5.4518 6.52093L5.12726 7.63365C5.1011 7.73708 5.08017 7.84175 5.06454 7.94729C5.05179 8.03764 5.04542 8.12877 5.04544 8.22001C5.0441 8.44025 5.14481 8.6487 5.31816 8.78455C5.52684 8.94479 5.78644 9.02422 6.04906 9.00819C6.23398 9.01198 6.41827 8.98527 6.59452 8.92909C6.74906 8.87635 6.95543 8.80091 7.21362 8.70273L7.3009 8.35909C7.23096 8.3881 7.15894 8.4118 7.08544 8.42999C6.99249 8.45122 6.89705 8.45947 6.80182 8.45459Z" />
                  </svg>
                </a>
              </div>
            </motion.div>
          
             {/* Service Card 3 */}
             <motion.div
              className="bg-white border border-gray-200 rounded-lg shadow-lg hover:scale-105 hover:bg-[#076870] hover:text-white transition-all duration-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <a href="#">
                <img
                  className="rounded-t-lg w-full h-56 object-cover"
                  src="https://cdn.prod.website-files.com/6641b18a77a92d76b329c2d5/6641b4c384a3010ab6bf5e72_carpentry-services.jpg"
                  alt="Plumbing Solutions"
                />
              </a>
              <div className="p-6 text-center">
                <h5 className="text-2xl font-semibold text-gray-900 hover:text-white">
                Carpentry Services
                </h5>
                <p className="mt-3 text-gray-700 hover:text-white">
                Whether you're looking to add custom built-ins, repair damaged furniture, or install new cabinetry, our carpentry.
                </p>
                <a
                  href="/about"
                  className="inline-flex items-center px-6 py-3 border border-[#076870] text-[#076870] rounded-full hover:bg-[#076870] hover:text-white transition-colors"
                >
                  More Details
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 ml-2"
                    fill="currentColor"
                    viewBox="0 0 12 12"
                  >
                    <path d="M6.80182 8.45459C6.67915 8.46603 6.55599 8.43835 6.45 8.37549C6.37256 8.29599 6.33544 8.18563 6.3491 8.07549C6.35196 7.98381 6.36291 7.89254 6.38182 7.80277C6.40013 7.69979 6.42377 7.59784 6.45272 7.49731L6.77454 6.39003C6.80773 6.28074 6.82966 6.16834 6.84 6.05457C6.84 5.93185 6.85636 5.84729 6.85636 5.79821C6.8632 5.57947 6.76981 5.36956 6.60272 5.22821C6.3972 5.07043 6.14126 4.99288 5.88272 5.01003C5.69745 5.01282 5.5136 5.04315 5.33726 5.10003C5.14453 5.16003 4.9418 5.23184 4.72908 5.31549L4.63636 5.67549C4.69908 5.65367 4.77546 5.62913 4.86272 5.60185C4.94597 5.5772 5.03227 5.56433 5.11908 5.56367C5.24086 5.55048 5.36344 5.58038 5.46544 5.64821C5.53472 5.73088 5.56723 5.83827 5.55544 5.94549C5.55513 6.0372 5.54508 6.12863 5.52544 6.21821C5.50634 6.31367 5.4818 6.41457 5.4518 6.52093L5.12726 7.63365C5.1011 7.73708 5.08017 7.84175 5.06454 7.94729C5.05179 8.03764 5.04542 8.12877 5.04544 8.22001C5.0441 8.44025 5.14481 8.6487 5.31816 8.78455C5.52684 8.94479 5.78644 9.02422 6.04906 9.00819C6.23398 9.01198 6.41827 8.98527 6.59452 8.92909C6.74906 8.87635 6.95543 8.80091 7.21362 8.70273L7.3009 8.35909C7.23096 8.3881 7.15894 8.4118 7.08544 8.42999C6.99249 8.45122 6.89705 8.45947 6.80182 8.45459Z" />
                  </svg>
                </a>
              </div>
            </motion.div>
            {/* Service Card 4 */}
            <motion.div
              className="bg-white border border-gray-200 rounded-lg shadow-lg hover:scale-105 hover:bg-[#076870] hover:text-white transform transition duration-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <a href="#">
                <img
                  className="rounded-t-lg w-full h-56 object-cover"
                  src="https://cdn.prod.website-files.com/6641b18a77a92d76b329c2d5/6641b493aa2d2deeb29c33e0_painting-services.jpg"
                  alt="Electrical Problems"
                />
              </a>
              <div className="p-6 text-center">
                <a href="#">
                  <h5 className="text-2xl font-semibold text-gray-900 hover:text-white">
                    Electrical Problems
                  </h5>
                </a>
                <p className="mt-3 text-gray-700 hover:text-white">
                  From simple repairs to complete rewiring projects, our
                  electrical solutions are designed to keep your home safe and
                  powered.
                </p>
                <div className="mt-4 text-center">
                  <a
                    href="/about"
                    className="inline-flex items-center px-6 py-3 border border-[#076870] text-[#076870] rounded-full hover:bg-[#076870] hover:text-white transition-colors"
                  >
                    More Details
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 ml-2"
                      fill="currentColor"
                      viewBox="0 0 12 12"
                    >
                      <path d="M6.80182 8.45459C6.67915 8.46603 6.55599 8.43835 6.45 8.37549C6.37256 8.29599 6.33544 8.18563 6.3491 8.07549C6.35196 7.98381 6.36291 7.89254 6.38182 7.80277C6.40013 7.69979 6.42377 7.59784 6.45272 7.49731L6.77454 6.39003C6.80773 6.28074 6.82966 6.16834 6.84 6.05457C6.84 5.93185 6.85636 5.84729 6.85636 5.79821C6.8632 5.57947 6.76981 5.36956 6.60272 5.22821C6.3972 5.07043 6.14126 4.99288 5.88272 5.01003C5.69745 5.01282 5.5136 5.04315 5.33726 5.10003C5.14453 5.16003 4.9418 5.23184 4.72908 5.31549L4.63636 5.67549C4.69908 5.65367 4.77546 5.62913 4.86272 5.60185C4.94597 5.5772 5.03227 5.56433 5.11908 5.56367C5.24086 5.55048 5.36344 5.58038 5.46544 5.64821C5.53472 5.73088 5.56723 5.83827 5.55544 5.94549C5.55513 6.0372 5.54508 6.12863 5.52544 6.21821C5.50634 6.31367 5.4818 6.41457 5.4518 6.52093L5.12726 7.63365C5.1011 7.73708 5.08017 7.84175 5.06454 7.94729C5.05179 8.03764 5.04542 8.12877 5.04544 8.22001C5.0441 8.44025 5.14481 8.6487 5.31816 8.78455C5.52684 8.94479 5.78644 9.02422 6.04906 9.00819C6.23398 9.01198 6.41827 8.98527 6.59452 8.92909C6.74906 8.87635 6.95543 8.80091 7.21362 8.70273L7.3009 8.35909C7.23096 8.3881 7.15894 8.4118 7.08544 8.42999C6.99249 8.45122 6.89705 8.45947 6.80182 8.45459Z" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Service Card 5 */}
            <motion.div
              className="bg-white border border-gray-200 rounded-lg shadow-lg hover:scale-105 hover:bg-[#076870] hover:text-white transition-all duration-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <a href="#">
                <img
                  className="rounded-t-lg w-full h-56 object-cover"
                  src="https://cdn.prod.website-files.com/6641b18a77a92d76b329c2d5/6641b472e9f876e39aa1936b_gardening-services.jpg"
                  alt="Plumbing Solutions"
                />
              </a>
              <div className="p-6 text-center">
                <h5 className="text-2xl font-semibold text-gray-900 hover:text-white">
                  Plumbing Solutions
                </h5>
                <p className="mt-3 text-gray-700 hover:text-white">
                  Don't let plumbing issues disrupt your daily routine. Our
                  plumbing solutions cover everything from leaky faucets to
                  complete installations.
                </p>
                <a
                  href="/about"
                  className="inline-flex items-center px-6 py-3 border border-[#076870] text-[#076870] rounded-full hover:bg-[#076870] hover:text-white transition-colors"
                >
                  More Details
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 ml-2"
                    fill="currentColor"
                    viewBox="0 0 12 12"
                  >
                    <path d="M6.80182 8.45459C6.67915 8.46603 6.55599 8.43835 6.45 8.37549C6.37256 8.29599 6.33544 8.18563 6.3491 8.07549C6.35196 7.98381 6.36291 7.89254 6.38182 7.80277C6.40013 7.69979 6.42377 7.59784 6.45272 7.49731L6.77454 6.39003C6.80773 6.28074 6.82966 6.16834 6.84 6.05457C6.84 5.93185 6.85636 5.84729 6.85636 5.79821C6.8632 5.57947 6.76981 5.36956 6.60272 5.22821C6.3972 5.07043 6.14126 4.99288 5.88272 5.01003C5.69745 5.01282 5.5136 5.04315 5.33726 5.10003C5.14453 5.16003 4.9418 5.23184 4.72908 5.31549L4.63636 5.67549C4.69908 5.65367 4.77546 5.62913 4.86272 5.60185C4.94597 5.5772 5.03227 5.56433 5.11908 5.56367C5.24086 5.55048 5.36344 5.58038 5.46544 5.64821C5.53472 5.73088 5.56723 5.83827 5.55544 5.94549C5.55513 6.0372 5.54508 6.12863 5.52544 6.21821C5.50634 6.31367 5.4818 6.41457 5.4518 6.52093L5.12726 7.63365C5.1011 7.73708 5.08017 7.84175 5.06454 7.94729C5.05179 8.03764 5.04542 8.12877 5.04544 8.22001C5.0441 8.44025 5.14481 8.6487 5.31816 8.78455C5.52684 8.94479 5.78644 9.02422 6.04906 9.00819C6.23398 9.01198 6.41827 8.98527 6.59452 8.92909C6.74906 8.87635 6.95543 8.80091 7.21362 8.70273L7.3009 8.35909C7.23096 8.3881 7.15894 8.4118 7.08544 8.42999C6.99249 8.45122 6.89705 8.45947 6.80182 8.45459Z" />
                  </svg>
                </a>
              </div>
            </motion.div>
          
             {/* Service Card 6 */}
             <motion.div
              className="bg-white border border-gray-200 rounded-lg shadow-lg hover:scale-105 hover:bg-[#076870] hover:text-white transition-all duration-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <a href="#">
                <img
                  className="rounded-t-lg w-full h-56 object-cover"
                  src="https://cdn.prod.website-files.com/6641b18a77a92d76b329c2d5/6641b4196c891ed31ef5a530_home-renovations.jpg"
                  alt="Plumbing Solutions"
                />
              </a>
              <div className="p-6 text-center">
                <h5 className="text-2xl font-semibold text-gray-900 hover:text-white">
                  Plumbing Solutions
                </h5>
                <p className="mt-3 text-gray-700 hover:text-white">
                  Don't let plumbing issues disrupt your daily routine. Our
                  plumbing solutions cover everything from leaky faucets to
                  complete installations.
                </p>
                <a
                  href="/about"
                  className="inline-flex items-center px-6 py-3 border border-[#076870] text-[#076870] rounded-full hover:bg-[#076870] hover:text-white transition-colors"
                >
                  More Details
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 ml-2"
                    fill="currentColor"
                    viewBox="0 0 12 12"
                  >
                    <path d="M6.80182 8.45459C6.67915 8.46603 6.55599 8.43835 6.45 8.37549C6.37256 8.29599 6.33544 8.18563 6.3491 8.07549C6.35196 7.98381 6.36291 7.89254 6.38182 7.80277C6.40013 7.69979 6.42377 7.59784 6.45272 7.49731L6.77454 6.39003C6.80773 6.28074 6.82966 6.16834 6.84 6.05457C6.84 5.93185 6.85636 5.84729 6.85636 5.79821C6.8632 5.57947 6.76981 5.36956 6.60272 5.22821C6.3972 5.07043 6.14126 4.99288 5.88272 5.01003C5.69745 5.01282 5.5136 5.04315 5.33726 5.10003C5.14453 5.16003 4.9418 5.23184 4.72908 5.31549L4.63636 5.67549C4.69908 5.65367 4.77546 5.62913 4.86272 5.60185C4.94597 5.5772 5.03227 5.56433 5.11908 5.56367C5.24086 5.55048 5.36344 5.58038 5.46544 5.64821C5.53472 5.73088 5.56723 5.83827 5.55544 5.94549C5.55513 6.0372 5.54508 6.12863 5.52544 6.21821C5.50634 6.31367 5.4818 6.41457 5.4518 6.52093L5.12726 7.63365C5.1011 7.73708 5.08017 7.84175 5.06454 7.94729C5.05179 8.03764 5.04542 8.12877 5.04544 8.22001C5.0441 8.44025 5.14481 8.6487 5.31816 8.78455C5.52684 8.94479 5.78644 9.02422 6.04906 9.00819C6.23398 9.01198 6.41827 8.98527 6.59452 8.92909C6.74906 8.87635 6.95543 8.80091 7.21362 8.70273L7.3009 8.35909C7.23096 8.3881 7.15894 8.4118 7.08544 8.42999C6.99249 8.45122 6.89705 8.45947 6.80182 8.45459Z" />
                  </svg>
                </a>
              </div>
            </motion.div>
         
          </div>
        </div>
      </section>
      <section className="joinU"
        style={{
          backgroundImage:
            'url("https://i.postimg.cc/8C0MKPLN/Rectangle-40065.png")',
        }}
        >
        <div className="text-center mt-8">
       

        <motion.p
          className="text-2xl font-light pt-20 text-white sm:text-3xl md:text-4xl"
          initial={{ opacity: 0, y: 70 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Ready to Join Our Community <br /> Today?
        </motion.p>

        <motion.p>
          <p className="text-center mt-2 text-gray-100 text-sm text-light">
          Whether you're looking for quality services or want to offer your skills,
          <br />
           ServiceConnect makes it easy to connect and get things done.
          </p>
        </motion.p>
        <div className="flex justify-center items-center space-x-4 py-8">
  <button className="px-6 py-3 bg-[#076870] text-white rounded-full font-semibold hover:bg-[#065f57] transition duration-300 flex items-center space-x-2">
    <span>Join Us As a Tasker</span>
    <span className="transform rotate-[-50deg]">→</span>
  </button>
  <button className="px-6 py-3 bg-[#f3f4f6] text-[#076870] rounded-full font-semibold border border-[#076870] hover:bg-[#076870] hover:text-white transition duration-300 flex items-center space-x-2">
    <span>Book A Service</span>
    <span className="transform rotate-[-50deg]">→</span>
  </button>
</div>


      </div>
        </section>

  < Footer />
    </>
  );
};

export default ServicesPage;

