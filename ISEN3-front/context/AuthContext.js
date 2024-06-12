import React, { createContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    const [user, setUser] = useState(null);
    const [association, setAssociation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async (url, options = {}) => {
        try {
            const response = await axios.get(url, options);
            return response.data;
        } catch (error) {
            console.error(`Failed to fetch ${url}`, error);
            setError(`Failed to fetch ${url}`);
            return null;
        }
    }, []);

    const verifyToken = useCallback(async () => {
        try {
            const response = await axios.post('https://isen3-back.onrender.com/api/auth/verify-token', { token });
            return response.data.valid;
        } catch (error) {
            console.error('Failed to verify token', error);
            return false;
        }
    }, [token]);

    const refreshJwtToken = useCallback(async () => {
        try {
            const response = await axios.post('https://isen3-back.onrender.com/api/auth/refresh-token', { refreshToken });
            const { token: newToken } = response.data;
            if (newToken) {
                await AsyncStorage.setItem('token', newToken);
                setToken(newToken);
                return newToken;
            }
            return null;
        } catch (error) {
            console.error('Failed to refresh token', error);
            return null;
        }
    }, [refreshToken]);

    const fetchUserProfile = useCallback(async () => {

        const token = await AsyncStorage.getItem('token');

        const data = await fetchData('https://isen3-back.onrender.com/api/users/me', {
            headers: { Authorization: `Bearer ${token}` },
        });
        setUser(data);
    }, [fetchData, token]);

    const fetchAssociationInfo = useCallback(async () => {
        const data = await fetchData('https://isen3-back.onrender.com/api/associations/0');
        setAssociation(data);
    }, [fetchData]);

    const checkAndRefreshToken = useCallback(async () => {
        if (!token) return false;
        const isTokenValid = await verifyToken();
        console.log('Token is valid:', isTokenValid);
        if (isTokenValid) return true;

        const newToken = await refreshJwtToken();
        console.log('New token:', newToken);
        if (newToken) return true;

        await logout(); // Logout if token refresh fails
        return false;
    }, [token, verifyToken, refreshJwtToken]);

    const initialize = useCallback(async () => {
        try {
            const storedToken = await AsyncStorage.getItem('token');
            const storedRefreshToken = await AsyncStorage.getItem('refreshToken');
            setToken(storedToken);
            setRefreshToken(storedRefreshToken);

            await fetchAssociationInfo();

            const isAuthenticated = await checkAndRefreshToken();
            if (isAuthenticated) {
                await fetchUserProfile();
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        } catch (error) {
            console.error('Failed to initialize app', error);
        } finally {
            setLoading(false);
        }
    }, [checkAndRefreshToken, fetchAssociationInfo, fetchUserProfile]);

    useEffect(() => {
        initialize();
        console.log('Initialized AuthProvider');
    }, [initialize]);

    const login = useCallback(async (email, password) => {
        try {
            const response = await axios.post('https://isen3-back.onrender.com/api/auth/login', {
                email: email,
                password: password,
            });
            if (response.data.token && response.data.refreshToken) {
                await AsyncStorage.setItem('token', response.data.token);
                await AsyncStorage.setItem('refreshToken', response.data.refreshToken);
                setToken(response.data.token);
                setRefreshToken(response.data.refreshToken);
                setIsLoggedIn(true);
                await fetchUserProfile();
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error('Failed to login', error);
            throw error;
        }
    }, []);

    const logout = async () => {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('refreshToken');
        setToken(null);
        setRefreshToken(null);
        setIsLoggedIn(false);
        setUser(null);
    };

    if (loading) {
        return null;
    }

    return (
        <AuthContext.Provider value={{
            isLoggedIn,
            token,
            refreshToken,
            user,
            association,
            loading,
            error,
            fetchData,
            verifyToken,
            refreshJwtToken,
            fetchUserProfile,
            fetchAssociationInfo,
            checkAndRefreshToken,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};