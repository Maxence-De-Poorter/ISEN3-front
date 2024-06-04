import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        height: "100%",
    },
    loginContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    closeButton: {
        marginTop: 50,
        marginLeft: 10,
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
