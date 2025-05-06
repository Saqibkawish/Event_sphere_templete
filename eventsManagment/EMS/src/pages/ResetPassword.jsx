import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export const ResetPassword = () => {
    const { token } = useParams();  // Get token from URL
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Passwords do not match!");
            return;
        }

        try {
            const response = await fetch("http://localhost:5001/api/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, password }),
            });

            const data = await response.json();
            setMessage(data.message);

            if (response.ok) {
                setTimeout(() => navigate("/login"), 2000);
            }
        // eslint-disable-next-line no-unused-vars
        } catch (error) {
            setMessage("Error resetting password. Try again.");
        }
    };

    return (
        <div>
            <h1>Reset Password</h1>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type="submit">Reset Password</button>
            </form>
        </div>
    );
};
