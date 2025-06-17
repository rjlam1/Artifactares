
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router"; 
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { AuthContext } from "../AuthProvider/AuthContext/AuthProvider";
import { Helmet } from "react-helmet";
import Loader from "./Loader";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const MyArtifacts = () => {
  const { user } = useContext(AuthContext);
  const [myArtifacts, setMyArtifacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyArtifacts = async () => {
      try {
        setLoading(true);
        const token = await user.getIdToken();
        const res = await axios.get(`${API_BASE_URL}/my-artifacts`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setMyArtifacts(res.data);
      } catch (error) {
        console.error("Failed to fetch artifacts:", error);
        Swal.fire({
          title: "Error!",
          text: "Could not fetch your artifacts.",
          icon: "error",
          background: "#1f2937",
          color: "#f9fafb",
        });
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchMyArtifacts();
    }
  }, [user]);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Confirm Deletion",
      text: "This artifact will be permanently removed from your collection.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete Permanently",
      cancelButtonText: "Cancel",
      background: "#1f2937",
      color: "#f9fafb",
    });

    if (confirm.isConfirmed) {
      try {
        const token = await user.getIdToken();
        await axios.delete(`${API_BASE_URL}/artifacts/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        await Swal.fire({
          title: "Deleted!",
          text: "Your artifact has been removed.",
          icon: "success",
          background: "#1f2937",
          color: "#f9fafb",
          showConfirmButton: false,
          timer: 1500,
        });
        setMyArtifacts((prev) => prev.filter((item) => item._id !== id));
      } catch (error) {
        console.error("Delete error:", error);
        Swal.fire({
          title: "Error!",
          text: "Could not delete artifact.",
          icon: "error",
          background: "#1f2937",
          color: "#f9fafb",
        });
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-gray-800"
    >
      <div className="max-w-8xl mx-auto">
        <Helmet>
          <title>
            ArtifactEra | MyArtifact
          </title>
        </Helmet>
        <div className="text-center mb-8">
          <motion.h2 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800 mb-3"
          >
            My Artifact Collection
          </motion.h2>
          <p className="text-lg mt-4 text-stone-600 max-w-2xl mx-auto">
            Manage your curated historical artifacts
          </p>
        </div>

        {loading ? (
          <Loader></Loader>
          // <div className="overflow-x-auto">
          //   <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
          //     <table className="min-w-full divide-y divide-gray-700">
          //       <thead className="bg-gray-700">
          //         <tr>
          //           <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Artifact</th>
          //           <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Type</th>
          //           <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Era</th>
          //           <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
          //         </tr>
          //       </thead>
          //       <tbody className="bg-gray-800 divide-y divide-gray-700">
          //         {[...Array(5)].map((_, index) => (
          //           <tr key={index}>
          //             <td className="px-4 py-4 whitespace-nowrap animate-pulse">
          //               <div className="flex items-center">
          //                 <div className="flex-shrink-0 h-10 w-10 bg-gray-700 rounded-md"></div>
          //                 <div className="ml-3">
          //                   <div className="h-4 w-32 bg-gray-700 rounded"></div>
          //                   <div className="h-3 w-24 bg-gray-700 rounded mt-2"></div>
          //                 </div>
          //               </div>
          //             </td>
          //             <td className="px-4 py-4 whitespace-nowrap animate-pulse">
          //               <div className="h-4 w-20 bg-gray-700 rounded"></div>
          //             </td>
          //             <td className="px-4 py-4 whitespace-nowrap animate-pulse">
          //               <div className="h-4 w-16 bg-gray-700 rounded"></div>
          //             </td>
          //             <td className="px-4 py-4 whitespace-nowrap animate-pulse">
          //               <div className="flex space-x-2">
          //                 <div className="h-8 w-16 bg-gray-700 rounded"></div>
          //                 <div className="h-8 w-16 bg-gray-700 rounded"></div>
          //               </div>
          //             </td>
          //           </tr>
          //         ))}
          //       </tbody>
          //     </table>
          //   </div>
          // </div>
        ) : myArtifacts.length === 0 ? (
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="text-center py-12 bg-gray-800 rounded-xl border border-gray-700 shadow-lg p-6"
          >
            <svg
              className="mx-auto h-12 w-12 text-amber-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
              />
            </svg>
            <h3 className="mt-4 text-xl font-medium text-gray-300">
              Your Collection Awaits
            </h3>
            <p className="mt-2 text-gray-500 max-w-md mx-auto text-sm">
              Begin your journey by adding your first historical artifact
            </p>
            <Link
              to="/addArtifacts"
              className="mt-6 inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all"
            >
              Add First Artifact
            </Link>
          </motion.div>
        ) : (
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-700">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Artifact</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider hidden sm:table-cell">Type</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider hidden md:table-cell">Era</th>
                    <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {myArtifacts.map((artifact) => (
                    <motion.tr 
                      key={artifact._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      whileHover={{ backgroundColor: "rgba(55, 65, 81, 0.5)" }}
                      className="hover:bg-gray-700/50 transition-colors duration-200"
                    >
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img 
                              className="h-10 w-10 rounded-md object-cover" 
                              src={artifact.image} 
                              alt={artifact.name}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI2Q5NzcxNiIgc3Ryb2tlPSIjZjk5YTMwIiBzdHJva2Utd2lkdGg9IjEuNSI+PHBhdGggc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBkPSJNNCAxNmw0LjU4Ni00LjU4NmEyIDIgMCAwMTIuODI4IDBMMTYgMTZtLTItMmwyLjU4Ni0yLjU4NmEyIDIgMCAwMTIuODI4IDBMMjAgMTRtLTYtNmgyLjAxTTYuMTYgMTguODQ0bC0uMzY4LS4zNjhhMiAyIDAgMDEwLTIuODI4bDcuNTMzLTcuNTM1YTIgMiAwIDAxMi44MjggMGwuMzY4LjM2OE0xNSAxM2wtLjM2OC0uMzY4YTIgMiAwIDAwLTIuODI4IDBMNiAxOC4xNjJWNyAyIDIgMCAwMTIgMmgxMmEyIDIgMCAwMTIgMnYxMS4xNjJ6IiAvPjwvc3ZnPg==";
                              }}
                            />
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-100">{artifact.name}</div>
                            <div className="text-xs text-gray-400 sm:hidden capitalize">{artifact.type}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap hidden sm:table-cell">
                        <div className="text-sm text-gray-300 capitalize">{artifact.type}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap hidden md:table-cell">
                        <div className="text-sm text-gray-300">{artifact.era || 'Unknown'}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate(`/update/${artifact._id}`)}
                            className="text-amber-500 hover:text-amber-600 transition-colors cursor-pointer duration-200 text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-1.5 rounded"
                          >
                            Edit
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleDelete(artifact._id)}
                            className="text-red-500 hover:text-red-600 transition-colors duration-200 cursor-pointer text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-1.5 rounded"
                          >
                            Delete
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MyArtifacts;