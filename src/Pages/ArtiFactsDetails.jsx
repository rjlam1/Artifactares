import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../AuthProvider/AuthContext/AuthProvider";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const ArtifactDetail = () => {
  const { id } = useParams();
  const { user, loading: authLoading, accessToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const [artifact, setArtifact] = useState(null);
  const [isLiking, setIsLiking] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (authLoading) return;

    const fetchArtifact = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/artifacts/${id}`);
        const data = response.data;

        const validatedData = {
          ...data,
          likeCount: typeof data.likeCount === 'number' ? data.likeCount : 0,
          likedBy: Array.isArray(data.likedBy) ? data.likedBy : []
        };

        setArtifact(validatedData);
      } catch (err) {
        console.error("Failed to fetch artifact:", err);
        setError(err.response?.data?.error || "Failed to load artifact");
        toast.error(err.response?.data?.error || "Failed to load artifact");
      } finally {
        setLoading(false);
      }
    };

    fetchArtifact();
  }, [id, user, authLoading]);

const handleToggleLike = async () => {
  if (!user) {
    toast.error("Please login to like artifacts");
    navigate('/login', { state: { from: `/artifacts/${id}` } });
    return;
  }

  if (isLiking) return;
  setIsLiking(true);

  try {
   
    const token = await user.getIdToken();

    const response = await axios.patch(
      `${API_BASE_URL}/artifacts/${id}/like`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.success) {
      setArtifact(prev => ({
        ...prev,
        likeCount: response.data.likeCount,
        likedBy: response.data.likedBy,
      }));
      toast.success(response.data.isLiked ? "Liked successfully" : "Removed like");
    }
  } catch (err) {
    console.error("Failed to toggle like:", err);
    toast.error(err.response?.data?.error || "Failed to toggle like");
  } finally {
    setIsLiking(false);
  }
};

  const isLikedByUser = user?.email && artifact?.likedBy?.includes(user.email);

  if (loading || authLoading) {
    return <div className="text-center mt-10">Loading artifact details...</div>;
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-red-500">
        <p>{error}</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Back to Home
        </button>
      </div>
    );
  }

  if (!artifact) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <ToastContainer position="top-center" autoClose={3000} />

      <div className="rounded-lg shadow-md overflow-hidden bg-white">
        <div className="p-6">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">{artifact.name}</h2>

          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <div className="md:w-1/2">
              <img
                src={artifact.image}
                alt={artifact.name}
                className="w-full h-64 object-cover rounded-lg shadow-sm"
                onError={(e) => {
                  // e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Available';
                  e.target.alt = 'Image Not Available';
                }}
              />
            </div>

            <div className="md:w-1/2 space-y-4 text-gray-700">
              <p><strong>Type:</strong> {artifact.type}</p>
              <p><strong>Historical Context:</strong> {artifact.historicalContext}</p>
              <p><strong>Description:</strong> {artifact.shortDescription}</p>
              <p><strong>Created At:</strong> {artifact.createdAt}</p>
              <p><strong>Discovered At:</strong> {artifact.discoveredAt}</p>
              <p><strong>Discovered By:</strong> {artifact.discoveredBy}</p>
              <p><strong>Present Location:</strong> {artifact.presentLocation}</p>
            </div>
          </div>

          <div className="flex justify-between items-center border-t pt-4 mt-4">
            <div>
              <p className="text-sm text-gray-600">
                Added by: {artifact.adderName} ({artifact.adderEmail})
              </p>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={handleToggleLike}
                disabled={isLiking}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                  isLikedByUser ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
                } text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50 ${isLiking ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isLiking ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  <>
                    {isLikedByUser ? (
                      <span className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                        Unlike
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        Like
                      </span>
                    )}
                  </>
                )}
              </button>
              <span className="font-bold text-gray-800">
                {artifact.likeCount} likes
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtifactDetail;