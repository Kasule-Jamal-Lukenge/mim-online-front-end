import api from "../api/axios";
import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [user, setUser] = useState(() => { 
    try {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
        } catch (err) {
        console.error("Error parsing user from localStorage:", err);
        localStorage.removeItem("user");
        return null;
        }
    });

    const [token, setToken] = useState(localStorage.getItem('token'));

    const login = async (identifier, password) => {
        const res = await api.post('/login', { identifier, password});
        setUser(res.data.user);
        setToken(res.data.token);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
    }

    const register = async(data) => {
        const res = await api.post('/register', data);
        setUser(res.data.user);
        setToken(res.data.token);
        localStorage.setItem('user', res.data.user);
        localStorage.setItem('token', res.data.token);
    };

    const logout = async() => {
        await api.post('/logout');
        setUser(null);
        setToken(null);
        localStorage.clear();
    };

    return (
        <AuthContext.Provider value={{user, token, register, login, logout}} >
            { children }
        </AuthContext.Provider>
    );
};