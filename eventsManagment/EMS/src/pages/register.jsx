import { useState } from 'react';
import "../components/PublicEvents.css"; 
export const Register = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    role: 'user', // Add role field with default value 'user'
  });

  const [error, setError] = useState(''); // State for error messages
  const [loading, setLoading] = useState(false); // State for loading indicator

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true during the API call
    setError(''); // Clear any previous errors

    try {
      const response = await fetch('http://localhost:5001/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const responseData = await response.json();
        alert('Registration Successful');
        setUser({ username: '', email: '', phone: '', password: '', role: 'user' }); // Reset form
        console.log('Registration Response:', responseData);
      } else {
        const errorData = await response.json(); // Parse error response
        setError(errorData.message || 'Registration failed. Please try again.'); // Set error message
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An unexpected error occurred. Please try again.'); // Set generic error message
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <>
      <section>
        <main>
          <br />
          <br />
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="registration-image">
                <img
                  src="/img/logor.jpg"
                  alt="A person trying to fill the registration form"
                  width="1500px"
                  height="1500px"
                />
              </div>
              {/* Registration Form Code */}
              <div className="registration-form">
                <h1 className="main-heading mb-3">Registration Form</h1>
                <br />
                {error && <p className="error-message">{error}</p>} {/* Display error message */}
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      name="username"
                      value={user.username}
                      onChange={handleInput}
                      placeholder="Username"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={user.email}
                      onChange={handleInput}
                      placeholder="Email"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={user.phone}
                      onChange={handleInput}
                      placeholder="Phone"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={user.password}
                      onChange={handleInput}
                      placeholder="Password"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
  <div className="input-group">
    <label htmlFor="role" className="input-label">
      Select  Role
      <span className="required-indicator">*</span>
    </label>
    <div className="select-wrapper">
      <select
        name="role"
        id="role"
        value={user.role}
        onChange={handleInput}
        className="role-select"
        required
      >
        <option value="" disabled>Choose a role</option>
        <option value="user" className="role-option">
          <span className="role-icon">👤</span>
          Standard User
        </option>
        <option value="admin" className="role-option">
          <span className="role-icon">🛡️</span>
          Administrator
        </option>
      </select>
      <div className="select-arrow">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
          <path fill="currentColor" d="M7 10l5 5 5-5z"/>
        </svg>
      </div>
    </div>
    <div className="role-hint">Choose appropriate access level for the user</div>
  </div>
</div>
                
                  <br />
                  <button type="submit" className="btn btn-submit" disabled={loading}>
                    {loading ? 'Registering...' : 'Register Now'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};