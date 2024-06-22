import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreateStudentScreen = () => {
    const { checkAndRefreshToken } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');

    const handleCreateStudent = async () => {
        try {
            const isAuthenticated = await checkAndRefreshToken();
            if (!isAuthenticated) {
                navigation.navigate('Login');
                return;
            }

            const token = await AsyncStorage.getItem('token');
            const response = await axios.post('https://isen3-back.onrender.com/api/auth/create-student', {
                name,
                surname,
                email
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            Alert.alert('Élève créé avec succès');
        } catch (error) {
            console.error('Failed to create student', error);
            Alert.alert('Erreur', 'Impossible de créer un élève.');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Nom"
                value={name}
                onChangeText={setName}
                style={styles.input}
            />
            <TextInput
                placeholder="Prénom"
                value={surname}
                onChangeText={setSurname}
                style={styles.input}
            />
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                keyboardType="email-address"
            />
            <Button title="Créer un élève" onPress={handleCreateStudent} />
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

export default CreateStudentScreen;