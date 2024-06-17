import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: '#1C1C1F',
        alignItems: 'center',
        padding: 16,
    },
    innerContainer: {
        width: '100%',
        alignItems: 'center',
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#E0E2E8',
    },
    inputContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 10,
    },
    label: {
        width: '80%',
        color: '#E0E2E8',
        marginBottom: 5,
    },
    input: {
        width: '80%',
        padding: 10,
        borderColor: '#5DA5B3',
        borderWidth: 1,
        color: '#E0E2E8',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#5DA5B3',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        marginLeft: 10,
    },
});

export default styles;
