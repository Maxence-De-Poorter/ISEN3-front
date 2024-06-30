// styles/ResetPasswordStyles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1C1C1F',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 25,
        marginBottom: 20,
        color: '#E0E2E8',
        fontWeight: 'bold',
        width: '80%',
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: '#5DA5B3',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
        borderRadius: 5,
        backgroundColor: '#FFFFFF',
        color: '#1C1C1F',
        width: '80%',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#5DA5B3',
        padding: 15,
        borderRadius: 5,
        marginTop: 10,
        width: '80%',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default styles;