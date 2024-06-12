import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/LoginScreen';

function LoginScreen({ navigation }) {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await login(email, password);
            if (response) {
                navigation.navigate('Profile');
            }
        } catch (error) {
            Alert.alert('Erreur', error.message || 'Une erreur est survenue. Veuillez réessayer.');
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.loginContainer}>
                <Text style={styles.logInText}>Connexion</Text>
                <TextInput
                    style={styles.logInInput}
                    placeholder="Adresse E-mail"
                    onChangeText={setEmail}
                    value={email}
                    autoCapitalize="none"
                    keyboardType="email-address"
                />
                <TextInput
                    style={styles.logInInput}
                    placeholder="Mot de passe"
                    secureTextEntry
                    onChangeText={setPassword}
                    value={password}
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    style={styles.logInButton}
                    onPress={handleLogin}
                >
                    <Text>Se connecter</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.signUpButton}
                    onPress={() => navigation.navigate('Register')}
                >
                    <Text>Vous n’avez pas de compte ? Inscription</Text>
                </TouchableOpacity>
                <Text style={{ margin: 20 }}>ou</Text>
                <TouchableOpacity
                    style={styles.firmSignUp}
                    onPress={() => navigation.navigate('Register')}
                >
                    <Icon name="logo-google" size={20} style={styles.firmIcon} />
                    <Text>Continuer avec Google</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.firmSignUp}
                    onPress={() => navigation.navigate('Register')}
                >
                    <Icon name="logo-apple" size={20} style={styles.firmIcon} />
                    <Text>Continuer avec Apple</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.firmSignUp}
                    onPress={() => navigation.navigate('Register')}
                >
                    <Icon name="logo-microsoft" size={20} style={styles.firmIcon} />
                    <Text>Continuer avec Microsoft</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default LoginScreen;
