import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../AuthProvider/AuthContext/AuthProvider";
import { Helmet } from "react-helmet";

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
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Helmet>
          <title>ArtifactEra | ArtifactDetails</title>
        </Helmet>
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 bg-gray-200 rounded-full mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-32"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
        <div className="max-w-md w-full bg-white rounded-xl shadow-md overflow-hidden p-8 text-center">
          <div className="text-red-500 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Error Loading Artifact</h2>
          <p className="text-gray-600 mb-8">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (!artifact) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-8 lg:py-12  sm:px-6 lg:px-8">
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
        theme="colored"
      />

      <div className="max-w-8xl mx-auto">
        <div className="bg-gradient-to-b from-gray-900 to-gray-800 rounded-2xl shadow-xl overflow-hidden">
         
          <div className="relative h-64 bg-gradient-to-r from-gray-900 to-gray-700 flex items-center justify-center">
            <div className="absolute inset-0 bg-black opacity-40"></div>
            <h1 className="relative z-10 text-4xl md:text-5xl font-bold text-white text-center px-4">
              {artifact.name}
            </h1>
          </div>

       
          <div className="lg:p-8 md:p-10">
            <div className="flex flex-col lg:flex-row gap-10">
             
              <div className="lg:w-1/2">
                <div className="relative rounded-xl overflow-hidden shadow-lg h-96 bg-gray-100">
                  <img
                    src={artifact.image}
                    alt={artifact.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/800x600?text=Image+Not+Available';
                      e.target.className = 'w-full h-full object-contain p-8';
                    }}
                  />
                </div>
              </div>

            
              <div className="lg:w-1/2 p-3">
                <div className="space-y-6">
                  <div className="border-b border-gray-200 pb-6">
                    <h2 className="text-2xl font-semibold text-stone-600 mb-2">Artifact Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Type</p>
                        <p className="text-lg">{artifact.type}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Historical Context</p>
                        <p className="text-lg">{artifact.historicalContext}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Discovered At</p>
                        <p className="text-lg">{artifact.discoveredAt}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Present Location</p>
                        <p className="text-lg">{artifact.presentLocation}</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-xl font-semibold text-stone-600 mb-3">Description</h3>
                    <p className="text-gray-600 leading-relaxed">{artifact.shortDescription}</p>
                  </div>

                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-xl font-semibold text-stone-600 mb-3">Discovery Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Discovered By</p>
                        <p className="text-lg">{artifact.discoveredBy}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Creation Date</p>
                        <p className="text-lg">{artifact.createdAt}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="text-sm text-gray-500">
                      <p>Added by: <span className="font-medium text-gray-700">{artifact.adderName}</span></p>
                      <p className="text-xs">{artifact.adderEmail}</p>
                    </div>

                    <div className="flex items-center gap-4">
                      <button
                        onClick={handleToggleLike}
                        disabled={isLiking}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-full ${
                          isLikedByUser 
                            ? 'bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800' 
                            : 'bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800'
                        } text-white font-medium transition-all duration-300 shadow-md hover:shadow-lg ${
                          isLiking ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                      >
                        {isLiking ? (
                          <span className="flex items-center gap-2">
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </span>
                        ) : (
                          <>
                            {isLikedByUser ? (
                              <span className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                </svg>
                                Unlike
                              </span>
                            ) : (
                              <span className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                                Like
                              </span>
                            )}
                          </>
                        )}
                      </button>
                      <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                        <span className="font-bold text-stone-600">
                          {artifact.likeCount} {artifact.likeCount === 1 ? 'like' : 'likes'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtifactDetail;