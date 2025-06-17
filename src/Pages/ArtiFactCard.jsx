import { motion } from "framer-motion";
import { 
  HeartIcon, 
  EyeIcon, 
  ShareIcon,
  CalendarIcon,
  MapPinIcon,
  UserIcon,
  IdentificationIcon,
  StarIcon
} from "@heroicons/react/24/solid";
import { useState } from "react";
import { Helmet } from "react-helmet";

const ArtifactCard = ({ artifact }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <motion.div 
      className=" bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl relative"
      whileHover={{ y: -5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Artifact Image with Overlay */}
      <div className="relative h-48 overflow-hidden">
        <Helmet>
          <title>ArtifactEra | LikedArtifact</title>
        </Helmet>
        <motion.img
          src={artifact.image || "https://via.placeholder.com/300x200?text=Artifact"}
          alt={artifact.name || "Artifact image"}
          className="w-full h-full object-cover"
          initial={{ scale: 1 }}
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Premium Badge */}
        {artifact.premium && (
          <div className="absolute top-2 left-2 bg-gradient-to-r from-amber-400 to-amber-600 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
            <StarIcon className="h-3 w-3 mr-1" />
            Premium
          </div>
        )}

        {/* Like Button */}
        <button 
          onClick={() => setIsLiked(!isLiked)}
          className={`absolute top-2 right-2 p-2 rounded-full transition-all ${isLiked ? 'bg-rose-500 text-white' : 'bg-white/90 text-gray-800 hover:bg-rose-50'}`}
        >
          <HeartIcon className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Artifact Details */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white line-clamp-1">
            {artifact.name || "Untitled Artifact"}
          </h3>
          <span className="px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full">
            {artifact.type || "Unknown"}
          </span>
        </div>

        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
          {artifact.shortDescription || artifact.historicalContext || "No description available"}
        </p>

        {/* Detailed Information Grid */}
        <div className="grid grid-cols-2 gap-3 text-xs mb-4 ">
          <div className="flex items-start gap-2">
            <CalendarIcon className="h-4 w-4 mt-0.5 text-gray-500 dark:text-gray-400" />
            <div>
              <p className="text-gray-500 dark:text-gray-400">Discovered</p>
              <p className="text-gray-700 dark:text-gray-300 font-medium">
                {artifact.discoveredAt || "Unknown"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <UserIcon className="h-4 w-4 mt-0.5 text-gray-500 dark:text-gray-400" />
            <div>
              <p className="text-gray-500 dark:text-gray-400">Discovered By</p>
              <p className="text-gray-700 dark:text-gray-300 font-medium line-clamp-1">
                {artifact.discoveredBy || "Unknown"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <MapPinIcon className="h-4 w-4 mt-0.5 text-gray-500 dark:text-gray-400" />
            <div>
              <p className="text-gray-500 dark:text-gray-400">Location</p>
              <p className="text-gray-700 dark:text-gray-300 font-medium line-clamp-1">
                {artifact.presentLocation || "Unknown"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <IdentificationIcon className="h-4 w-4 mt-0.5 text-gray-500 dark:text-gray-400" />
            <div>
              <p className="text-gray-500 dark:text-gray-400">Added By</p>
              <p className="text-gray-700 dark:text-gray-300 font-medium line-clamp-1">
                {artifact.adderName || "Unknown"}
              </p>
            </div>
          </div>
        </div>

        {/* Like Count and Actions */}
        <div className="flex justify-between items-center pt-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center text-sm">
            <HeartIcon className="h-4 w-4 text-rose-500 mr-1" />
            <span className="text-gray-600 dark:text-gray-300">
              {artifact.likeCount || 0} likes
            </span>
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
    </motion.div>
  );
};

export default ArtifactCard;