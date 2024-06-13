import React, { useContext } from 'react';
import { View, TouchableOpacity, Text, Alert } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/GestionStyles';


function TestScreen({ navigation }) {
    const { user } = useContext(AuthContext);

    const createTransaction = async () => {
        const url = "https://api.helloasso.com/v5/organizations/a090b6497a6d46cbb5cb9a3ac5d07024/forms/Donation/action/quick-create";
        const data = {
            amount: 5000,  // Montant en centimes
            description: "Adhésion annuelle",
            // Autres paramètres requis par l'API
        };

        const options = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer YHIfAmmv9WPTtGGkGaYwQObpmx7PwCmH`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error('Erreur de réseau');
            }
            const responseData = await response.json();
            Alert.alert("Transaction créée avec succès", `Redirigez l'utilisateur vers: ${responseData.url}`);
        } catch (error) {
            Alert.alert("Erreur", error.message);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={createTransaction}
            >
                <Text style={styles.buttonText}>Créer une Transaction</Text>
            </TouchableOpacity>
        </View>
    );
}

export default TestScreen;
