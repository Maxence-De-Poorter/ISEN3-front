import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { AuthContext } from '../AuthContext';
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from '../styles/ProfilScreen';

const ProfileHeader = ({ userName, userPhoto }) => (
    <View style={styles.header}>
        <Image
            source={{ uri: userPhoto }}
            style={styles.profileImage}
        />
        <Text style={styles.userName}>
            {userName}
        </Text>
    </View>
);

const ProfileButton = ({ iconName, text, onPress }) => (
    <TouchableOpacity
        style={styles.button}
        onPress={onPress}
    >
        <Icon name={iconName} size={20} color="#FFFFFF" style={styles.icon} />
        <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
);

const LoginForm = ({ email, setEmail, password, setPassword, handleLogin, navigation }) => (
    <View style={styles.loginContainer}>
        <Text style={styles.visitorMessage}>
            Vous êtes actuellement en mode visiteur. Certaines fonctionnalités ne sont pas disponibles. Pour accéder à toutes les fonctionnalités, veuillez vous connecter.
        </Text>
        <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#AAAAAA"
            onChangeText={(text) => setEmail(text)}
            value={email}
            autoCapitalize="none"
            keyboardType="email-address"
        />
        <TextInput
            style={styles.input}
            placeholder="Mot de passe"
            placeholderTextColor="#AAAAAA"
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
            value={password}
            autoCapitalize="none"
        />
        <TouchableOpacity
            style={styles.logInButton}
            onPress={handleLogin}
        >
            <Text style={styles.buttonText}>Se connecter</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.signUpButton}
            onPress={() => navigation.navigate('Register')}
        >
            <Text style={styles.buttonText}>S'inscrire</Text>
        </TouchableOpacity>
    </View>
);

function ProfileScreen({ navigation }) {
    const { isLoggedIn, login, logout, token, refreshJwtToken, verifyToken } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [userPhoto, setUserPhoto] = useState('');

    useEffect(() => {
        const checkLoginStatus = async () => {
            const storedToken = await AsyncStorage.getItem('token');
            if (storedToken) {
                const isTokenValid = await verifyToken(storedToken);
                if (isTokenValid) {
                    login(storedToken);
                } else {
                    const storedRefreshToken = await AsyncStorage.getItem('refreshToken');
                    const newToken = await refreshJwtToken(storedRefreshToken);
                    if (newToken) {
                        login(newToken, storedRefreshToken);
                    } else {
                        await AsyncStorage.removeItem('token');
                        await AsyncStorage.removeItem('refreshToken');
                    }
                }
            }
        };
        checkLoginStatus();
    }, []);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get('https://isen3-back.onrender.com/api/users/me', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUserName(`${response.data.name} ${response.data.surname}`);
                setUserPhoto(response.data.photoUrl || 'https://imgs.search.brave.com/RcfrjLHnsNTGPLe4i6nhIGpgqXGCWrKWRGS2zDqh0dM/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9jZG4x/Lmljb25maW5kZXIu/Y29tL2RhdGEvaWNv/bnMvZ29vZ2xlLXMt/bG9nbzE1MC9Hb29n/bGVfSWNvbnMtMDkt/MTI4LnBuZw');
            } catch (error) {
                console.error('Failed to fetch user profile', error);
            }
        };

        if (isLoggedIn && token) {
            fetchUserProfile();
        }
    }, [isLoggedIn, token]);

    const handleLogin = async () => {
        try {
            const response = await axios.post('https://isen3-back.onrender.com/api/users/login', {
                email: email,
                password: password,
            });
            if (response.data.token && response.data.refreshToken) {
                await login(response.data.token, response.data.refreshToken);
                navigation.navigate('Profile');
            } else {
                Alert.alert('Erreur', 'Email ou mot de passe incorrect');
            }
        } catch (error) {
            if (error.response) {
                Alert.alert('Erreur', error.response.data.message || 'Une erreur est survenue. Veuillez réessayer.');
            } else {
                Alert.alert('Erreur', 'Une erreur est survenue. Veuillez réessayer.');
            }
            console.error(error);
        }
    };

    const handleLogout = () => {
        Alert.alert(
            "Confirmer la déconnexion",
            "Êtes-vous sûr de vouloir vous déconnecter ?",
            [
                {
                    text: "Annuler",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Déconnexion",
                    onPress: () => {
                        logout();
                        navigation.navigate('Profile');
                    }
                }
            ]
        );
    };

    return (
        <View style={styles.container}>
            {isLoggedIn ? (
                <>
                    <ProfileHeader userName={userName} userPhoto={userPhoto} />
                    <View style={styles.buttonsContainer}>
                        <ProfileButton
                            iconName="create-outline"
                            text="Mes informations"
                            onPress={() => navigation.navigate('EditProfile')}
                        />
                        <ProfileButton
                            iconName="book-outline"
                            text="Mes cours"
                            onPress={() => navigation.navigate('Settings')}
                        />
                        <ProfileButton
                            iconName="settings-outline"
                            text="Paramètres"
                            onPress={() => navigation.navigate('Settings')}
                        />
                        <ProfileButton
                            iconName="log-out-outline"
                            text="Déconnexion"
                            onPress={handleLogout}
                        />
                    </View>
                </>
            ) : (
                <LoginForm
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    handleLogin={handleLogin}
                    navigation={navigation} // Passez le prop navigation ici
                />
            )}
        </View>
    );
}

export default ProfileScreen;
