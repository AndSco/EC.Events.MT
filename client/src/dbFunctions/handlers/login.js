import axios from "axios";

export const authenticate = async (username, password) => {
  try {
    const response = await axios.post("./api/admin/login", {
      username,
      password
    });
    const isAuthenticated = response.data.managedToLogin;
    const { token } = response.data;
    return { isAuthenticated, token };
  } catch (err) {
    throw err;
  }
};

// To pass authentication token header
export const setTokenHeader = token => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`; // WHEN USER LOGS IN
  } else {
    delete axios.defaults.headers.common["Authorization"]; // WHEN USER LOGS OUT
  }
};
