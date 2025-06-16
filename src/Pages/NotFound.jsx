import { Link } from 'react-router';
import { motion } from 'framer-motion';

const NotFound = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-stone-900 text-white"
    >
      <motion.div
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
        className="text-center max-w-2xl px-6 py-12 rounded-3xl bg-stone-800/50 backdrop-blur-md border border-stone-700/50 shadow-2xl"
      >
        <motion.div
          animate={{ 
            rotate: [0, -5, 5, -5, 5, 0],
            scale: [1, 1.1, 1.1, 1.1, 1, 1]
          }}
          transition={{ duration: 1.5 }}
          className="text-9xl mb-6 font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500"
        >
          404
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Lost in the Archives
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-lg text-stone-300 mb-8 max-w-md mx-auto"
        >
          The artifact you're seeking has either been moved or never existed in our collection.
        </motion.p>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link 
            to="/" 
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            Return to Gallery
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 ml-2" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
                clipRule="evenodd" 
              />
            </svg>
          </Link>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-10 text-sm text-stone-500"
        >
          Error Code: ARTIFACT_NOT_FOUND
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default NotFound;