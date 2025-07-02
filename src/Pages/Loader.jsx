import { motion } from "framer-motion";

const Loader = () => {
  return (
<div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
          </div>
          {/* <h2 className="text-xl font-medium text-amber-400">Loading Artifact Form...</h2>
          <p className="text-gray-400 mt-2">Preparing everything for you</p> */}
        </div>
      </div>
  );
};

export default Loader;