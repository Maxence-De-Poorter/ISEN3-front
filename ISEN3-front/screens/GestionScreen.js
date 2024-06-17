import React, { useContext } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/GestionStyles';

function GestionScreen({ navigation }) {
    const { user } = useContext(AuthContext);

    return (
        <View style={styles.container}>
            {user.role === 'administrator' && (
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('EditAssociation')}
                >
                    <Text style={styles.buttonText}>Gérer les informations de l'association</Text>
                </TouchableOpacity>
            )}
            {(user.role === 'administrator' || user.role === 'teacher') && (
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('EditMember')}
                >
                    <Text style={styles.buttonText}>Gérer les membres</Text>
                </TouchableOpacity>

            )}
            {(user.role === 'administrator' || user.role === 'teacher') && (
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('EditCourse')}
                >
                    <Text style={styles.buttonText}>Gérer les Cours</Text>
                </TouchableOpacity>
            )}
            {user.role === 'administrator' && (
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('ManageOffers')}
                >
                    <Text style={styles.buttonText}>Gérer les achats et abonnements</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

export default GestionScreen;