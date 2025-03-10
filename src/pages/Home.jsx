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
                Book a Service →
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
                    className="rounded-xl shadow-lg w-full md:w-80 max-w-full"
                    whileHover={{ scale: 1.05 }}
                  />
                  <div className="bg-gray-300 -ml-[130px] p-[25px] rounded-lg text-white mt-4">
                    <span className="p-2 flex">
                       <a className="text-5xl font-bold">12 + Years</a>
                        </span>
                        <div className="flex">
                             <a className="max-w-[170px]">We are growing with happy clients</a>  
                    <img src="https://i.postimg.cc/s2VFXCY6/66408e2a50f24b34f7114882-avatar-3.jpg" className="border-2 border-white rounded-full" />
                    <img src="https://i.postimg.cc/s2VFXCY6/66408e2a50f24b34f7114882-avatar-3.jpg" className="border-2 border-white rounded-full" />
                    <img src="https://i.postimg.cc/s2VFXCY6/66408e2a50f24b34f7114882-avatar-3.jpg" className="border-2 border-white rounded-full" />
                        </div>
                    
                  </div>
                </div>
              </motion.div>

              {/* Secondary Image */}
              <div className="relative">
                {/* Text Div (Above the Image) */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-[#076870] text-white text-center flex-row rounded-[41px] p-4 z-10">
                  <span className="p-2">
                    <img
                      src="https://i.postimg.cc/bwVQWzF1/icon.png"
                      className="w-12 h-9 px-2 rounded-full text-white bg-[#076870] flex justify-center items-center"
                      alt="Icon"
                    />
                  </span>
                  <a className="max-w-[170px]">Free Home Services in the next 7 days!</a>
                </div>

                {/* Image Div */}
                <div className="w-full md:w-auto flex justify-center mt-20">
                  <motion.img
                    src="https://cdn.prod.website-files.com/663b34c56f05c8c9e12aafdc/664083dca0f5e2e460f7281d_hero-secondary-image.jpg"
                    alt="Client"
                    className="rounded-xl shadow-lg w-40 md:w-48"
                    whileHover={{ scale: 1.05 }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
