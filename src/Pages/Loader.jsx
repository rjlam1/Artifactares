import { motion } from "framer-motion";

const Loader = () => {
  return (
     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-stone-50 to-stone-100">
         
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-amber-500/30 border-t-amber-600 rounded-full mx-auto"
          ></motion.div>
          <motion.p 
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
            className="mt-6 text-lg font-medium text-stone-700"
          >
            Unearthing artifacts...
          </motion.p>
        </div>
      </div>
  );
};

export default Loader;