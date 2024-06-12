import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, TextInput, Button } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/ProfileStyles';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

function ProfileScreen({ navigation }) {
    const { logout, user, token, checkAndRefreshToken, fetchUserProfile } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (user) {
            setName(user.name || '');
            setSurname(user.surname || '');
            setEmail(user.email || '');
        }
    }, [user]);

    const handleSave = async () => {
        try {
            const isAuthenticated = await checkAndRefreshToken();
            if (!isAuthenticated) {
                Alert.alert("Erreur", "Impossible de mettre à jour les informations. Veuillez vous reconnecter.");
                navigation.navigate('Login')
            }

            const token = await AsyncStorage.getItem('token');

            await axios.put('https://isen3-back.onrender.com/api/users/update', {
                name,
                surname,
                email
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            await fetchUserProfile();
            Alert.alert("Succès", "Les informations ont été mises à jour.");
        } catch (error) {
            console.error('Failed to update user info', error);
            Alert.alert("Erreur", "La mise à jour des informations a échoué.");
        }
    };

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

    const handleDeleteProfile = () => {
        Alert.alert(
            "Confirmer la suppression",
            "Êtes-vous sûr de vouloir supprimer votre profil ? Cette action est irréversible.",
            [
                { text: "Annuler", style: "cancel" },
                {
                    text: "Supprimer",
                    onPress: async () => {
                        try {
                            const isAuthenticated = await checkAndRefreshToken();
                            if (!isAuthenticated) {
                                Alert.alert("Erreur", "Impossible de supprimer le profil. Veuillez vous reconnecter.");
                                return;
                            }

                            const token = await AsyncStorage.getItem('token');

                            await axios.delete('https://isen3-back.onrender.com/api/users/delete', {
                                headers: { Authorization: `Bearer ${token}` }
                            });
                            await logout();
                            navigation.navigate('Login');
                        } catch (error) {
                            console.error('Failed to delete user', error);
                            Alert.alert("Erreur", "La suppression du profil a échoué.");
                        }
                    },
                    style: "destructive"
                }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                <Text style={styles.title}>Mes informations</Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholder="Nom"
                />
                <TextInput
                    style={styles.input}
                    value={surname}
                    onChangeText={setSurname}
                    placeholder="Prénom"
                />
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Email"
                    keyboardType="email-address"
                />
                <Button title="Sauvegarder" onPress={handleSave} />
            </View>
            <View style={styles.profileContainer}>
                <TouchableOpacity style={styles.button} onPress={handleLogout}>
                    <Icon name="log-out-outline" size={20} color="#FFFFFF" style={styles.icon} />
                    <Text style={styles.buttonText}>Déconnexion</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleDeleteProfile}>
                    <Icon name="trash-outline" size={20} color="#FFFFFF" style={styles.icon} />
                    <Text style={styles.buttonText}>Supprimer le profil</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default ProfileScreen;
