import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Button, SectionList, Alert, Image, TouchableOpacity } from 'react-native';
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

    useFocusEffect(
        React.useCallback(() => {
            fetchCourses();
            if (isLoggedIn) {
                fetchEnrolledCourses();
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

    const handleEnroll = async (courseId) => {
        try {
            const isAuthenticated = await checkAndRefreshToken();
            if (!isAuthenticated) {
                navigation.navigate('Login');
                return;
            }
            const token = await AsyncStorage.getItem('token');
            await axios.post('https://isen3-back.onrender.com/api/courses/enroll', { courseId }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            await fetchEnrolledCourses();
        } catch (error) {
            console.error('Failed to enroll in course', error);
        }
    };

    const confirmEnroll = (courseId) => {
        Alert.alert(
            "Confirmer l'inscription",
            "Voulez-vous vous inscrire à ce cours ?",
            [
                {
                    text: "Annuler",
                    style: "cancel"
                },
                {
                    text: "Confirmer",
                    onPress: () => handleEnroll(courseId)
                }
            ]
        );
    };

    const handleUnenroll = async (courseId) => {
        try {
            const isAuthenticated = await checkAndRefreshToken();
            if (!isAuthenticated) {
                navigation.navigate('Login');
                return;
            }

            const token = await AsyncStorage.getItem('token');
            await axios.post('https://isen3-back.onrender.com/api/courses/unenroll', { courseId }, {
                headers: { Authorization: `Bearer ${token}` },
            });

            await fetchEnrolledCourses();

        } catch (error) {
            console.error('Failed to unenroll from course', error);
        }
    };

    const confirmUnenroll = (courseId) => {
        Alert.alert(
            "Confirmer la désinscription",
            "Êtes-vous sûr de vouloir vous désinscrire de ce cours ?",
            [
                {
                    text: "Annuler",
                    style: "cancel"
                },
                {
                    text: "Confirmer",
                    onPress: () => handleUnenroll(courseId)
                }
            ]
        );
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
            <Image source={{ uri: 'https://imgs.search.brave.com/NZNa8b8gryIx-GRJxW3dzTKWySXvvqFFTMwLCo50sJE/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/anVuaWEuY29tL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDIyLzEw/LzJFM0E0MTkzLTEu/anBn' }} style={styles.courseImage} />
            <View style={styles.courseInfo}>
                <Text style={styles.courseTitle}>{item.name}</Text>
                <Text style={styles.courseInfos}>{item.instructor ? `${item.instructor.name} ${item.instructor.surname}` : 'Instructor not assigned'}</Text>
                <Text style={styles.courseInfos}>{new Date(item.schedule).toLocaleString()}</Text>
                <Text style={styles.courseInfos}>Capacity: {item.enrolled}/{item.capacity}</Text>
                {isLoggedIn && (
                    isEnrolled(item.id) ? (
                        <Button title="Se désinscrire" onPress={() => confirmUnenroll(item.id)} />
                    ) : (
                        <Button title="S'inscrire" onPress={() => confirmEnroll(item.id)} />
                    )
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
        </View>
    );
};

export default CoursesScreen;