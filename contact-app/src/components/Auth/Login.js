import React, { useState } from "react";
import axios from "axios";
import "./login.css";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");

        try {
            const response = await axios.post("http://localhost:5001/login", {
                username,
                password
            });

            if (response.status === 201) {
                setSuccessMessage("User registered successfully! 🎉");
                setUsername("");
                setPassword("");
            }
        } catch (error) {
            setErrorMessage(error.response?.data?.error || "Registration failed.");
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <form className="login-form" onSubmit={handleSubmit}>
                    <h2>Register</h2>
                    <div className="input-group">
                        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="input-group">
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    {successMessage && <p className="success-message">{successMessage}</p>}
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
