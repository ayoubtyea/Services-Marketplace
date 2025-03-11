import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

import "../index.css";

export default function HeroSection() {
  return (
    <>
      <Navbar />
      <section
        className="hero-section py-16 mt-7 bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://cdn.prod.website-files.com/663b34c56f05c8c9e12aafdc/664058919f21cfec93f3fe47_hero-bg.jpg")',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* Left Side: Hero Content */}
            <motion.div
              className="text-center md:text-left"
              initial={{ opacity: 0, y: 70 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-6xl font-light text-gray-900">
                <span className="block font-extrabold">Home</span> Solutions with{" "}
                <span className="bg-[url('https://i.postimg.cc/4dPVjTJQ/modified-image-v3.png')] text-white inline-block font-extrabold px-4 py-1 rounded-lg rotate-[-2deg]">
                  HandyHome
                </span>
              </h1>
              <p className="text-gray-600 mt-4 text-lg">
                Home Solutions with HandyHome offers a comprehensive range of
                expert services designed to streamline & elevate your home living
                experience.
              </p>

              {/* CTA Button */}
              <motion.a
                href="/contact"
                className="mt-6 inline-flex items-center justify-center px-6 py-3 bg-[#076870] hover:bg-[#0f7780] text-white rounded-full shadow-lg text-lg font-medium transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Book a Service  <span className="rotate-[-50deg]"> →</span>
              </motion.a>

              {/* Stats Section */}
              <div className="flex flex-wrap gap-10 mt-8 justify-center md:justify-start">
                <div className="text-center">
                  <p className="text-3xl font-bold text-gray-900">
                    <motion.span
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      1500<span className="text-[#076870]">+</span>
                    </motion.span>
                  </p>
                  <p className="text-gray-600">Total Customers</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-gray-900">
                    <motion.span
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                      100<span className="text-[#076870]">%</span>
                    </motion.span>
                  </p>
                  <p className="text-gray-600">Client Satisfaction</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-gray-900">
                    <motion.span
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                    >
                      200<span className="text-[#076870]">+</span>
                    </motion.span>
                  </p>
                  <p className="text-gray-600">Team Members</p>
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
              <motion.div className="relative w-full md:w-auto">
                <div className="relative">
                  <motion.img
                    src="https://cdn.prod.website-files.com/663b34c56f05c8c9e12aafdc/664083dd413035af4451737f_hero-primary-image.jpg"
                    alt="Workers"
                    className="rounded-xl shadow-lg w-auto md:w-80 max-w-full"
                    whileHover={{ scale: 1.05 }}
                  />
                  <div className="bg-[#076870] md:-ml-[60px] p-[25px] rounded-lg text-white mt-4 w-auto">
                   
                    <span className="p-2 flex">
                       <a className="text-5xl font-bold">12+ Years</a>
                        </span>
                        <div className="flex ">
                        <div className="flex justify-around">
<div className="w-1/2">
<a className="max-w-[170px]">We are growing with happy clients</a>  
</div>                            <div className="flex">
                            <img src="https://i.postimg.cc/s2VFXCY6/66408e2a50f24b34f7114882-avatar-3.jpg" className="border-2 border-white rounded-full" />
                                <img src="https://cdn.prod.website-files.com/663b34c56f05c8c9e12aafdc/66408e2a0bd1803c9a5f812b_avatar-2.jpg" className="border-2 border-white rounded-full" />
                                <img src="https://cdn.prod.website-files.com/663b34c56f05c8c9e12aafdc/66408ed4725564404bc621c8_avatar-1.jpg" className="border-2 border-white rounded-full" />
                            </div>
                            
                            </div>
                    
                        </div>
                    
                  </div>
                </div>
              </motion.div>

              {/* Secondary Image */}
              <div className="static">
                {/* Text Div (Above the Image) */}
                <div className="md:absolute top-0 left-2/3 transform md:-translate-x-1/5 bg-[#076870] text-white text-center flex-row rounded-[41px] p-4 z-10 mb-2 md:mb-0">
                  <span className="p-2">
                    <img
                      src="https://i.postimg.cc/bwVQWzF1/icon.png"
                      className="w-12 h-9 px-2 rounded-full text-white bg-[#076870] inline-flex justify-center items-center"
                      alt="Icon"
                    />
                  </span>
                  <a className="max-w-[170px]">Free Home Services in the next 7 days!</a>
                </div>

                {/* Image Div */}
                <div className="max-w-full md:w-auto flex justify-center md:mt-40 mt-8">
                  <motion.img
                    src="https://cdn.prod.website-files.com/663b34c56f05c8c9e12aafdc/664083dca0f5e2e460f7281d_hero-secondary-image.jpg"
                    alt="Client"
                    className="rounded-xl shadow-lg w-full md:w-80 max-w-full"
                    whileHover={{ scale: 1.05 }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
   
   
      <section className="About us bg-white py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-light text-gray-900">
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

      <div className="about-wrapper bg-white py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex">
        {/* About Group Wrapper */}
        <div className="about-group-wrapper grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Left Side: Support CTA Block */}
          <div className="about-group-block">
            <div className="support-cta-block bg-gray-100 p-6 rounded-lg">
              <h3 className="support-cta-title text-xl sm:text-2xl font-bold text-gray-900">
                24/7 Support
              </h3>
              <div className="support-cta-summary-block mt-4">
                <p className="support-cta-summary text-gray-600">
                  We provide 24/7 service to our customers
                </p>
                <a
                  href="/contact"
                  className="our-link-block mt-4 inline-flex items-center text-[#076870] hover:text-[#0f7780] transition-colors"
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
        <div className="our-identity-main-wrapper mt-12">
          <div className="our-identity-wrapper grid grid-cols-1 md:grid-cols-1 gap-8">
            {/* Our Story */}
            <div className="our-identity-block p-6 rounded-lg flex">
              <div className="our-identity-icon w-12 h-12 mx-auto">
                <svg
                
                  width="52"
                  height="52"
                  viewBox="0 0 52 52"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="26" cy="26" r="25.5" stroke="currentColor" />
                  <circle cx="26" cy="26" r="22" fill="currentColor" />
                  <path
                    d="M26.8287 13.9222C26.4355 13.8832 26.0772 14.1993 26.0504 14.6023C26.0227 15.0053 26.3274 15.3538 26.7304 15.3806C32.2887 15.7576 36.6437 20.4222 36.6437 26C36.6437 31.8695 31.8695 36.6438 26 36.6438C22.9198 36.6438 19.9924 35.3105 17.9684 32.9859C17.7027 32.682 17.2404 32.6503 16.9366 32.9144C16.6319 33.1793 16.6002 33.6416 16.8651 33.9463C19.1677 36.5893 22.4965 38.1063 26 38.1063C32.6755 38.1063 38.1062 32.6747 38.1062 26C38.1062 19.6552 33.1524 14.3496 26.8287 13.9222Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div className="our-identity-content mt-4 text-center text-left ml-2">
                <h3 className="our-identity-title text-xl font-bold text-gray-900">
                  Our Story
                </h3>
                <p className="our-identity-summary text-gray-600 mt-2">
                  Sapruin was born out of a passion for excellence and a desire to
                  simplify the way people experience home services.
                </p>
              </div>
            </div>
            <div className="our-identity-block p-6 rounded-lg flex">
              <div className="our-identity-icon w-12 h-12 mx-auto">
                <svg
                
                  width="52"
                  height="52"
                  viewBox="0 0 52 52"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="26" cy="26" r="25.5" stroke="currentColor" />
                  <circle cx="26" cy="26" r="22" fill="currentColor" />
                  <path
                    d="M26.8287 13.9222C26.4355 13.8832 26.0772 14.1993 26.0504 14.6023C26.0227 15.0053 26.3274 15.3538 26.7304 15.3806C32.2887 15.7576 36.6437 20.4222 36.6437 26C36.6437 31.8695 31.8695 36.6438 26 36.6438C22.9198 36.6438 19.9924 35.3105 17.9684 32.9859C17.7027 32.682 17.2404 32.6503 16.9366 32.9144C16.6319 33.1793 16.6002 33.6416 16.8651 33.9463C19.1677 36.5893 22.4965 38.1063 26 38.1063C32.6755 38.1063 38.1062 32.6747 38.1062 26C38.1062 19.6552 33.1524 14.3496 26.8287 13.9222Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div className="our-identity-content mt-4 text-center text-left ml-2">
                <h3 className="our-identity-title text-xl font-bold text-gray-900">
                  Our Story
                </h3>
                <p className="our-identity-summary text-gray-600 mt-2">
                  Sapruin was born out of a passion for excellence and a desire to
                  simplify the way people experience home services.
                </p>
              </div>
            </div>
            <div className="our-identity-block p-6 rounded-lg flex">
              <div className="our-identity-icon w-12 h-12 mx-auto">
                <svg
                
                  width="52"
                  height="52"
                  viewBox="0 0 52 52"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="26" cy="26" r="25.5" stroke="currentColor" />
                  <circle cx="26" cy="26" r="22" fill="currentColor" />
                  <path
                    d="M26.8287 13.9222C26.4355 13.8832 26.0772 14.1993 26.0504 14.6023C26.0227 15.0053 26.3274 15.3538 26.7304 15.3806C32.2887 15.7576 36.6437 20.4222 36.6437 26C36.6437 31.8695 31.8695 36.6438 26 36.6438C22.9198 36.6438 19.9924 35.3105 17.9684 32.9859C17.7027 32.682 17.2404 32.6503 16.9366 32.9144C16.6319 33.1793 16.6002 33.6416 16.8651 33.9463C19.1677 36.5893 22.4965 38.1063 26 38.1063C32.6755 38.1063 38.1062 32.6747 38.1062 26C38.1062 19.6552 33.1524 14.3496 26.8287 13.9222Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div className="our-identity-content mt-4 text-center text-left ml-2">
                <h3 className="our-identity-title text-xl font-bold text-gray-900">
                  Our Story
                </h3>
                <p className="our-identity-summary text-gray-600 mt-2">
                  Sapruin was born out of a passion for excellence and a desire to
                  simplify the way people experience home services.
                </p>
              </div>
            </div>
          </div>

          {/* Button Wrapper */}
          <div className="button-wrapper mt-12 text-center">
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
    <div className="hidden md:block w-[80%] h-px bg-gray-500 mx-auto"></div>

    </>
  );
}
