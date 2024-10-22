import axios from 'axios';

// Create an Axios instance with the base URL from environment variables
const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}/api`
});

// Request interceptor to add the Authorization header
axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('Access_Token');
        
        // Check if the token exists before adding it to the headers
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config; // Make sure to return the config
    },
    (error) => {
        // Handle errors in the request setup phase
        return Promise.reject(error);
    }
);

// Response interceptor to handle responses and errors
axiosClient.interceptors.response.use(
    (response) => {
        return response; // Return the response data as it is
    },
    (error) => {
        const { response } = error;

        if (response && response.status === 401) {
            // If 401 error (Unauthorized), clear the access token
            localStorage.removeItem('Access_Token');
        }

        // Handle the error and rethrow it
        return Promise.reject(error);
    }
);

export default axiosClient;
