import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Button, SectionList, Alert, Image, TouchableOpacity, Modal } from 'react-native';
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
            const response = await axios.get(`https://isen3-back.onrender.com/api/offers/user-offers/${user.id}`, {
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
                <Text style={styles.courseInfos}>{item.instructor ? `${item.instructor.name} ${item.instructor.surname}` : 'Instructor not assigned'}</Text>
                <Text style={styles.courseInfos}>{new Date(item.schedule).toLocaleString()}</Text>
                <Text style={styles.courseInfos}>Capacity: {item.enrolled}/{item.capacity}</Text>
                {isLoggedIn && (
                    <Button title="Voir le cours" onPress={() => openModal(item, isEnrolled(item.id) ? 'unenroll' : 'enroll')} />
                )}
            </View>
        </View>
    );

    const renderEmptyMessage = (title) => (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>{`Aucun ${title.toLowerCase()} disponible`}</Text>
        </View>
    );

    const sections = [
        ...(isLoggedIn ? [{ title: 'Mes prochains cours', data: futureCourses.length ? futureCourses : [renderEmptyMessage('prochains cours')] }] : []),
        { title: 'Cours disponibles', data: availableCourses.length ? availableCourses : [renderEmptyMessage('cours disponibles')] }
    ];

    return (
        <View style={styles.container}>
            <SectionList
                sections={sections}
                keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
                renderItem={({ item }) => typeof item === 'object' && item.id ? renderCourseItem({ item }) : item}
                renderSectionHeader={({ section: { title } }) => (
                    <View style={styles.sectionHeader}>
                        <Text style={styles.header}>{title}</Text>
                        {isLoggedIn && title === 'Mes prochains cours' && (
                            <TouchableOpacity
                                onPress={() => navigation.navigate('CoursesHistory')}
                                style={styles.historyButton}
                            >
                                <Text style={styles.buttonText}>Voir mon historique</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                )}
                stickySectionHeadersEnabled={true}
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
                            <Text style={styles.modalCourseInfo}>Instructor: {courseToEnroll.instructor ? `${courseToEnroll.instructor.name} ${courseToEnroll.instructor.surname}` : 'Not assigned'}</Text>
                            <Text style={styles.modalCourseInfo}>Schedule: {new Date(courseToEnroll.schedule).toLocaleString()}</Text>
                            <Text style={styles.modalCourseInfo}>Capacity: {courseToEnroll.enrolled}/{courseToEnroll.capacity}</Text>
                            {modalType === 'enroll' && (
                                <Picker
                                    selectedValue={selectedOffer}
                                    onValueChange={(itemValue) => setSelectedOffer(itemValue)}
                                    style={styles.picker}
                                >
                                    {userOffers.map((offer) => (
                                        <Picker.Item
                                            key={offer.id}
                                            label={`${offer.Offer.title} - ${offer.remainingPlaces} places restantes`}
                                            value={offer.id}
                                        />
                                    ))}
                                </Picker>
                            )}
                            <Button title={modalType === 'enroll' ? "S'inscrire" : 'Se désinscrire'} onPress={modalType === 'enroll' ? handleEnroll : handleUnenroll} />
                            <Button title="                            Annuler" onPress={() => setModalVisible(false)} />
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
};

export default CoursesScreen;