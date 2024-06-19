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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    courseItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#E0E2E8',
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
        color: '#1C1C1F',
    },
    courseTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        textDecorationColor: '#5DA5B3',
        marginBottom: 5,
        color: '#1C1C1F',
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
    picker: {
        width: '100%',
        color: '#E0E2E8',
        marginBottom: 10,
    },
});

export default styles;