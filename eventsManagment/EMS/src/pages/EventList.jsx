// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import "../components/user.css"; // Create this CSS file

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editUserId, setEditUserId] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    role: "",
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/auth/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setEditUserId(user._id);
    setFormData({
      username: user.username,
      email: user.email,
      phone: user.phone,
      role: user.role,
    });
  };

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await fetch(
          `http://localhost:5001/api/auth/users/${userId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete user");
        }

        setUsers(users.filter((user) => user._id !== userId));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5001/api/auth/users/${editUserId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      const updatedUser = await response.json();
      setUsers(users.map((user) => 
        user._id === updatedUser.user._id ? updatedUser.user : user
      ));
      setEditUserId(null);
      setFormData({ username: "", email: "", phone: "", role: "" });
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="users-container">
      <h1>All Users</h1>
      {error && <div className="error">{error}</div>}
      
      {editUserId && <div className="overlay" />}
      
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.role}</td>
              <td>
                <button 
                  className="edit-btn"
                  onClick={() => handleEdit(user)}
                >
                  Edit
                </button>
                <button 
                  className="delete-btn"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editUserId && (
        <div className="edit-form">
          <h2>Edit User</h2>
          <form onSubmit={handleUpdate}>
            <input
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
            {/* Role Dropdown */}
  <select
    value={formData.role}
    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
    required
  >
    <option value="">Select Role</option>
    <option value="admin">Admin</option>
    <option value="exhibitor">exhibitor</option>
    <option value="user">User</option>
  </select>
            <div className="form-actions">
              <button className="update-btn" type="submit">
                Update User
              </button>
              <button 
                className="cancel-btn" 
                type="button" 
                onClick={() => setEditUserId(null)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Users;