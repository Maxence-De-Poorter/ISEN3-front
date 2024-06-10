import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/ProfileScreen';
import axios from 'axios';

const EditAssociationInfo = () => {
    const {association, token, verifyToken, refreshJwtToken} = useContext(AuthContext);
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
                currentToken = await refreshJwtToken();
                if (!currentToken) {
                    Alert.alert("Erreur", "Impossible de mettre à jour les informations. Veuillez vous reconnecter.");
                    return;
                }
            }

            const response = await axios.put('https://isen3-back.onrender.com/api/association/update', {
                name: associationName,
                address: associationAddress,
                phone: associationPhone,
                description: associationDescription
            }, {
                headers: { Authorization: `Bearer ${currentToken}` }
            });

            updateAssociation(response.data);
        } catch (error) {
            console.error('Failed to update association info', error);
            Alert.alert("Erreur", "La mise à jour des informations a échoué.");
        }
    };

    return (
        <View style={editStyles.container}>
            <Text style={editStyles.title}>Informations de l'association</Text>
            <TextInput
                style={editStyles.input}
                placeholder="Nom de l'association"
                value={associationName}
                onChangeText={setAssociationName}
            />
            <TextInput
                style={editStyles.input}
                placeholder="Adresse"
                value={associationAddress}
                onChangeText={setAssociationAddress}
            />
            <TextInput
                style={editStyles.input}
                placeholder="Téléphone"
                value={associationPhone}
                onChangeText={setAssociationPhone}
            />
            <TextInput
                style={editStyles.input}
                placeholder="Description"
                value={associationDescription}
                onChangeText={setAssociationDescription}
            />
            <TouchableOpacity style={editStyles.button} onPress={handleSave}>
                <Icon name="save" size={20} color="#FFFFFF" />
                <Text style={editStyles.buttonText}>Enregistrer</Text>
            </TouchableOpacity>
        </View>
    );
};

function GestionScreen({ navigation }) {

    return (
        <View style={styles.container}>
            <EditAssociationInfo />
        </View>
    );
}

const editStyles = StyleSheet.create({
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
    buttonText: {
        color: 'black',
        fontSize: 16,
        marginLeft: 10,
    }
});

export default GestionScreen;