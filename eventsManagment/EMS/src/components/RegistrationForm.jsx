import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import "../components/reg.css";
const RegistrationForm = ({ eventId, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post("http://localhost:5001/api/events/register", {
        ...formData,
        eventId,
      });

      setMessage(response.data.message);
      setTimeout(() => {
        onClose();
      }, 2000);
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setMessage("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registration-modal">
       <div className="modal-content">
      <h2>Register for Event</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Your Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Your Email" onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Your Phone Number" onChange={handleChange} required />
        <button type="submit" disabled={loading}>{loading ? "Registering..." : "Register"}</button>
      </form>
      {message && <p className={message.includes("failed") ? "error" : ""}>{message}</p>}
      <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

RegistrationForm.propTypes = {
  eventId: PropTypes.string.isRequired, 
  onClose: PropTypes.func.isRequired, 
};

export default RegistrationForm;
