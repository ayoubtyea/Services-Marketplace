import React from 'react';
import Navbar from '../components/Navbar';
import "../index.css";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="bg-[#fef5e8] min-h-screen font-poppins mt-6">
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Hero Section */}
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-extrabold text-black leading-tight">
                Home <span className='text-6xl leading-none font-light
                    font-bold'>Solutions with</span>
                <span className="bg-orange text-white px-4 py-2 ml-2 inline-block rounded-md shadow-lg transform -rotate-2 relative">
                  HandyHome
                  <span className="absolute -bottom-1 left-1/2 w-full h-1 bg-black -z-10 transform -translate-x-1/2"></span>
                </span>
              </h1>
              <p className="text-gray-600 mt-4 text-lg">
                Home Solutions with HandyHome offers a comprehensive range of expert
                services designed to streamline & elevate your home living experience.
              </p>
              <button className="mt-6 bg-black-100 text-white px-6 py-3 rounded-full flex items-center gap-2 text-lg shadow-lg hover:bg-gray-900 transition">
                Book a Service
                <span className="bg-white p-2 rounded-full text-black border border-black">
                  🔗
                </span>
              </button>
              <div className="flex flex-wrap gap-10 mt-8">
                <div className="text-center">
                  <p className="text-3xl font-bold text-black">1500<span className="text-orange-500">+</span></p>
                  <p className="text-gray-600">Total Customers</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-black">100<span className="text-orange-500">%</span></p>
                  <p className="text-gray-600">Client Satisfaction</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-black">200<span className="text-orange-500">+</span></p>
                  <p className="text-gray-600">Team Members</p>
                </div>
              </div>
            </div>
            <div className="relative flex flex-col md:flex-row gap-4 items-center md:items-start">
              <div className="relative w-full md:w-auto">
                <img
                  src="https://i.postimg.cc/m23HsvWK/picture1.jpg"
                  alt="Workers"
                  className="rounded-xl shadow-lg w-full md:w-80"
                />
                <div className="absolute -top-4 -right-4 bg-black text-white px-4 py-2 rounded-full shadow-lg text-sm md:text-base flex items-center gap-2">
                  <span className="bg-orange-500 p-1 rounded-full">⚙️</span>
                  Free Home Services in the next 7 days!
                </div>
              </div>
              <div className="w-full md:w-auto flex justify-center">
                <img
                  src="https://i.postimg.cc/K8J3KtzN/picture2.jpg"
                  alt="Client"
                  className="rounded-xl shadow-lg w-40 md:w-48"
                />
              </div>
            </div>
          </div>

          {/* Highlight Section */}
          <div className="mt-16 bg-orange-500 text-white p-6 rounded-lg flex flex-col md:flex-row items-center justify-between shadow-lg relative">
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold">12+ Years</h2>
              <p className="text-lg">We are growing with happy clients</p>
            </div>
            <div className="flex mt-4 md:mt-0 -space-x-2 relative">
              <img
                src="https://i.postimg.cc/8cf5vZdx/client1.png"
                className="w-12 h-12 rounded-full border-2 border-white"
                alt="Client"
              />
              <img
                src="https://i.postimg.cc/YqB7TtFb/client2.png"
                className="w-12 h-12 rounded-full border-2 border-white"
                alt="Client"
              />
            </div>
            <span className="absolute top-4 right-4 bg-white text-orange-500 px-2 py-1 rounded-full text-lg font-bold">➜</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
