import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput } from 'react-native';
import styles from '../styles/ManagePurchasesStyles';

function ManagePurchases() {
    const [cards, setCards] = useState([]);
    const [newCard, setNewCard] = useState({ type: '', places: 0, expirationDate: '' });

    useEffect(() => {
        // Fetch the current cards and subscriptions
        // Example: fetchCards();
    }, []);

    const handleAddCard = () => {
        // Add a new card or subscription logic
        // Example: addCard(newCard);
    };

    const handleEditCard = (id) => {
        // Edit card or subscription logic
        // Example: editCard(id, updatedCardData);
    };

    const handleDeleteCard = (id) => {
        // Delete card or subscription logic
        // Example: deleteCard(id);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Gérer les achats et abonnements</Text>
            <FlatList
                data={cards}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.cardItem}>
                        <Text>{item.type}</Text>
                        <Text>{item.places} places</Text>
                        <Text>Expiration: {item.expirationDate}</Text>
                        <TouchableOpacity onPress={() => handleEditCard(item.id)}>
                            <Text style={styles.editButton}>Editer</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleDeleteCard(item.id)}>
                            <Text style={styles.deleteButton}>Supprimer</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
            <View style={styles.addCardContainer}>
                <TextInput
                    placeholder="Type (prepaid/subscription)"
                    value={newCard.type}
                    onChangeText={(text) => setNewCard({ ...newCard, type: text })}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Places"
                    value={newCard.places.toString()}
                    onChangeText={(text) => setNewCard({ ...newCard, places: parseInt(text) })}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Date d'expiration"
                    value={newCard.expirationDate}
                    onChangeText={(text) => setNewCard({ ...newCard, expirationDate: text })}
                    style={styles.input}
                />
                <TouchableOpacity onPress={handleAddCard} style={styles.addButton}>
                    <Text style={styles.addButtonText}>Ajouter</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default ManagePurchases;
