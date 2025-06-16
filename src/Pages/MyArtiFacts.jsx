// import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router";
// import Swal from "sweetalert2";
// import { motion } from "framer-motion";
// import { AuthContext } from "../AuthProvider/AuthContext/AuthProvider";

// const MyArtifacts = () => {
//   const { user } = useContext(AuthContext);
//   const [myArtifacts, setMyArtifacts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchMyArtifacts = async () => {
//       try {
//         setLoading(true);
//         const token = await user.getIdToken();
//         const res = await axios.get(
//           `${import.meta.env.VITE_API_BASE_URL}/my-artifacts`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//             withCredentials: true,
//           }
//         );
//         setMyArtifacts(res.data);
//       } catch (error) {
//         console.error("Failed to fetch artifacts:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (user) {
//       fetchMyArtifacts();
//     }
//   }, [user]);

//   const handleDelete = async (id) => {
//     const confirm = await Swal.fire({
//       title: "Confirm Deletion",
//       text: "This artifact will be permanently removed from your collection.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Delete Permanently",
//       cancelButtonText: "Cancel",
//       background: "#1f2937",
//       color: "#f9fafb",
//       customClass: {
//         popup: "rounded-xl border border-gray-700 shadow-2xl",
//       },
//     });

//     if (confirm.isConfirmed) {
//       try {
//         const token = await user.getIdToken();
//         await axios.delete(
//           `${import.meta.env.VITE_API_BASE_URL}/artifacts/${id}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         await Swal.fire({
//           title: "Deleted!",
//           text: "Your artifact has been removed.",
//           icon: "success",
//           background: "#1f2937",
//           color: "#f9fafb",
//           showConfirmButton: false,
//           timer: 1500,
//           customClass: {
//             popup: "rounded-xl border border-gray-700 shadow-2xl",
//           },
//         });
//         setMyArtifacts((prev) => prev.filter((item) => item._id !== id));
//       } catch (error) {
//         console.error("Delete error:", error);
//         Swal.fire({
//           title: "Error!",
//           text: "Could not delete artifact.",
//           icon: "error",
//           background: "#1f2937",
//           color: "#f9fafb",
//           customClass: {
//             popup: "rounded-xl border border-gray-700 shadow-2xl",
//           },
//         });
//       }
//     }
//   };

//   return (
//     <motion.div 
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-gray-800"
//     >
//       <div className="max-w-7xl mx-auto">
//         <div className="text-center mb-12">
//           <motion.h2 
//             initial={{ y: -20 }}
//             animate={{ y: 0 }}
//             className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800 mb-4"
//           >
//             My Curated Collection
//           </motion.h2>
//           <p className="text-gray-400 max-w-2xl mx-auto">
//             Your personal gallery of historical treasures and archaeological findings
//           </p>
//         </div>

//         {loading ? (
//           <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
//             {[...Array(3)].map((_, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: index * 0.1 }}
//                 className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg"
//               >
//                 <div className="animate-pulse">
//                   <div className="h-48 w-full bg-gray-700 rounded-lg mb-4"></div>
//                   <div className="h-6 w-3/4 bg-gray-700 rounded-full mb-3"></div>
//                   <div className="h-4 w-full bg-gray-700 rounded-full mb-2"></div>
//                   <div className="h-4 w-2/3 bg-gray-700 rounded-full mb-6"></div>
//                   <div className="flex space-x-4">
//                     <div className="h-10 w-24 bg-gray-700 rounded-full"></div>
//                     <div className="h-10 w-24 bg-gray-700 rounded-full"></div>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         ) : myArtifacts.length === 0 ? (
//           <motion.div
//             initial={{ scale: 0.95 }}
//             animate={{ scale: 1 }}
//             className="text-center py-16 bg-gray-800 rounded-2xl border border-gray-700 shadow-xl"
//           >
//             <svg
//               className="mx-auto h-16 w-16 text-amber-500"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               strokeWidth="1.5"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
//               />
//             </svg>
//             <h3 className="mt-4 text-2xl font-medium text-gray-300">
//               Your Collection Awaits
//             </h3>
//             <p className="mt-2 text-gray-500 max-w-md mx-auto">
//               Begin your journey by adding your first historical artifact
//             </p>
//             <Link
//               to="/addArtifact"
//               className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all duration-200 transform hover:scale-105"
//             >
//               Add First Artifact
//               <svg
//                 className="ml-3 -mr-1 w-5 h-5"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </Link>
//           </motion.div>
//         ) : (
//           <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
//             {myArtifacts.map((artifact, index) => (
//               <motion.div
//                 key={artifact._id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.1 }}
//                 whileHover={{ y: -5 }}
//                 className="group relative bg-gray-800 rounded-xl overflow-hidden shadow-xl border border-gray-700 hover:border-amber-500/30 transition-all duration-300"
//               >
//                 <div className="relative h-60 overflow-hidden">
//                   <img
//                     src={artifact.image}
//                     alt={artifact.name}
//                     className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//                     onError={(e) => {
//                       e.target.className = 'w-full h-full object-cover bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center';
//                       e.target.parentElement.innerHTML = `
//                         <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-900">
//                           <svg class="h-16 w-16 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                           </svg>
//                         </div>
//                       `;
//                     }}
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                 </div>
//                 <div className="p-6">
//                   <h3 className="text-xl font-bold text-gray-100 mb-2 font-serif">
//                     {artifact.name}
//                   </h3>
//                   <p className="text-gray-400 text-sm mb-5 line-clamp-2">
//                     {artifact.shortDescription || 'No description provided'}
//                   </p>
//                   <div className="flex justify-between">
//                     <Link
//                       to={`/update/${artifact._id}`}
//                       className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-gray-900 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all duration-200 transform hover:scale-105"
//                     >
//                       Edit
//                       <svg
//                         className="ml-2 -mr-1 w-4 h-4"
//                         fill="currentColor"
//                         viewBox="0 0 20 20"
//                       >
//                         <path
//                           d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
//                         />
//                       </svg>
//                     </Link>
//                     <button
//                       onClick={() => handleDelete(artifact._id)}
//                       className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 transform hover:scale-105"
//                     >
//                       Remove
//                       <svg
//                         className="ml-2 -mr-1 w-4 h-4"
//                         fill="currentColor"
//                         viewBox="0 0 20 20"
//                       >
//                         <path
//                           fillRule="evenodd"
//                           d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
//                           clipRule="evenodd"
//                         />
//                       </svg>
//                     </button>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         )}
//       </div>
//     </motion.div>
//   );
// };

// export default MyArtifacts;






// import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router";
// import Swal from "sweetalert2";
// import { motion } from "framer-motion";
// import { AuthContext } from "../AuthProvider/AuthContext/AuthProvider";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

// const MyArtifacts = () => {
//   const { user } = useContext(AuthContext);
//   const [myArtifacts, setMyArtifacts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchMyArtifacts = async () => {
//       try {
//         setLoading(true);

// // const response = await axios.get(`${API_BASE_URL}/artifacts/${id}`);
//         // const data = response.data;


//         const token = await user.getIdToken();
//         const res = await axios.get(`${API_BASE_URL}/my-artifacts`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//             withCredentials: true,
//           }
//         );
//         setMyArtifacts(res.data);
//       } catch (error) {
//         console.error("Failed to fetch artifacts:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (user) {
//       fetchMyArtifacts();
//     }
//   }, [user]);

//   const handleDelete = async (id) => {
//     const confirm = await Swal.fire({
//       title: "Confirm Deletion",
//       text: "This artifact will be permanently removed from your collection.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Delete Permanently",
//       cancelButtonText: "Cancel",
//       background: "#1f2937",
//       color: "#f9fafb",
//     });

