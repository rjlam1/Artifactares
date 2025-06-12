// src/hooks/useFeaturedArtifacts.js
import { useEffect, useState } from 'react';
import axios from 'axios';

const useFeaturedArtifacts = () => {
  const [artifacts, setArtifacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3000/artifacts/featured')
      .then(res => setArtifacts(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return { artifacts, loading };
};

export default useFeaturedArtifacts;







