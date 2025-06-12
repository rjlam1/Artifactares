import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { useState } from 'react';
import useFeaturedArtifacts from './UseFeatured';

const AllArtifacts = () => {
  const { artifacts, loading, error } = useFeaturedArtifacts();
  const [searchTerm, setSearchTerm] = useState('');

  // Filter artifacts based on search input
  const filteredArtifacts = artifacts.filter(artifact =>
    artifact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="text-center text-xl mt-10">Loading all artifacts...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">Error loading artifacts: {error.message}</div>;
  }

  return (
    <section className="my-10 px-4 max-w-6xl mx-auto">
      <h2 className="text-4xl font-extrabold mb-8 text-center text-white">All Artifacts</h2>

      {/* Search Input */}
      <div className="mb-6 text-center">
        <input
          type="text"
          placeholder="Search by artifact name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 w-full max-w-md"
        />
      </div>

      {filteredArtifacts.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No artifacts found for "{searchTerm}".</p>
      ) : (
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredArtifacts.map(artifact => (
            <motion.div
              key={artifact._id}
              className="border rounded-xl shadow-lg p-4 bg-white flex flex-col justify-between"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img
                src={artifact.image}
                alt={artifact.name}
                className="w-full h-48 object-cover rounded-md mb-3"
              />
              <h3 className="text-xl font-bold text-gray-900 mb-2">{artifact.name}</h3>
              <p className="text-gray-600 text-sm flex-grow mb-4">
                {artifact.shortDescription
                  ? artifact.shortDescription.slice(0, 100) + (artifact.shortDescription.length > 100 ? '...' : '')
                  : 'No description provided.'}
              </p>
              <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-100">
                <span className="font-semibold text-lg text-red-500 flex items-center">
                  <span className="mr-1">❤️</span> {artifact.likeCount}
                </span>
                <Link
                  to={`/artifacts/${artifact._id}`}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out text-sm"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

export default AllArtifacts;
