// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useAuth } from "../store/auth"; // Adjust import path as needed

export const Messages = ({ receiverId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { userId, role } = useAuth(); // Get userId and role from auth context

  const fetchMessages = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5001/api/messages/conversation/${receiverId}`,
        { 
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } 
        }
      );
      setMessages(response.data.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [receiverId]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      await axios.post(
        "http://localhost:5001/api/messages/send",
        { 
          senderType: role, // Ensure senderType is included
          senderId: userId, // Explicitly send senderId
          receiverId, 
          message: newMessage 
        },
        { 
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      );
      setNewMessage("");
      fetchMessages(); // Refresh messages
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="messages-container">
      <h2>Messages</h2>
      <div className="message-list">
        {messages.map((msg) => (
          <div 
            key={msg._id} 
            className={`message ${msg.senderId.toString() === userId.toString() ? 'sent' : 'received'}`}
          >
            <div className="message-header">
              <span className="sender-role">{msg.senderType}</span>
              <span className="message-time">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </span>
            </div>
            <p className="message-content">{msg.message}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="message-form">
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          maxLength="500"
        />
        <button type="submit" disabled={!newMessage.trim()}>
          Send
        </button>
      </form>
    </div>
  );
};

Messages.propTypes = {
  receiverId: PropTypes.string.isRequired
};

export default Messages;
