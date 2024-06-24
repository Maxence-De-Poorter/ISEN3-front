import { StyleSheet } from 'react-native';

const manageStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#1C1C1F',
        padding: 20,
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
});

export default manageStyles;