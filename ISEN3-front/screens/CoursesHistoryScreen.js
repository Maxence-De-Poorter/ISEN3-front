import React, { useEffect, useState, useContext } from 'react';
import { View, Text, SectionList } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/CoursesStyles';

const CourseHistoryScreen = ({ navigation }) => {
    const { user, isLoggedIn, checkAndRefreshToken } = useContext(AuthContext);
    const [courseHistory, setCourseHistory] = useState([]);

    useEffect(() => {
        fetchCourseHistory();
    }, []);

    const fetchCourseHistory = async () => {
        try {
            const isAuthenticated = await checkAndRefreshToken();
            if (!isAuthenticated) {
                navigation.navigate('Login');
                return;
            }

            const token = await AsyncStorage.getItem('token');
            const response = await axios.get('https://isen3-back.onrender.com/api/courses/enrolled', {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log(response.data);
            setCourseHistory(response.data);
        } catch (error) {
            console.error('Failed to fetch course history', error);
        }
    };

    const renderCourseItem = ({ item }) => (
        <View style={styles.courseItem}>
            <Text style={styles.courseTitle}>{item.name}</Text>
            <Text style={styles.courseInfos}>{item.instructor ? `${item.instructor.name} ${item.instructor.surname}` : 'Instructor not assigned'}</Text>
            <Text style={styles.courseInfos}>{new Date(item.schedule).toLocaleString()}</Text>
            <Text style={styles.courseInfos}>Description: {item.description}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <SectionList
                sections={[{ title: 'Historique des cours', data: courseHistory }]}
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

export default CourseHistoryScreen;