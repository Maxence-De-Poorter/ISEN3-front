import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import styles from '../styles/RegistrationStyles';

const RegistrationScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [birthDate, setBirthDate] = useState('');

    const handleBirthDateChange = (text) => {
        let formattedText = text.replace(/[^0-9]/g, '');
        if (formattedText.length > 4) {
            formattedText = formattedText.slice(0, 4) + '-' + formattedText.slice(4);
        }
        if (formattedText.length > 7) {
            formattedText = formattedText.slice(0, 7) + '-' + formattedText.slice(7, 10);
        }
        setBirthDate(formattedText);
    };

    const handleRegister = async () => {
        try {
            const response = await axios.post('https://isen3-back.onrender.com/api/auth/register', {
                name,
                surname,
                email,
                password,
            });

            if (response.status === 201) {
                Alert.alert('Succès', 'Inscription réussie. Veuillez vous connecter.');
                navigation.navigate('Login');
            } else {
                Alert.alert('Erreur', response.data.message || 'Une erreur est survenue.');
            }
        } catch (error) {
            Alert.alert('Erreur', 'Une erreur est survenue. Veuillez réessayer.');
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.signUpContainer}>
                <Text style={styles.signUpText}>Inscription</Text>
                <TextInput
                    style={styles.signUpInput}
                    placeholder="Nom"
                    placeholderTextColor="#1C1C1F"
                    value={surname}
                    onChangeText={(text) => setSurname(text.toUpperCase())}
                />
                <TextInput
                    style={styles.signUpInput}
                    placeholder="Prénom"
                    placeholderTextColor="#1C1C1F"
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    style={styles.signUpInput}
                    placeholder="Email"
                    placeholderTextColor="#1C1C1F"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.signUpInput}
                    placeholder="Mot de passe"
                    placeholderTextColor="#1C1C1F"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <TouchableOpacity style={styles.signUpButton} onPress={handleRegister}>
                    <Text style={styles.signUpButtonText}>S'inscrire</Text>
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
};

export default RegistrationScreen;