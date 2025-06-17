// ArtifactCard.jsx
import { motion } from "framer-motion";
import { HeartIcon, EyeIcon, ShareIcon } from "@heroicons/react/24/solid";

const ArtifactCard = ({ artifact }) => {
  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
      whileHover={{ scale: 1.02 }}
    >
      {/* Artifact Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={artifact.imageUrl || "https://via.placeholder.com/300x200?text=Artifact"}
          alt={artifact.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-2 right-2 flex space-x-2">
          <button className="p-2 bg-white/90 rounded-full shadow-md hover:bg-red-100 transition-colors">
            <HeartIcon className="h-5 w-5 text-red-500" />
          </button>
        </div>
      </div>

      {/* Artifact Details */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white truncate">
            {artifact.name || "Untitled Artifact"}
          </h3>
          {artifact.category && (
            <span className="px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full">
              {artifact.category}
            </span>
          )}
        </div>

        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
          {artifact.description || "No description available"}
        </p>

        <div className="flex justify-between items-center">
          <div>
            {artifact.creator && (
              <p className="text-xs text-gray-500 dark:text-gray-400">
                By {artifact.creator}
              </p>
            )}
            {artifact.date && (
              <p className="text-xs text-gray-400 dark:text-gray-500">
                Added {new Date(artifact.date).toLocaleDateString()}
              </p>
            )}
          </div>

          <div className="flex space-x-2">
            <button className="p-2 text-gray-500 hover:text-blue-500 transition-colors">
              <EyeIcon className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-500 hover:text-green-500 transition-colors">
              <ShareIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Hidden Details Panel (Reveals on hover) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
        <div className="w-full">
          <button className="w-full py-2 px-4 bg-white text-gray-800 rounded-lg font-medium hover:bg-gray-100 transition-colors mb-2">
            View Details
          </button>
          <div className="flex justify-between text-white text-xs">
            <span>{artifact.likes || 0} Likes</span>
            <span>{artifact.views || 0} Views</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ArtifactCard;