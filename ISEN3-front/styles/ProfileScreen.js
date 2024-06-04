import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        height: "100%",
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    profileContainer: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    closeButton: {
        marginTop: 50,
        marginLeft: 10,
    },
});

export default styles;