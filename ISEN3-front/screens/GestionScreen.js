import React, { useContext } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';

function GestionScreen({ navigation }) {
    const { user } = useContext(AuthContext);

    return (
        <View style={styles.container}>
            {user.role === 'administrator' && (
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('EditAssociation')}
                >
                    <Text style={styles.buttonText}>Modifier l'Association</Text>
                </TouchableOpacity>
            )}
            {(user.role === 'administrator' || user.role === 'teacher') && (
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('EditMember')}
                >
                    <Text style={styles.buttonText}>Modifier les Élèves</Text>
                </TouchableOpacity>
            )}
            {/* Ajoutez d'autres boutons ici pour d'autres fonctionnalités */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
});

export default GestionScreen;