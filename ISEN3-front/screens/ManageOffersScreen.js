import React, { useContext, useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Modal, TextInput, ScrollView, Alert, Linking } from 'react-native';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/ManageOffersStyles';

function ManageOffersScreen({ navigation }) {
    const { checkAndRefreshToken } = useContext(AuthContext);
    const [modalVisible, setModalVisible] = useState(false);
    const [offers, setOffers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchTag, setSearchTag] = useState('');
    const [currentOffer, setCurrentOffer] = useState({
        id: null,
        title: '',
        places: '',
        startDate: '',
        endDate: '',
        price: '',
        formUrl: '',
    });

    useEffect(() => {
        fetchOffers();
    }, []);

    const fetchOffers = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.get('https://isen3-back.onrender.com/api/offers', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setOffers(response.data);
        } catch (error) {
            console.error('Error fetching offers:', error);
        }
    };

    const handleCreateOrUpdateOffer = async () => {
        if (!currentOffer.title || !currentOffer.places || !currentOffer.startDate || !currentOffer.endDate || !currentOffer.price || !currentOffer.formUrl) {
            Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires.');
            return;
        }

        try {
            const isAuthenticated = await checkAndRefreshToken();
            if (!isAuthenticated) {
                navigation.navigate('Login');
                return;
            }

            const token = await AsyncStorage.getItem('token');

            const startDateParts = currentOffer.startDate.split('/');
            const endDateParts = currentOffer.endDate.split('/');
            const startDate = new Date(
                parseInt(startDateParts[2], 10),
                parseInt(startDateParts[1], 10) - 1,
                parseInt(startDateParts[0], 10)
            ).toISOString();
            const endDate = new Date(
                parseInt(endDateParts[2], 10),
                parseInt(endDateParts[1], 10) - 1,
                parseInt(endDateParts[0], 10)
            ).toISOString();

            const requestData = {
                title: currentOffer.title,
                places: parseInt(currentOffer.places, 10),
                startDate,
                endDate,
                price: parseFloat(currentOffer.price),
                formUrl: currentOffer.formUrl,
            };

            let response;
            if (currentOffer.id) {
                response = await axios.put(`https://isen3-back.onrender.com/api/offers/${currentOffer.id}`, requestData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } else {
                response = await axios.post('https://isen3-back.onrender.com/api/offers', requestData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            }

            if (response.status !== 200 && response.status !== 201) {
                console.error('Error creating/updating offer:', response.data);
                return;
            }

            console.log('Offer created/updated:', response.data);
            setModalVisible(false);
            setCurrentOffer({
                id: null,
                title: '',
                places: '',
                startDate: '',
                endDate: '',
                price: '',
                formUrl: '',
            });
            await fetchOffers();
        } catch (error) {
            console.error('Error creating/updating offer:', error.response ? error.response.data : error.message);
        }
    };

    const handleDeleteOffer = async (offerId) => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.delete(`https://isen3-back.onrender.com/api/offers/${offerId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.status !== 200) {
                console.error('Error deleting offer:', response.data);
                return;
            }

            console.log('Offer deleted:', response.data);
            await fetchOffers();
        } catch (error) {
            console.error('Error deleting offer:', error.response ? error.response.data : error.message);
        }
    };

    const confirmDeleteOffer = (offer) => {
        Alert.alert(
            "Confirmer la suppression",
            `Voulez-vous vraiment supprimer l'offre "${offer.title}" ?`,
            [
                {
                    text: "Annuler",
                    style: "cancel"
                },
                {
                    text: "Supprimer",
                    onPress: () => handleDeleteOffer(offer.id)
                }
            ]
        );
    };

    const openOfferModal = (offer) => {
        if (offer) {
            setCurrentOffer({
                id: offer.id,
                title: offer.title,
                places: offer.places.toString(),
                startDate: new Date(offer.startDate).toLocaleDateString('fr-FR'),
                endDate: new Date(offer.endDate).toLocaleDateString('fr-FR'),
                price: offer.price.toString(),
                formUrl: offer.formUrl,
            });
        } else {
            setCurrentOffer({
                id: null,
                title: '',
                places: '',
                startDate: '',
                endDate: '',
                price: '',
                formUrl: '',
            });
        }
        setModalVisible(true);
    };

    const handleDateChange = (field, value) => {
        const formattedDate = formatAsDate(value);
        setCurrentOffer({ ...currentOffer, [field]: formattedDate });
    };

    const formatAsDate = (value) => {
        const numericValue = value.replace(/\D/g, '');
        const parts = numericValue.match(/(\d{1,2})(\d{1,2})?(\d{1,4})?/);
        let date = '';
        if (parts) {
            if (parts[1]) date += parts[1];
            if (parts[2]) date += '/' + parts[2];
            if (parts[3]) date += '/' + parts[3];
        }
        return date;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Les offres disponibles</Text>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                {offers.map(offer => (
                    <View key={offer.id} style={styles.offerContainer}>
                        <Text style={styles.offerTitle}>{offer.title}</Text>
                        <Text style={styles.offerDetails}>Places: {offer.places}</Text>
                        <Text style={styles.offerDetails}>Période: {new Date(offer.startDate).toLocaleDateString('fr-FR')} - {new Date(offer.endDate).toLocaleDateString('fr-FR')}</Text>
                        <Text style={styles.offerDetails}>Prix: {offer.price} €</Text>
                        <TouchableOpacity onPress={() => Linking.openURL(offer.formUrl)}>
                            <Text style={styles.offerDetails}>Lien du formulaire</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => openOfferModal(offer)}
                        >
                            <Text style={styles.buttonText}>Modifier</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => confirmDeleteOffer(offer)}
                        >
                            <Text style={styles.buttonText}>Supprimer</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>

            {currentOffer && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>{currentOffer.id ? "Modifier l'offre" : "Créer une nouvelle offre"}</Text>
                            <TextInput
                                placeholder="Titre"
                                value={currentOffer.title}
                                onChangeText={title => setCurrentOffer({ ...currentOffer, title })}
                                style={styles.input}
                                placeholderTextColor="#E0E2E8"
                            />
                            <TextInput
                                placeholder="Nombre de places"
                                value={currentOffer.places}
                                onChangeText={places => setCurrentOffer({ ...currentOffer, places })}
                                keyboardType="numeric"
                                style={styles.input}
                                placeholderTextColor="#E0E2E8"
                            />
                            <TextInput
                                placeholder="Date de début (jj/mm/aaaa)"
                                value={currentOffer.startDate}
                                onChangeText={value => handleDateChange('startDate', value)}
                                style={styles.input}
                                placeholderTextColor="#E0E2E8"
                                keyboardType="numeric"
                            />
                            <TextInput
                                placeholder="Date de fin (jj/mm/aaaa)"
                                value={currentOffer.endDate}
                                onChangeText={value => handleDateChange('endDate', value)}
                                style={styles.input}
                                placeholderTextColor="#E0E2E8"
                                keyboardType="numeric"
                            />
                            <TextInput
                                placeholder="Prix"
                                value={currentOffer.price}
                                onChangeText={price => setCurrentOffer({ ...currentOffer, price })}
                                keyboardType="numeric"
                                style={styles.input}
                                placeholderTextColor="#E0E2E8"
                            />
                            <TextInput
                                placeholder="URL du formulaire"
                                value={currentOffer.formUrl}
                                onChangeText={formUrl => setCurrentOffer({ ...currentOffer, formUrl })}
                                style={styles.input}
                                placeholderTextColor="#E0E2E8"
                            />
                            <TouchableOpacity
                                style={styles.button}
                                onPress={handleCreateOrUpdateOffer}
                            >
                                <Text style={styles.buttonText}>{currentOffer.id ? "Modifier" : "Créer"}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.buttonText}>Annuler</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            )}
            <View style={styles.bottomContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => openOfferModal(null)}
                >
                    <Text style={styles.buttonText}>Créer une nouvelle offre</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default ManageOffersScreen;
