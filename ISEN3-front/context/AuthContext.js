import React, { createContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Alert } from 'react-native';

export const AuthContext = createContext();

export const AuthProvider = ({ children, navigation }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
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
            const token = await AsyncStorage.getItem('token');
            const response = await axios.post('https://isen3-back.onrender.com/api/auth/verify-token', { token });
            return response.status === 200;
        } catch (error) {
            console.error('Failed to verify token', error);
            return false;
        }
    }, []);

    const refreshJwtToken = useCallback(async () => {
        try {
            const refreshToken = await AsyncStorage.getItem('refreshToken');
            const response = await axios.post('https://isen3-back.onrender.com/api/auth/refresh-token', { refreshToken });
            const { token: newToken } = response.data;
            if (newToken) {
                await AsyncStorage.setItem('token', newToken);
                return newToken;
            }
            return null;
        } catch (error) {
            console.error('Failed to refresh token', error);
            return null;
        }
    }, []);

    const fetchUserProfile = useCallback(async () => {
        const token = await AsyncStorage.getItem('token');
        const data = await fetchData('https://isen3-back.onrender.com/api/users/me', {
            headers: { Authorization: `Bearer ${token}` },
        });
        setUser(data);
    }, [fetchData]);

    const fetchAssociationInfo = useCallback(async () => {
        const data = await fetchData('https://isen3-back.onrender.com/api/associations/1');
        setAssociation(data);
    }, [fetchData]);

    const checkAndRefreshToken = useCallback(async () => {
        const isTokenValid = await verifyToken();
        if (isTokenValid) return true;

        const newToken = await refreshJwtToken();
        if (newToken) return true;

        await logout();

        return false;
    }, [verifyToken, refreshJwtToken]);

    const initialize = useCallback(async () => {
        try {
            const isAuthenticated = await checkAndRefreshToken();

            if (isAuthenticated) {
                await fetchUserProfile();
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }

            await fetchAssociationInfo();
        } catch (error) {
            console.error('Failed to initialize app', error);
        } finally {
            setLoading(false);
        }
    }, [checkAndRefreshToken, fetchAssociationInfo, fetchUserProfile]);

    useEffect(() => {
        initialize();
        console.log('Auth context initialized');
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

    const logout = useCallback(async () => {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('refreshToken');
        setIsLoggedIn(false);
        setUser(null);
    }, []);

    return (
        <AuthContext.Provider value={{
            isLoggedIn,
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