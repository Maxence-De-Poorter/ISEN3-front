import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#1C1C1F',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#E0E2E8',
    },
    sectionHeader: {
        backgroundColor: '#1C1C1F',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#5DA5B3',
    },
    sectionHeaderText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#E0E2E8',
    },
    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
    userText: {
        fontSize: 18,
        color: '#E0E2E8',
    },
    editButton: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#5DA5B3',
        alignSelf: 'flex-end',
    },
    buttonText: {
        color: '#E0E2E8',
        fontSize: 16,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        width: "80%",
        backgroundColor: "#1C1C1F",
        padding: 20,
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
        color: '#E0E2E8',
    },
    input: {
        height: 40,
        borderColor: "#5DA5B3",
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
        borderRadius: 5,
        color: '#E0E2E8',
    },
    saveButton: {
        backgroundColor: "#007BFF",
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        alignItems: "center",
    },
    deleteButton: {
        backgroundColor: "red",
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        alignItems: "center",
    },
    cancelButton: {
        backgroundColor: "gray",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
    },
    createButton: {
        backgroundColor: "#28a745",
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        alignItems: "center",
    },
});

export default styles;
