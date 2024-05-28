import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Dimensions, ImageBackground } from 'react-native';
import img from "../assets/img.png";

const App = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <ImageBackground source={img} resizeMode="cover" style={styles.imageBackground}>
                <View style={styles.overlay}>
                    <Text style={styles.appName}>Let's Dance</Text>
                </View>
                <View style={styles.profileSection}>
                    <Image
                        source={{ uri: 'https://via.placeholder.com/150' }}
                        style={styles.profileImage}
                    />
                </View>
                <View style={styles.aboutSection}>
                    <Text style={styles.aboutHeader}>About THE ASSO</Text>
                    <Text style={styles.aboutSubHeader}>A Few Words About the association</Text>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>NAME</Text>
                        <Text style={styles.infoValue}>*************************</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>ADRESS</Text>
                        <Text style={styles.infoValue}>**************</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>TYPE OF SERVICE</Text>
                        <Text style={styles.infoValue}>*************</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>PRICE</Text>
                        <Text style={styles.infoValue}>****************</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>EMAIL ADDRESS</Text>
                        <Text style={styles.infoValue}>mail@example.com</Text>
                    </View>
                </View>
            </ImageBackground>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    },
    imageBackground: {
        flex: 1,
        width: '100%',
        height: Dimensions.get('window').height,
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)', // Optional: Add a dark overlay for better text visibility
    },
    appName: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    profileSection: {
        alignItems: 'center',
        marginVertical: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    profileName: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    profileTitle: {
        fontSize: 16,
        color: '#616161',
    },
    socialIcons: {
        flexDirection: 'row',
        marginTop: 10,
        // Add styles for social media icons here
    },
    aboutSection: {
        width: '90%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
    },
    aboutHeader: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    aboutSubHeader: {
        fontSize: 16,
        color: '#757575',
        marginBottom: 20,
    },
    infoItem: {
        marginBottom: 15,
    },
    infoLabel: {
        fontSize: 14,
        color: '#757575',
    },
    infoValue: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default App;
