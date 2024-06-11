import React, { useContext, useEffect } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { CourseContext } from '../context/CourseContext';
import { AuthContext } from '../context/AuthContext';

const CoursesList = () => {
    const { courses, fetchCourses, enroll, loading } = useContext(CourseContext);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetchCourses();
    }, []);

    if (loading) {
        return <Text>Loading...</Text>;
    }

    const handleEnroll = (courseId) => {
        enroll(courseId, user.id); // Assurez-vous que l'utilisateur est connecté et a un ID valide
    };

    return (
        <FlatList
            data={courses}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <View>
                    <Text>{item.name}</Text>
                    <Text>{item.instructor}</Text>
                    <Text>{item.schedule}</Text>
                    <Button title="Enroll" onPress={() => handleEnroll(item.id)} />
                </View>
            )}
        />
    );
};

export default CoursesList;
