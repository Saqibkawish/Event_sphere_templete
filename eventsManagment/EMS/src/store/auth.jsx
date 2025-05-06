import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const AuthContext = createContext();

const SERVICE_ENDPOINT = 'http://localhost:5001/api/events/events';

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');
  const [userRole, setUserRole] = useState(() => localStorage.getItem('userRole') || ''); // Load from localStorage
  const [email, setEmail] = useState(() => localStorage.getItem('email') || ''); // Load from localStorage
  const [services, setServices] = useState([]);

  const isLoggedIn = !!token;

  useEffect(() => {
    // Ensure userRole is set properly when page loads
    const storedRole = localStorage.getItem('userRole');
    const storedEmail = localStorage.getItem('email');
    if (storedRole) {
      setUserRole(storedRole);
    }
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(SERVICE_ENDPOINT, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch the current services');
        }
        const data = await response.json();
        setServices(data.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    if (token) {
      fetchServices();
    } else {
      setServices([]);
    }
  }, [token]);

  const saveTokenInLocalStr = (serverToken, role, userEmail) => {
    setToken(serverToken);
    setUserRole(role);
    setEmail(userEmail);  // Save email to state and localStorage
    localStorage.setItem('token', serverToken);
    localStorage.setItem('userRole', role);
    localStorage.setItem('email', userEmail);  // Save email in localStorage
  };

  const logoutUser = () => {
    setToken('');
    setUserRole('');
    setEmail('');
    setServices([]);
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('email'); // Remove email from localStorage
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        userRole,
        email, // Provide email in context
        services,
        saveTokenInLocalStr,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return authContextValue;
};
