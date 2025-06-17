import { useContext, useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { AuthContext } from "../AuthProvider/AuthContext/AuthProvider";
import axios from "axios";
import { Helmet } from "react-helmet";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AddArtifact = () => {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true); // Loading state for user data

  const initialFormState = {
    name: "",
    image: "",
    type: "Tools",
    historicalContext: "",
    shortDescription: "",
    createdAt: "",
    discoveredAt: "",
    discoveredBy: "",
    presentLocation: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        adderName: user.displayName || "",
        adderEmail: user.email || "",
      }));
      setIsLoading(false);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = await user.getIdToken();

      const requiredFields = ['name', 'image', 'historicalContext', 'shortDescription'];
      const missingField = requiredFields.find(field => !formData[field]?.trim());

      if (missingField) {
        toast.error(`Please fill in the ${missingField} field`);
        setIsSubmitting(false);
        return;
      }

      const payload = {
        ...formData,
        adderName: user.displayName,
        adderEmail: user.email,
        likeCount: 0,
        likedBy: [],
        createdAt: new Date().toISOString(),
      };

      const response = await axios.post(`${API_BASE_URL}/artifacts`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.insertedId) {
        toast.success("Artifact added to the collection!");
        setFormData({
          ...initialFormState,
          type: formData.type,
        });
      }

    } catch (error) {
      console.error("Error:", error);

      if (error.response) {
        const { status, data } = error.response;
        if (status === 403) {
          toast.error(data.error === "Token invalid or expired" 
            ? "Session expired. Please log in again." 
            : "Permission denied");
        } else {
          toast.error(data.message || `Server error (${status})`);
        }
      } else if (error.request) {
        toast.error("No response from server. Check your connection.");
      } else {
        toast.error("Request failed: " + error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading component
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
          </div>
          <h2 className="text-xl font-medium text-amber-400">Loading Artifact Form...</h2>
          <p className="text-gray-400 mt-2">Preparing everything for you</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8"
    >
      <ToastContainer 
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastClassName="bg-gray-800 border border-gray-700"
      />

      <div className="max-w-8xl mx-auto">
        <Helmet>
          <title>ArtifactEra | AddArtifact</title>
        </Helmet>
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-center mb-6"
        >
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800 sm:text-5xl">
            Contribute to History
          </h1>
          <p className="text-lg mt-4 text-stone-600 max-w-2xl mx-auto">
            Add your artifact to our digital museum
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.005 }}
          className="bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-700"
        >
          <div className="p-8 sm:p-10">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="name" className="block text-sm font-medium text-amber-400 mb-2">
                    Artifact Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="e.g., Rosetta Stone"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 text-gray-200 placeholder-gray-500"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="h-5 w-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="image" className="block text-sm font-medium text-amber-400 mb-2">
                    Image URL *
                  </label>
                  <div className="relative">
                    <input
                      type="url"
                      id="image"
                      name="image"
                      placeholder="https://example.com/image.jpg"
                      required
                      value={formData.image}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 text-gray-200 placeholder-gray-500"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="h-5 w-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-amber-400 mb-2">
                    Artifact Type
                  </label>
                  <div className="relative">
                    <select
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 appearance-none text-gray-200"
                    >
                      <option value="Tools" className="bg-gray-800">Tools</option>
                      <option value="Weapons" className="bg-gray-800">Weapons</option>
                      <option value="Documents" className="bg-gray-800">Documents</option>
                      <option value="Writings" className="bg-gray-800">Writings</option>
                      <option value="Jewelry" className="bg-gray-800">Jewelry</option>
                      <option value="Pottery" className="bg-gray-800">Pottery</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="h-5 w-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="createdAt" className="block text-sm font-medium text-amber-400 mb-2">
                    Creation Era *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="createdAt"
                      name="createdAt"
                      placeholder="e.g., 196 BC"
                      required
                      value={formData.createdAt}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 text-gray-200 placeholder-gray-500"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="h-5 w-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="discoveredAt" className="block text-sm font-medium text-amber-400 mb-2">
                    Discovery Year *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="discoveredAt"
                      name="discoveredAt"
                      placeholder="e.g., 1799"
                      required
                      value={formData.discoveredAt}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 text-gray-200 placeholder-gray-500"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="h-5 w-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="discoveredBy" className="block text-sm font-medium text-amber-400 mb-2">
                    Discovered By *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="discoveredBy"
                      name="discoveredBy"
                      placeholder="e.g., Pierre-François Bouchard"
                      required
                      value={formData.discoveredBy}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 text-gray-200 placeholder-gray-500"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="h-5 w-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="presentLocation" className="block text-sm font-medium text-amber-400 mb-2">
                    Current Location *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="presentLocation"
                      name="presentLocation"
                      placeholder="e.g., British Museum"
                      required
                      value={formData.presentLocation}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 text-gray-200 placeholder-gray-500"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="h-5 w-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="historicalContext" className="block text-sm font-medium text-amber-400 mb-2">
                    Historical Significance *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="historicalContext"
                      name="historicalContext"
                      placeholder="e.g., Key to deciphering Egyptian hieroglyphs"
                      required
                      value={formData.historicalContext}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 text-gray-200 placeholder-gray-500"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="h-5 w-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="shortDescription" className="block text-sm font-medium text-amber-400 mb-2">
                    Detailed Description *
                  </label>
                  <div className="relative">
                    <textarea
                      id="shortDescription"
                      name="shortDescription"
                      placeholder="Provide a comprehensive description of the artifact..."
                      required
                      value={formData.shortDescription}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 text-gray-200 placeholder-gray-500"
                    ></textarea>
                    <div className="absolute top-3 right-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-2 bg-gray-700/50 p-5 rounded-xl border border-gray-600">
                  <h3 className="text-sm font-medium text-amber-400 mb-3">Curator Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1">Your Name</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={user?.displayName || "Loading..."}
                          readOnly
                          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <svg className="h-5 w-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1">Your Email</label>
                      <div className="relative">
                        <input
                          type="email"
                          value={user?.email || "Loading..."}
                          readOnly
                          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <svg className="h-5 w-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-medium rounded-xl shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-gray-800 ${
                    isSubmitting ? 'opacity-80 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Archiving...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Add to Collection
                    </span>
                  )}
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AddArtifact;