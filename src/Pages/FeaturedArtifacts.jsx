import { Link } from "react-router";
import { motion } from "framer-motion";
import UseFeaturedArtifacts from "./UseFeatured";

const FeaturedArtifacts = () => {
  const { artifacts, loading, error } = UseFeaturedArtifacts();

  if (loading) {
    return (
      <section className="my-24 px-4 max-w-9xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-bold mb-16 text-center"
        >
          <span className="bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800  bg-clip-text text-transparent">
            Curated Masterpieces
          </span>
        </motion.h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {[...Array(3)].map((_, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="border border-amber-100 rounded-2xl shadow-xl p-5 bg-gradient-to-br from-amber-50 to-white"
            >
              <div className="animate-pulse">
                <div className="h-64 w-full bg-gradient-to-r from-amber-100 to-amber-200 rounded-xl mb-6"></div>
                <div className="h-7 w-3/4 bg-gradient-to-r from-amber-100 to-amber-200 rounded-full mb-4"></div>
                <div className="h-4 w-full bg-gradient-to-r from-amber-100 to-amber-200 rounded-full mb-3"></div>
                <div className="h-4 w-2/3 bg-gradient-to-r from-amber-100 to-amber-200 rounded-full"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="my-24 px-4 max-w-7xl mx-auto text-center">
        <motion.h2 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-5xl font-bold mb-10"
        >
          <span className="bg-gradient-to-r from-amber-500 to-amber-700 bg-clip-text text-transparent">
            Curated Masterpieces
          </span>
        </motion.h2>
        <motion.div 
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="bg-amber-50 border-l-8 border-amber-500 p-6 max-w-2xl mx-auto rounded-lg shadow-md"
        >
          <div className="flex items-center justify-center">
            <div className="flex-shrink-0">
              <svg className="h-8 w-8 text-amber-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-amber-800">Exhibition Unavailable</h3>
              <p className="mt-1 text-sm text-amber-700">
                We encountered an issue: {error.message}
              </p>
            </div>
          </div>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="my-24 px-4 max-w-7xl mx-auto">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-5xl font-bold mb-16 text-center"
      >
        <span className="bg-gradient-to-r from-amber-500 to-amber-700 bg-clip-text text-transparent">
          Curated Masterpieces
        </span>
      </motion.h2>

      {artifacts.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center py-16 bg-gradient-to-br from-amber-50 to-white rounded-3xl shadow-inner"
        >
          <svg className="mx-auto h-16 w-16 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
          <h3 className="mt-4 text-2xl font-medium text-amber-900">Gallery Currently Empty</h3>
          <p className="mt-2 text-amber-700 max-w-md mx-auto">Our curators are preparing exceptional pieces for your appreciation</p>
          <button className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all duration-200 transform hover:scale-105">
            Notify Me When Available
          </button>
        </motion.div>
      ) : (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {artifacts.map((artifact, index) => (
              <motion.div
                key={artifact._id}
                className="group relative bg-white border border-amber-100 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500"
                whileHover={{ y: -10, scale: 1.02 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={artifact.image}
                    alt={artifact.name}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    onError={(e) => {
                      e.target.className = 'w-full h-full object-cover bg-gradient-to-br from-amber-100 to-amber-200';
                      e.target.parentElement.innerHTML = `
                        <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-100 to-amber-200">
                          <svg class="h-16 w-16 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      `;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-600 text-white shadow-lg">
                      Featured
                    </span>
                  </div>
                </div>
                <div className="p-7">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 font-serif tracking-tight">{artifact.name}</h3>
                  <p className="text-gray-600 mb-5 line-clamp-2 font-light">
                    {artifact.shortDescription || 'A remarkable piece awaiting your discovery'}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <svg className="w-6 h-6 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                      <span className="ml-2 text-gray-700 font-medium">{artifact.likeCount || '0'}</span>
                    </div>
                    <Link
                      to={`/artifacts/${artifact._id}`}
                      className="inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-full shadow-md text-white bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all duration-200 transform hover:scale-105"
                    >
                      Explore
                      <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-16 text-center"
          >
            <Link
              to="/allArtifacts"
              className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-full shadow-xl text-white bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              Discover Our Full Collection
              <svg className="ml-4 -mr-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </motion.div>
        </>
      )}
    </section>
  );
};

export default FeaturedArtifacts;