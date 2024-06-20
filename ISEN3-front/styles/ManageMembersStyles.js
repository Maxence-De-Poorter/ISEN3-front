import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1C1C1F',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
        color: '#E0E2E8',
        textDecorationLine: 'underline',
        textDecorationColor: '#5DA5B3',
    },
    sectionHeader: {
        backgroundColor: '#2C2C2F',
        padding: 8,
        borderRadius: 5,
        marginTop: 10,
    },
    sectionHeaderText: {
        fontSize: 18,
        color: '#E0E2E8',
    },
    userContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#444',
    },
    userText: {
        fontSize: 16,
        color: '#E0E2E8',
    },
    actionButtonsContainer: {
        flexDirection: 'row',
    },
    editButton: {
        backgroundColor: '#5DA5B3',
        padding: 8,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    creditButton: {
        backgroundColor: '#5DA5B3',
        padding: 8,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    saveButton: {
        backgroundColor: '#5DA5B3',
        padding: 10,
        borderRadius: 5,
        marginVertical: 10,
    },
    deleteButton: {
        backgroundColor: '#FF6347',
        padding: 10,
        borderRadius: 5,
        marginVertical: 10,
    },
    cancelButton: {
        backgroundColor: '#6c757d',
        padding: 10,
        borderRadius: 5,
        marginVertical: 10,
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#1C1C1F',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#E0E2E8',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
        borderRadius: 5,
        width: '100%',
        color: '#E0E2E8',
        backgroundColor: '#2C2C2F',
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