import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1C1C1F',
    },
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: '#1C1C1F',
        width: '90%',
        marginTop: 20,
        alignSelf: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#E0E2E8',
        textDecorationLine: 'underline',
        textDecorationColor: '#5DA5B3',
        alignSelf: 'center',
        marginBottom: 20,
    },
    label: {
        fontSize: 18,
        color: '#E0E2E8',
        marginBottom: 8,
        alignSelf: 'center',
    },
    input: {
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
        borderRadius: 5,
        width: '100%',
        color: '#E0E2E8',
        backgroundColor: '#2C2C2F',
        alignSelf: 'center',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#5DA5B3',
        padding: 15,
        borderRadius: 5,
        width: '100%',
        alignSelf: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
});

export default styles;