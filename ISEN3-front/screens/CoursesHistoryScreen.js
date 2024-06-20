import React, { useEffect, useState, useContext } from 'react';
import { View, Text, SectionList, Image, TouchableOpacity, Modal, Button } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/CoursesHistoryStyles';

const CourseHistoryScreen = ({ navigation }) => {
    const { checkAndRefreshToken } = useContext(AuthContext);
    const [courseHistory, setCourseHistory] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

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
            setCourseHistory(response.data);
        } catch (error) {
            console.error('Failed to fetch course history', error);
        }
    };

    const openModal = (course) => {
        setSelectedCourse(course);
        setModalVisible(true);
    };

    const renderCourseItem = ({ item }) => (
        <View style={styles.courseItem}>
            <Image source={{ uri: item.imageUrl }} style={styles.courseImage} />
            <View style={styles.courseInfo}>
                <Text style={styles.courseTitle}>{item.name}</Text>
                <Text style={styles.courseInfos}>{item.instructor ? `${item.instructor.name} ${item.instructor.surname}` : 'Instructor not assigned'}</Text>
                <Text style={styles.courseInfos}>{new Date(item.schedule).toLocaleString()}</Text>
                <TouchableOpacity style={styles.viewButton} onPress={() => openModal(item)}>
                    <Text style={styles.viewButtonText}>Voir le cours</Text>
                </TouchableOpacity>
            </View>
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
            {selectedCourse && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>{selectedCourse.name}</Text>
                            <Image source={{ uri: selectedCourse.imageUrl }} style={styles.modalImage} />
                            <Text style={styles.modalCourseInfo}>Instructor: {selectedCourse.instructor ? `${selectedCourse.instructor.name} ${selectedCourse.instructor.surname}` : 'Not assigned'}</Text>
                            <Text style={styles.modalCourseInfo}>Schedule: {new Date(selectedCourse.schedule).toLocaleString()}</Text>
                            <Text style={styles.modalCourseInfo}>Description: {selectedCourse.description}</Text>
                            <Button title="Fermer" onPress={() => setModalVisible(false)} />
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
};

export default CourseHistoryScreen;