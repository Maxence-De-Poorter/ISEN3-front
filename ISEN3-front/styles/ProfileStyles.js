import { StyleSheet } from 'react-native';

const profileStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#1C1C1F',
        padding: 20,
    },
    infoContainer: {
        padding: 20,
        backgroundColor: '#1C1C1F',
        borderRadius: 10,
        marginVertical: 20,
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    input: {
        width: '100%',
        padding: 10,
        marginBottom: 10,
        borderColor: '#5DA5B3',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#FFFFFF',
        color: '#1C1C1F',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#5DA5B3',
        padding: 15,
        borderRadius: 5,
        marginTop: 10,
        width: '100%',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    icon: {
        color: '#FFFFFF',
        marginRight: 10,
    },
    saveButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#5DA5B3',
        padding: 15,
        borderRadius: 5,
        marginTop: 10,
        width: '100%',
    },
    saveButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
});

export default profileStyles;