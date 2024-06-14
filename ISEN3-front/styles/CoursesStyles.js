import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#1C1C1F',
    },
    header: {
        fontSize: 20,
        marginVertical: 8,
        color: '#E0E2E8',
    },
    sectionHeader: {
        backgroundColor: '#1C1C1F', // Assurez-vous que le fond des en-têtes de section est en place
        padding: 8, // Ajustez le padding selon vos préférences
    },
    courseItem: {
        flexDirection: 'row', // Disposer en ligne
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
        flex: 1, // Prendre tout l'espace restant
    },
    courseInfos: {
        color: '#E0E2E8',
    },
    courseTitle: {
        fontSize: 18, // Taille du titre agrandie
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        textDecorationColor: '#5DA5B3',
        marginBottom: 5,
        color: '#E0E2E8',
    },
    noCoursesText: {
        fontSize: 16,
        color: 'gray',
        textAlign: 'center',
        marginVertical: 10,
    },
    noTicketsText: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
        marginVertical: 10,
    },
});

export default styles;
