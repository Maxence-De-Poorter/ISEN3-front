import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

function Tickets({ count }) {
    return (
        <View style={styles.container}>
            <Icon name="ticket-outline" size={24} color="#E0E2E8" />
            <Text style={styles.count}>{count}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
    },
    count: {
        marginLeft: 5,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#E0E2E8',
    },
});

export default Tickets;