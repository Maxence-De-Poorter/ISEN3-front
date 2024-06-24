import React, { useState, useContext } from 'react';
import { View, TouchableOpacity, Text, Alert, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';

const windowWidth = Dimensions.get('window').width;

function PaymentScreen({ route, navigation }) {
    const { user } = useContext(AuthContext);
    const [currentUrl, setCurrentUrl] = useState(route.params.url);
    const { offerId } = route.params;
    const [paymentConfirmed, setPaymentConfirmed] = useState(false); // New state to prevent multiple confirmations

    const handleNavigationStateChange = async (navState) => {
        const { url } = navState;
        if (url.includes('confirmation') && !paymentConfirmed) { // Check paymentConfirmed state
            setPaymentConfirmed(true); // Set state to true to prevent further confirmations
            try {
                const token = await AsyncStorage.getItem('token');
                await axios.post(`https://isen3-back.onrender.com/api/offers/credit/${user.id}`, {
                    offerId: offerId,
                }, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                Alert.alert('Paiement confirmé', 'Votre paiement a été confirmé avec succès.');
                navigation.goBack();
            } catch (error) {
                Alert.alert('Erreur', 'Il y a eu un problème lors de la confirmation du paiement.');
                console.error('Payment confirmation error:', error);
            }
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.background}>
                    <WebView
                        source={{ uri: currentUrl }}
                        style={styles.webView}
                        onNavigationStateChange={handleNavigationStateChange}
                        scalesPageToFit={true}
                    />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1C1C1F',
    },
    background: {
        flex: 1,
        backgroundColor: '#1C1C1F',
    },
    webView: {
        flex: 1,
        width: windowWidth,
    },
});

export default PaymentScreen;