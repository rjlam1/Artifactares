import { useContext, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../AuthProvider/AuthContext/AuthProvider";
import axios from "axios";

const AddArtifact = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    type: "Tools",
    historicalContext: "",
    shortDescription: "",
    createdAt: "",
    discoveredAt: "",
    discoveredBy: "",
    presentLocation: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newArtifact = {
      ...formData,
      adderName: user?.displayName,
      adderEmail: user?.email,
      likeCount: 0,
    };

    try {
      const response = await axios.post("http://localhost:3000/artifacts", newArtifact, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.insertedId) {
        toast.success(" Artifact added successfully!");
        setFormData({
          name: "",
          image: "",
          type: "Tools",
          historicalContext: "",
          shortDescription: "",
          createdAt: "",
          discoveredAt: "",
          discoveredBy: "",
          presentLocation: "",
        });
      }
    } catch (error) {
      toast.error("❌ Failed to add artifact.");
      console.error("Axios error:", error);
    }
  };

  return (
    <section className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-6">Add New Artifact</h2>

      {/* ToastContainer (needed to show toasts) */}
      <ToastContainer position="top-center" autoClose={3000} />

      <form onSubmit={handleSubmit} className="space-y-4 p-6 shadow-lg rounded-lg">
        <input type="text" name="name" placeholder="Artifact Name" required value={formData.name} onChange={handleChange} className="w-full p-3 border rounded" />
        <input type="url" name="image" placeholder="Artifact Image URL" required value={formData.image} onChange={handleChange} className="w-full p-3 border rounded" />

        <select name="type" value={formData.type} onChange={handleChange} className="w-full p-3 border rounded">
          <option value="Tools">Tools</option>
          <option value="Weapons">Weapons</option>
          <option value="Documents">Documents</option>
          <option value="Writings">Writings</option>
        </select>

        <input type="text" name="historicalContext" placeholder="Historical Context" required value={formData.historicalContext} onChange={handleChange} className="w-full p-3 border rounded" />
        <textarea name="shortDescription" placeholder="Short Description" required value={formData.shortDescription} onChange={handleChange} className="w-full p-3 border rounded"></textarea>
        <input type="text" name="createdAt" placeholder="Created At (e.g., 100 BC)" required value={formData.createdAt} onChange={handleChange} className="w-full p-3 border rounded" />
        <input type="text" name="discoveredAt" placeholder="Discovered At (e.g., 1799)" required value={formData.discoveredAt} onChange={handleChange} className="w-full p-3 border rounded" />
        <input type="text" name="discoveredBy" placeholder="Discovered By" required value={formData.discoveredBy} onChange={handleChange} className="w-full p-3 border rounded" />
        <input type="text" name="presentLocation" placeholder="Present Location" required value={formData.presentLocation} onChange={handleChange} className="w-full p-3 border rounded" />

        <input type="text" value={user?.displayName || ""} readOnly className="w-full p-3 border rounded bg-gray-100" />
        <input type="email" value={user?.email || ""} readOnly className="w-full p-3 border rounded bg-gray-100" />

        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition">
          Add Artifact
        </button>
      </form>
    </section>
  );
};

export default AddArtifact;
