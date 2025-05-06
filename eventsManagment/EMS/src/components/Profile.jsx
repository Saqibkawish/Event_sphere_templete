import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { useNavigate, Link } from "react-router-dom";
import "./Profile.css"; // Import CSS

export const Profile = () => {
  const { isLoggedIn, logoutUser } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("No token found! Please log in.");
        navigate("/login");
        return;
      }

      try {
        const response = await fetch("http://localhost:5001/api/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          setUser(await response.json());
        } else {
          setError("Unauthorized access. Please check your credentials.");
          logoutUser();
          navigate("/login");
        }
      } catch (error) {
        setError("Error fetching profile.");
        console.error(error);
      }
    };

    fetchProfile();
  }, [isLoggedIn, navigate, logoutUser]);

  return (
    <div className="profile-container">
      {error && <p className="error-message">{error}</p>}
      {user ? (
        <div className="profile-card">
          <img
            src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
            alt="Profile"
            className="profile-image"
          />
          <h1>{user.username}</h1>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
          <button className="logout-btn" onClick={logoutUser}>
            Logout
          </button>
          <div className="forgot-password">
            <Link to="/ForgotPassword">Forgot Password?</Link>
          </div>
        </div>
      ) : (
        <p className="loading-text">Loading...</p>
      )}
    </div>
  );
};
