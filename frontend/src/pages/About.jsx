import { motion } from "framer-motion";
import ReadyToJoin from "../components/ReadyToJoin";





import "../index.css";

export default function About() {
 

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
  const statsData = [
    { number: "5000+", label: "Total Customers" },
    { number: "98%", label: "Client Satisfaction" },
    { number: "50+", label: "Team Members" },
    { number: "15+", label: "Years of Experience" },
  ];
  
  return (
    <>
      <section
        className="relative py-32 bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://cdn.prod.website-files.com/663b34c56f05c8c9e12aafdc/664058919f21cfec93f3fe47_hero-bg.jpg")',
        }}
      >
        <div className="absolute inset-0 "></div>
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center">
            <motion.div
              className="inline-block border-x-4 border-[#076870] text-[#076870] rounded-md px-6 py-2 bg-gray-200 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl font-light">
                Contact Us
              </h2>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl font-bold text-black mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Your Trusted
              <span className="text-[#076870] font-light block md:inline">
                {" "}Home <br />  Solutions 
              </span> 
                  Partner
            </motion.h1>
          </div>
        </div>
      </section>

        <section className="About us  py-12 sm:py-16 lg:py-20 bg-white">
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
        </div>
      </div>
    </div>
        </section>        
    
        <section className="bg-gray-100 py-16">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-8">
                {/* Left Stats Section */}
                <div className="w-full lg:w-1/2 grid grid-cols-2 rounded-lg">
                    {/* Stats */}
                    <div className="text-center p-6 sm:p-8 border-b border-r border-gray-300 flex flex-col justify-center">
                    <h3 className="text-4xl sm:text-5xl font-bold text-black">
                        1500<span className="text-[#0f7780]">+</span>
                    </h3>
                    <p className="text-gray-600 mt-2 text-sm sm:text-base">Total Customer</p>
                    </div>
                    
                    <div className="text-center p-6 sm:p-8 border-b border-gray-300 flex flex-col justify-center">
                    <h3 className="text-4xl sm:text-5xl font-bold text-black">
                        100<span className="text-[#0f7780]">%</span>
                    </h3>
                    <p className="text-gray-600 mt-2 text-sm sm:text-base">Client Satisfaction</p>
                    </div>
                    
                    <div className="text-center p-6 sm:p-8 border-r border-gray-200 flex flex-col justify-center">
                    <h3 className="text-4xl sm:text-5xl font-bold text-black">
                        200<span className="text-[#0f7780]">+</span>
                    </h3>
                    <p className="text-gray-600 mt-2 text-sm sm:text-base">Team Members</p>
                    </div>
                    
                    <div className="text-center p-6 sm:p-8 flex flex-col justify-center">
                    <h3 className="text-4xl sm:text-5xl font-bold text-black">
                        12<span className="text-[#0f7780]">+</span>
                    </h3>
                    <p className="text-gray-600 mt-2 text-sm sm:text-base">Years of experience</p>
                    </div>
                </div>
                
                {/* Right Support Section with border-top background */}
                <div class="relative w-full max-w-sm mx-auto">
  <div class="absolute inset-0 translate-x-2 translate-y-2 bg-neutral-900 rounded-xl z-0"></div>

  <div class="relative z-10 rounded-xl overflow-hidden border border-gray-200 bg-white">
    <img
      src="https://cdn.prod.website-files.com/663b34c56f05c8c9e12aafdc/664199fbddd1ae4058c78c86_about-primary-image.jpg"
      alt="Cleaning professional using vacuum"
      class="w-full  aspect-square"
    />

    <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-[calc(100%-32px)]">
      <div class="bg-gradient-to-r from-indigo-200 to-sky-900 text-white rounded-lg py-3 px-5 flex justify-between items-center hover:bg-peach-200 transition-colors cursor-pointer shadow-md border border-peach-300">
        <span class="text-xl font-bold text-black"
      href="/contact"
      >24/7 Support</span>
        <a class="text-2xl  rounded-full px-4"
        href="/contact"
        >↗</a>
      </div>
    </div>
  </div>
</div>

                </div>
            </div>
        </section>
      

        <section class="bg-[#fff7f0] py-16 px-4 sm:px-6 lg:px-8">
  <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">

    <div class="bg-white rounded-2xl shadow-md p-8 flex flex-col justify-between">
      <div>
        <div class="mb-4">
          <span class="text-sm font-semibold text-[#0f7780] border border-[#0f7780] px-3 py-1 rounded-full">
            Our Mission
          </span>
        </div>
        <h2 class="text-3xl font-bold text-gray-900 mb-4 leading-snug">
          Empower <span class="text-[#0f7780]">homeowners</span> with efficient
        </h2>
        <p class="text-gray-700 mb-6">
          Our mission at HandyHome is simple: to empower homeowners with efficient, trustworthy solutions that enhance their living spaces and enrich their lives.
        </p>
        <ul class="space-y-3 text-gray-800">
          <li class="flex items-start">
            <span class="text-[#0f7780] mt-1 mr-2">✓</span> Trustworthy solutions for home needs.
          </li>
          <li class="flex items-start">
            <span class="text-[#0f7780] mt-1 mr-2">✓</span> Enhance living spaces.
          </li>
          <li class="flex items-start">
            <span class="text-[#0f7780] mt-1 mr-2">✓</span> Provide personalized attention.
          </li>
          <li class="flex items-start">
            <span class="text-[#0f7780] mt-1 mr-2">✓</span> Strive for excellence in craftsmanship.
          </li>
        </ul>
      </div>
      <img
        src="https://i.postimg.cc/j52629Qm/664c77d475c1880ac4d48b41-about-secondary-banner-1-p-500.jpg"
        alt="Our mission image"
        class="mt-8 rounded-xl w-full object-cover"
      />
    </div>

    <div class="bg-white rounded-2xl shadow-md p-8 flex flex-col justify-between">
      <img
        src="https://i.postimg.cc/XvQcV3F9/664c77d4b3061b50d5d98891-about-secondary-banner-2-p-500.jpg"
        alt="Our story image"
        class="rounded-xl w-full object-cover mb-6"
      />
      <div>
        <div class="mb-4">
          <span class="text-sm font-semibold text-[#0f7780] border border-[#0f7780] px-3 py-1 rounded-full">
            Our Story
          </span>
        </div>
        <h2 class="text-3xl font-bold text-gray-900 mb-4 leading-snug">
          Founded with a <span class="text-[#0f7780]">passion</span> for excellence
        </h2>
        <p class="text-gray-700 mb-6">
        HandyHome was born out of a desire to simplify the home service industry and provide homeowners with reliable, high-quality solutions tailored to their needs.
        </p>
        <ul class="space-y-3 text-gray-800">
          <li class="flex items-start">
            <span class="text-[#0f7780] mt-1 mr-2">✓</span> Transforming the home service industry.
          </li>
          <li class="flex items-start">
            <span class="text-[#0f7780] mt-1 mr-2">✓</span> Recognized the need for service provider.
          </li>
          <li class="flex items-start">
            <span class="text-[#0f7780] mt-1 mr-2">✓</span> Built a team of dedicated professionals.
          </li>
          <li class="flex items-start">
            <span class="text-[#0f7780] mt-1 mr-2">✓</span> Established Sapruin as a trusted partner.
          </li>
        </ul>
      </div>
    </div>

  </div>
</section>

<ReadyToJoin />
    </>
  );
}