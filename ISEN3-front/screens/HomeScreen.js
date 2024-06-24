import React, { useContext } from 'react';
import {View, Text, Image, ScrollView, Linking, TouchableOpacity} from 'react-native';
import { AuthContext } from "../context/AuthContext";
import styles from '../styles/HomeStyles';

function HomeScreen() {
    const { association } = useContext(AuthContext);

    return (
        <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.Scrollcontainer}>
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
                <Text style={styles.subtitle}>A Propos </Text>
                <Text style={styles.description}>{association.description}</Text>
                <Text style={styles.subtitle}>Photos et Vidéos</Text>
                <TouchableOpacity onPress={() => Linking.openURL(association.imageVideoUrl)}>
                    <Text style={styles.offerLink}>Lien ici.</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
            </View>
    );
}

export default HomeScreen;