import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, Alert, Image, TouchableOpacity, Modal, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/CoursesStyles';

const CoursesScreen = ({ navigation }) => {
    const { user, isLoggedIn, checkAndRefreshToken } = useContext(AuthContext);
    const [courses, setCourses] = useState([]);
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [futureCourses, setFutureCourses] = useState([]);
    const [userOffers, setUserOffers] = useState([]);
    const [selectedOffer, setSelectedOffer] = useState('');
    const [courseToEnroll, setCourseToEnroll] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalType, setModalType] = useState('enroll'); // 'enroll' or 'unenroll'

    useFocusEffect(
        React.useCallback(() => {
            fetchCourses();
            if (isLoggedIn) {
                fetchEnrolledCourses();
                fetchUserOffers();
            }
        }, [isLoggedIn])
    );

    useEffect(() => {
        updateFutureCourses();
    }, [enrolledCourses]);

    const fetchCourses = async () => {
        try {
            const response = await axios.get('https://isen3-back.onrender.com/api/courses/upcoming');
            setCourses(response.data);
        } catch (error) {
            console.error('Failed to fetch courses', error);
        }
    };

    const fetchEnrolledCourses = async () => {
        try {
            const isAuthenticated = await checkAndRefreshToken();
            if (!isAuthenticated) {
                navigation.navigate('Login');
                return;
            }

            const token = await AsyncStorage.getItem('token');
            const response = await axios.get('https://isen3-back.onrender.com/api/courses/enrolled/upcoming', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setEnrolledCourses(response.data);
        } catch (error) {
            console.error('Failed to fetch enrolled courses', error);
        }
    };

    const fetchUserOffers = async () => {
        try {
            const isAuthenticated = await checkAndRefreshToken();
            if (!isAuthenticated) {
                navigation.navigate('Login');
                return;
            }

            const token = await AsyncStorage.getItem('token');
            const response = await axios.get('https://isen3-back.onrender.com/api/offers/valid', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUserOffers(response.data);
        } catch (error) {
            console.error('Failed to fetch user offers', error);
        }
    };

    const handleEnroll = async () => {
        try {
            const isAuthenticated = await checkAndRefreshToken();
            if (!isAuthenticated) {
                navigation.navigate('Login');
                return;
            }
            const token = await AsyncStorage.getItem('token');
            console.log(`Course ID: ${courseToEnroll.id}, Selected Offer ID: ${selectedOffer}`);
            await axios.post('https://isen3-back.onrender.com/api/courses/enroll', { courseId: courseToEnroll.id, offerId: selectedOffer }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            await fetchEnrolledCourses();
            await fetchUserOffers();
            setModalVisible(false);
        } catch (error) {
            console.error('Failed to enroll in course', error);
            Alert.alert("Erreur", "L'inscription au cours a échoué.");
        }
    };

    const handleUnenroll = async () => {
        try {
            const isAuthenticated = await checkAndRefreshToken();
            if (!isAuthenticated) {
                navigation.navigate('Login');
                return;
            }

            const token = await AsyncStorage.getItem('token');
            await axios.post('https://isen3-back.onrender.com/api/courses/unenroll', { courseId: courseToEnroll.id }, {
                headers: { Authorization: `Bearer ${token}` },
            });

            await fetchEnrolledCourses();
            await fetchUserOffers();
            setModalVisible(false);

        } catch (error) {
            console.error('Failed to unenroll from course', error);
        }
    };

    const openModal = (course, type) => {
        setCourseToEnroll(course);
        setModalType(type);
        if (type === 'enroll') {
            setSelectedOffer(userOffers[0]?.id || '');
        }
        setModalVisible(true);
    };

    const updateFutureCourses = () => {
        if (enrolledCourses.length > 0) {
            const now = new Date();
            const upcoming = enrolledCourses.filter(course => new Date(course.schedule) >= now).slice(0, 3);
            setFutureCourses(upcoming);
        } else {
            setFutureCourses([]);
        }
    };

    const isEnrolled = (courseId) => {
        return enrolledCourses.some(course => course.id === courseId);
    };

    const availableCourses = courses.filter(course => !isEnrolled(course.id));

    const renderCourseItem = ({ item }) => (
        <View style={styles.courseItem}>
            <Image source={{ uri: item.imageUrl }} style={styles.courseImage} />
            <View style={styles.courseInfo}>
                <Text style={styles.courseTitle}>{item.name}</Text>
                <Text style={styles.courseInfos}>{item.instructor ? `${item.instructor.name} ${item.instructor.surname}` : 'Instructeur non assigné'}</Text>
                <Text style={styles.courseInfos}>{new Date(item.schedule).toLocaleString()}</Text>
                <Text style={styles.courseInfos}>Capacité: {item.enrolled}/{item.capacity}</Text>
                {isLoggedIn && (
                    <TouchableOpacity style={styles.button} onPress={() => openModal(item, isEnrolled(item.id) ? 'unenroll' : 'enroll')}>
                        <Text style={styles.buttonText}>Voir le cours</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );

    const renderEmptyMessage = (title) => (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>{`Aucun ${title.toLowerCase()} disponible`}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            {isLoggedIn && (
                <>
                    <Text style={styles.header}>Mes prochains cours</Text>
                    <FlatList
                        data={futureCourses.length ? futureCourses : [renderEmptyMessage('prochains cours')]}
                        renderItem={futureCourses.length ? renderCourseItem : ({ item }) => item}
                        keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </>
            )}
            <TouchableOpacity
                onPress={() => navigation.navigate('CoursesHistory')}
                style={styles.historyButton}
            >
                <Text style={styles.historyButtonText}>Voir mon historique</Text>
            </TouchableOpacity>
            <Text style={styles.header}>Cours disponibles</Text>
            <FlatList
                data={availableCourses.length ? availableCourses : [renderEmptyMessage('cours disponibles')]}
                renderItem={availableCourses.length ? renderCourseItem : ({ item }) => item}
                keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
            {courseToEnroll && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>{modalType === 'enroll' ? 'Choisissez une carte' : 'Se désinscrire du cours'}</Text>
                            <Image source={{ uri: courseToEnroll.imageUrl }} style={styles.modalImage} />
                            <Text style={styles.modalCourseTitle}>{courseToEnroll.name}</Text>
                            <Text style={styles.modalCourseInfo}>Instructeur: {courseToEnroll.instructor ? `${courseToEnroll.instructor.name} ${courseToEnroll.instructor.surname}` : 'Non assigné'}</Text>
                            <Text style={styles.modalCourseInfo}>Horaire: {new Date(courseToEnroll.schedule).toLocaleString()}</Text>
                            <Text style={styles.modalCourseInfo}>Capacité: {courseToEnroll.enrolled}/{courseToEnroll.capacity}</Text>
                            {modalType === 'enroll' && userOffers.length === 0 && (
                                <Text style={styles.noTicketsText}>Aucune carte disponible pour l'inscription.</Text>
                            )}
                            {modalType === 'enroll' && userOffers.length > 0 && (
                                <>
                                    <Text style={styles.paymentTitle}>Choix du mode de paiement</Text>
                                    <Picker
                                        selectedValue={selectedOffer}
                                        onValueChange={(itemValue) => setSelectedOffer(itemValue)}
                                        style={styles.picker}
                                        itemStyle={styles.pickerItem}
                                    >
                                        {userOffers.map((offer) => (
                                            <Picker.Item
                                                key={offer.id}
                                                label={`${offer.Offer.title} - ${offer.remainingPlaces} places restantes`}
                                                value={offer.id}
                                                style={styles.pickerItem}
                                            />
                                        ))}
                                    </Picker>
                                </>
                            )}
                            <Button
                                title={modalType === 'enroll' ? "S'inscrire" : 'Se désinscrire'}
                                onPress={modalType === 'enroll' ? handleEnroll : handleUnenroll}
                                color="#5DA5B3"
                                disabled={modalType === 'enroll' && userOffers.length === 0} // Disable the button if no offers are available
                            />
                            <Button
                                title="Annuler"
                                onPress={() => setModalVisible(false)}
                                color="#FF6347"
                            />
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
};

export default CoursesScreen;