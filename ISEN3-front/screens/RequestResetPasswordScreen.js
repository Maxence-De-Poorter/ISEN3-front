import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import styles from '../styles/ResetPasswordStyles';

const RequestResetPasswordScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');

    const handleRequestReset = async () => {
        try {
            await axios.post('https://isen3-back.onrender.com/api/auth/request-reset-password', { email });
            Alert.alert('Succès', 'Un code de réinitialisation a été envoyé à votre adresse e-mail.');
            navigation.navigate('ResetPasswordMain', { email });
        } catch (error) {
            Alert.alert('Erreur', "La demande de réinitialisation de mot de passe a échoué.");
            console.log(error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Demande de réinitialisation du mot de passe</Text>
            <TextInput
                style={styles.input}
                placeholder="Adresse E-mail"
                onChangeText={setEmail}
                value={email}
                autoCapitalize="none"
                keyboardType="email-address"
                placeholderTextColor="#1C1C1F"
            />
            <TouchableOpacity style={styles.button} onPress={handleRequestReset}>
                <Text style={styles.buttonText}>Envoyer le code</Text>
            </TouchableOpacity>
        </View>
    );
};

export default RequestResetPasswordScreen;