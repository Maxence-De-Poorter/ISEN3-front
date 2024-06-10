import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../context/AuthContext';
import axios from "axios";

const EditAssociationScreen = () => {
    const {association, token, refreshToken, verifyToken, refreshJwtToken, updateAssociation} = useContext(AuthContext);
    const [associationName, setAssociationName] = useState('');
    const [associationAddress, setAssociationAddress] = useState('');
    const [associationPhone, setAssociationPhone] = useState('');
    const [associationDescription, setAssociationDescription] = useState('');

    useEffect(() => {
        if (association){
            setAssociationName(association.name || '');
            setAssociationAddress(association.address || '');
            setAssociationPhone(association.phone || '');
            setAssociationDescription(association.description || '');
        }
    }, [association]);

    const handleSave = async () => {
        try {
            // Verify token validity
            const isTokenValid = await verifyToken(token);
            let currentToken = token;

            // Refresh token if necessary
            if (!isTokenValid) {
                currentToken = await refreshJwtToken(refreshToken);
                if (!currentToken) {
                    Alert.alert("Erreur", "Impossible de mettre à jour les informations. Veuillez vous reconnecter.");
                    return;
                }
            }

            const response = await axios.put('https://isen3-back.onrender.com/api/associations/update/0', {
                name: associationName,
                address: associationAddress,
                phone: associationPhone,
                description: associationDescription
            }, {
                headers: { Authorization: `Bearer ${currentToken}` }
            });

            // Update association state with new data
            updateAssociation(response.data);
            Alert.alert("Succès", "Les informations ont été mises à jour avec succès.")
        } catch (error) {
            console.error('Failed to update association info', error);
            Alert.alert("Erreur", "La mise à jour des informations a échoué.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Informations de l'association</Text>
            <TextInput
                style={styles.input}
                placeholder="Nom de l'association"
                value={associationName}
                onChangeText={setAssociationName}
            />
            <TextInput
                style={styles.input}
                placeholder="Adresse"
                value={associationAddress}
                onChangeText={setAssociationAddress}
            />
            <TextInput
                style={styles.input}
                placeholder="Téléphone"
                value={associationPhone}
                onChangeText={setAssociationPhone}
            />
            <TextInput
                style={styles.input}
                placeholder="Description"
                value={associationDescription}
                onChangeText={setAssociationDescription}
            />
            <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Icon name="save" size={20} color="#FFFFFF" />
                <Text style={styles.buttonText}>Enregistrer</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        margin: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
        borderRadius: 5,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        marginLeft: 10,
    },
});

export default EditAssociationScreen;