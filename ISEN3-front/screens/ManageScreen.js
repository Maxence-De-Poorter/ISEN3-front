import React, { useContext } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/ManageStyles';  // Utilisation des styles de ManageStyles

function ManageScreen({ navigation }) {
    const { user } = useContext(AuthContext);

    return (
        <View style={styles.container}>
            {user.role === 'administrator' && (
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('EditAssociation')}
                >
                    <Icon name="settings-outline" size={20} color="black" style={styles.icon} />
                    <Text style={styles.buttonText}>Gérer les informations de l'association</Text>
                </TouchableOpacity>
            )}
            {user.role === 'administrator' && (
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('ManageOffers')}
                >
                    <Icon name="pricetag-outline" size={20} color="black" style={styles.icon} />
                    <Text style={styles.buttonText}>Gérer les achats et abonnements</Text>
                </TouchableOpacity>
            )}
            {(user.role === 'administrator' || user.role === 'teacher') && (
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('EditMember')}
                >
                    <Icon name="people-outline" size={20} color="black" style={styles.icon} />
                    <Text style={styles.buttonText}>Gérer les membres</Text>
                </TouchableOpacity>
            )}
            {(user.role === 'administrator' || user.role === 'teacher') && (
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('EditCourse')}
                >
                    <Icon name="book-outline" size={20} color="black" style={styles.icon} />
                    <Text style={styles.buttonText}>Gérer les Cours</Text>
                </TouchableOpacity>
            )}

        </View>
    );
}

export default ManageScreen;