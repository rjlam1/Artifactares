import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../AuthProvider/AuthContext/AuthProvider";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ArtifactDetail = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [artifact, setArtifact] = useState(null);
  const [isLiking, setIsLiking] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtifact = async () => {
      try {
        console.log("Fetching artifact with id:", id);
        const response = await axios.get(`http://localhost:3000/artifacts/${id}`);
        console.log("Artifact data received:", response.data);
        setArtifact(response.data);
      } catch (err) {
        console.error("Failed to fetch artifact:", err);
        setError("Failed to load artifact details");
        toast.error(`Failed to load artifact: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchArtifact();
  }, [id]);

  const handleLike = async () => {
    if (!user) {
      toast.error("Please login to like artifacts");
      return;
    }

    if (isLiking) return;
    
    setIsLiking(true);
    const previousLikeCount = artifact.likeCount;
    
    try {
      // Optimistic UI update
      setArtifact(prev => ({
        ...prev,
        likeCount: prev.likeCount + 1
      }));

      // Send PATCH request to backend
      await axios.patch(`http://localhost:3000/artifacts/${id}`, {
        likeCount: previousLikeCount + 1
      });

      toast.success("You liked this artifact!");
    } catch (err) {
      console.error("Failed to update like:", err);
      toast.error("Like failed. Please try again.");
      
      // Revert UI if request fails
      setArtifact(prev => ({
        ...prev,
        likeCount: previousLikeCount
      }));
    } finally {
      setIsLiking(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-red-500">
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!artifact) {
    return <p className="text-center mt-10">No artifact data found</p>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
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
      />
      
      <h2 className="text-3xl font-bold mb-4">{artifact.name}</h2>
      
      <div className="mb-6">
        <img 
        //   src={artifact.image} 
          alt={artifact.name} 
          className="w-full max-h-[400px] object-cover rounded-lg shadow-md"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Available';
          }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-3">
          <p><strong className="text-gray-700">Type:</strong> {artifact.type}</p>
          <p><strong className="text-gray-700">Historical Context:</strong> {artifact.historicalContext}</p>
          <p><strong className="text-gray-700">Description:</strong> {artifact.shortDescription}</p>
        </div>
        <div className="space-y-3">
          <p><strong className="text-gray-700">Created At:</strong> {new Date(artifact.createdAt).toLocaleDateString()}</p>
          <p><strong className="text-gray-700">Discovered At:</strong> {artifact.discoveredAt}</p>
          <p><strong className="text-gray-700">Discovered By:</strong> {artifact.discoveredBy}</p>
          <p><strong className="text-gray-700">Present Location:</strong> {artifact.presentLocation}</p>
        </div>
      </div>

      <div className="border-t pt-4">
        <p className="text-sm text-gray-500">
          <strong>Added By:</strong> {artifact.adderName} ({artifact.adderEmail})
        </p>
      </div>

      <div className="mt-8 flex items-center gap-4">
        <button 
          onClick={handleLike}
          disabled={isLiking}
          className={`flex items-center gap-2 px-6 py-2 rounded-lg transition ${
            isLiking 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-red-500 hover:bg-red-600 text-white'
          }`}
        >
          {isLiking ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Liking...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              Like
            </>
          )}
        </button>
        
        <div className="flex items-center gap-2">
          <span className="text-xl font-semibold">{artifact.likeCount}</span>
          <span className="text-gray-600">likes</span>
        </div>
      </div>
    </div>
  );
};

export default ArtifactDetail;
