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
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        width: '100%',
    },
    buttonText: {
        color: '#1C1C1F',
        fontSize: 16,
        marginLeft: 10,
    },
    icon: {
        color: '#1C1C1F',
    },
});

export default manageStyles;