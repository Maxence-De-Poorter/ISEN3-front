import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/ProfileStyles';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

function ProfileScreen({ navigation }) {
    const { logout, user, checkAndRefreshToken, fetchUserProfile } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [showInfoForm, setShowInfoForm] = useState(false);

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
                navigation.navigate('Login');
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
            setShowInfoForm(false);
        } catch (error) {
            console.error('Failed to update user info', error);
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
            <TouchableOpacity style={styles.button} onPress={() => setShowInfoForm(!showInfoForm)}>
                <Icon name="person-outline" size={20} color="black" style={styles.icon} />
                <Text style={styles.buttonText}>Mes informations</Text>
            </TouchableOpacity>
            {showInfoForm && (
                <View style={styles.infoContainer}>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                        placeholder="Nom"
                        placeholderTextColor="#1C1C1F"
                    />
                    <TextInput
                        style={styles.input}
                        value={surname}
                        onChangeText={setSurname}
                        placeholder="Prénom"
                        placeholderTextColor="#1C1C1F"
                    />
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Email"
                        keyboardType="email-address"
                        placeholderTextColor="#1C1C1F"
                    />
                    <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                        <Text style={styles.saveButtonText}>Sauvegarder</Text>
                    </TouchableOpacity>
                </View>
            )}
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('UserOffers')}>
                <Icon name="card-outline" size={20} color="black" style={styles.icon} />
                <Text style={styles.buttonText}>Achats & cartes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
                <Icon name="log-out-outline" size={20} color="black" style={styles.icon} />
                <Text style={styles.buttonText}>Déconnexion</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleDeleteProfile}>
                <Icon name="trash-outline" size={20} color="black" style={styles.icon} />
                <Text style={styles.buttonText}>Supprimer le profil</Text>
            </TouchableOpacity>
        </View>
    );
}

export default ProfileScreen;