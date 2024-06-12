import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#1C1C1F",
        height: "100%",
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    profileContainer: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    closeButton: {
        marginTop: 50,
        marginLeft: 10,
    },
    infoContainer: {
        padding: 20,
        backgroundColor: '#E0E2E8',
        borderRadius: 10,
        margin: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#394054',
    },
    input: {
        height: 40,
        borderColor: '#B0C0D4',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
        borderRadius: 5,
        backgroundColor: '#FFFFFF',
        color: '#1C1C1F',
    },
    buttonText: {
        color: '#1C1C1F',
        fontSize: 16,
        marginLeft: 10,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#5DA5B3',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    icon: {
        color: '#1C1C1F',
    },
});

export default styles;
