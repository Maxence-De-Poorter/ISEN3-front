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
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#1C1C1F',
        borderRadius: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#5DA5B3',
    },
    courseImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginRight: 10,
    },
    courseInfo: {
        flex: 1,
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
    viewButton: {
        marginTop: 10,
        backgroundColor: '#5DA5B3',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    viewButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
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
        width: 100,
        height: 100,
        borderRadius: 10,
        marginBottom: 10,
    },
    modalCourseInfo: {
        fontSize: 16,
        marginBottom: 5,
        color: '#E0E2E8',
    },
});

export default styles;