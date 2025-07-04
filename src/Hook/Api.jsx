import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const artifactApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getFeaturedArtifacts = async () => {
  try {
    const response = await artifactApi.get('/artifacts/featured');
    return response.data;
  } catch (error) {
    console.error('Error fetching featured artifacts:', error);
    throw error;
  }
};