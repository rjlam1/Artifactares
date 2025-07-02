import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { AuthContext } from '../AuthProvider/AuthContext/AuthProvider';
import Loader from './Loader';

// API_BASE_URL ডেফাইন করা হলো এখানে
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const AllArtifacts = () => {
  const { user } = useContext(AuthContext);

  const [artifacts, setArtifacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('name');
  const [filters, setFilters] = useState({
    shiftMarker: false,
    textElements: false,
    xAxisRays: false,
    videoPairs: false
  });

  useEffect(() => {
    const fetchAllArtifacts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`${API_BASE_URL}/artifacts`);
        setArtifacts(response.data);
      } catch (err) {
        console.error('Failed to fetch all artifacts:', err);
        setError(err.message || 'Failed to load artifacts');
      } finally {
        setLoading(false);
      }
    };

    fetchAllArtifacts();
  }, []);

  const toggleFilter = (filterName) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: !prev[filterName]
    }));
  };

  const filteredArtifacts = artifacts
    .filter(artifact => {
      const matchesSearch = 
        artifact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artifact.shortDescription?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilters = 
        (!filters.shiftMarker || artifact.category === 'shiftMarker') &&
        (!filters.textElements || artifact.category === 'textElements') &&
        (!filters.xAxisRays || artifact.category === 'xAxisRays') &&
        (!filters.videoPairs || artifact.category === 'videoPairs');
      
      return matchesSearch && matchesFilters;
    })
    .sort((a, b) => {
      if (sortOption === 'name') return a.name.localeCompare(b.name);
      if (sortOption === 'likes') return b.likeCount - a.likeCount;
      if (sortOption === 'era') return (a.era || '').localeCompare(b.era || '');
      return 0;
    });

  if (loading) {
    return (
      <Loader></Loader>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-stone-50 to-stone-100 p-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center bg-white rounded-2xl shadow-xl max-w-9xl border border-stone-200"
        >
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold text-stone-900 mb-3">Discovery Interrupted</h3>
          <p className="text-stone-600 mb-6">{error}</p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.reload()} 
            className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            Retry Expedition
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <section className="py-12  md:px-8 min-h-screen bg-gradient-to-r from-gray-800 to-gray-900">
      <Helmet>
        <title>ArtifactEra | All Artifacts</title>
      </Helmet>

      <div className="max-w-8xl mx-auto relative">

        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-wider text-amber-800 uppercase rounded-full bg-amber-100/80 mb-5 border border-amber-200">
            Historical Archive
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800">
              Artifact Treasury
            </span>
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Discover humanity's legacy through our curated collection of historical artifacts
          </p>
        </motion.div>

        {/* Search + Sort + Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className=" bg-gradient-to-b from-gray-900 to-gray-800 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-10 border border-stone-200/50"
        >
          <div className="flex flex-col md:flex-row gap-6 items-end">
            <div className="relative flex-grow w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search artifacts by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-stone-800 bg-white/50 shadow-sm"
              />
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <label htmlFor="sort" className="text-sm font-medium text-stone-700 whitespace-nowrap">
                Sort by:
              </label>
              <div className="relative">
                <select
                  id="sort"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="appearance-none block w-full pl-3 pr-10 py-2.5 text-base border border-stone-200 focus:outline-none focus:ring-amber-500 focus:border-amber-500 rounded-xl text-stone-800 bg-white/50 shadow-sm"
                >
                  <option value="name">Name (A-Z)</option>
                  <option value="likes">Most Popular</option>
                  <option value="era">Historical Era</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <svg className="h-5 w-5 text-stone-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="text-sm font-medium text-stone-500 mb-3">FILTER BY CATEGORY:</h4>
            <div className="flex flex-wrap gap-3">
              {Object.entries(filters).map(([key, value]) => (
                <motion.button
                  key={key}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleFilter(key)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${value 
                    ? 'bg-amber-100 border-amber-300 text-amber-800 shadow-inner' 
                    : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'}`}
                >
                  {key.split(/(?=[A-Z])/).join(' ')}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {filteredArtifacts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-stone-200/50"
          >
            <svg className="mx-auto h-14 w-14 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-4 text-xl font-medium text-stone-900">No artifacts discovered</h3>
            <p className="mt-2 text-stone-500 max-w-md mx-auto">
              {searchTerm || Object.values(filters).some(Boolean) 
                ? `We couldn't uncover any artifacts matching your search criteria`
                : 'The artifact collection appears to be empty at this time'}
            </p>
            <div className="mt-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSearchTerm('');
                  setFilters({
                    shiftMarker: false,
                    textElements: false,
                    xAxisRays: false,
                    videoPairs: false
                  });
                }}
                className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-stone-100 to-stone-200 border border-stone-200 text-stone-700 font-medium rounded-lg shadow-sm hover:shadow-md transition-all"
              >
                Clear all filters
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <>
            {!user ? (
              // Card view for guests (not logged in)
              <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredArtifacts.map((artifact, index) => (
                  <motion.div
                    key={artifact._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="group relative bg-gray-800 border border-gray-700 rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 "
                  >
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={artifact.image}
                        alt={artifact.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                      <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/30 backdrop-blur-sm">
                        <svg className="w-4 h-4 text-amber-300" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xs font-medium text-white">{artifact.likeCount}</span>
                      </div>

                      {artifact.category && (
                        <div className="absolute top-4 left-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/90 text-stone-800 backdrop-blur-sm">
                            {artifact.category}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-5">
                      <h3 className="text-xl font-bold text-amber-500 mb-2 line-clamp-1">{artifact.name}</h3>
                      <p className="text-stone-500 text-sm mb-4 line-clamp-2">
                        {artifact.shortDescription || 'No description available'}
                      </p>

                      <div className="flex justify-between items-center">
                        <motion.div whileHover={{ x: 2 }}>
                          <Link
                            to={`/artifacts/${artifact._id}`}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-amber-700 bg-amber-100/70 hover:bg-amber-200/80 focus:outline-none focus:ring-2 focus:ring-amber-500 transition group"
                          >
                            Explore
                            <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </Link>
                        </motion.div>

                        <span className="text-xs font-medium text-stone-600 bg-stone-100/50 px-2.5 py-1 rounded-full">
                          {artifact.era || 'Unknown era'}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              // Table view for logged in users
              <div className="overflow-x-auto rounded-2xl shadow-lg bg-gray-900 p-6 border border-stone-600">
                <table className="w-full text-stone-200 table-auto border-collapse border border-stone-700">
                  <thead>
                    <tr className="bg-gray-800 text-stone-400">
                      <th className="border border-stone-600 px-4 py-2 text-left">Name</th>
                      <th className="border border-stone-600 px-4 py-2 text-left">Category</th>
                      <th className="border border-stone-600 px-4 py-2 text-left">Era</th>
                      <th className="border border-stone-600 px-4 py-2 text-left">Likes</th>
                      <th className="border border-stone-600 px-4 py-2 text-left">Description</th>
                      <th className="border border-stone-600 px-4 py-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredArtifacts.map((artifact) => (
                      <tr key={artifact._id} className="even:bg-gray-800 odd:bg-gray-900">
                        <td className="border border-stone-700 px-4 py-2">{artifact.name}</td>
                        <td className="border border-stone-700 px-4 py-2">{artifact.category || 'N/A'}</td>
                        <td className="border border-stone-700 px-4 py-2">{artifact.era || 'Unknown'}</td>
                        <td className="border border-stone-700 px-4 py-2">{artifact.likeCount}</td>
                        <td className="border border-stone-700 px-4 py-2 line-clamp-2">{artifact.shortDescription || 'No description'}</td>
                        <td className="border border-stone-700 px-4 py-2">
                          <Link
                            to={`/artifacts/${artifact._id}`}
                            className="text-amber-400 hover:text-amber-600 underline"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default AllArtifacts;
