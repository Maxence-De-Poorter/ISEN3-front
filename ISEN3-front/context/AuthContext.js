import React, { createContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {ActivityIndicator} from "react-native";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    const [user, setUser] = useState(null);
    const [association, setAssociation] = useState(null);
    const [loading, setLoading] = useState(true);

    const verifyToken = useCallback(async (token) => {
        try {
            const response = await axios.post('https://isen3-back.onrender.com/api/users/verify-token', { token });
            return response.data.valid;
        } catch (error) {
            console.error('Failed to verify token', error);
            return false;
        }
    }, []);

    const refreshJwtToken = useCallback(async (refreshToken) => {
        try {
            const response = await axios.post('https://isen3-back.onrender.com/api/users/refresh-token', { refreshToken });
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
    }, []);

    const fetchUserProfile = useCallback(async (token) => {
        try {
            const response = await axios.get('https://isen3-back.onrender.com/api/users/me', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUser(response.data);

        } catch (error) {
            console.error('Failed to fetch user profile', error);
        }
    }, []);

    // Fetch association info id =0
    const fetchAssociationInfo = useCallback(async () => {
        try {
            const response = await axios.get('https://isen3-back.onrender.com/api/associations/0');
            setAssociation(response.data);
        } catch (error) {
            console.error('Failed to fetch association info', error);
        }
    }, []);


    const checkLoginStatus = useCallback(async () => {
        try {
            const storedToken = await AsyncStorage.getItem('token');
            const storedRefreshToken = await AsyncStorage.getItem('refreshToken');
            if (storedToken) {
                const isTokenValid = await verifyToken(storedToken);
                if (isTokenValid) {
                    setToken(storedToken);
                    setRefreshToken(storedRefreshToken);
                    setIsLoggedIn(true);
                    await fetchUserProfile(storedToken);
                } else {
                    const newToken = await refreshJwtToken(storedRefreshToken);
                    if (newToken) {
                        setToken(newToken);
                        setRefreshToken(storedRefreshToken);
                        setIsLoggedIn(true);
                        await fetchUserProfile(newToken);
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
    }, [verifyToken, refreshJwtToken, fetchUserProfile]);

    useEffect(() => {
        fetchAssociationInfo();
        checkLoginStatus();
    }, [checkLoginStatus]);

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
        await fetchUserProfile(token);
    };

    const logout = async () => {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('refreshToken');
        setToken(null);
        setRefreshToken(null);
        setIsLoggedIn(false);
        setUser(null);
    };

    const updateUser = (updatedUser) => {
        setUser(updatedUser);
    };

    if (loading) {
        return ;
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, token, refreshJwtToken, verifyToken, loading, user, updateUser, association}}>
            {children}
        </AuthContext.Provider>
    );
};