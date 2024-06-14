import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Button, SectionList, Alert, Image } from 'react-native';
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
                <Text style={styles.courseInfos}>Prix: {item.tickets} ticket(s)</Text>
                {isLoggedIn && (
                    isEnrolled(item.id) ? (
                        <Button title="Se désinscrire" onPress={() => confirmUnenroll(item.id)} />
                    ) : (
                        user && user.ticket >= item.tickets ? (
                            <Button title="S'inscrire" onPress={() => confirmEnroll(item.id, item.tickets)} />
                        ) : (
                            <Text style={styles.noTicketsText}>Pas assez de tickets pour s'inscrire</Text>
                        )
                    )
                )}
            </View>
        </View>
    );

    const sections = [
        ...(isLoggedIn ? [{ title: 'Mes prochains cours', data: futureCourses }] : []),
        { title: 'Cours disponibles', data: availableCourses }
    ];

    return (
        <View style={styles.container}>
            {isLoggedIn && (
                <View>
                    <Button title="Voir mon historique" onPress={() => navigation.navigate('Home')} />
                </View>
            )}
            <SectionList
                sections={sections}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderCourseItem}
                renderSectionHeader={({ section: { title } }) => (
                    <View style={styles.sectionHeader}>
                        <Text style={styles.header}>{title}</Text>
                    </View>
                )}
                stickySectionHeadersEnabled={true}
            />
        </View>
    );
};

export default CoursesScreen;
