import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Testimonial from "../components/Testimonial";
import AuthPage from "../pages/AuthPage";
import Contact from "../components/Contact";
import { Link } from "react-router-dom"; 



import "../index.css";

export default function HeroSection() {
 

  const servicesData = [
    {
      id: '1',
      name: 'Electrical Problems',
      description: 'From simple repairs to complete rewiring projects, our electrical solutions are designed to keep your home safe.',
      image: 'https://cdn.prod.website-files.com/6641b18a77a92d76b329c2d5/6641b50e3a30a5d77c8578a8_electrical-problems.jpg',
    },
    {
      id: '2',
      name: 'Plumbing Solutions',
      description: 'Don’t let plumbing issues disrupt your daily routine. Our plumbing solutions cover everything from leaky faucets.',
      image: 'https://cdn.prod.website-files.com/6641b18a77a92d76b329c2d5/6641b4ed7288e84197d4a6b7_plumbing-solutions.jpg',
    },
    {
      id: '3',
      name: 'Carpentry Services',
      description: 'Whether you\'re looking to add custom built-ins, repair damaged furniture, or install new cabinetry, our carpentry solutions have you covered.',
      image: 'https://cdn.prod.website-files.com/6641b18a77a92d76b329c2d5/6641b4c384a3010ab6bf5e72_carpentry-services.jpg',
    },
    {
      id: '4',
      name: 'Painting Services',
      description: 'Interior and exterior painting services for your home.',
      image: 'https://via.placeholder.com/400x300',
    },
    {
      id: '5',
      name: 'Gardening Services',
      description: 'Garden design and maintenance for a beautiful landscape.',
      image: 'https://via.placeholder.com/400x300',
    },
    {
      id: '6',
      name: 'Home Renovations',
      description: 'Complete home remodeling, from kitchens to bathrooms.',
      image: 'https://via.placeholder.com/400x300',
    },
  ];

  
  return (
    <>

<section
        className="hero-section py-16 mt-7 bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://cdn.prod.website-files.com/663b34c56f05c8c9e12aafdc/664058919f21cfec93f3fe47_hero-bg.jpg")',
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left Side: Hero Content */}
            <motion.div
              className="text-center md:text-left"
              initial={{ opacity: 0, y: 70 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-gray-900">
                <span className="block font-extrabold">Home</span> Solutions with{" "}
                <span className="bg-[url('https://i.postimg.cc/4dPVjTJQ/modified-image-v3.png')] text-white inline-block font-extrabold px-4 py-1 rounded-lg rotate-[-5deg] border-l-black">
                    HandyHome
                 </span>
              </h1>
              <p className="text-gray-600 mt-4 text-base sm:text-lg">
                Home Solutions with HandyHome offers a comprehensive range of expert
                services designed to streamline & elevate your home living experience.
              </p>

              {/* CTA Button */}
              <motion.a
                href="/contact"
                className="mt-6 inline-flex items-center justify-center px-6 py-3 bg-[#076870] hover:bg-[#0f7780] text-white rounded-full shadow-lg text-base sm:text-lg font-medium transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Book a Service <span className="ml-2">→</span>
              </motion.a>

              {/* Stats Section */}
              <div className="flex flex-wrap gap-6 sm:gap-10 mt-8 justify-center md:justify-start">
                <div className="text-center">
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                    <motion.span
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      1500<span className="text-[#076870]">+</span>
                    </motion.span>
                  </p>
                  <p className="text-gray-600 text-sm sm:text-base">Total Customers</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                    <motion.span
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                      100<span className="text-[#076870]">%</span>
                    </motion.span>
                  </p>
                  <p className="text-gray-600 text-sm sm:text-base">Client Satisfaction</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                    <motion.span
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                    >
                      200<span className="text-[#076870]">+</span>
                    </motion.span>
                  </p>
                  <p className="text-gray-600 text-sm sm:text-base">Team Members</p>
                </div>
              </div>
            </motion.div>

            {/* Right Side: Image Block */}
            <motion.div
              className="relative flex flex-col md:flex-row gap-4 items-center md:items-start"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {/* Main Image */}
              <motion.div className="relative w-full md:w-64 lg:w-80">
                <div className="relative">
                  <motion.img
                    src="https://cdn.prod.website-files.com/663b34c56f05c8c9e12aafdc/664083dd413035af4451737f_hero-primary-image.jpg"
                    alt="Workers"
                    className="rounded-xl shadow-lg w-full md:w-64 lg:w-80 max-w-full"
                    whileHover={{ scale: 1.05 }}
                  />
                  <div className="bg-[#076870] md:-ml-10 p-4 sm:p-6 rounded-lg text-white mt-4 w-full md:w-auto">
                    <span className="p-2 flex">
                      <a className="text-2xl sm:text-3xl md:text-4xl font-medium">12+ Years</a>
                    </span>
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-1 items-center">
                      <div className="w-full sm:w-1/2">
                        <a className="text-sm sm:text-base">We are growing with happy clients</a>
                      </div>
                      <div className="flex gap-1">
                        <img
                          src="https://i.postimg.cc/s2VFXCY6/66408e2a50f24b34f7114882-avatar-3.jpg"
                          className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-white rounded-full"
                          alt="Avatar"
                        />
                        <img
                          src="https://cdn.prod.website-files.com/663b34c56f05c8c9e12aafdc/66408e2a0bd1803c9a5f812b_avatar-2.jpg"
                          className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-white rounded-full"
                          alt="Avatar"
                        />
                        <img
                          src="https://cdn.prod.website-files.com/663b34c56f05c8c9e12aafdc/66408ed4725564404bc621c8_avatar-1.jpg"
                          className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-white rounded-full"
                          alt="Avatar"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Secondary Image */}
              <div className="static">
                {/* Text Div (Above the Image) */}
                <div className="md:absolute top-0 left-2/3 transform md:-translate-x-1/5 bg-black text-white text-center flex items-center rounded-full p-4 z-10 mb-2 md:mb-0">
                  <span className="py-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8 bg-[#076870] rounded-full p-1" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                  </span>
                  <a className="text-xs sm:text-sm ml-2">Free Home Services in the next 7 days!</a>
                </div>

                {/* Image Div */}
                <div className="max-w-full md:w-auto flex justify-center md:mt-32 mt-8">
                  <motion.img
                    src="https://cdn.prod.website-files.com/663b34c56f05c8c9e12aafdc/664083dca0f5e2e460f7281d_hero-secondary-image.jpg"
                    alt="Client"
                    className="rounded-xl shadow-lg w-full md:w-64 lg:w-80 max-w-full"
                    whileHover={{ scale: 1.05 }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


   
   
        <section className="About us bg-white py-12 sm:py-16 lg:py-20">
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
              <h2     className="inline-block border-x-4 border-[#076870] text-[#076870] rounded-md px-6 py-2 cursor-pointer"
              >
                About Us
              </h2>
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
              <p className="text-lg font-light sm:text-xl lg:text-xl text-gray-600">
                At HandyHome, we understand the importance of home—a sanctuary
                where comfort, functionality, and peace of mind converge.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="hidden md:block h-1 w-[85%] mt-8 bg-gray-200 mx-auto"></div>

      <div>
      <div className="gap-10 items-center py-8 px-4 mx-auto max-w-6xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
        {/* About Group Wrapper */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Side: Support CTA Block */}
          <div className="about-group-block">
            {/* Support CTA Block */}
            <div className="support-cta-block bg-gradient-to-r from-indigo-400 to-sky-200 p-6 rounded-lg">
                <h3 className="support-cta-title text-xl sm:text-2xl font-bold text-gray-900">
                24/7 Support
                </h3>
                <div className="support-cta-summary-block mt-4">
                <p className="support-cta-summary text-gray-600">
                    We provide 24/7 service to our customers
                </p>
                <a
                    href="/contact"
                    className="our-link-block mt-4 inline-flex items-center text-blue-100 hover:text-[#0f7780] transition-colors"
                >
                    <div className="our-link-icon w-6 h-6">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="100%"
                        height="100%"
                        viewBox="0 0 20 21"
                        fill="currentColor"
                    >
                        <path d="M18.8125 17.0105C18.6675 17.0106 18.524 16.9821 18.39 16.9266C18.2561 16.8712 18.1344 16.7899 18.0318 16.6874C17.9293 16.5849 17.848 16.4632 17.7926 16.3292C17.7372 16.1953 17.7087 16.0517 17.7087 15.9067L17.7097 4.52895L2.43175 19.8069C2.22487 20.0138 1.94429 20.13 1.65172 20.13C1.35915 20.13 1.07856 20.0138 0.871681 19.8069C0.664803 19.6 0.548579 19.3195 0.548579 19.0269C0.548579 18.7343 0.664803 18.4537 0.871681 18.2469L16.1497 2.96888L4.77186 2.96986C4.47913 2.96986 4.19838 2.85357 3.99139 2.64658C3.7844 2.43958 3.66811 2.15884 3.66811 1.86611C3.66811 1.57337 3.7844 1.29263 3.99139 1.08564C4.19838 0.878644 4.47913 0.762356 4.77186 0.762356L18.8125 0.762356C18.9575 0.762275 19.101 0.79077 19.235 0.84621C19.3689 0.90165 19.4906 0.982949 19.5931 1.08546C19.6957 1.18797 19.777 1.30967 19.8324 1.44362C19.8878 1.57757 19.9163 1.72114 19.9162 1.86611L19.9163 15.9067C19.9163 16.0517 19.8878 16.1953 19.8324 16.3292C19.777 16.4632 19.6957 16.5849 19.5931 16.6874C19.4906 16.7899 19.3689 16.8712 19.235 16.9266C19.101 16.9821 18.9575 17.0106 18.8125 17.0105Z" />
                    </svg>
                    </div>
                </a>
                </div>
            </div>

            {/* Global Image Block */}
            <div className="global-image-block mt-8 rounded-lg overflow-hidden">
                <img
                loading="lazy"
                src="https://cdn.prod.website-files.com/663b34c56f05c8c9e12aafdc/664199fa4a738966cc628aec_about-secondary-image.jpg"
                alt="Global Image"
                className="global-image w-full h-auto"
                />
                <div className="global-image-overlay bg-black bg-opacity-30"></div>
            </div>
        </div>

          {/* Right Side: About Image Block */}
          <div className="about-image-block">
            <div className="global-image-block rounded-lg overflow-hidden">
              <img
                loading="lazy"
                src="https://cdn.prod.website-files.com/663b34c56f05c8c9e12aafdc/664199fbddd1ae4058c78c86_about-primary-image.jpg"
                alt="Global Image"
                className="global-image w-full h-auto"
              />
              <div className="global-image-overlay bg-black bg-opacity-30"></div>
            </div>
          </div>
        </div>

        {/* Our Identity Wrapper */}
        <div className="">
          <div className="grid grid-cols-1 md:grid-cols-1">
            {/* Our Story */}
            <div className="p-6 rounded-lg flex">
              <div className="w-12 h-12 mx-auto">
              <div class="our-identity-icon w-embed">
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="26" cy="26" r="25.5" stroke="#076870"/>
        <circle cx="26" cy="26" r="22" fill="#076870"/>
        <g clip-path="url(#clip0_68_683)">
            <path d="M26.8287 13.9222C26.4355 13.8832 26.0772 14.1993 26.0504 14.6023C26.0227 15.0053 26.3274 15.3538 26.7304 15.3806C32.2887 15.7576 36.6437 20.4222 36.6437 26C36.6437 31.8695 31.8695 36.6438 26 36.6438C22.9198 36.6438 19.9924 35.3105 17.9684 32.9859C17.7027 32.682 17.2404 32.6503 16.9366 32.9144C16.6319 33.1793 16.6002 33.6416 16.8651 33.9463C19.1677 36.5893 22.4965 38.1063 26 38.1063C32.6755 38.1063 38.1062 32.6747 38.1062 26C38.1062 19.6552 33.1524 14.3496 26.8287 13.9222Z" fill="white"/>
            <path d="M19.8494 17.1601C19.9875 17.1601 20.1256 17.1186 20.2475 17.0455C20.2475 17.0374 20.2556 17.0374 20.2556 17.0374C21.1087 16.4849 22.035 16.0624 23.0019 15.7861C23.3846 15.6724 23.6112 15.2588 23.4975 14.8761C23.3837 14.5032 22.9694 14.2676 22.5875 14.3813C21.4825 14.7055 20.4262 15.1849 19.4512 15.8113C19.2473 15.9494 19.1181 16.1769 19.1181 16.4288C19.1181 16.5751 19.1587 16.7051 19.2319 16.8269C19.37 17.0382 19.5975 17.1601 19.8494 17.1601Z" fill="white"/>
            <path d="M15.3554 26C15.3554 25.5938 15.0312 25.2688 14.625 25.2688C14.2187 25.2688 13.8937 25.5938 13.8937 26C13.8937 27.1457 14.0562 28.275 14.365 29.3557C14.3731 29.3719 14.3731 29.3963 14.3821 29.4125V29.4207C14.4787 29.7213 14.7639 29.9325 15.08 29.9325C15.1531 29.9325 15.2181 29.9244 15.2831 29.9082C15.6008 29.8107 15.8194 29.5263 15.8112 29.2013C15.8112 29.1282 15.8031 29.0632 15.7869 28.9982C15.5025 28.0232 15.3554 27.0157 15.3554 26Z" fill="white"/>
            <path d="M17.3306 18.5982C17.0129 18.3626 16.5417 18.4276 16.3061 18.7436C15.6162 19.6707 15.0556 20.6863 14.6575 21.7669C14.625 21.8482 14.6079 21.9294 14.6079 22.0188C14.6079 22.3194 14.7948 22.6038 15.0792 22.7103C15.1612 22.733 15.2506 22.7501 15.34 22.7501C15.6406 22.7501 15.9169 22.5632 16.0225 22.2788C16.38 21.3282 16.8675 20.4336 17.4769 19.6211C17.7206 19.2969 17.6548 18.8411 17.3306 18.5982Z" fill="white"/>
            <path d="M22.6484 25.2688C22.2446 25.2688 21.9172 25.5962 21.9172 26C21.9172 26.4039 22.2446 26.7313 22.6484 26.7313H25.2687V29.3516C25.2687 29.7554 25.5962 30.0829 26 30.0829C26.4038 30.0829 26.7312 29.7554 26.7312 29.3516V26.7313H29.3516C29.7554 26.7313 30.0828 26.4039 30.0828 26C30.0828 25.5962 29.7554 25.2688 29.3516 25.2688H26.7312V22.6485C26.7312 22.2447 26.4038 21.9172 26 21.9172C25.5962 21.9172 25.2687 22.2447 25.2687 22.6485V25.2688H22.6484Z" fill="white"/>
        </g>
        <defs>
            <clipPath id="clip0_68_683">
                <rect width="26" height="26" fill="white" transform="translate(13 13)"/>
            </clipPath>
        </defs>
    </svg>
</div>

              </div>
              <div className="text-left ml-2">
                <h3 className=" text-xl font-bold text-gray-900">
                  Our Story
                </h3>
                <p className="our-identity-summary text-gray-600 mt-2">
                  HandyHome was born out of a passion for excellence and a desire to
                  simplify the way people experience home services.
                </p>
              </div>
            </div>
            <div className="p-6 rounded-lg flex">
              <div className="our-identity-icon w-12 h-12 mx-auto">
              <svg
                width="52"
                height="52"
                viewBox="0 0 52 52"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                >
                {/* Outer Circle with Stroke */}
                <circle cx="26" cy="26" r="25.5" stroke="#076870" />

                {/* Inner Circle with Background Color */}
                <circle cx="26" cy="26" r="22" fill="#076870" />

                {/* Plus Sign and Other Paths */}
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M26 14C25.6846 14 25.4286 14.256 25.4286 14.5714V18C25.4286 18.3154 25.6846 18.5714 26 18.5714C26.3154 18.5714 26.5714 18.3154 26.5714 18V14.5714C26.5714 14.256 26.3154 14 26 14ZM24.3 15.8663C24.2623 15.8651 24.224 15.868 24.1851 15.8749C19.9617 16.628 16.6269 19.9617 15.8737 24.1851C15.8183 24.4954 16.0257 24.7926 16.336 24.848C16.6463 24.904 16.944 24.6971 16.9989 24.3863C17.6686 20.6326 20.6326 17.6686 24.3863 16.9989C24.6971 16.944 24.904 16.6463 24.848 16.336C24.7994 16.0646 24.5657 15.8726 24.3 15.8663ZM27.6989 15.8663C27.4331 15.8726 27.2006 16.0646 27.152 16.336C27.096 16.6463 27.3029 16.944 27.6137 16.9989C31.3674 17.6686 34.3314 20.6326 35.0011 24.3863C35.056 24.6971 35.3526 24.904 35.6629 24.848C35.9731 24.7926 36.1806 24.4954 36.1251 24.1851C35.372 19.9617 32.0383 16.628 27.8149 15.8749C27.776 15.868 27.7366 15.8651 27.6989 15.8663ZM26 19.7143C22.5309 19.7143 19.7143 22.5309 19.7143 26C19.7143 29.4691 22.5309 32.2857 26 32.2857C29.4691 32.2857 32.2857 29.4691 32.2857 26C32.2857 22.5309 29.4691 19.7143 26 19.7143ZM26 20.8571C28.8383 20.8571 31.1429 23.1617 31.1429 26C31.1429 28.8383 28.8383 31.1429 26 31.1429C23.1617 31.1429 20.8571 28.8383 20.8571 26C20.8571 23.1617 23.1617 20.8571 26 20.8571ZM24.384 23.9109C24.2377 23.9109 24.0914 23.9669 23.98 24.0783C23.7571 24.3011 23.7571 24.6629 23.98 24.8863L25.192 26.0983L23.98 27.3103C23.7571 27.5331 23.7571 27.8954 23.98 28.1183C24.2029 28.3411 24.5651 28.3411 24.788 28.1183L26 26.9063L27.212 28.1183C27.4349 28.3411 27.7971 28.3411 28.02 28.1183C28.2429 27.8954 28.2429 27.5331 28.02 27.3103L26.808 26.0983L28.02 24.8863C28.2429 24.6629 28.2429 24.3011 28.02 24.0783C27.7971 23.8549 27.4349 23.8549 27.212 24.0783L26 25.2903L24.788 24.0783C24.6766 23.9669 24.5303 23.9109 24.384 23.9109ZM14.5714 25.4286C14.256 25.4286 14 25.6846 14 26C14 26.3154 14.256 26.5714 14.5714 26.5714H18C18.3154 26.5714 18.5714 26.3154 18.5714 26C18.5714 25.6846 18.3154 25.4286 18 25.4286H14.5714ZM34 25.4286C33.6846 25.4286 33.4286 25.6846 33.4286 26C33.4286 26.3154 33.6846 26.5714 34 26.5714H37.4286C37.744 26.5714 38 26.3154 38 26C38 25.6846 37.744 25.4286 37.4286 25.4286H34ZM16.452 27.1429C16.4143 27.1417 16.3749 27.1446 16.336 27.152C16.0257 27.2074 15.8183 27.5046 15.8737 27.8149C16.6269 32.0383 19.9617 35.372 24.1851 36.1251C24.4954 36.1806 24.7926 35.9743 24.848 35.664C24.904 35.3537 24.6971 35.056 24.3863 35.0011C20.6326 34.3314 17.6686 31.3674 16.9989 27.6137C16.9509 27.3417 16.7177 27.1497 16.452 27.1429ZM35.548 27.1429C35.2823 27.1497 35.0491 27.3417 35.0011 27.6137C34.3314 31.3674 31.3674 34.3314 27.6137 35.0011C27.3029 35.056 27.096 35.3537 27.152 35.664C27.2074 35.9743 27.5046 36.1806 27.8149 36.1251C32.0383 35.372 35.372 32.0383 36.1251 27.8149C36.1806 27.5046 35.9731 27.2074 35.6629 27.152C35.624 27.1446 35.5857 27.1417 35.548 27.1429ZM26 33.4286C25.6846 33.4286 25.4286 33.6846 25.4286 34V37.4286C25.4286 37.744 25.6846 38 26 38C26.3154 38 26.5714 37.744 26.5714 37.4286V34C26.5714 33.6846 26.3154 33.4286 26 33.4286Z"
                    fill="white"
                />
                </svg>
              </div>
              <div className=" text-left ml-2">
                <h3 className="text-xl font-bold text-gray-900">
                  Our Mission
                </h3>
                <p className="our-identity-summary text-gray-600 mt-2">
                Our mission at HandyHome is simple: to empower homeowners with efficient, trustworthy solutions that enhance.


                </p>
              </div>
            </div>
            <div className="p-6 rounded-lg flex">
            <div className="w-12 h-12 mx-auto">
                <svg
                width="52"
                height="52"
                viewBox="0 0 52 52"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                >
                <circle cx="26" cy="26" r="25.5" stroke="#076870" />
                <circle cx="26" cy="26" r="22" fill="#076870" />
                <path
                    d="M26.8287 13.9222C26.4355 13.8832 26.0772 14.1993 26.0504 14.6023C26.0227 15.0053 26.3274 15.3538 26.7304 15.3806C32.2887 15.7576 36.6437 20.4222 36.6437 26C36.6437 31.8695 31.8695 36.6438 26 36.6438C22.9198 36.6438 19.9924 35.3105 17.9684 32.9859C17.7027 32.682 17.2404 32.6503 16.9366 32.9144C16.6319 33.1793 16.6002 33.6416 16.8651 33.9463C19.1677 36.5893 22.4965 38.1063 26 38.1063C32.6755 38.1063 38.1062 32.6747 38.1062 26C38.1062 19.6552 33.1524 14.3496 26.8287 13.9222Z"
                    fill="white"
                />
                </svg>
            </div>
              <div className="text-left ml-2">
                <h3 className=" text-xl font-bold text-gray-900">
                What Sets Us Apart
                </h3>
                <p className="our-identity-summary text-gray-600 mt-2">
                At HandyHome, we stand out for our unwavering commitment to excellence in every aspect of what we do.


                </p>
              </div>
            </div>
          </div>

          {/* Button Wrapper */}         
           <div className="text-center md:text-left">
            <a
              href="/about"
              className="button-default outline inline-flex items-center px-6 py-3 border border-[#076870] text-[#076870] rounded-full hover:bg-[#076870] hover:text-white transition-colors"
            >
              <div className="button-text">More About Us</div>
              <div className="button-icon-block ml-2">
                <div className="button-icon w-6 h-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    viewBox="0 0 12 12"
                    fill="currentColor"
                  >
                    <path d="M6.80182 8.45459C6.67915 8.46603 6.55599 8.43835 6.45 8.37549C6.37256 8.29599 6.33544 8.18563 6.3491 8.07549C6.35196 7.98381 6.36291 7.89254 6.38182 7.80277C6.40013 7.69979 6.42377 7.59784 6.45272 7.49731L6.77454 6.39003C6.80773 6.28074 6.82966 6.16834 6.84 6.05457C6.84 5.93185 6.85636 5.84729 6.85636 5.79821C6.8632 5.57947 6.76981 5.36956 6.60272 5.22821C6.3972 5.07043 6.14126 4.99288 5.88272 5.01003C5.69745 5.01282 5.5136 5.04315 5.33726 5.10003C5.14453 5.16003 4.9418 5.23184 4.72908 5.31549L4.63636 5.67549C4.69908 5.65367 4.77546 5.62913 4.86272 5.60185C4.94597 5.5772 5.03227 5.56433 5.11908 5.56367C5.24086 5.55048 5.36344 5.58038 5.46544 5.64821C5.53472 5.73088 5.56723 5.83827 5.55544 5.94549C5.55513 6.0372 5.54508 6.12863 5.52544 6.21821C5.50634 6.31367 5.4818 6.41457 5.4518 6.52093L5.12726 7.63365C5.1011 7.73708 5.08017 7.84175 5.06454 7.94729C5.05179 8.03764 5.04542 8.12877 5.04544 8.22001C5.0441 8.44025 5.14481 8.6487 5.31816 8.78455C5.52684 8.94479 5.78644 9.02422 6.04906 9.00819C6.23398 9.01198 6.41827 8.98527 6.59452 8.92909C6.74906 8.87635 6.95543 8.80091 7.21362 8.70273L7.3009 8.35909C7.23096 8.3881 7.15894 8.4118 7.08544 8.42999C6.99249 8.45122 6.89705 8.45947 6.80182 8.45459Z" />
                    <path d="M7.14271 3.20455C6.99428 3.06823 6.79872 2.9949 6.59725 3.00001C6.3959 2.99546 6.20052 3.06872 6.05179 3.20455C5.77917 3.43962 5.74872 3.85121 5.98382 4.12386C6.00477 4.14816 6.02749 4.17087 6.05179 4.19183C6.36238 4.46963 6.83212 4.46963 7.14269 4.19183C7.41531 3.95443 7.44388 3.54099 7.20649 3.26837C7.18675 3.24565 7.16542 3.22433 7.14271 3.20455Z" />
                    <path d="M6 0C2.68629 0 0 2.68629 0 6C0 9.31371 2.68629 12 6 12C9.31371 12 12 9.31371 12 6C12 2.68629 9.31371 0 6 0ZM6 11.4545C2.98753 11.4545 0.545461 9.01247 0.545461 6C0.545461 2.98753 2.98753 0.545461 6 0.545461C9.01247 0.545461 11.4545 2.98753 11.4545 6C11.4545 9.01247 9.01247 11.4545 6 11.4545Z" />
                  </svg>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
        </section>

        <section
      className="Services py-16 bg-cover bg-center"
      style={{
        backgroundImage:
          'url("https://cdn.prod.website-files.com/663b34c56f05c8c9e12aafdc/664058919f21cfec93f3fe47_hero-bg.jpg")',
      }}
    >
      <div className="max-w-6xl lg:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center">
          <motion.div
            className="inline-block border-x-4 border-[#076870] text-[#076870] rounded-md px-6 py-2 cursor-pointer"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h2
              className="text-xl font-light sm:text-xl md:text-xl"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Our Services
            </motion.h2>
          </motion.div>

          <motion.p
            className="text-2xl font-bold mt-4 text-gray-900 sm:text-3xl md:text-4xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Get Comprehensive{' '}
            <span className="text-[#076870] font-light">
              Home <br /> Solutions
            </span>{' '}
            Services
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {servicesData.slice(0, 3).map((service) => (
           <motion.div
           key={service.id}
           className="bg-white border border-gray-200 rounded-lg shadow-lg transform transition duration-300 group" 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           whileHover={{ backgroundColor: "#000000", scale: 1.05 }} 
           whileTap={{ backgroundColor: "#000000", scale: 0.95 }} 
           transition={{ duration: 0.2, ease: "easeInOut" }} 
         >
           <Link to={`/service-details/${service.id}`}>
             <img
               className="rounded-t-lg w-full h-56 object-cover"
               src={service.image}
               alt={service.name}
             />
           </Link>
           <div className="p-5 text-center">
             <Link to={`/service-details/${service.id}`}>
               <motion.h5
                 className="mb-2 text-2xl font-bold text-gray-900 group-hover:text-white group-focus:text-white"
                 transition={{ duration: 0.2, ease: "easeInOut" }} // Smooth text color transition
               >
                 {service.name}
               </motion.h5>
             </Link>
             <motion.p
               className="mb-3 text-gray-700 group-hover:text-white group-focus:text-white"
               transition={{ duration: 0.2, ease: "easeInOut" }} // Smooth text color transition
             >
               {service.description}
             </motion.p>
             <div className="mt-4 text-center">
               <Link
                 to={`/service-details/${service.id}`}
                 className="inline-flex items-center px-6 py-3 border border-[#076870] text-[#076870] rounded-full hover:bg-[#076870] hover:text-white transition-colors duration-200 ease-in-out" // Smooth button transition
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
               </Link>
             </div>
           </div>
         </motion.div>
          ))}
        </div>

        {/* View All Services Button */}
        <div className="flex items-center justify-center mt-12">
          <motion.div
            className="button-wrapper justify-center gap-top group"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/services"
              className="button-default outline w-inline-block relative flex items-center justify-center px-8 py-3 border-2 border-[#076870] text-[#076870] rounded-full transition-all duration-300 hover:bg-[#076870] hover:text-white"
            >
              <div className="button-bg absolute top-0 left-0 h-full w-0 bg-[#076870] transition-all duration-300 ease-out"></div>
              <div className="button-text z-10">View All Services</div>
              <div className="button-icon-block with-secondary-bg z-10 ml-2">
                <div className="button-icon w-6 h-6 text-black group-hover:text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    viewBox="0 0 12 12"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_68_669)">
                      <path
                        d="M8.46653 6.47802L7.7402 5.75169L9.65975 3.83215L9.90835 4.08072C10.0693 4.24169 10.3402 4.20998 10.4584 4.01301L11.9499 1.52717C12.0329 1.38884 12.0111 1.21177 11.897 1.09773L10.9027 0.103395C10.7886 -0.010675 10.6115 -0.0324484 10.4732 0.05052L7.98737 1.54203C7.7912 1.65973 7.75823 1.93062 7.91966 2.09206L8.16826 2.34064L6.24869 4.26018L5.52237 3.53386C5.77802 2.5786 5.51726 1.53994 4.79414 0.816806C3.88962 -0.0876903 2.53557 -0.230846 1.47665 0.33955C1.37882 0.392261 1.31167 0.488096 1.29552 0.598041C1.2794 0.707986 1.3162 0.81908 1.39478 0.897665L2.71412 2.217C2.85121 2.35409 2.85121 2.57712 2.71412 2.71416C2.57703 2.85124 2.35403 2.85127 2.21694 2.71416L0.897604 1.3948C0.819018 1.31621 0.707902 1.27939 0.59798 1.29554C0.488035 1.31166 0.3922 1.37884 0.339489 1.47666C-0.228751 2.53163 -0.0907983 3.88657 0.816792 4.79413C1.53831 5.51566 2.57643 5.77862 3.53384 5.52238L3.76292 5.75144L0.515645 8.99878C-0.171681 9.68611 -0.172103 10.797 0.515645 11.4847C1.20102 12.1701 2.3162 12.1701 3.0016 11.4847L6.24886 8.23739L6.47798 8.46652C6.22232 9.42178 6.48309 10.4604 7.2062 11.1836C8.11072 12.0881 9.46477 12.2312 10.5237 11.6608C10.6215 11.6081 10.6887 11.5123 10.7048 11.4024C10.7209 11.2924 10.6842 11.1813 10.6056 11.1027L9.28623 9.7834C9.14914 9.64631 9.14914 9.42328 9.28623 9.28624C9.42331 9.14916 9.64634 9.14918 9.7834 9.28624L11.1027 10.6056C11.1813 10.6842 11.2924 10.7209 11.4024 10.7048C11.5123 10.6887 11.6081 10.6215 11.6609 10.5237C12.2291 9.46875 12.0912 8.11381 11.1836 7.20624C10.4621 6.48475 9.42394 6.22178 8.46653 6.47802ZM10.5996 0.794658L11.2057 1.4008L10.0871 3.26515L8.73521 1.91328L10.5996 0.794658ZM8.66542 2.83781L9.16257 3.33497L7.24302 5.25452L6.74585 4.75736L8.66542 2.83781ZM2.50443 10.9876C2.09319 11.3988 1.42406 11.3988 1.0128 10.9876C0.600183 10.575 0.599926 9.90886 1.0128 9.49598L4.26005 6.24864L5.75168 7.74026L2.50443 10.9876ZM11.2249 9.7334L10.2806 8.78909C9.8694 8.37793 9.20031 8.3779 8.78907 8.78909C8.37789 9.20027 8.37789 9.86936 8.78907 10.2806L9.73339 11.2249C9.01592 11.4208 8.24476 11.2278 7.7034 10.6864C7.13043 10.1135 6.93588 9.24968 7.20777 8.48583C7.25329 8.35796 7.22113 8.21532 7.12516 8.11936L3.88102 4.87523C3.78526 4.77946 3.64271 4.747 3.51455 4.79261C2.75068 5.06451 1.88692 4.86993 1.31395 4.29698C0.772589 3.75562 0.579582 2.98449 0.775472 2.26702L1.71979 3.21134C2.13097 3.62252 2.80007 3.6225 3.2113 3.21134C3.62248 2.80015 3.62248 2.13106 3.2113 1.71983L2.26698 0.775509C2.98442 0.579573 3.75561 0.772627 4.29697 1.31398C4.86994 1.88696 5.06449 2.75074 4.7926 3.51459C4.74708 3.64247 4.77924 3.78511 4.87521 3.88106L8.11932 7.12517C8.2153 7.22115 8.35794 7.25328 8.48579 7.20779C9.24962 6.93589 10.1134 7.13047 10.6864 7.70342C11.2278 8.24482 11.4208 9.01594 11.2249 9.7334Z"
                        fill="currentColor"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_68_669">
                        <rect width="12" height="12" fill="currentColor"></rect>
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
    
  
      < Testimonial />
      < Contact />
        
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


    </>
  );
}
