import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../AuthContext';

function HomeScreen({ navigation }) {
    const { isLoggedIn } = useContext(AuthContext);

    return (
        <View>
            <Text >Home Screen</Text>
            <TouchableOpacity
                onPress={() => navigation.navigate(isLoggedIn ? 'Profile' : 'Login')}
            >
                <Icon name="person-circle" size={45} color="black" />
            </TouchableOpacity>
        </View>
    );
}

export default HomeScreen;