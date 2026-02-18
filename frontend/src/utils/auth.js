// Store JWT token
export const setToken = (token) => {
  localStorage.setItem('token', token);
};

// Get JWT token
export const getToken = () => {
  return localStorage.getItem('token');
};

// Remove JWT token
export const removeToken = () => {
  localStorage.removeItem('token');
};

// Store user data
export const setUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

// Get user data
export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// Remove user data
export const removeUser = () => {
  localStorage.removeItem('user');
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!getToken();
};

// Logout
export const logout = () => {
  removeToken();
  removeUser();
};
