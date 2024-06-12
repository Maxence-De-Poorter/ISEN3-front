import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#1C1C1F",
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
        color: '#E0E2E8',
        textDecorationLine: 'underline',
        textDecorationColor: '#5DA5B3',
    },
    address: {
        fontSize: 16,
        color: '#B0C0D4',
        marginBottom: 5,
    },
    phone: {
        fontSize: 16,
        color: '#B0C0D4',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#E0E2E8',
        textDecorationLine: 'underline',
        textDecorationColor: '#5DA5B3',
    },
    description: {
        fontSize: 16,
        marginBottom: 20,
        color: '#B0C0D4',
    },
    danceList: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        marginBottom: 10,
        backgroundColor: '#1C1C1F',
    },
    danceType: {
        fontSize: 12,
        color: '#B0C0D4',
        margin: 5,
        backgroundColor: '#1C1C1F',
        padding: 5,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
    },
});

export default styles;