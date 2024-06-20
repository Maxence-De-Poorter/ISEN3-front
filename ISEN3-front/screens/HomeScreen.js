import React, { useContext } from 'react';
import {View, Text, Image, ScrollView, Linking, TouchableOpacity} from 'react-native';
import { AuthContext } from "../context/AuthContext";
import styles from '../styles/HomeStyles';

function HomeScreen() {
    const { association } = useContext(AuthContext);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image
                source={{ uri: association.imageUrl }}
                style={styles.image}
            />
            <View style={styles.homeContainer}>
                <Text style={styles.title}>{association.name}</Text>
                <Text style={styles.address}>{association.address}</Text>
                <Text style={styles.phone}>{association.phone}</Text>
                <Text style={styles.subtitle}>Types de Danse</Text>
                <View style={styles.danceList}>
                    {association.danceTypes && association.danceTypes.map((dance, index) => (
                        <Text key={index} style={styles.danceType}>
                            {dance}
                        </Text>
                    ))}
                </View>
                <Text style={styles.subtitle}>A Propos <TouchableOpacity onPress={() => Linking.openURL(association.imageVideoUrl)}>
                    <Text style={styles.offerLink}>Photos et Vidéos</Text>
                </TouchableOpacity></Text>
                <Text style={styles.description}>{association.description}</Text>
            </View>
        </ScrollView>
    );
}

export default HomeScreen;