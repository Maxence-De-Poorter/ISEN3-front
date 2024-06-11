import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

export const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
    const [courses, setCourses] = useState([]);
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const { token, user, refreshUser } = useContext(AuthContext);

    useEffect(() => {
        if (token) {
            fetchCourses();
            fetchEnrolledCourses();
        }
    }, [token]);

    const fetchCourses = async () => {
        try {
            const response = await axios.get('https://isen3-back.onrender.com/api/courses', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCourses(response.data);
        } catch (error) {
            console.error('Failed to fetch courses', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchEnrolledCourses = async () => {
        try {
            const response = await axios.get('https://isen3-back.onrender.com/api/courses/enrolled', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setEnrolledCourses(response.data);
        } catch (error) {
            console.error('Failed to fetch enrolled courses', error);
        }
    };

    const enroll = async (courseId) => {
        try {
            // Check if user has enough tickets
            if (user && user.ticket > 0) {
                const enrollmentData = { courseId };
                await axios.post('https://isen3-back.onrender.com/api/courses/enroll', enrollmentData, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                await fetchCourses(); // Refresh courses
                await fetchEnrolledCourses(); // Refresh enrolled courses
                await refreshUser(); // Refresh user data
            } else {
                console.error('Not enough tickets to enroll');
            }
        } catch (error) {
            console.error('Failed to enroll in course', error);
        }
    };

    const unenroll = async (courseId) => {
        try {
            await axios.post('https://isen3-back.onrender.com/api/courses/unenroll', { courseId }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            await fetchCourses(); // Refresh courses
            await fetchEnrolledCourses(); // Refresh enrolled courses
            await refreshUser(); // Refresh user data
        } catch (error) {
            console.error('Failed to unenroll from course', error);
        }
    };

    return (
        <CourseContext.Provider
            value={{ courses, enrolledCourses, fetchCourses, fetchEnrolledCourses, enroll, unenroll, loading }}
        >
            {children}
        </CourseContext.Provider>
    );
};
