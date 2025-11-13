import api from "../api/axios";
import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [token, setToken] = useState(localStorage.getItem('token'));

    const login = async (identifier, password) => {
        const res = await api.post('/login', { identifier, password});
        setUser(res.data.user);
        setToken(res.data.token);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
    }

    const logout = async() => {
        await api.post('/logout');
        setUser(null);
        setToken(null);
        localStorage.clear();
    };

    return (
        <AuthContext.Provider value={{user, token, login, logout}}>
            { children }
        </AuthContext.Provider>
    );
};