import { StyleSheet } from 'react-native';

const homeStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1C1C1F',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingVertical: 20,
    },
    homeContainer: {
        width: '90%',
        alignItems: 'flex-start',
    },
    image: {
        width: '100%',
        height: 250,
        borderRadius: 10,
        marginBottom: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#E0E2E8',
        textDecorationLine: 'underline',
        textDecorationColor: '#5DA5B3',
    },
    address: {
        fontSize: 16,
        color: '#B0C0D4',
        marginBottom: 5,
    },
    phone: {
        fontSize: 16,
        color: '#B0C0D4',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#E0E2E8',
        textDecorationLine: 'underline',
        textDecorationColor: '#5DA5B3',
    },
    description: {
        fontSize: 16,
        marginBottom: 20,
        color: '#B0C0D4',
    },
    danceList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        marginBottom: 20,
    },
    danceType: {
        fontSize: 14,
        color: '#B0C0D4',
        margin: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderWidth: 1,
        borderColor: '#5DA5B3',
        borderRadius: 10,
    },
    offerLink: {
        fontSize: 16,
        marginBottom: 20,
        color: '#B0C0D4',
    }
});

export default homeStyles;