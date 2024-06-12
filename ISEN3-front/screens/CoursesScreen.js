import React, { useEffect, useContext, useState } from 'react';
import { View, Text, Button, SectionList } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/CoursesStyles';

const CoursesScreen = ({ navigation }) => {
    const { user, isLoggedIn, fetchUserProfile, checkAndRefreshToken } = useContext(AuthContext);
    const [courses, setCourses] = useState([]);
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [futureCourses, setFutureCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        handleFetchCourses();
        if (isLoggedIn) {
            handleFetchEnrolledCourses();
        }
    }, [isLoggedIn]);

    useEffect(() => {
        updateCourses();
    }, [enrolledCourses]);

    const handleFetchCourses = async () => {
        try {
            const response = await axios.get('https://isen3-back.onrender.com/api/courses', {
            });
            setCourses(response.data);
        } catch (error) {
            console.error('Failed to fetch courses', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFetchEnrolledCourses = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.get('https://isen3-back.onrender.com/api/courses/enrolled', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setEnrolledCourses(response.data);
        } catch (error) {
            console.error('Failed to fetch enrolled courses', error);
        }
    };

    const handleEnroll = async (courseId) => {
        try {
            if (user && user.ticket > 0) {
                const token = await AsyncStorage.getItem('token');
                await axios.post('https://isen3-back.onrender.com/api/courses/enroll', { courseId }, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                handleFetchCourses();
                handleFetchEnrolledCourses();
                fetchUserProfile();
            } else {
                console.error('Not enough tickets to enroll');
            }
        } catch (error) {
            console.error('Failed to enroll in course', error);
        }
    };

    const handleUnenroll = async (courseId) => {
        try {
            const token = await AsyncStorage.getItem('token');
            await axios.post('https://isen3-back.onrender.com/api/courses/unenroll', { courseId }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            handleFetchCourses();
            handleFetchEnrolledCourses();
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

    if (loading) {
        return <Text>Loading...</Text>;
    }

    const renderCourseItem = ({ item }) => (
        <View style={styles.courseItem}>
            <Text>{item.name}</Text>
            <Text>{item.instructor ? `${item.instructor.name} ${item.instructor.surname}` : 'Instructor not assigned'}</Text>
            <Text>{new Date(item.schedule).toLocaleString()}</Text>
            <Text>Capacity: {item.enrolled}/{item.capacity}</Text>
            {isLoggedIn && (
                isEnrolled(item.id) ? (
                    <Button title="Unenroll" onPress={() => handleUnenroll(item.id)} />
                ) : (
                    user && user.ticket > 0 ? (
                        <Button title="Enroll" onPress={() => handleEnroll(item.id)} />
                    ) : (
                        <Text style={styles.noTicketsText}>Not enough tickets to enroll</Text>
                    )
                )
            )}
        </View>
    );

    const sections = [
        { title: 'Mes prochains cours', data: futureCourses },
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
                    <View>
                        <Button title="Voir plus de prochains cours" onPress={() => navigation.navigate('AllCourses', { type: 'future' })} />
                        <Button title="Voir mon historique" onPress={() => navigation.navigate('Home')} />
                    </View>
                )}
            />
        </View>
    );
};

export default CoursesScreen;