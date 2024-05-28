import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        backgroundColor: "black",
        height: "100%",
    },
    header: {
        borderBottomColor: "white",
        borderBottomWidth: 2,
        flexDirection: "row",
        alignItems: "center",
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: "white",
        marginLeft: 10,
    },
    buttonsContainer: {
        width: '100%',
    },
    button: {
        height: 60,
        padding: 15,
        alignItems: 'center',
        flexDirection: "row",
        borderBottomWidth: 2,
        borderColor: 'white',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: "white",
    },
    loginContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    visitorMessage: {
        fontSize: 16,
        color: "white",
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        width: '100%',
        marginBottom: 10,
        paddingLeft: 10,
        color: 'white',
    },
    icon: {
        marginRight: 10,
    },
    logInButton: {
        padding: 15,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
    },
});

export default styles;
