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
        backgroundColor: '#1C1C1F',
        padding: 8,
        flexDirection: 'row', // Mettre les éléments en ligne
        justifyContent: 'space-between', // Espacer les éléments
        alignItems: 'center', // Centrer verticalement
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
buttonText: {
    color: "#007AFF",
    fontWeight: "bold",
},
historyButton: {
    marginLeft: "auto",
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
});

export default styles;