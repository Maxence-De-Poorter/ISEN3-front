import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#1C1C1F',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 16,
        color: '#E0E2E8',
        textAlign: 'center',
    },
    scrollViewContainer: {
        paddingBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#E0E2E8',
        marginBottom: 8,
    },
    offerContainer: {
        backgroundColor: '#2C2C2E',
        borderRadius: 8,
        padding: 16,
        marginBottom: 8,
    },
    offerTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#E0E2E8',
    },
    offerDetails: {
        fontSize: 14,
        color: '#E0E2E8',
    },
    purchaseButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#5DA5B3',
        padding: 15,
        borderRadius: 5,
        marginTop: 10,
        width: '100%',
    },
    purchaseButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
});

export default styles;