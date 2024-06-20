// styles/UserOffersStyles.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#1C1C1F',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#E0E2E8',
        marginBottom: 16,
        textDecorationLine: 'underline',
        textDecorationColor: '#5DA5B3',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#E0E2E8',
        marginTop: 20,
        marginBottom: 10,
        textDecorationLine: 'underline',
        textDecorationColor: '#5DA5B3',
    },
    scrollViewContainer: {
        flexGrow: 1,
    },
    offerContainer: {
        padding: 16,
        marginBottom: 16,
        borderRadius: 8,
        backgroundColor: '#333',
        borderWidth: 1,
        borderColor: '#5DA5B3',
    },
    offerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#E0E2E8',
    },
    offerDetails: {
        fontSize: 16,
        color: '#E0E2E8',
    },
});