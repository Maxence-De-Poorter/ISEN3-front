import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, TextInput, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/ManageAssociationStyles';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ManageAssociationScreen = ({ navigation }) => {
    const { association, checkAndRefreshToken, fetchAssociationInfo } = useContext(AuthContext);
    const [associationName, setAssociationName] = useState('');
    const [associationAddress, setAssociationAddress] = useState('');
    const [associationPhone, setAssociationPhone] = useState('');
    const [associationDescription, setAssociationDescription] = useState('');
    const [associationDanceTypes, setAssociationDanceTypes] = useState('');
    const [associationImageUrl, setAssociationImageUrl] = useState('');
    const [associationImageVideoUrl, setAssociationImageVideoUrl] = useState('');

    useEffect(() => {
        if (association) {
            setAssociationName(association.name || '');
            setAssociationAddress(association.address || '');
            setAssociationPhone(association.phone || '');
            setAssociationDescription(association.description || '');
            setAssociationDanceTypes(association.danceTypes ? association.danceTypes.join(', ') : '');
            setAssociationImageUrl(association.imageUrl || '');
            setAssociationImageVideoUrl(association.imageVideoUrl || '');
        }
    }, [association]);

    const handleSave = async () => {
        try {
            const isAuthenticated = await checkAndRefreshToken();
            if (!isAuthenticated) {
                navigation.navigate('Login');
                return;
            }

            const token = await AsyncStorage.getItem('token');

            await axios.put('https://isen3-back.onrender.com/api/associations/update/1', {
                name: associationName,
                address: associationAddress,
                phone: associationPhone,
                description: associationDescription,
                danceTypes: associationDanceTypes.split(',').map(tag => tag.trim()),
                imageUrl: associationImageUrl,
                imageVideoUrl: associationImageVideoUrl
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            await fetchAssociationInfo();

            Alert.alert("Succès", "Les informations ont été mises à jour avec succès.");
        } catch (error) {
            console.error('Failed to update association info', error);
            Alert.alert("Erreur", "La mise à jour des informations a échoué.");
        }
    };

    return (
        <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.innerContainer}>
                <Text style={styles.title}>Informations de l'association</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nom de l'association"
                        placeholderTextColor="#1C1C1F"
                        value={associationName}
                        onChangeText={setAssociationName}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Adresse"
                        placeholderTextColor="#1C1C1F"
                        value={associationAddress}
                        onChangeText={setAssociationAddress}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Téléphone"
                        placeholderTextColor="#1C1C1F"
                        value={associationPhone}
                        onChangeText={setAssociationPhone}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Description"
                        placeholderTextColor="#1C1C1F"
                        value={associationDescription}
                        onChangeText={setAssociationDescription}
                        multiline={true}
                        numberOfLines={4}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Types de danse (séparés par des virgules)"
                        placeholderTextColor="#1C1C1F"
                        value={associationDanceTypes}
                        onChangeText={setAssociationDanceTypes}
                        multiline={true}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="URL de l'image"
                        placeholderTextColor="#1C1C1F"
                        value={associationImageUrl}
                        onChangeText={setAssociationImageUrl}
                        multiline={true}
                        numberOfLines={4}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="URL de l'image"
                        placeholderTextColor="#1C1C1F"
                        value={associationImageVideoUrl}
                        onChangeText={setAssociationImageVideoUrl}
                        multiline={true}
                        numberOfLines={4}
                    />
                </View>
                <TouchableOpacity style={styles.button} onPress={handleSave}>
                    <Icon name="save" size={20} color="#FFFFFF" />
                    <Text style={styles.buttonText}>Enregistrer</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
            </View>
    );
};

export default ManageAssociationScreen;