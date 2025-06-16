
import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const useFeaturedArtifacts = () => {
  const [artifacts, setArtifacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtifacts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/artifacts/featured`);
        
       
        if (response.data && Array.isArray(response.data)) {
          setArtifacts(response.data);
        } else {
          throw new Error('Invalid data format received from server');
        }
      } catch (err) {
        setError(err.response?.data?.error || 
                err.message || 
                "Failed to fetch featured artifacts");
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArtifacts();

  
    return () => {
      
    };
  }, []);

  return { artifacts, loading, error };
};

export default useFeaturedArtifacts;