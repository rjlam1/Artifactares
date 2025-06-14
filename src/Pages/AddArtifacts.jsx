


// import { useContext, useState, useEffect } from "react";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { AuthContext } from "../AuthProvider/AuthContext/AuthProvider";
// import axios from "axios";

// // Ensure this environment variable is correctly set in your .env file
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// const AddArtifact = () => {
//   const { user } = useContext(AuthContext); // Get user from AuthContext
//   const [formData, setFormData] = useState({
//     name: "",
//     image: "",
//     type: "Tools", // Default value for dropdown
//     historicalContext: "",
//     shortDescription: "",
//     createdAt: "",
//     discoveredAt: "",
//     discoveredBy: "",
//     presentLocation: "",
//   });

//   // Effect to update form data when user loads, for read-only fields
//   useEffect(() => {
//     if (user) {
//       setFormData((prev) => ({
//         ...prev,
//         // These fields are read-only and pre-filled from user context
//         adderName: user.displayName || "",
//         adderEmail: user.email || "",
//       }));
//     }
//   }, [user]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

// const handleSubmit = async (e) => {
//   e.preventDefault();

//   try {
//     // 1. Get FRESH Firebase token (critical fix)
//     const token = await user.getIdToken();
//     console.log("Fresh Firebase token:", token);

//     // 2. Validate all required fields
//     const requiredFields = ['name', 'image', 'historicalContext', 'shortDescription'];
//     const missingField = requiredFields.find(field => !formData[field]?.trim());
    
//     if (missingField) {
//       toast.error(`Please fill in the ${missingField} field`);
//       return;
//     }

//     // 3. Prepare payload
//     const payload = {
//       ...formData,
//       adderName: user.displayName,
//       adderEmail: user.email,
//       // These should ideally be added by backend
//       likeCount: 0,
//       likedBy: [],
//       createdAt: new Date().toISOString()
//     };

//     // 4. Make the request with proper headers
//     const response = await axios.post(`${API_BASE_URL}/artifacts`, payload, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       }
//     });

//     // 5. Handle success
//     if (response.data.insertedId) {
//       toast.success("Artifact added successfully!");
//       // Reset form
//       setFormData(prev => ({
//         ...initialFormState,
//         type: prev.type // Preserve the type selection
//       }));
//     }

//   } catch (error) {
//     // Enhanced error handling
//     console.error("Full error:", error);
    
//     if (error.response) {
//       // Server responded with error status
//       const { status, data } = error.response;
      
//       if (status === 403) {
//         if (data.error === "Token invalid or expired") {
//           toast.error("Session expired. Please log in again.");
//           // Consider redirecting to login
//         } else {
//           toast.error("Permission denied: " + (data.message || "Insufficient privileges"));
//         }
//       } else {
//         toast.error(data.message || `Server error (${status})`);
//       }
//     } else if (error.request) {
//       // Request was made but no response
//       toast.error("No response from server. Check your connection.");
//     } else {
//       // Other errors
//       toast.error("Request failed: " + error.message);
//     }
//   }
// }; 

//   return (
//     <section className="max-w-3xl mx-auto px-4 py-8">
//       <h2 className="text-3xl font-bold text-center mb-6">Add New Artifact</h2>

//       <ToastContainer position="top-center" autoClose={3000} />

//       <form onSubmit={handleSubmit} className="space-y-4 p-6 shadow-lg rounded-lg">
//         {/* Input fields for artifact details */}
//         <input
//           type="text"
//           name="name"
//           placeholder="Artifact Name"
//           required
//           value={formData.name}
//           onChange={handleChange}
//           className="w-full p-3 border rounded"
//         />
//         <input
//           type="url"
//           name="image"
//           placeholder="Artifact Image URL"
//           required
//           value={formData.image}
//           onChange={handleChange}
//           className="w-full p-3 border rounded"
//         />

//         <select
//           name="type"
//           value={formData.type}
//           onChange={handleChange}
//           className="w-full p-3 border rounded"
//         >
//           <option value="Tools">Tools</option>
//           <option value="Weapons">Weapons</option>
//           <option value="Documents">Documents</option>
//           <option value="Writings">Writings</option>
//         </select>

//         <input
//           type="text"
//           name="historicalContext"
//           placeholder="Historical Context"
//           required
//           value={formData.historicalContext}
//           onChange={handleChange}
//           className="w-full p-3 border rounded"
//         />
//         <textarea
//           name="shortDescription"
//           placeholder="Short Description"
//           required
//           value={formData.shortDescription}
//           onChange={handleChange}
//           className="w-full p-3 border rounded h-24 resize-y"
//         ></textarea>
//         <input
//           type="text"
//           name="createdAt"
//           placeholder="Created At (e.g., 100 BC)"
//           required
//           value={formData.createdAt}
//           onChange={handleChange}
//           className="w-full p-3 border rounded"
//         />
//         <input
//           type="text"
//           name="discoveredAt"
//           placeholder="Discovered At (e.g., 1799)"
//           required
//           value={formData.discoveredAt}
//           onChange={handleChange}
//           className="w-full p-3 border rounded"
//         />
//         <input
//           type="text"
//           name="discoveredBy"
//           placeholder="Discovered By"
//           required
//           value={formData.discoveredBy}
//           onChange={handleChange}
//           className="w-full p-3 border rounded"
//         />
//         <input
//           type="text"
//           name="presentLocation"
//           placeholder="Present Location"
//           required
//           value={formData.presentLocation}
//           onChange={handleChange}
//           className="w-full p-3 border rounded"
//         />

//         {/* Read-only fields for adder's name and email */}
//         <input
//           type="text"
//           value={user?.displayName || "Loading Name..."}
//           readOnly
//           className="w-full p-3 border rounded bg-gray-100"
//         />
//         <input
//           type="email"
//           value={user?.email || "Loading Email..."}
//           readOnly
//           className="w-full p-3 border rounded bg-gray-100"
//         />

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition duration-300"
//         >
//           Add Artifact
//         </button>
//       </form>
//     </section>
//   );
// };

// export default AddArtifact;



import { useContext, useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../AuthProvider/AuthContext/AuthProvider";
import axios from "axios";

// Ensure this environment variable is correctly set in your .env file
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AddArtifact = () => {
  const { user } = useContext(AuthContext); // Get user from AuthContext

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

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        adderName: user.displayName || "",
        adderEmail: user.email || "",
      }));
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

    try {
      const token = await user.getIdToken();
      console.log("Fresh Firebase token:", token);

      const requiredFields = ['name', 'image', 'historicalContext', 'shortDescription'];
      const missingField = requiredFields.find(field => !formData[field]?.trim());

      if (missingField) {
        toast.error(`Please fill in the ${missingField} field`);
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
        toast.success("Artifact added successfully!");
        setFormData({
          ...initialFormState,
          type: formData.type, // Keep selected type
        });
      }

    } catch (error) {
      console.error("Full error:", error);

      if (error.response) {
        const { status, data } = error.response;

        if (status === 403) {
          if (data.error === "Token invalid or expired") {
            toast.error("Session expired. Please log in again.");
          } else {
            toast.error("Permission denied: " + (data.message || "Insufficient privileges"));
          }
        } else {
          toast.error(data.message || `Server error (${status})`);
        }

      } else if (error.request) {
        toast.error("No response from server. Check your connection.");
      } else {
        toast.error("Request failed: " + error.message);
      }
    }
  };

  return (
    <section className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-6">Add New Artifact</h2>

      <ToastContainer position="top-center" autoClose={3000} />

      <form onSubmit={handleSubmit} className="space-y-4 p-6 shadow-lg rounded-lg">
        <input
          type="text"
          name="name"
          placeholder="Artifact Name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 border rounded"
        />
        <input
          type="url"
          name="image"
          placeholder="Artifact Image URL"
          required
          value={formData.image}
          onChange={handleChange}
          className="w-full p-3 border rounded"
        />

        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full p-3 border rounded"
        >
          <option value="Tools">Tools</option>
          <option value="Weapons">Weapons</option>
          <option value="Documents">Documents</option>
          <option value="Writings">Writings</option>
        </select>

        <input
          type="text"
          name="historicalContext"
          placeholder="Historical Context"
          required
          value={formData.historicalContext}
          onChange={handleChange}
          className="w-full p-3 border rounded"
        />
        <textarea
          name="shortDescription"
          placeholder="Short Description"
          required
          value={formData.shortDescription}
          onChange={handleChange}
          className="w-full p-3 border rounded h-24 resize-y"
        ></textarea>
        <input
          type="text"
          name="createdAt"
          placeholder="Created At (e.g., 100 BC)"
          required
          value={formData.createdAt}
          onChange={handleChange}
          className="w-full p-3 border rounded"
        />
        <input
          type="text"
          name="discoveredAt"
          placeholder="Discovered At (e.g., 1799)"
          required
          value={formData.discoveredAt}
          onChange={handleChange}
          className="w-full p-3 border rounded"
        />
        <input
          type="text"
          name="discoveredBy"
          placeholder="Discovered By"
          required
          value={formData.discoveredBy}
          onChange={handleChange}
          className="w-full p-3 border rounded"
        />
        <input
          type="text"
          name="presentLocation"
          placeholder="Present Location"
          required
          value={formData.presentLocation}
          onChange={handleChange}
          className="w-full p-3 border rounded"
        />

        <input
          type="text"
          value={user?.displayName || "Loading Name..."}
          readOnly
          className="w-full p-3 border rounded bg-gray-100"
        />
        <input
          type="email"
          value={user?.email || "Loading Email..."}
          readOnly
          className="w-full p-3 border rounded bg-gray-100"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition duration-300"
        >
          Add Artifact
        </button>
      </form>
    </section>
  );
};

export default AddArtifact;
