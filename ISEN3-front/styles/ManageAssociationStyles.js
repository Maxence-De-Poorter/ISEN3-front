import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1C1C1F',
    },
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: '#1C1C1F',
        padding: 16,
    },
    innerContainer: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#E0E2E8',
        textDecorationLine: 'underline',
        textDecorationColor: '#5DA5B3',
        marginBottom: 16,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 16,
    },
    label: {
        fontSize: 18,
        color: '#E0E2E8',
        marginBottom: 8,
        alignSelf: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
        borderRadius: 5,
        width: '90%',
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
        marginTop: 10,
        width: '90%',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
});

export default styles;