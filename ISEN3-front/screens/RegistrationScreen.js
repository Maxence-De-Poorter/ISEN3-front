import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import styles from '../styles/RegistrationScreen';

const RegistrationForm = ({ email, setEmail, password, setPassword, name, setName, surname, setSurname, birthDate, setBirthDate, handleRegister }) => {
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

    return (
        <View style={styles.SignUpContainer}>
            <Text style={styles.SignUpText}>Inscription</Text>
            <TextInput
                style={styles.SignUpInput}
                placeholder="Nom"
                value={surname}
                onChangeText={(text) => setSurname(text.toUpperCase())}
            />
            <TextInput
                style={styles.SignUpInput}
                placeholder="Prénom"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.SignUpInput}
                placeholder="AAAA-MM-JJ"
                value={birthDate}
                onChangeText={handleBirthDateChange}
                keyboardType="numeric"
                maxLength={10}
            />
            <TextInput
                style={styles.SignUpInput}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.SignUpInput}
                placeholder="Mot de passe"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity
                style={styles.SignUpButton}
                onPress={handleRegister}
            >
                <Text>S'inscrire</Text>
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
};

const RegistrationScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [birthDate, setBirthDate] = useState('');

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
            <RegistrationForm
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                name={name}
                setName={setName}
                surname={surname}
                setSurname={setSurname}
                birthDate={birthDate}
                setBirthDate={setBirthDate}
                handleRegister={handleRegister}
            />
        </View>
    );
};

export default RegistrationScreen;