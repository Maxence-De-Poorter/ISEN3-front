import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const UpdatePasswordScreen = ({ route, navigation }) => {
    const { resetToken } = route.params;
    const [newPassword, setNewPassword] = useState('');
    const { logout } = useContext(AuthContext);

    const handleUpdatePassword = async () => {
        try {
            const response = await axios.post('https://isen3-back.onrender.com/api/auth/update-password', {
                resetToken,
                newPassword
            });
            Alert.alert('Succès', 'Votre mot de passe a été mis à jour avec succès.');
            await logout();
            navigation.navigate('Login');
        } catch (error) {
            console.error('Failed to update password', error);
            Alert.alert('Erreur', 'La mise à jour du mot de passe a échoué.');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Nouveau mot de passe"
                value={newPassword}
                onChangeText={setNewPassword}
                style={styles.input}
                secureTextEntry
            />
            <Button title="Mettre à jour le mot de passe" onPress={handleUpdatePassword} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
});

export default UpdatePasswordScreen;