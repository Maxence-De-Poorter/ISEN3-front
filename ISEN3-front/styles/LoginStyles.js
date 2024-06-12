import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#1C1C1F",
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
    logInText:{
        fontSize:40,
        marginBottom:20,
        color: '#E0E2E8',
    },
    logInInput: {
        width: '80%',
        padding:10,
        marginBottom: 10,
        borderColor: '#5DA5B3',
        borderWidth: 1,
        color: '#E0E2E8',
    },
    logInButton: {
        width:"80%",
        marginBottom:10,
        padding: 10,
        borderColor: '#5DA5B3',
        borderWidth: 1,
        alignItems:"center"

    },
    signUpButton: {
        width:"80%",
        marginBottom:10,
        padding: 10,
        alignItems:"center",
        color: '#E0E2E8',

    },
    firmSignUp: {
        alignItems:"center",
        width: '80%',
        flexDirection: 'row',
        borderColor: '#5DA5B3',
        borderWidth: 1,
        margin: 5,
        padding: 10,

    },
    firmIcon:{
        color:"#E0E2E8",
        marginRight:5,
    },
    firmText:{
        color:"#E0E2E8",
    },

});

export default styles;
