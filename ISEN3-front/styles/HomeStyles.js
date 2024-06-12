import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        height: "100%",
    },
    homeContainer: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    image: {
        width: "100%",
        height: 250,
        marginBottom: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    address: {
        fontSize: 16,
        color: 'gray',
        marginBottom: 5,
    },
    phone: {
        fontSize: 16,
        color: 'gray',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        marginBottom: 20,
    },
    danceList: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        marginBottom: 10,
    },
    danceType: {
        fontSize: 12,
        color: '#333',
        margin: 5,
        backgroundColor: '#f9f9f9',
        padding: 5,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
    },
});

export default styles;