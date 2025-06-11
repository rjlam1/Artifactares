
import { useParams, Link } from 'react-router';
import { motion } from 'framer-motion';
import useFeaturedArtifacts from './UseFeatured';

const ArtifactDetails = () => {
  const { id } = useParams();
  const { artifacts, loading, error } = useFeaturedArtifacts(); 

  if (loading) return <div className="text-center text-xl mt-10">Loading artifact details...</div>;
  if (error) return <div className="text-center text-red-500 mt-10">Error loading artifact: {error.message}</div>;

  const artifact = artifacts.find(item => item._id === id);

  if (!artifact) return <div className="text-center text-gray-600 text-lg mt-10">Artifact not found.</div>;

  return (
    <section className="my-10 px-4 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-lg p-6 md:p-8"
      >
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2 flex justify-center items-center">
            <img
              src={artifact.image}
              alt={artifact.name}
              className="w-full max-h-[400px] object-contain rounded-md shadow-md"
            />
          </div>
          <div className="md:w-1/2">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{artifact.name}</h1>
            <p className="text-gray-700 text-lg mb-4 leading-relaxed">
              {artifact.shortDescription || 'No detailed description available.'}
            </p>

            <div className="flex items-center text-lg font-semibold text-red-500 mb-3">
              <span className="mr-2">❤️</span> {artifact.likeCount} Likes
            </div>

            {artifact.category && (
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Category:</span> {artifact.category}
              </p>
            )}
            {artifact.era && (
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Era/Period:</span> {artifact.era}
              </p>
            )}
            {artifact.origin && (
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Origin:</span> {artifact.origin}
              </p>
            )}

            <div className="mt-8">
              <Link
                to="/allArtifacts"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out text-lg"
              >
                ← Back to All Artifacts
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ArtifactDetails;
