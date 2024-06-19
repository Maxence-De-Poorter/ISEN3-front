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
    searchButton: {
        backgroundColor: '#007bff',
        padding: 10,
        marginVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    searchContainer: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#333',
        borderRadius: 10,
        marginBottom: 20,
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
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
        width: '100%',
        backgroundColor: '#fff',
    },
    courseContainer: {
        backgroundColor: '#2C2C2E',
        borderRadius: 10,
        padding: 20,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#5DA5B3',
    },
    courseName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#E0E2E8',
    },
    courseSchedule: {
        fontSize: 14,
        color: '#E0E2E8',
        marginBottom: 10,
    },
    courseTags: {
        fontSize: 14,
        color: '#E0E2E8',
        marginBottom: 10,
    },
    courseLink: {
        color: '#007bff',
        textDecorationLine: 'underline',
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
    ticketContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    linkContainer: {
        width: '100%', // Ajouter cette ligne pour s'assurer que le container prenne toute la largeur
        marginBottom: 10,
    },
    inputLink: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
        width: '100%', // S'assurer que l'input prenne toute la largeur du container
        backgroundColor: '#fff',
    },
    removeLinkButton: {
        color: 'red',
        marginLeft: 10,
        marginBottom: 10,
    },
    addLinkButton: {
        backgroundColor: '#007bff',
        padding: 10,
        marginVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
});

export default styles;