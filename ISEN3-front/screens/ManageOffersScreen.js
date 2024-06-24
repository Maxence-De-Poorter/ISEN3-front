import React, { useContext, useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Modal, TextInput, Button, ScrollView, Alert, Linking } from 'react-native';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/ManageOffersStyles';
import DateTimePicker from "@react-native-community/datetimepicker";

function ManageOffersScreen({ navigation }) {
    const { checkAndRefreshToken } = useContext(AuthContext);
    const [modalVisible, setModalVisible] = useState(false);
    const [offers, setOffers] = useState([]);
    const [currentOffer, setCurrentOffer] = useState({
        id: null,
        title: '',
        places: '',
        startDate: new Date(),
        endDate: new Date(),
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
        try {
            const isAuthenticated = await checkAndRefreshToken();
            if (!isAuthenticated) {
                navigation.navigate('Login');
                return;
            }

            const token = await AsyncStorage.getItem('token');
            const requestData = {
                title: currentOffer.title,
                places: parseInt(currentOffer.places, 10),
                startDate: currentOffer.startDate.toISOString(),
                endDate: currentOffer.endDate.toISOString(),
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
                startDate: new Date(),
                endDate: new Date(),
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
                startDate: new Date(offer.startDate),
                endDate: new Date(offer.endDate),
                price: offer.price.toString(),
                formUrl: offer.formUrl,
            });
        } else {
            setCurrentOffer({
                id: null,
                title: '',
                places: '',
                startDate: new Date(),
                endDate: new Date(),
                price: '',
                formUrl: '',
            });
        }
        setModalVisible(true);
    };

    const handleDateChange = (event, selectedDate, field) => {
        const currentDate = selectedDate || currentOffer[field];
        setCurrentOffer({ ...currentOffer, [field]: currentDate });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Les offres disponibles</Text>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                {offers.map(offer => (
                    <View key={offer.id} style={styles.offerContainer}>
                        <Text style={styles.offerTitle}>{offer.title}</Text>
                        <Text style={styles.offerDetails}>Places: {offer.places}</Text>
                        <Text style={styles.offerDetails}>Période: {new Date(offer.startDate).toLocaleDateString()} - {new Date(offer.endDate).toLocaleDateString()}</Text>
                        <Text style={styles.offerDetails}>Prix: {offer.price} €</Text>
                        <TouchableOpacity onPress={() => Linking.openURL(offer.formUrl)}>
                            <Text style={styles.offerLink}>Lien du formulaire</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.modifyButton}
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

            <TouchableOpacity
                style={styles.createButton}
                onPress={() => openOfferModal(null)}
            >
                <Text style={styles.buttonText}>Créer une nouvelle offre</Text>
            </TouchableOpacity>

            {currentOffer && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{currentOffer.id ? "Modifier l'offre" : "Créer une nouvelle offre"}</Text>
                        <TextInput
                            placeholder="Titre"
                            value={currentOffer.title}
                            onChangeText={title => setCurrentOffer({ ...currentOffer, title })}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Nombre de places"
                            value={currentOffer.places}
                            onChangeText={places => setCurrentOffer({ ...currentOffer, places })}
                            keyboardType="numeric"
                            style={styles.input}
                        />
                        <View style={styles.dateTimeContainer}>
                            <Text>Début :</Text>
                            <DateTimePicker
                                value={currentOffer.startDate}
                                mode="date"
                                display="default"
                                onChange={(event, selectedDate) => handleDateChange(event, selectedDate, 'startDate')}
                                style={styles.picker}
                            />
                        </View>
                        <View style={styles.dateTimeContainer}>
                            <Text>Fin :</Text>
                            <DateTimePicker
                                value={currentOffer.endDate}
                                mode="date"
                                display="default"
                                onChange={(event, selectedDate) => handleDateChange(event, selectedDate, 'endDate')}
                                style={styles.picker}
                            />
                        </View>
                        <TextInput
                            placeholder="Prix"
                            value={currentOffer.price}
                            onChangeText={price => setCurrentOffer({ ...currentOffer, price })}
                            keyboardType="numeric"
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="URL du formulaire"
                            value={currentOffer.formUrl}
                            onChangeText={formUrl => setCurrentOffer({ ...currentOffer, formUrl })}
                            style={styles.input}
                        />
                        <Button title={currentOffer.id ? "Modifier" : "Créer"} onPress={handleCreateOrUpdateOffer} />
                        <Button title="Annuler" onPress={() => setModalVisible(false)} />
                    </View>
                </Modal>
            )}
        </View>
    );
}

export default ManageOffersScreen;