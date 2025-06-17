import { useParams, useNavigate } from "react-router";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { AuthContext } from "../AuthProvider/AuthContext/AuthProvider";
import { Helmet } from "react-helmet";

const UpdateArtifact = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [artifact, setArtifact] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtifact = async () => {
      try {
        setLoading(true);
        const token = await user.getIdToken();
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/artifacts/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setArtifact(res.data);
      } catch (error) {
        console.error("Error fetching artifact:", error);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchArtifact();
  }, [id, user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedArtifact = {
      name: form.name.value,
      image: form.image.value,
      type: form.type.value,
      context: form.context.value,
      createdAt: form.createdAt.value,
      discoveredAt: form.discoveredAt.value,
      discoveredBy: form.discoveredBy.value,
      presentLocation: form.presentLocation.value,
    };

    const result = await Swal.fire({
      title: "Confirm Update",
      text: "Are you sure you want to update this artifact?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#d97706",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Update Artifact",
      cancelButtonText: "Cancel",
      background: "#1f2937",
      color: "#f9fafb",
      customClass: {
        popup: "rounded-xl border border-gray-700 shadow-2xl",
      },
    });

    if (result.isConfirmed) {
      try {
        const token = await user.getIdToken();
        await axios.put(`${import.meta.env.VITE_API_BASE_URL}/artifacts/${id}`, updatedArtifact, {
          headers: { Authorization: `Bearer ${token}` },
        });
        await Swal.fire({
          title: "Updated!",
          text: "Your artifact has been successfully updated.",
          icon: "success",
          background: "#1f2937",
          color: "#f9fafb",
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: "rounded-xl border border-gray-700 shadow-2xl",
          },
        });
        navigate("/my-artifacts");
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: error.response?.data?.error || "Failed to update artifact",
          icon: "error",
          background: "#1f2937",
          color: "#f9fafb",
          customClass: {
            popup: "rounded-xl border border-gray-700 shadow-2xl",
          },
        });
      }
    }
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800"
      >
        <div className="max-w-8xl w-full mx-4 bg-gray-800 rounded-xl shadow-xl p-8 border border-gray-700">
          <Helmet>
            <title>ArtifactEra | UpdateArtifact</title>
          </Helmet>
          <div className="animate-pulse space-y-6">
            <div className="h-8 w-1/3 bg-gray-700 rounded-full mx-auto"></div>
            <div className="space-y-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-12 bg-gray-700 rounded-lg"></div>
              ))}
            </div>
            <div className="h-12 bg-gray-700 rounded-full mt-8"></div>
          </div>
        </div>
      </motion.div>
    );
  }

  if (!artifact) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800"
      >
        <div className="text-center p-8 bg-gray-800 rounded-xl shadow-xl border border-gray-700 max-w-8xl">
          <svg
            className="mx-auto h-16 w-16 text-amber-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="mt-4 text-xl font-medium text-gray-300">Artifact Not Found</h3>
          <p className="mt-2 text-gray-500">
            The artifact you're trying to edit doesn't exist or you don't have permission to access it.
          </p>
          <button
            onClick={() => navigate("/my-artifacts")}
            className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all duration-200 transform hover:scale-105"
          >
            Back to My Collection
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-gray-800"
    >
      <div className="max-w-8xl mx-auto">
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
            Curate Your Artifact
          </h2>
          <p className="mt-2 text-gray-400">Refine the details of your historical treasure</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-700"
        >
          <form onSubmit={handleUpdate} className="p-6 sm:p-8">
            <div className="grid gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Artifact Name</label>
                <input
                  name="name"
                  defaultValue={artifact.name}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-200 placeholder-gray-500 transition-all duration-200"
                  placeholder="E.g., Rosetta Stone"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Image URL</label>
                <input
                  name="image"
                  defaultValue={artifact.image}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-200 placeholder-gray-500 transition-all duration-200"
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Artifact Type</label>
                <select
                  name="type"
                  defaultValue={artifact.type}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-200 transition-all duration-200 appearance-none"
                  required
                >
                  <option value="">Select a type</option>
                  <option className="bg-gray-800">Tools</option>
                  <option className="bg-gray-800">Weapons</option>
                  <option className="bg-gray-800">Documents</option>
                  <option className="bg-gray-800">Writings</option>
                  <option className="bg-gray-800">Jewelry</option>
                  <option className="bg-gray-800">Pottery</option>
                  <option className="bg-gray-800">Sculpture</option>
                  <option className="bg-gray-800">Coin</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Historical Context</label>
                <textarea
                  name="context"
                  defaultValue={artifact.context}
                  rows="4"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-200 placeholder-gray-500 transition-all duration-200"
                  placeholder="Describe the historical significance..."
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Created At</label>
                  <input
                    name="createdAt"
                    defaultValue={artifact.createdAt}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-200 placeholder-gray-500 transition-all duration-200"
                    placeholder="E.g., 196 BC"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Discovered At</label>
                  <input
                    name="discoveredAt"
                    defaultValue={artifact.discoveredAt}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-200 placeholder-gray-500 transition-all duration-200"
                    placeholder="E.g., 1799"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Discovered By</label>
                  <input
                    name="discoveredBy"
                    defaultValue={artifact.discoveredBy}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-200 placeholder-gray-500 transition-all duration-200"
                    placeholder="Discoverer's name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Current Location</label>
                  <input
                    name="presentLocation"
                    defaultValue={artifact.presentLocation}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-200 placeholder-gray-500 transition-all duration-200"
                    placeholder="E.g., British Museum"
                    required
                  />
                </div>
              </div>

              <div className="mt-6">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-medium rounded-lg shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                >
                  Update Artifact
                  <svg
                    className="w-5 h-5 inline-block ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </motion.button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default UpdateArtifact;