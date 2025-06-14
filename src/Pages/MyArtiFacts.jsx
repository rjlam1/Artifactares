import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router"; 
import Swal from "sweetalert2";
import { AuthContext } from "../AuthProvider/AuthContext/AuthProvider";

const MyArtifacts = () => {
  const { user } = useContext(AuthContext); 
  const [myArtifacts, setMyArtifacts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyArtifacts = async () => {
      try {
        const token = await user.getIdToken();
        console.log("Token sending from client:", token);
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/my-artifacts`,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true, 
          }
        );
        setMyArtifacts(res.data);
      } catch (error) {
        console.error("Failed to fetch artifacts:", error);
      }
    };

    if (user) {
      fetchMyArtifacts();
    }
  }, [user]);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This artifact will be deleted permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        const token = await user.getIdToken();
        await axios.delete(
          `${import.meta.env.VITE_API_BASE_URL}/artifacts/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        Swal.fire("Deleted!", "Artifact has been deleted.", "success");
        setMyArtifacts((prev) => prev.filter((item) => item._id !== id));
      } catch (error) {
        console.error("Delete error:", error);
        Swal.fire("Error!", "Could not delete artifact.", "error");
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Artifacts</h2>
      {myArtifacts.length === 0 ? (
        <p className="text-gray-600">
          No artifacts added yet. Add your historical findings!
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {myArtifacts.map((artifact) => (
            <div key={artifact._id} className="border rounded-lg p-4 shadow">
              <img
                src={artifact.image}
                alt={artifact.name}
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="text-xl font-semibold mt-2">{artifact.name}</h3>
              <p className="text-sm text-gray-700">
                {artifact.shortDescription}
              </p>
              <div className="flex justify-between mt-3">
                <Link
                  to={`/update/${artifact._id}`}
                  className="btn btn-primary"
                >
                  Update
                </Link>
                <button
                  onClick={() => handleDelete(artifact._id)}
                  className="btn btn-error"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyArtifacts;
