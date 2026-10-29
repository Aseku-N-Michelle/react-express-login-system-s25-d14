import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config';

const AuthContext = createContext();

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    async function register(name, email, password, confirmPassword) {
        try {
            const response = await axios.post(`${API_URL}/register`, { name, email, password, confirmPassword }, { withCredentials: true });

            if (response.data.success) {
                setUser(response.data.user);
            } else {
                alert(response.data.message || "An error occurred");
            }
        } catch (error) {
            if (error.response && error.response.data) {
                alert(error.response.data.message || "An error occurred");
            } else {
                alert("An error occurred");
            }
            console.error("Registration error:", error);
        }
    }

    async function login(email, password) {
        try {
            const response = await axios.post(`${API_URL}/login`, { email, password }, { withCredentials: true });

            if (response.data.success) {
                setUser(response.data.user);
            } else {
                alert(response.data.message || "An error occurred");
            }
        } catch (error) {
            if (error.response && error.response.data) {
                alert(error.response.data.message || "An error occurred");
            } else {
                alert("An error occurred");
            }
            console.error("Login error:", error);
        }
    }

    async function logout() {
        setUser(null);
        try {
            await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
        } catch (error) {
            console.error("Logout error:", error);
        }
    }

    return (
        <AuthContext.Provider value={{ user, setUser, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    return useContext(AuthContext);
}

export { AuthProvider, useAuth };