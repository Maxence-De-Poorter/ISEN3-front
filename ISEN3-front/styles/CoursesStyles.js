import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#1C1C1F',
    },
    header: {
        fontSize: 24, // Augmenter la taille de la police
        fontWeight: 'bold',
        marginVertical: 8,
        color: '#E0E2E8', // Couleur du texte
        textDecorationLine: 'underline', // Souligné
        textDecorationColor: '#5DA5B3', // Couleur de la ligne soulignée
    },
    sectionHeader: {
        backgroundColor: '#1C1C1F',
        padding: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    courseItem: {
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#1C1C1F',
        borderRadius: 10,
        marginHorizontal: 5,
        borderWidth: 1,
        borderColor: '#5DA5B3',
        width: 200, // Augmenter la largeur pour les éléments horizontaux
        height: 240, // Augmenter la hauteur pour les éléments horizontaux
    },
    courseImage: {
        width: '100%',
        height: 80,
        borderRadius: 10,
        marginBottom: 10,
    },
    courseInfo: {
        alignItems: 'center',
    },
    courseInfos: {
        color: '#E0E2E8',
    },
    courseTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        textDecorationColor: '#5DA5B3',
        marginBottom: 5,
        color: '#E0E2E8',
    },
    noCoursesText: {
        fontSize: 16,
        color: "gray",
        textAlign: "center",
        marginVertical: 10,
    },
    noTicketsText: {
        fontSize: 16,
        color: "red",
        textAlign: "center",
        marginVertical: 10,
    },
    button: {
        backgroundColor: '#5DA5B3',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    historyButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#5DA5B3',
        padding: 15,
        borderRadius: 5,
        width: '100%',
    },
    historyButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    emptyText: {
        fontSize: 16,
        color: "gray",
        textAlign: "center",
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: '#1C1C1F',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#E0E2E8',
    },
    modalImage: {
        width: '100%',
        height: 100,
        borderRadius: 10,
        marginBottom: 10,
    },
    modalCourseTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#E0E2E8',
    },
    modalCourseInfo: {
        fontSize: 16,
        marginBottom: 5,
        color: '#E0E2E8',
    },
    paymentTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#E0E2E8',
    },
    picker: {
        width: '100%',
        color: '#E0E2E8',
        marginBottom: 10,
    },
    pickerItem: {
        color: '#E0E2E8',
    },
});

export default styles;