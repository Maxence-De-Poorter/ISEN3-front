import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { AuthContext } from '../AuthContext';
import styles from '../styles/ProfileScreen';

const ProfileHeader = ({ userName }) => (
    <View style={styles.header}>
        <Text style={styles.userName}>{userName}</Text>
    </View>
);

const ProfileButton = ({ iconName, text, onPress }) => (
    <TouchableOpacity style={styles.button} onPress={onPress}>
        <Icon name={iconName} size={20} color="#FFFFFF" style={styles.icon} />
        <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
);

function ProfileScreen({ navigation }) {
    const { isLoggedIn, logout, token, verifyToken, refreshJwtToken} = useContext(AuthContext);
    const [userName, setUserName] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkTokenAndFetchProfile = async () => {
            if (token) {
                const isTokenValid = await verifyToken(token);
                if (!isTokenValid) {
                    const newToken = await refreshJwtToken();
                    if (!newToken) {
                        await logout();
                        navigation.navigate('Login');
                        return;
                    }
                }

                try {
                    const response = await axios.get('https://isen3-back.onrender.com/api/users/me', {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setUserName(`${response.data.name} ${response.data.surname}`);
                } catch (error) {
                    console.error('Failed to fetch user profile', error);
                }
            }

            setLoading(false);
        };

        if (isLoggedIn && token) {
            checkTokenAndFetchProfile();
        } else {
            setLoading(false);
        }
    }, [isLoggedIn, token]);

    const handleLogout = () => {
        Alert.alert(
            "Confirmer la déconnexion",
            "Êtes-vous sûr de vouloir vous déconnecter ?",
            [
                { text: "Annuler", style: "cancel" },
                {
                    text: "Déconnexion",
                    onPress: async () => {
                        await logout();
                        navigation.navigate('Login');
                    }
                }
            ]
        );
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.closeButton}
                onPress={() => navigation.navigate('Association')}
            >
                <Icon name="arrow-back-outline" size={30} color="black" />
            </TouchableOpacity>
            {isLoggedIn ? (
                <>
                    <ProfileHeader userName={userName} />
                    <View style={styles.profileContainer}>
                        <ProfileButton
                            iconName="create-outline"
                            text="Mes informations"
                            onPress={() => navigation.navigate('EditProfile')}
                        />
                        <ProfileButton
                            iconName="book-outline"
                            text="Mes cours"
                            onPress={() => navigation.navigate('Courses')}
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
                <Text>Loading...</Text>
            )}
        </View>
    );
}

export default ProfileScreen;