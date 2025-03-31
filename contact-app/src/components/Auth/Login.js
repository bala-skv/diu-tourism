import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
    const [user_name, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        setMessage("");

        try {
            const response = await axios.post("http://localhost:5000/login", { user_name, password }, { withCredentials: true });
            if (response.status === 200) {
                setMessage("Login successful! 🎉");
                navigate("/"); // ✅ Redirect after login
            }
        } catch (error) {
            setMessage(error.response?.data?.error || "Something went wrong.");
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleLogin}>
                <h2>Login</h2>
                <div className="input-group">
                    <input type="text" placeholder="Username" value={user_name} onChange={(e) => setUserName(e.target.value)} required />
                </div>
                <div className="input-group">
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                {message && <p className="message">{message}</p>}
                <button type="submit">Login</button>
                <button type="button" onClick={() => navigate("/signup")}>Signup</button>
            </form>
        </div>
    );
};

export default Login;