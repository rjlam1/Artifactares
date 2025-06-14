

import { Link } from "react-router";
import { motion } from "framer-motion";
import UseFeaturedArtifacts from "./UseFeatured";

const FeaturedArtifacts = () => {
  const { artifacts, loading, error } = UseFeaturedArtifacts();
 console.log("Artifact ID for Link:", artifacts.id);
  if (loading) {
    return (
      <section className="my-10 px-4 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Featured Artifacts</h2>
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="my-10 px-4 max-w-6xl mx-auto text-center text-red-500">
        <h2 className="text-3xl font-bold mb-6">Featured Artifacts</h2>
        <p>Error loading featured artifacts: {error.message}</p>
      </section>
    );
  }

  return (
    <section className="my-10 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Featured Artifacts
      </h2>

      {artifacts.length === 0 ? (
        <p className="text-center text-gray-600">
          No featured artifacts available
        </p>
      ) : (
        <>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {artifacts.map((artifact) => (
              <motion.div
                key={artifact._id}
                className="border rounded-xl shadow p-4 flex flex-col"
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={artifact.image}
                  alt={artifact.name}
                  className="w-full h-48 object-cover rounded mb-3"
                  onError={(e) => {
                    // e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Available';
                  }}
                />
                <h3 className="text-xl font-semibold mt-3">{artifact.name}</h3>
                <p className="text-gray-600 flex-grow">
                  {artifact.shortDescription?.slice(0, 80)}...
                </p>
                <div className="flex justify-between items-center mt-3">
                  <span className="font-semibold">❤️ {artifact.likeCount}</span>
                  <Link
                    to={`/artifacts/${artifact._id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View Details
                  </Link>
                 

                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link
              to="/allArtifacts"
              className="text-lg text-blue-700 underline hover:text-blue-900"
            >
              See All Artifacts →
            </Link>
          </div>
        </>
      )}
    </section>
  );
};

export default FeaturedArtifacts;
