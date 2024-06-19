import { StyleSheet } from 'react-native';

const registrationStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1C1C1F',
        alignItems: 'center',
        justifyContent: 'center',
    },
    signUpContainer: {
        width: '80%',
        alignItems: 'center',
    },
    signUpText: {
        fontSize: 30,
        marginBottom: 20,
        color: '#E0E2E8',
        fontWeight: 'bold',
    },
    signUpInput: {
        width: '100%',
        padding: 10,
        marginBottom: 10,
        borderColor: '#5DA5B3',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#FFFFFF',
        color: '#1C1C1F',
    },
    signUpButton: {
        width: '100%',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        backgroundColor: '#5DA5B3',
        marginBottom: 10,
    },
    firmSignUp: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: 15,
        borderRadius: 5,
        borderColor: '#5DA5B3',
        borderWidth: 1,
        marginBottom: 10,
    },
    firmIcon: {
        color: '#E0E2E8',
        marginRight: 10,
    },
    firmText: {
        color: '#E0E2E8',
    },
    divider: {
        width: '100%',
        height: 1,
        backgroundColor: '#5DA5B3',
        marginVertical: 20,
    },
    signUpButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
});

export default registrationStyles;