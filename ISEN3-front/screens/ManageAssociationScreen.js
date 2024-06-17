import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, TextInput, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/ManageAssociationStyles';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ManageAssociationScreen = ({navigation}) => {
    const { association, checkAndRefreshToken, fetchAssociationInfo } = useContext(AuthContext);
    const [associationName, setAssociationName] = useState('');
    const [associationAddress, setAssociationAddress] = useState('');
    const [associationPhone, setAssociationPhone] = useState('');
    const [associationDescription, setAssociationDescription] = useState('');
    const [associationDanceTypes, setAssociationDanceTypes] = useState('');
    const [associationImageUrl, setAssociationImageUrl] = useState('');

    useEffect(() => {
        if (association) {
            setAssociationName(association.name || '');
            setAssociationAddress(association.address || '');
            setAssociationPhone(association.phone || '');
            setAssociationDescription(association.description || '');
            setAssociationDanceTypes(association.danceTypes ? association.danceTypes.join(', ') : '');
            setAssociationImageUrl(association.imageUrl || '');
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
                imageUrl: associationImageUrl
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
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.innerContainer}>
                <Text style={styles.title}>Informations de l'association</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Nom de l'association</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Nom de l'association"
                        value={associationName}
                        onChangeText={setAssociationName}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Adresse</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Adresse"
                        value={associationAddress}
                        onChangeText={setAssociationAddress}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Téléphone</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Téléphone"
                        value={associationPhone}
                        onChangeText={setAssociationPhone}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Description"
                        value={associationDescription}
                        onChangeText={setAssociationDescription}
                        multiline={true}
                        numberOfLines={4}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Types de danse (séparés par des virgules)</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Types de danse (séparés par des virgules)"
                        value={associationDanceTypes}
                        onChangeText={setAssociationDanceTypes}
                        multiline={true}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>URL de l'image</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="URL de l'image"
                        value={associationImageUrl}
                        onChangeText={setAssociationImageUrl}
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
    );
};

export default ManageAssociationScreen;
