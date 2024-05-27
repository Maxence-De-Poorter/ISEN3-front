import React from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Exemple d'importation d'icônes

function ProfileScreen({ navigation }) {
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
                        // Ajouter la logique de déconnexion ici
                        console.log("Logout Pressed");
                        // Exemple de navigation vers l'écran de connexion
                        navigation.navigate('Home');
                    }
                }
            ]
        );
    };

    return (
        <View style={styles.container}>
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop:50,
        backgroundColor: "black",
        height:"100%",

    },
    header: {
        borderBottomColor:"white",
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
        color:"white",
    },
    buttonsContainer: {
        width: '100%',
    },
    button: {
        height: 60,
        padding: 15,
        alignItems: 'left',
        flexDirection:"row",
        borderBottomWidth: 2,
        borderColor: 'white',

    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color:"white",
    },
});

export default ProfileScreen;
