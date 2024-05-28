import React, { useContext, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../AuthContext'; // Importer AuthContext

function ProfileScreen({ navigation }) {
    const { isLoggedIn, login, logout } = useContext(AuthContext);
    const [email, setEmail] = useState(''); // État pour l'email de connexion
    const [password, setPassword] = useState(''); // État pour le mot de passe de connexion
    const userName = "John Doe"; // Exemple de nom brut
    const userPhoto = "https://imgs.search.brave.com/RcfrjLHnsNTGPLe4i6nhIGpgqXGCWrKWRGS2zDqh0dM/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9jZG4x/Lmljb25maW5kZXIu/Y29tL2RhdGEvaWNv/bnMvZ29vZ2xlLXMt/bG9nby8xNTAvR29v/Z2xlX0ljb25zLTA5/LTEyOC5wbmc"; // URL de la photo brute

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
                        navigation.navigate('Home');
                    }
                }
            ]
        );
    };

    return (
        <View style={styles.container}>
            {isLoggedIn ? (
                <>
                    <View style={styles.header}>
                        <Image
                            source={{ uri: userPhoto }}
                            style={styles.profileImage}
                        />
                        <Text style={styles.userName}>
                            {userName}
                        </Text>
                    </View>
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => navigation.navigate('EditProfile')}
                        >
                            <Icon name="create-outline" size={20} color="#FFFFFF" style={styles.icon} />
                            <Text style={styles.buttonText}>Mes informations</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => navigation.navigate('Settings')}
                        >
                            <Icon name="book-outline" size={20} color="#FFFFFF" style={styles.icon} />
                            <Text style={styles.buttonText}>Mes cours</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => navigation.navigate('Settings')}
                        >
                            <Icon name="settings-outline" size={20} color="#FFFFFF" style={styles.icon} />
                            <Text style={styles.buttonText}>Paramètres</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleLogout}
                        >
                            <Icon name="log-out-outline" size={20} color="#FFFFFF" style={styles.icon} />
                            <Text style={styles.buttonText}>Déconnexion</Text>
                        </TouchableOpacity>
                    </View>
                </>
            ) : (
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
                        style={styles.button}
                        onPress={login}
                    >
                        <Icon name="log-in-outline" size={20} color="#FFFFFF" style={styles.icon} />
                        <Text style={styles.buttonText}>Se connecter</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        backgroundColor: "black",
        height: "100%",
    },
    header: {
        borderBottomColor: "white",
        borderBottomWidth: 2,
        flexDirection: "row",
        alignItems: "center",
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: "white",
        marginLeft: 10,
    },
    buttonsContainer: {
        width: '100%',
    },
    button: {
        height: 60,
        padding: 15,
        alignItems: 'center',
        flexDirection: "row",
        borderBottomWidth: 2,
        borderColor: 'white',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: "white",
    },
    loginContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    visitorMessage: {
        fontSize: 16,
        color: "white",
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        width: '100%',
        marginBottom: 10,
        paddingLeft: 10,
        color: 'white',
    },
    icon: {
        marginRight: 10,
    },
});

export default ProfileScreen;
