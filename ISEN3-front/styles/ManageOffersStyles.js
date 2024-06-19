import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1C1C1F',
        paddingBottom: 60, // Ajouté pour laisser de la place au bouton en bas
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
        color: '#E0E2E8',
    },
    scrollViewContainer: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    offerContainer: {
        backgroundColor: '#2C2C2E',
        borderRadius: 10,
        padding: 20,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#5DA5B3',
    },
    offerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#E0E2E8',
    },
    offerDetails: {
        fontSize: 14,
        color: '#E0E2E8',
        marginBottom: 10,
    },
    offerLink: {
        fontSize: 14,
        color: '#007bff',
        marginBottom: 10,
    },
    modifyButton: {
        backgroundColor: '#007bff',
        padding: 10,
        marginTop: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    deleteButton: {
        backgroundColor: '#d9534f',
        padding: 10,
        marginTop: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    createButton: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 5,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    modalView: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 18,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
        width: '100%',
        backgroundColor: '#fff',
    },
    dateTimeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    picker: {
        marginLeft: 10,
        flex: 1,
    },
});

export default styles;