import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        height: "100%",
    },
    loginContainer: {
        flex: 1,
        alignItems: 'center',
        marginTop: 50,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: 10,
        marginTop: 50,

    },
    closeButton: {
        padding: 5,
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
    },
    logInText:{
        fontSize:40,
        marginBottom:20,
    },
    logInInput: {
        width: '80%',
        padding:10,
        marginBottom: 10,
        borderColor: 'black',
        borderWidth: 1,
    },
    logInButton: {
        width:"80%",
        marginBottom:10,
        padding: 10,
        borderColor: 'black',
        borderWidth: 1,
        alignItems:"center"

    },
    firmSignUp: {
        alignItems:"center",
        width: '80%',
        flexDirection: 'row',
        borderColor: 'black',
        borderWidth: 1,
        margin: 5,
        padding: 10,

    },
    firmIcon:{
        color:"black",
        marginRight:5,
    },

});

export default styles;
