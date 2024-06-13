import React, { useEffect, useContext, useState } from 'react';
import { View, Text, Button, SectionList, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/CoursesStyles';

const CoursesScreen = ({ navigation }) => {
    const { user, isLoggedIn, courses, enrolledCourses, fetchUserProfile, checkAndRefreshToken } = useContext(AuthContext);
    const [futureCourses, setFutureCourses] = useState([]);

    useEffect(() => {
        if (isLoggedIn) {
            fetchUserProfile();
        }
    }, [isLoggedIn]);

    useEffect(() => {
        updateCourses();
    }, [enrolledCourses]);

    const handleEnroll = async (courseId) => {
        try {
            if (user && user.ticket > 0) {
                const isAuthenticated = await checkAndRefreshToken();
                if (!isAuthenticated) {
                    navigation.navigate('Login');
                    return;
                }

                const token = await AsyncStorage.getItem('token');
                await axios.post('https://isen3-back.onrender.com/api/courses/enroll', { courseId }, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                fetchUserProfile();
            } else {
                console.error('Not enough tickets to enroll');
            }
        } catch (error) {
            console.error('Failed to enroll in course', error);
        }
    };

    const confirmEnroll = (courseId, tickets) => {
        Alert.alert(
            "Confirmer l'inscription",
            `Cela vous coûtera ${tickets} ticket(s). Voulez-vous continuer ?`,
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
            fetchUserProfile();
        } catch (error) {
            console.error('Failed to unenroll from course', error);
        }
    };

    const updateCourses = () => {
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
            <Text>{item.name}</Text>
            <Text>{item.instructor ? `${item.instructor.name} ${item.instructor.surname}` : 'Instructor not assigned'}</Text>
            <Text>{new Date(item.schedule).toLocaleString()}</Text>
            <Text>Capacity: {item.enrolled}/{item.capacity}</Text>
            <Text>Prix: {item.tickets} ticket(s)</Text>
            {isLoggedIn && (
                isEnrolled(item.id) ? (
                    <Button title="Unenroll" onPress={() => handleUnenroll(item.id)} />
                ) : (
                    user && user.ticket >= item.tickets ? (
                        <Button title="Enroll" onPress={() => confirmEnroll(item.id, item.tickets)} />
                    ) : (
                        <Text style={styles.noTicketsText}>Not enough tickets to enroll</Text>
                    )
                )
            )}
        </View>
    );

    const sections = [
        ...(isLoggedIn ? [{ title: 'Mes prochains cours', data: futureCourses }] : []),
        { title: 'Cours disponibles', data: availableCourses }
    ];

    return (
        <View style={styles.container}>
            <SectionList
                sections={sections}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderCourseItem}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.header}>{title}</Text>
                )}
                ListFooterComponent={() => (
                    isLoggedIn && (
                        <View>
                            <Button title="Voir mon historique" onPress={() => navigation.navigate('Home')} />
                        </View>
                    )
                )}
            />
        </View>
    );
};

export default CoursesScreen;