//     if (confirm.isConfirmed) {
//       try {
//         const token = await user.getIdToken();
//         await axios.delete(
//           `${import.meta.env.VITE_API_BASE_URL}/artifacts/${id}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         await Swal.fire({
//           title: "Deleted!",
//           text: "Your artifact has been removed.",
//           icon: "success",
//           background: "#1f2937",
//           color: "#f9fafb",
//           showConfirmButton: false,
//           timer: 1500,
//         });
//         setMyArtifacts((prev) => prev.filter((item) => item._id !== id));
//       } catch (error) {
//         console.error("Delete error:", error);
//         Swal.fire({
//           title: "Error!",
//           text: "Could not delete artifact.",
//           icon: "error",
//           background: "#1f2937",
//           color: "#f9fafb",
//         });
//       }
//     }
//   };

//   return (
//     <motion.div 
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-gray-800"
//     >
//       <div className="max-w-7xl mx-auto">
//         <div className="text-center mb-8">
//           <motion.h2 
//             initial={{ y: -20 }}
//             animate={{ y: 0 }}
//             className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600 mb-3"
//           >
//             My Artifact Collection
//           </motion.h2>
//           <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
//             Manage your curated historical artifacts
//           </p>
//         </div>

//         {loading ? (
//           <div className="overflow-x-auto">
//             <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
//               <table className="min-w-full divide-y divide-gray-700">
//                 <thead className="bg-gray-700">
//                   <tr>
//                     <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Artifact</th>
//                     <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Type</th>
//                     <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Era</th>
//                     <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-gray-800 divide-y divide-gray-700">
//                   {[...Array(5)].map((_, index) => (
//                     <tr key={index}>
//                       <td className="px-4 py-4 whitespace-nowrap animate-pulse">
//                         <div className="flex items-center">
//                           <div className="flex-shrink-0 h-10 w-10 bg-gray-700 rounded-md"></div>
//                           <div className="ml-3">
//                             <div className="h-4 w-32 bg-gray-700 rounded"></div>
//                             <div className="h-3 w-24 bg-gray-700 rounded mt-2"></div>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-4 py-4 whitespace-nowrap animate-pulse">
//                         <div className="h-4 w-20 bg-gray-700 rounded"></div>
//                       </td>
//                       <td className="px-4 py-4 whitespace-nowrap animate-pulse">
//                         <div className="h-4 w-16 bg-gray-700 rounded"></div>
//                       </td>
//                       <td className="px-4 py-4 whitespace-nowrap animate-pulse">
//                         <div className="flex space-x-2">
//                           <div className="h-8 w-16 bg-gray-700 rounded"></div>
//                           <div className="h-8 w-16 bg-gray-700 rounded"></div>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         ) : myArtifacts.length === 0 ? (
//           <motion.div
//             initial={{ scale: 0.95 }}
//             animate={{ scale: 1 }}
//             className="text-center py-12 bg-gray-800 rounded-xl border border-gray-700 shadow-lg p-6"
//           >
//             <svg
//               className="mx-auto h-12 w-12 text-amber-500"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={1.5}
//                 d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
//               />
//             </svg>
//             <h3 className="mt-4 text-xl font-medium text-gray-300">
//               Your Collection Awaits
//             </h3>
//             <p className="mt-2 text-gray-500 max-w-md mx-auto text-sm">
//               Begin your journey by adding your first historical artifact
//             </p>
//             <Link
//               to="/addArtifacts"
//               className="mt-6 inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all"
//             >
//               Add First Artifact
//             </Link>
//           </motion.div>
//         ) : (
//           <div className="overflow-x-auto">
//             <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
//               <table className="min-w-full divide-y divide-gray-700">
//                 <thead className="bg-gray-700">
//                   <tr>
//                     <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Artifact</th>
//                     <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider hidden sm:table-cell">Type</th>
//                     <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider hidden md:table-cell">Era</th>
//                     <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-gray-800 divide-y divide-gray-700">
//                   {myArtifacts.map((artifact) => (
//                     <motion.tr 
//                       key={artifact._id}
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ duration: 0.3 }}
//                       whileHover={{ backgroundColor: "rgba(55, 65, 81, 0.5)" }}
//                       className="hover:bg-gray-700/50 transition-colors duration-200"
//                     >
//                       <td className="px-4 py-4 whitespace-nowrap">
//                         <div className="flex items-center">
//                           <div className="flex-shrink-0 h-10 w-10">
//                             <img 
//                               className="h-10 w-10 rounded-md object-cover" 
//                               src={artifact.image} 
//                               alt={artifact.name}
//                               onError={(e) => {
//                                 e.target.onerror = null;
//                                 e.target.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI2Q5NzcxNiIgc3Ryb2tlPSIjZjk5YTMwIiBzdHJva2Utd2lkdGg9IjEuNSI+PHBhdGggc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBkPSJNNCAxNmw0LjU4Ni00LjU4NmEyIDIgMCAwMTIuODI4IDBMMTYgMTZtLTItMmwyLjU4Ni0yLjU4NmEyIDIgMCAwMTIuODI4IDBMMjAgMTRtLTYtNmgyLjAxTTYuMTYgMTguODQ0bC0uMzY4LS4zNjhhMiAyIDAgMDEwLTIuODI4bDcuNTMzLTcuNTM1YTIgMiAwIDAxMi44MjggMGwuMzY4LjM2OE0xNSAxM2wtLjM2OC0uMzY4YTIgMiAwIDAwLTIuODI4IDBMNiAxOC4xNjJWN2EyIDIgMCAwMTItMmgxMmEyIDIgMCAwMTIgMnYxMS4xNjJ6IiAvPjwvc3ZnPg==";
//                               }}
//                             />
//                           </div>
//                           <div className="ml-3">
//                             <div className="text-sm font-medium text-gray-100">{artifact.name}</div>
//                             <div className="text-xs text-gray-400 sm:hidden capitalize">{artifact.type}</div>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-4 py-4 whitespace-nowrap hidden sm:table-cell">
//                         <div className="text-sm text-gray-300 capitalize">{artifact.type}</div>
//                       </td>
//                       <td className="px-4 py-4 whitespace-nowrap hidden md:table-cell">
//                         <div className="text-sm text-gray-300">{artifact.era || 'Unknown'}</div>
//                       </td>
//                       <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
//                         <div className="flex justify-end space-x-2">
//                           <motion.button
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                             onClick={() => navigate(`/update/${artifact._id}`)}
//                             className="text-amber-500 hover:text-amber-600 transition-colors cursor-pointer duration-200 text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-1.5 rounded"
//                           >
//                             Edit
//                           </motion.button>
//                           <motion.button
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                             onClick={() => handleDelete(artifact._id)}
//                             className="text-red-500 hover:text-red-600 transition-colors duration-200 cursor-pointer text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-1.5 rounded"
//                           >
//                             Delete
//                           </motion.button>
//                         </div>
//                       </td>
//                     </motion.tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}
//       </div>
//     </motion.div>
//   );
// };

// export default MyArtifacts;










import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router"; 
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { AuthContext } from "../AuthProvider/AuthContext/AuthProvider";

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
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <motion.h2 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600 mb-3"
          >
            My Artifact Collection
          </motion.h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
            Manage your curated historical artifacts
          </p>
        </div>

        {loading ? (
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-700">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Artifact</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Type</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Era</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {[...Array(5)].map((_, index) => (
                    <tr key={index}>
                      <td className="px-4 py-4 whitespace-nowrap animate-pulse">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gray-700 rounded-md"></div>
                          <div className="ml-3">
                            <div className="h-4 w-32 bg-gray-700 rounded"></div>
                            <div className="h-3 w-24 bg-gray-700 rounded mt-2"></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap animate-pulse">
                        <div className="h-4 w-20 bg-gray-700 rounded"></div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap animate-pulse">
                        <div className="h-4 w-16 bg-gray-700 rounded"></div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap animate-pulse">
                        <div className="flex space-x-2">
                          <div className="h-8 w-16 bg-gray-700 rounded"></div>
                          <div className="h-8 w-16 bg-gray-700 rounded"></div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
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