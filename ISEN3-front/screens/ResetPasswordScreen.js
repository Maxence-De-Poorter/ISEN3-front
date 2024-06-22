import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import styles from '../styles/ResetPasswordStyles';

const ResetPasswordScreen = ({ route, navigation }) => {
    const { email } = route.params;
    const [resetCode, setResetCode] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handlePasswordReset = async () => {
        if (password !== confirmPassword) {
            Alert.alert('Erreur', 'Les mots de passe ne correspondent pas.');
            return;
        }

        try {
            await axios.post('https://isen3-back.onrender.com/api/auth/reset-password', { email, resetCode, password });
            Alert.alert('Succès', 'Votre mot de passe a été mis à jour.');
            navigation.navigate('Login');
        } catch (error) {
            Alert.alert('Erreur', "La mise à jour du mot de passe a échoué.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Réinitialiser le mot de passe</Text>
            <TextInput
                style={styles.input}
                placeholder="Code de réinitialisation"
                onChangeText={setResetCode}
                value={resetCode}
                autoCapitalize="characters"
                placeholderTextColor="#1C1C1F"
            />
            <TextInput
                style={styles.input}
                placeholder="Nouveau mot de passe"
                secureTextEntry
                onChangeText={setPassword}
                value={password}
                autoCapitalize="none"
                placeholderTextColor="#1C1C1F"
            />
            <TextInput
                style={styles.input}
                placeholder="Confirmer le mot de passe"
                secureTextEntry
                onChangeText={setConfirmPassword}
                value={confirmPassword}
                autoCapitalize="none"
                placeholderTextColor="#1C1C1F"
            />
            <TouchableOpacity style={styles.button} onPress={handlePasswordReset}>
                <Text style={styles.buttonText}>Réinitialiser</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ResetPasswordScreen;