import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/LoginStyles';

function LoginScreen({ navigation }) {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const validatePassword = (password) => {
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return re.test(String(password));
    };

    const handleLogin = async () => {
        if (!validateEmail(email)) {
            Alert.alert('Erreur', "L'adresse e-mail n'est pas valide.");
            return;
        }

        if (!validatePassword(password)) {
            Alert.alert('Erreur', 'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un symbole.');
            return;
        }

        try {
            const response = await login(email, password);
            if (response) {
                navigation.navigate('Home');
            }
        } catch (error) {
            Alert.alert('Erreur', "L'adresse e-mail ou le mot de passe est incorrect.");
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
                    placeholderTextColor="#1C1C1F"
                />
                <TextInput
                    style={styles.logInInput}
                    placeholder="Mot de passe"
                    secureTextEntry
                    onChangeText={setPassword}
                    value={password}
                    autoCapitalize="none"
                    placeholderTextColor="#1C1C1F"
                />
                <TouchableOpacity style={styles.logInButton} onPress={handleLogin}>
                    <Text style={styles.logInButtonText}>Se connecter</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.signUpButton} onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.signUpButtonText}>Vous n’avez pas de compte ? Inscription</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.forgotPasswordButton} onPress={() => navigation.navigate('RequestResetPassword')}>
                    <Text style={styles.forgotPasswordText}>Mot de passe oublié</Text>
                </TouchableOpacity>
                <View style={styles.divider} />
                <TouchableOpacity style={styles.firmSignUp} onPress={() => navigation.navigate('Register')}>
                    <Icon name="logo-google" size={20} style={styles.firmIcon} />
                    <Text style={styles.firmText}>Continuer avec Google</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.firmSignUp} onPress={() => navigation.navigate('Register')}>
                    <Icon name="logo-apple" size={20} style={styles.firmIcon} />
                    <Text style={styles.firmText}>Continuer avec Apple</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.firmSignUp} onPress={() => navigation.navigate('Register')}>
                    <Icon name="logo-microsoft" size={20} style={styles.firmIcon} />
                    <Text style={styles.firmText}>Continuer avec Microsoft</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default LoginScreen;