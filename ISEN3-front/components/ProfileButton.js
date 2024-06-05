// ProfileButton.js
import React, { useContext } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../AuthContext';

function ProfileButton({ navigation }) {
    const { isLoggedIn } = useContext(AuthContext);

    return (
        <TouchableOpacity
            style={styles.profileButton}
            onPress={() => navigation.navigate(isLoggedIn ? 'Profile' : 'Login')}
        >
            <Icon name="person-circle" size={30} color="black" />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    profileButton: {
        paddingRight: 20,
    },
});

export default ProfileButton;