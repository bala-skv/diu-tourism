
// Signup.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Signup = () => {
    const [name, setName] = useState("");
    const [user, setuser] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (event) => {
        event.preventDefault();
        setMessage("");

        try {
            const response = await axios.post("http://localhost:5000/signup", {user_name:name, user_id:user, user_password:password }, { withCredentials: true });
            if (response.status === 201) {
                setMessage("Signup successful! 🎉");
                navigate("/login"); // ✅ Redirect to login after signup
            }
        } catch (error) {
            setMessage(error.response?.data?.error || "Something went wrong.");
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSignup}>
                <h2>Signup</h2>
                <div className="input-group">
                    <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="input-group">
                    <input type="user" placeholder="user" value={user} onChange={(e) => setuser(e.target.value)} required />
                </div>
                <div className="input-group">
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                {message && <p className="message">{message}</p>}
                <button type="submit">Signup</button>
            </form>
        </div>
    );
};

export default Signup;
