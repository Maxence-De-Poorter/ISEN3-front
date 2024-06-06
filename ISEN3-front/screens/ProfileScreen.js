import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator, TextInput, Button, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/ProfileScreen';
import axios from 'axios';

const ProfileButton = ({ iconName, text, onPress }) => (
    <TouchableOpacity style={styles.button} onPress={onPress}>
        <Icon name={iconName} size={20} color="#FFFFFF" style={styles.icon} />
        <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
);

const EditUserInfo = ({ user, token, onUpdate }) => {
    const [name, setName] = useState(user.name);
    const [surname, setSurname] = useState(user.surname);
    const [email, setEmail] = useState(user.email);

    const handleSave = async () => {
        try {
            const response = await axios.put('https://isen3-back.onrender.com/api/users/update', {
                name,
                surname,
                email
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            onUpdate(response.data);
        } catch (error) {
            console.error('Failed to update user info', error);
        }
    };

    return (
        <View style={editStyles.container}>
            <Text style={editStyles.title}>Mes informations</Text>
            <TextInput
                style={editStyles.input}
                value={name}
                onChangeText={setName}
                placeholder="Nom"
            />
            <TextInput
                style={editStyles.input}
                value={surname}
                onChangeText={setSurname}
                placeholder="Prénom"
            />
            <TextInput
                style={editStyles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                keyboardType="email-address"
            />
            <Button title="Confirmer" onPress={handleSave} />
        </View>
    );
};

function ProfileScreen({ navigation }) {
    const { logout, user, token, updateUser } = useContext(AuthContext);

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

    if (!user) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <EditUserInfo user={user} token={token} onUpdate={updateUser} />
            <View style={styles.profileContainer}>
                <ProfileButton
                    iconName="log-out-outline"
                    text="Déconnexion"
                    onPress={handleLogout}
                />
                <ProfileButton
                    iconName="trash-outline"
                    text="Supprimer le profil"
                    onPress={handleDeleteProfile}
                />
            </View>
        </View>
    );
}

const editStyles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        margin: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
        borderRadius: 5,
    },
});

export default ProfileScreen;