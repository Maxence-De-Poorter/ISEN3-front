import React, { useContext, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { CourseContext } from '../context/CourseContext';
import { AuthContext } from '../context/AuthContext';

const EnrollmentHistory = () => {
    const { history, fetchEnrollmentHistory, loading } = useContext(CourseContext);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetchEnrollmentHistory(user.id); // Assurez-vous que l'utilisateur est connecté et a un ID valide
    }, []);

    if (loading) {
        return <Text>Loading...</Text>;
    }

    return (
        <FlatList
            data={history}
            keyExtractor={(item) => item.courseId}
            renderItem={({ item }) => (
                <View>
                    <Text>Course ID: {item.courseId}</Text>
                    <Text>Enrollment Date: {item.enrollmentDate}</Text>
                </View>
            )}
        />
    );
};

export default EnrollmentHistory;
