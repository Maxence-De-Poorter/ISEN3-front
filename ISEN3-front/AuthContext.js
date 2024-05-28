import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Créer le contexte
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const loggedInStatus = await AsyncStorage.getItem('isLoggedIn');
                if (loggedInStatus !== null) {
                    setIsLoggedIn(loggedInStatus === 'true');
                }
            } catch (error) {
                console.error('Failed to fetch login status from storage', error);
            }
        };

        checkLoginStatus();
    }, []);

    const login = async () => {
        await AsyncStorage.setItem('isLoggedIn', 'true');
        setIsLoggedIn(true);
    };

    const logout = async () => {
        await AsyncStorage.setItem('isLoggedIn', 'false');
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
