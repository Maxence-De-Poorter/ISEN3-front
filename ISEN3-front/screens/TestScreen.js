import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Alert, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function TestScreen({ navigation }) {
    const [currentUrl, setCurrentUrl] = useState(null);

    const handleButtonPress = (url) => {
        setCurrentUrl(url);
    };

    const handleNavigationStateChange = (navState) => {
        const { url } = navState;
        if (url.includes('confirmation')) {
            Alert.alert('Paiement confirmé', 'Votre paiement a été confirmé avec succès.');
            setCurrentUrl(null);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.background}>
                {!currentUrl ? (
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => handleButtonPress('https://www.helloasso.com/associations/densho/evenements/cours-a-l-unite-10')}
                        >
                            <Text style={styles.buttonText}>Ticket Unitaire 10€</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => handleButtonPress('https://www.helloasso.com/associations/densho/evenements/carte-15-cours-130')}
                        >
                            <Text style={styles.buttonText}>Carte 15 cours 130€</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => handleButtonPress('https://www.helloasso.com/associations/densho/evenements/carte-34-cours-250')}
                        >
                            <Text style={styles.buttonText}>Carte 34 cours 250€</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => handleButtonPress('https://www.helloasso.com/associations/densho/evenements/cours-particulier-50')}
                        >
                            <Text style={styles.buttonText}>Cours particulier 50€</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => setCurrentUrl(null)}
                        >
                            <Text style={styles.backButtonText}>Retour</Text>
                        </TouchableOpacity>
                        <WebView
                            source={{ uri: currentUrl }}
                            style={styles.webView}
                            onNavigationStateChange={handleNavigationStateChange}
                            scalesPageToFit={true}
                        />
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1C1C1F', // Couleur de fond pour l'écran
    },
    background: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1C1C1F', // Couleur de fond pour le contenu
        paddingHorizontal: 20,
        paddingTop: 20, // Ajustement pour SafeAreaView
    },
    buttonContainer: {
        width: '100%',
    },
    button: {
        padding: 20,
        backgroundColor: '#007BFF',
        borderRadius: 10,
        marginVertical: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    backButton: {
        position: 'absolute',
        top: 20,
        left: 10,
        padding: 10,
        backgroundColor: '#FF0000',
        borderRadius: 5,
        zIndex: 1,
    },
    backButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    webView: {
        flex: 1,
        width: windowWidth - 40, // Réduit la largeur de 40 points de chaque côté
        marginHorizontal: 20, // Marge horizontale
        marginTop: 60, // Ajustement pour laisser de l'espace pour le bouton de retour
    },
});

export default TestScreen;
