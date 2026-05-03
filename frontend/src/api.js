// API utility for making authenticated requests
const API_BASE_URL = 'http://localhost:5000/api';

export const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Get token from localStorage
  const token = localStorage.getItem('token');
  
  // Set default headers
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  // Add token to request header if available
  if (token) {
    headers['x-auth-token'] = token;
  }
  
  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || data.msg || 'API request failed');
    }
    
    return { success: true, data };
  } catch (error) {
    return { 
      success: false, 
      error: error.message || 'An error occurred'
    };
  }
};

// Specific API methods
export const jobApi = {
  getAll: () => apiCall('/jobs'),
  getById: (id) => apiCall(`/jobs/${id}`),
  create: (jobData) => apiCall('/jobs', {
    method: 'POST',
    body: JSON.stringify(jobData),
  }),
  update: (id, jobData) => apiCall(`/jobs/${id}`, {
    method: 'PUT',
    body: JSON.stringify(jobData),
  }),
  delete: (id) => apiCall(`/jobs/${id}`, {
    method: 'DELETE',
  }),
  apply: (jobId) => apiCall(`/jobs/${jobId}/apply`, {
    method: 'POST',
  }),
};

export const userApi = {
  getProfile: (userId) => apiCall(`/users/${userId}`),
  updateProfile: (userId, userData) => apiCall(`/users/${userId}`, {
    method: 'PUT',
    body: JSON.stringify(userData),
  }),
  getCurrentUser: () => apiCall('/auth/me'),
};

export const authApi = {
  login: (email, password) => apiCall('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  }),
  register: (userData) => apiCall('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),
  getCurrentUser: () => apiCall('/auth/me'),
};
