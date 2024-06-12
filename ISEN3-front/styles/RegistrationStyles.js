import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#1C1C1F",
        height: "100%",
    },
    SignUpContainer: {
        flex: 1,
        alignItems: 'center',
        marginTop: 50,
    },
    SignUpText:{
        fontSize:40,
        marginBottom:20,
        color: '#E0E2E8',
    },
    SignUpInput: {
        width: '80%',
        padding:10,
        marginBottom: 10,
        borderColor: '#5DA5B3',
        borderWidth: 1,
        color: '#E0E2E8',
    },
    SignUpButton: {
        width:"80%",
        marginBottom:10,
        padding: 10,
        borderColor: '#5DA5B3',
        borderWidth: 1,
        alignItems:"center",
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
    }
});

export default styles;