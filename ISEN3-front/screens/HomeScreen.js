import React, {useContext, useEffect, useState} from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import {AuthContext} from "../context/AuthContext";

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
                source={{ uri: 'https://imgs.search.brave.com/BpTP0DdCllLH5Qtwm_ms44HWa4beypb0o5zWEn5X4vQ/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pc2Vu/LW1lZGl0ZXJyYW5l/ZS5mci93cC1jb250/ZW50L3VwbG9hZHMv/MjAyMi8wOS9jeWJl/ci0xNjAweDEwMzgu/anBn' }} // Replace with the URL of the association's image
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

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        height: "100%",
    },
    homeContainer: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    image: {
        width: "100%",
        height: 250,
        marginBottom: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    address: {
        fontSize: 16,
        color: 'gray',
        marginBottom: 5,
    },
    phone: {
        fontSize: 16,
        color: 'gray',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        marginBottom: 20,
    },
    danceList: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        marginBottom: 10,
    },
    danceType: {
        fontSize: 12,
        color: '#333',
        margin: 5,
        backgroundColor: '#f9f9f9',
        padding: 5,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
    },
});

export default HomeScreen;