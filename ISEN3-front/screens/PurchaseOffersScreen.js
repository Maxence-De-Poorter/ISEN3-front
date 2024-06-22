import React, { useEffect, useState, useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/PurchaseOffersStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

function PurchaseOffersScreen({ navigation }) {
    const { checkAndRefreshToken } = useContext(AuthContext);
    const [offers, setOffers] = useState([]);

    useEffect(() => {
        fetchOffers();
    }, []);

    const fetchOffers = async () => {
        try {
            const isAuthenticated = await checkAndRefreshToken();
            if (!isAuthenticated) {
                navigation.navigate('Login');
                return;
            }

            const token = await AsyncStorage.getItem('token');

            const response = await axios.get('https://isen3-back.onrender.com/api/offers', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setOffers(response.data);
        } catch (error) {
            console.error('Failed to fetch offers', error);
            Alert.alert("Erreur", "Impossible de récupérer les offres.");
        }
    };

    const handleOfferPress = (url, offerId) => {
        navigation.navigate('Payment', { url, offerId });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Acheter des offres</Text>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                {offers.map((offer) => (
                    <TouchableOpacity
                        key={offer.id}
                        style={styles.offerContainer}
                        onPress={() => handleOfferPress(offer.formUrl, offer.id)}
                    >
                        <Text style={styles.offerTitle}>{offer.title}</Text>
                        <Text style={styles.offerDetails}>{`Prix: ${offer.price} €`}</Text>
                        <Text style={styles.offerDetails}>{`Places disponibles: ${offer.places}`}</Text>
                        <Text style={styles.offerDetails}>{`Valide jusqu'au: ${new Date(offer.endDate).toLocaleDateString()}`}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

export default PurchaseOffersScreen;