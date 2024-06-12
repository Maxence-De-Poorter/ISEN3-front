import React, {useContext} from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import {AuthContext} from "../context/AuthContext";
import styles from '../styles/HomeStyles';

const danceTypes = [
    'Ballet',
    'Hip Hop',
    'Salsa',
    'Contemporary',
    'Jazz',
    'Tap Dance',
    'Ballroom',
    'Folk Dance',
];

function HomeScreen() {
    const { association } = useContext(AuthContext);

    return (
        <ScrollView style={styles.container}>
            <Image
                source={{ uri: 'https://imgs.search.brave.com/NZNa8b8gryIx-GRJxW3dzTKWySXvvqFFTMwLCo50sJE/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/anVuaWEuY29tL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDIyLzEw/LzJFM0E0MTkzLTEu/anBn' }} // Replace with the URL of the association's image
                style={styles.image}
            />
            <View style={styles.homeContainer}>
                <Text style={styles.title}>{association.name}</Text>
                <Text style={styles.address}>{association.address}</Text>
                <Text style={styles.phone}>{association.phone}</Text>
                <Text style={styles.subtitle}>Types de Danse</Text>
                <View style={styles.danceList}>
                    {danceTypes.map((dance, index) => (
                        <Text key={index} style={styles.danceType}>
                            {dance}
                        </Text>
                    ))}
                </View>
                <Text style={styles.subtitle}>A Propos</Text>
                <Text style={styles.description}>{association.description}</Text>
            </View>
        </ScrollView>
    );
}

export default HomeScreen;