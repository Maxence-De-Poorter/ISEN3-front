import React, { useEffect, useContext, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, SectionList } from 'react-native';
import { CourseContext } from '../context/CourseContext';
import { AuthContext } from '../context/AuthContext';

const CoursesScreen = ({ navigation }) => {
    const { courses, enrolledCourses, fetchEnrolledCourses, fetchCourses, enroll, unenroll, loading } = useContext(CourseContext);
    const { user } = useContext(AuthContext);
    const [futureCourses, setFutureCourses] = useState([]);
    const [pastCourses, setPastCourses] = useState([]);

    useEffect(() => {
        if (user) {
            fetchCourses();
            fetchEnrolledCourses();
        }
    }, [user]);

    useEffect(() => {
        updateCourses();
    }, [enrolledCourses]);

    const updateCourses = () => {
        if (enrolledCourses.length > 0) {
            const now = new Date();
            const upcoming = enrolledCourses.filter(course => new Date(course.schedule) >= now).slice(0, 3);
            const past = enrolledCourses.filter(course => new Date(course.schedule) < now).slice(0, 3);
            setFutureCourses(upcoming);
            setPastCourses(past);
        } else {
            setFutureCourses([]);
            setPastCourses([]);
        }
    };

    const handleEnroll = (courseId) => {
        enroll(courseId);
    };

    const handleUnenroll = (courseId) => {
        unenroll(courseId);
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
            {isEnrolled(item.id) ? (
                <Button title="Unenroll" onPress={() => handleUnenroll(item.id)} />
            ) : (
                user && user.ticket > 0 ? (
                    <Button title="Enroll" onPress={() => handleEnroll(item.id)} />
                ) : (
                    <Text style={styles.noTicketsText}>Not enough tickets to enroll</Text>
                )
            )}
        </View>
    );

    const sections = [
        { title: 'Mes prochains cours', data: futureCourses },
        { title: 'Mes derniers cours', data: pastCourses },
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
                        <Button title="Voir plus de derniers cours" onPress={() => navigation.navigate('AllCourses', { type: 'past' })} />
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    header: {
        fontSize: 20,
        marginVertical: 8,
    },
    courseItem: {
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    noCoursesText: {
        fontSize: 16,
        color: 'gray',
        textAlign: 'center',
        marginVertical: 10,
    },
    noTicketsText: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
        marginVertical: 10,
    },
});

export default CoursesScreen;