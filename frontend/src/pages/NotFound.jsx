import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

const NotFound = () => {
  const navigate = useNavigate();

  // Floating tool icons (for animation)
  const floatingItems = [
    { icon: "🔧", delay: 0.2, size: "w-10 h-10" },
    { icon: "🛠️", delay: 0.4, size: "w-12 h-12" },
    { icon: "🔨", delay: 0.6, size: "w-9 h-9" },
    { icon: "🧰", delay: 0.8, size: "w-14 h-14" },
  ];

  // Optional: Redirect to /not-found after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 8000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Floating animated tools (background decor) */}
      {floatingItems.map((item, index) => (
        <motion.div
          key={index}
          initial={{ y: 0, x: Math.random() * 100 - 50, opacity: 0 }}
          animate={{
            y: [0, -50, 0],
            x: [Math.random() * 100 - 50, Math.random() * 100 - 50],
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            delay: item.delay,
            ease: "easeInOut",
          }}
          className={`absolute ${item.size} flex items-center justify-center text-2xl`}
          style={{
            left: `${Math.random() * 80 + 10}%`,
            top: `${Math.random() * 80 + 10}%`,
          }}
        >
          {item.icon}
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-md z-10"
      >
        <motion.div
          animate={{ rotate: [0, -5, 5, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="mb-8"
        >
          <div className="relative">
            <span className="text-8xl font-bold text-[#076870]">404</span>
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute -top-4 -right-6 text-4xl"
            >
              ❌
            </motion.div>
          </div>
        </motion.div>

        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-6">
          The page you're looking for doesn't exist at HandyHome. Maybe our 
          skilled taskers can help build it for you!
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(-1)}
            className="px-5 py-2.5 bg-white border border-[#076870] text-[#076870] rounded-lg font-medium hover:bg-gray-100 transition-all"
          >
            Go Back
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/")}
            className="px-5 py-2.5 bg-[#076870] text-white rounded-lg font-medium hover:bg-[#0a7c85] transition-all"
          >
            Return to Homepage
          </motion.button>
        </div>

        <p className="mt-8 text-sm text-gray-500">
          You'll be automatically redirected to the homepage in 8 seconds
        </p>
      </motion.div>
    </div>
  );
};

export default NotFound;