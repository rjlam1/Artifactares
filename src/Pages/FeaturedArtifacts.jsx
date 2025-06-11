// src/components/FeaturedArtifacts.jsx
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import useFeaturedArtifacts from './UseFeatured';

const FeaturedArtifacts = () => {
  const { artifacts, loading } = useFeaturedArtifacts();
console.log("artifact id:", artifacts._id);

  if (loading) return <div className="text-center">Loading...</div>;

  return (
    <section className="my-10 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Featured Artifacts</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {artifacts.map(artifact => (
          <motion.div
            key={artifact._id}
            className="border rounded-xl shadow p-4 bg-white"
            whileHover={{ scale: 1.05 }}
          >
            <img src={artifact.image} alt={artifact.name} className="w-full h-48 object-cover rounded" />
            <h3 className="text-xl font-semibold mt-3">{artifact.name}</h3>
            <p className="text-gray-600">{artifact.shortDescription.slice(0, 80)}...</p>
            <div className="flex justify-between items-center mt-3">
              <span className="font-semibold">❤️ {artifact.likeCount}</span>
              <Link to={`/artifact/${artifact._id}`} className="text-blue-600 hover:underline">View Details</Link>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="text-center mt-6">
        <Link to="/allArtifacts" className="text-lg text-blue-700 underline hover:text-blue-900">
          See All Artifacts →
        </Link>
      </div>
    </section>
  );
};

export default FeaturedArtifacts;
