// LikedArtifacts.jsx (Premium Style)
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../AuthProvider/AuthContext/AuthProvider";
import { motion, AnimatePresence } from "framer-motion";
// import { Helmet } from "react-helmet-async";
// import { Spinner } from "flowbite-react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const LikedArtifacts = () => {
  const { user, loading } = useContext(AuthContext);
  const [likedArtifacts, setLikedArtifacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLikedArtifacts = async () => {
      if (!user) return;
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${API_BASE_URL}/liked-artifacts?email=${user.email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLikedArtifacts(res.data);
      } catch (err) {
        console.error("Error fetching liked artifacts:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLikedArtifacts();
  }, [user]);

  if (loading || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        {/* <Spinner size="xl" aria-label="Loading..." /> */}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-12"
    >
      {/* <Helmet>
        <title>Liked Artifacts | Artifact Tracker</title>
      </Helmet> */}

      <div className="text-center mb-12">
        <motion.h2 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4"
        >
          Your Treasured Collection
        </motion.h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {likedArtifacts.length > 0 
            ? "Artifacts you've loved and saved"
            : "Your collection of liked artifacts will appear here"}
        </p>
      </div>

      <AnimatePresence>
        {likedArtifacts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-12"
          >
            <img
              src="https://i.ibb.co/9nDBtVf/no-data.png"
              alt="No liked artifacts"
              className="w-72 mx-auto mb-6 opacity-90"
            />
            <motion.p 
              className="text-gray-500 text-lg mb-8"
              whileHover={{ scale: 1.02 }}
            >
              Your gallery of favorites is waiting to be filled...
            </motion.p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Explore Artifacts
            </motion.button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {likedArtifacts.map((artifact) => (
              <motion.div
                key={artifact._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5 }}
                className="relative group"
              >
                <ArtifactCard artifact={artifact} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-end p-4">
                  <button className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition-colors">
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default LikedArtifacts;