import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const storedToken = await AsyncStorage.getItem('token');
                const storedRefreshToken = await AsyncStorage.getItem('refreshToken');
                if (storedToken) {
                    const isTokenValid = await verifyToken(storedToken);
                    if (isTokenValid) {
                        setToken(storedToken);
                        setRefreshToken(storedRefreshToken);
                        setIsLoggedIn(true);
                    } else {
                        const newToken = await refreshJwtToken(storedRefreshToken);
                        if (newToken) {
                            setToken(newToken);
                            setIsLoggedIn(true);
                        } else {
                            await AsyncStorage.removeItem('token');
                            await AsyncStorage.removeItem('refreshToken');
                        }
                    }
                }
            } catch (error) {
                console.error('Failed to fetch login status from storage', error);
            } finally {
                setLoading(false);
            }
        };

        checkLoginStatus();
    }, []);

    const verifyToken = async (token) => {
        try {
            const response = await axios.post('https://isen3-back.onrender.com/api/users/verify-token', { token });
            return response.data.valid;
        } catch (error) {
            console.error('Failed to verify token', error);
            return false;
        }
    };

    const refreshJwtToken = async (refreshToken) => {
        try {
            const response = await axios.post('https://isen3-back.onrender.com/api/users/refresh-token', {
                refreshToken: refreshToken
            });

            const { token: newToken } = response.data;

            if (newToken) {
                await AsyncStorage.setItem('token', newToken);
                setToken(newToken);
                return newToken;
            } else {
                return null;
            }
        } catch (error) {
            console.error('Failed to refresh token', error);
            return null;
        }
    };

    const login = async (token, refreshToken) => {
        if (token) {
            await AsyncStorage.setItem('token', token);
        }
        if (refreshToken) {
            await AsyncStorage.setItem('refreshToken', refreshToken);
        }
        setToken(token);
        setRefreshToken(refreshToken);
        setIsLoggedIn(true);
    };

    const logout = async () => {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('refreshToken');
        setToken(null);
        setRefreshToken(null);
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, token, refreshJwtToken, verifyToken }}>
            {children}
        </AuthContext.Provider>
    );
};