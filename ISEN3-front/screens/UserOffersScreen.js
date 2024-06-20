import React, { useEffect, useState, useContext } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/UserOffersStyles';

function UserOffersScreen({ navigation }) {
    const { user, checkAndRefreshToken } = useContext(AuthContext);
    const [userOffers, setUserOffers] = useState([]);
    const [usableOffers, setUsableOffers] = useState([]);
    const [expiredOffers, setExpiredOffers] = useState([]);

    useEffect(() => {
        fetchUserOffers();
    }, []);

    const fetchUserOffers = async () => {
        try {
            const isAuthenticated = await checkAndRefreshToken();
            if (!isAuthenticated) {
                navigation.navigate('Login');
                return;
            }

            const token = await AsyncStorage.getItem('token');
            const response = await axios.get(`https://isen3-back.onrender.com/api/offers/me`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const offers = response.data;
            const now = new Date();

            const usable = offers.filter(
                (offer) => offer.remainingPlaces > 0 && new Date(offer.Offer.endDate) > now
            );
            const expired = offers.filter(
                (offer) => offer.remainingPlaces === 0 || new Date(offer.Offer.endDate) <= now
            );

            setUserOffers(offers);
            setUsableOffers(usable);
            setExpiredOffers(expired);
        } catch (error) {
            console.error('Failed to fetch user offers', error);
            Alert.alert("Erreur", "Impossible de récupérer les offres utilisateur.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mes cartes et achats</Text>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                {usableOffers.length > 0 && (
                    <View>
                        <Text style={styles.sectionTitle}>Cartes utilisables</Text>
                        {usableOffers.map((offer) => (
                            <View key={offer.id} style={styles.offerContainer}>
                                <Text style={styles.offerTitle}>{offer.Offer.title}</Text>
                                <Text style={styles.offerDetails}>Places restantes: {offer.remainingPlaces}</Text>
                                <Text style={styles.offerDetails}>Valide jusqu'au: {new Date(offer.Offer.endDate).toLocaleDateString()}</Text>
                            </View>
                        ))}
                    </View>
                )}

                {expiredOffers.length > 0 && (
                    <View>
                        <Text style={styles.sectionTitle}>Cartes expirées ou épuisées</Text>
                        {expiredOffers.map((offer) => (
                            <View key={offer.id} style={styles.offerContainer}>
                                <Text style={styles.offerTitle}>{offer.Offer.title}</Text>
                                <Text style={styles.offerDetails}>Places restantes: {offer.remainingPlaces}</Text>
                                <Text style={styles.offerDetails}>Valide jusqu'au: {new Date(offer.Offer.endDate).toLocaleDateString()}</Text>
                            </View>
                        ))}
                    </View>
                )}
            </ScrollView>
        </View>
    );
}

export default UserOffersScreen;