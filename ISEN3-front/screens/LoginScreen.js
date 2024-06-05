import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/LoginScreen';

const LoginForm = ({ email, setEmail, password, setPassword, handleLogin, navigation }) => (
    <View style={styles.loginContainer}>
        <Text style={styles.logInText}>Connexion</Text>
        <TextInput
            style={styles.logInInput}
            placeholder="Adresse E-mail"
            onChangeText={(text) => setEmail(text)}
            value={email}
            autoCapitalize="none"
            keyboardType="email-address"
        />
        <TextInput
            style={styles.logInInput}
            placeholder="Mot de passe"
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
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
);

function LoginScreen({ navigation }) {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('https://isen3-back.onrender.com/api/users/login', {
                email: email,
                password: password,
            });
            if (response.data.token && response.data.refreshToken) {
                await login(response.data.token, response.data.refreshToken);
                navigation.navigate('Profile');
            }
        } catch (error) {
            if (error.response) {
                Alert.alert('Erreur', error.response.data.message);
            } else {
                Alert.alert('Erreur', 'Une erreur est survenue. Veuillez réessayer.');
            }
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <LoginForm
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                handleLogin={handleLogin}
                navigation={navigation}
            />
        </View>
    );
}

export default LoginScreen;