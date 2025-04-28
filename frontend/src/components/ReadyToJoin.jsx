import React from 'react'
import { motion } from 'framer-motion'

const ReadyToJoin = () => {
  return (
    <div>
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
  <button 
  className="px-6 py-3 bg-[#076870] text-white rounded-full font-semibold hover:bg-[#065f57] transition duration-300 flex items-center space-x-2"
  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}

  >
    <span>Join Us As a Tasker</span>
    <span className="transform rotate-[-50deg]">→</span>
  </button>
</div>


      </div>
        </section>
    </div>
  )
}

export default ReadyToJoin
