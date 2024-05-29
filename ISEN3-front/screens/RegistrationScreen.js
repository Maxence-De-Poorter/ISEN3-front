import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import Swiper from 'react-native-swiper';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles/RegistrationForm';

const RegistrationScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleRegister = async () => {
        try {
            const response = await axios.post('https://isen3-back.onrender.com/api/users/register', {
                name,
                surname,
                email,
                password,
            });

            if (response.status === 201) {
                Alert.alert('Succès', 'Inscription réussie. Veuillez vous connecter.');
                navigation.navigate('Profile');
            } else {
                Alert.alert('Erreur', response.data.message || 'Une erreur est survenue.');
            }
        } catch (error) {
            Alert.alert('Erreur', 'Une erreur est survenue. Veuillez réessayer.');
            console.error(error);
        }
    };

    const handleBirthDateChange = (text) => {
        // Remove any non-digit characters
        let formattedText = text.replace(/[^0-9]/g, '');

        // Insert dashes for the date format AAAA-MM-JJ
        if (formattedText.length > 4) {
            formattedText = formattedText.slice(0, 4) + '-' + formattedText.slice(4);
        }
        if (formattedText.length > 7) {
            formattedText = formattedText.slice(0, 7) + '-' + formattedText.slice(7, 10);
        }

        setBirthDate(formattedText);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.closeButton}
                onPress={() => navigation.goBack()}
            >
                <Icon name="close" size={45} color="#000" />
            </TouchableOpacity>
            <Swiper
                loop={false}
                showsPagination={true}
                index={currentIndex}
                onIndexChanged={(index) => setCurrentIndex(index)}
            >
                <View style={styles.slide}>
                    <View style={styles.slideContent}>
                        <Text style={styles.label}>Nom</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Nom"
                            value={surname}
                            onChangeText={(text) => setSurname(text.toUpperCase())}
                        />
                        <Text style={styles.label}>Prénom</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Prénom"
                            value={name}
                            onChangeText={setName}
                        />
                        <Text style={styles.label}>Date de naissance (AAAA-MM-JJ)</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="AAAA-MM-JJ"
                            value={birthDate}
                            onChangeText={handleBirthDateChange}
                            keyboardType="numeric"
                            maxLength={10}  // Ensure maximum length for the date format
                        />
                    </View>
                </View>
                <View style={styles.slide}>
                    <View style={styles.slideContent}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                        <Text style={styles.label}>Mot de passe</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Mot de passe"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                        <TouchableOpacity
                            style={styles.submitButton}
                            onPress={handleRegister}
                        >
                            <Text style={styles.submitButtonText}>Valider</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Swiper>
        </View>
    );
};

export default RegistrationScreen;
