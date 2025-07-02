import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../AuthProvider/AuthContext/AuthProvider";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "./Loader";
import {
  ExclamationTriangleIcon,
  ArrowPathIcon,
  HeartIcon,
} from "@heroicons/react/24/solid";
import ArtifactCard from "./ArtiFactCard";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const LikedArtifacts = () => {
  const { user, loading } = useContext(AuthContext);
  const [likedArtifacts, setLikedArtifacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (!user || loading) {
      console.log("User or loading state not ready:", { user, loading });
      return;
    }

    const controller = new AbortController();

    const fetchLikedArtifacts = async () => {
      setIsLoading(true);
      setError(null);
      console.log("Starting fetchLikedArtifacts, retryCount:", retryCount);

      try {
        const token = localStorage.getItem("token");
        console.log("Token from localStorage:", token);
        if (!token) throw new Error("Authentication token not found");

        console.log(
          "Sending GET request to:",
          `${API_BASE_URL}/liked-artifacts`
        );

        const res = await axios.get(`${API_BASE_URL}/liked-artifacts`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Cache-Control": "no-cache",
          },
          signal: controller.signal,
        });

        if (!res.data || !Array.isArray(res.data)) {
          throw new Error("Invalid response format");
        }

        setLikedArtifacts(res.data);
        console.log("Liked artifacts set:", res.data);
      } catch (err) {
        console.error("Error fetching liked artifacts:", err);

        setError({
          message:
            err.response?.data?.message || err.message || "Network Error",
          code:
            err.code ||
            (err.response?.status
              ? `HTTP-${err.response.status}`
              : "NETWORK_ERROR"),
          isNetworkError: err.code === "ERR_NETWORK",
        });

        if (err.code === "ERR_NETWORK" && retryCount < 3) {
          const delay = Math.min(1000 * (retryCount + 1), 4000);
          console.log(`Network error detected, will retry after ${delay} ms`);
          setTimeout(() => setRetryCount((prev) => prev + 1), delay);
        }
      } finally {
        setIsLoading(false);
        console.log("Fetch ended, isLoading set to false");
      }
    };

    fetchLikedArtifacts();

    return () => {
      console.log(
        "Aborting fetchLikedArtifacts due to component unmount or deps change"
      );
      controller.abort();
    };
  }, [user, loading, retryCount]);

  const handleRetry = () => {
    console.log("Retry button clicked, resetting retryCount and isLoading");
    setRetryCount(0);
    setIsLoading(true);
  };

  if (loading || isLoading) {
    return <Loader mode="premium" />;
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center min-h-[70vh] text-center p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-xl"
      >
        <div className="max-w-md bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, -5, 5, 0],
            }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <ExclamationTriangleIcon className="h-16 w-16 mx-auto text-amber-500/90 mb-4" />
          </motion.div>

          <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-3 font-serif tracking-tight">
            Connection Issue
          </h3>

          <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg leading-relaxed">
            {error.isNetworkError
              ? "We couldn't connect to the server. Please check your internet connection."
              : error.message}
          </p>

          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 font-mono bg-gray-100 dark:bg-gray-700 p-2 rounded inline-block">
            Error code: {error.code}
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRetry}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center mx-auto font-medium text-lg"
          >
            <ArrowPathIcon className="h-5 w-5 mr-2 animate-spin-once" />
            {retryCount > 0 ? `Retry (${3 - retryCount} left)` : "Try Again"}
          </motion.button>

          {error.isNetworkError && (
            <p className="text-xs text-gray-400 mt-6 italic">
              Tip: Check your network connection or try again later
            </p>
          )}
        </div>
      </motion.div>
    );
  }

  if (likedArtifacts.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
      >
        <div className="text-center bg-white dark:bg-gray-800 p-12 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 max-w-md mx-4">
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              transition: { duration: 1.5, repeat: Infinity },
            }}
            className="mb-6"
          >
            <HeartIcon className="h-16 w-16 mx-auto text-rose-500/80" />
          </motion.div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3 font-serif">
            No Liked Artifacts Yet
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
            Your favorite artifacts will appear here once you like them.
          </p>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-lg shadow hover:shadow-md transition-all"
          >
            Browse Artifacts
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12  sm:px-6 lg:px-8"
    >
      <div className="max-w-8xl mx-auto">
        <div className="text-center mb-12">
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-center mb-6"
          >
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800 sm:text-5xl">
              Your Treasured Collection
            </h1>
          </motion.div>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Artifacts you've liked and saved for future reference
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
          <AnimatePresence>
            {likedArtifacts.map((artifact) => (
              <motion.div
                key={artifact._id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -5 }}
                className="shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-2xl overflow-hidden bg-white dark:bg-gray-800"
              >
                <ArtifactCard artifact={artifact} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default LikedArtifacts;