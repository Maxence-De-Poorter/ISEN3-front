import React, { useContext, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { CourseContext } from '../context/CourseContext';
import { AuthContext } from '../context/AuthContext';

const EnrolledCourses = () => {
    const { enrolledCourses, fetchEnrolledCourses, loading } = useContext(CourseContext);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetchEnrolledCourses(user.id); // Assurez-vous que l'utilisateur est connecté et a un ID valide
    }, []);

    if (loading) {
        return <Text>Loading...</Text>;
    }

    return (
        <FlatList
            data={enrolledCourses}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <View>
                    <Text>{item.name}</Text>
                    <Text>{item.instructor}</Text>
                    <Text>{item.schedule}</Text>
                </View>
            )}
        />
    );
};

export default EnrolledCourses;
