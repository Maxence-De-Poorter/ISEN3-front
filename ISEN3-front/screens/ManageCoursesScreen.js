import React, { useContext, useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Modal, TextInput, ScrollView, Alert, Linking } from 'react-native';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/ManageCoursesStyles';

function ManageCoursesScreen({ navigation }) {
    const { checkAndRefreshToken, association } = useContext(AuthContext);
    const [modalVisible, setModalVisible] = useState(false);
    const [courses, setCourses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchTag, setSearchTag] = useState('');
    const [currentCourse, setCurrentCourse] = useState({
        id: null,
        name: '',
        date: '',
        time: '',
        duration: '',
        capacity: '',
        imageUrl: '',
        tags: '',
        links: []
    });

    useEffect(() => {
        fetchUpcomingCourses();
    }, []);

    const fetchUpcomingCourses = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.get('https://isen3-back.onrender.com/api/courses/upcoming', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCourses(response.data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    const handleCreateOrUpdateCourse = async () => {
        if (!currentCourse.name || !currentCourse.date || !currentCourse.time || !currentCourse.duration || !currentCourse.capacity) {
            Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires.');
            return;
        }

        try {
            const isAuthenticated = await checkAndRefreshToken();
            if (!isAuthenticated) {
                navigation.navigate('Login');
                return;
            }

            const token = await AsyncStorage.getItem('token');

            const dateParts = currentCourse.date.split('/');
            const timeParts = currentCourse.time.split('h');
            const combinedDateTime = new Date(
                parseInt(dateParts[2], 10),
                parseInt(dateParts[1], 10) - 1,
                parseInt(dateParts[0], 10),
                parseInt(timeParts[0], 10),
                parseInt(timeParts[1], 10)
            ).toISOString();

            const requestData = {
                name: currentCourse.name,
                schedule: combinedDateTime,
                duration: currentCourse.duration,
                capacity: parseInt(currentCourse.capacity, 10),
                imageUrl: currentCourse.imageUrl || association?.imageUrl || '',
                tags: currentCourse.tags,
                links: currentCourse.links
            };

            let response;
            if (currentCourse.id) {
                response = await axios.put(`https://isen3-back.onrender.com/api/courses/${currentCourse.id}`, requestData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } else {
                response = await axios.post('https://isen3-back.onrender.com/api/courses/', requestData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            }

            if (response.status !== 200 && response.status !== 201) {
                console.error('Error creating/updating course:', response.data);
                return;
            }

            const course = response.data;
            console.log('Course created/updated:', course);
            setModalVisible(false);
            setCurrentCourse({
                id: null,
                name: '',
                date: '',
                time: '',
                duration: '',
                capacity: '',
                imageUrl: '',
                tags: '',
                links: []
            });
            await fetchUpcomingCourses();
        } catch (error) {
            console.error('Error creating/updating course:', error.response ? error.response.data : error.message);
        }
    };

    const handleDeleteCourse = async (courseId) => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.delete(`https://isen3-back.onrender.com/api/courses/delete/${courseId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.status !== 200) {
                console.error('Error deleting course:', response.data);
                return;
            }

            console.log('Course deleted:', response.data);
            await fetchUpcomingCourses();
        } catch (error) {
            console.error('Error deleting course:', error.response ? error.response.data : error.message);
        }
    };

    const confirmDeleteCourse = (course) => {
        const now = new Date();
        if (new Date(course.schedule) <= now) {
            Alert.alert('Erreur', 'Vous ne pouvez pas supprimer un cours qui a déjà commencé.');
            return;
        }

        Alert.alert(
            "Confirmer la suppression",
            `Voulez-vous vraiment supprimer le cours "${course.name}" ?`,
            [
                {
                    text: "Annuler",
                    style: "cancel"
                },
                {
                    text: "Supprimer",
                    onPress: () => handleDeleteCourse(course.id)
                }
            ]
        );
    };

    const openCourseModal = (course) => {
        if (course) {
            const courseDate = new Date(course.schedule);
            const courseDuration = course.duration.split('h');

            setCurrentCourse({
                id: course.id,
                name: course.name,
                date: courseDate.toLocaleDateString('fr-FR'),
                time: `${courseDate.getHours()}h${courseDate.getMinutes().toString().padStart(2, '0')}`,
                duration: `${courseDuration[0]}h${courseDuration[1]}`,
                capacity: course.capacity.toString(),
                imageUrl: course.imageUrl,
                tags: course.tags || '',
                links: course.links || []
            });
        } else {
            setCurrentCourse({
                id: null,
                name: '',
                date: '',
                time: '',
                duration: '',
                capacity: '',
                imageUrl: '',
                tags: '',
                links: []
            });
        }
        setModalVisible(true);
    };

    const handleDateChange = (date) => {
        const formattedDate = formatAsDate(date);
        setCurrentCourse({ ...currentCourse, date: formattedDate });
    };

    const handleTimeChange = (time) => {
        const formattedTime = formatAsTime(time);
        setCurrentCourse({ ...currentCourse, time: formattedTime });
    };

    const handleDurationChange = (duration) => {
        const formattedDuration = formatAsDuration(duration);
        setCurrentCourse({ ...currentCourse, duration: formattedDuration });
    };

    const formatAsDate = (value) => {
        const numericValue = value.replace(/\D/g, '');
        const parts = numericValue.match(/(\d{1,2})(\d{1,2})?(\d{1,4})?/);
        let date = '';
        if (parts) {
            if (parts[1]) date += parts[1];
            if (parts[2]) date += '/' + parts[2];
            if (parts[3]) date += '/' + parts[3];
        }
        return date;
    };

    const formatAsTime = (value) => {
        const numericValue = value.replace(/\D/g, '');
        const parts = numericValue.match(/(\d{1,2})(\d{1,2})?/);
        let time = '';
        if (parts) {
            if (parts[1]) time += parts[1];
            if (parts[2]) time += 'h' + parts[2];
        }
        return time;
    };

    const formatAsDuration = (value) => {
        const numericValue = value.replace(/\D/g, '');
        const parts = numericValue.match(/(\d{1,2})(\d{1,2})?/);
        let duration = '';
        if (parts) {
            if (parts[1]) duration += parts[1];
            if (parts[2]) duration += 'h' + parts[2];
        }
        return duration;
    };

    const filterCourses = () => {
        return courses.filter(course => {
            const matchesName = course.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesTag = course.tags.toLowerCase().includes(searchTag.toLowerCase());
            return matchesName && matchesTag;
        });
    };

    const handleAddLink = () => {
        setCurrentCourse({
            ...currentCourse,
            links: [...currentCourse.links, { title: '', url: '' }]
        });
    };

    const handleLinkChange = (index, field, value) => {
        const updatedLinks = currentCourse.links.map((link, i) =>
            i === index ? { ...link, [field]: value } : link
        );
        setCurrentCourse({ ...currentCourse, links: updatedLinks });
    };

    const handleRemoveLink = (index) => {
        const updatedLinks = currentCourse.links.filter((_, i) => i !== index);
        setCurrentCourse({ ...currentCourse, links: updatedLinks });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Les cours disponibles</Text>
            <View style={styles.searchContainer}>
                <TextInput
                    placeholder="Rechercher par nom"
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                    style={styles.input}
                    placeholderTextColor="#E0E2E8"
                />
                <TextInput
                    placeholder="Rechercher par tags"
                    value={searchTag}
                    onChangeText={setSearchTag}
                    style={styles.input}
                    placeholderTextColor="#E0E2E8"
                />
            </View>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                {filterCourses().map(course => (
                    <View key={course.id} style={styles.courseContainer}>
                        <Text style={styles.courseName}>{course.name}</Text>
                        <Text style={styles.courseName}>{course.instructor.name} {course.instructor.surname}</Text>
                        <Text style={styles.courseSchedule}>{new Date(course.schedule).toLocaleString('fr-FR')}</Text>
                        {course.tags && (
                            <Text style={styles.courseTags}>Tags: {course.tags}</Text>
                        )}
                        {course.links && course.links.length > 0 && (
                            <View>
                                {course.links.map((link, index) => (
                                    <View key={index} style={styles.linkContainerRow}>
                                        <Text style={styles.courseLinkTitle}>{link.title}:</Text>
                                        <TouchableOpacity onPress={() => Linking.openURL(link.url)}>
                                            <Text style={styles.courseLink}>{link.url}</Text>
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </View>
                        )}
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => openCourseModal(course)}
                        >
                            <Text style={styles.buttonText}>Modifier</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => confirmDeleteCourse(course)}
                        >
                            <Text style={styles.buttonText}>Supprimer</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>

            {currentCourse && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>{currentCourse.id ? "Modifier le cours" : "Créer un nouveau cours"}</Text>
                            <TextInput
                                placeholder="Nom du cours (requis)"
                                value={currentCourse.name}
                                onChangeText={name => setCurrentCourse({ ...currentCourse, name })}
                                style={styles.input}
                                placeholderTextColor="#E0E2E8"
                            />
                            <TextInput
                                placeholder="Sélectionner une date (jj/mm/aaaa) (requis)"
                                value={currentCourse.date}
                                onChangeText={handleDateChange}
                                style={styles.input}
                                placeholderTextColor="#E0E2E8"
                                keyboardType="numeric"
                            />
                            <TextInput
                                placeholder="Heure de début (hh:mm) (requis)"
                                value={currentCourse.time}
                                onChangeText={handleTimeChange}
                                style={styles.input}
                                placeholderTextColor="#E0E2E8"
                                keyboardType="numeric"
                            />
                            <TextInput
                                placeholder="Durée (hh:mm) (requis)"
                                value={currentCourse.duration}
                                onChangeText={handleDurationChange}
                                style={styles.input}
                                placeholderTextColor="#E0E2E8"
                                keyboardType="numeric"
                            />
                            <TextInput
                                placeholder="Capacité (requis)"
                                value={currentCourse.capacity}
                                onChangeText={capacity => setCurrentCourse({ ...currentCourse, capacity })}
                                keyboardType="numeric"
                                style={styles.input}
                                placeholderTextColor="#E0E2E8"
                            />
                            <TextInput
                                placeholder="URL de l'image"
                                value={currentCourse.imageUrl}
                                onChangeText={imageUrl => setCurrentCourse({ ...currentCourse, imageUrl })}
                                style={styles.input}
                                placeholderTextColor="#E0E2E8"
                            />
                            <TextInput
                                placeholder="Tags (séparés par des virgules)"
                                value={currentCourse.tags}
                                onChangeText={tags => setCurrentCourse({ ...currentCourse, tags })}
                                style={styles.input}
                                placeholderTextColor="#E0E2E8"
                            />
                            {currentCourse.links.map((link, index) => (
                                <View key={index} style={styles.linkContainer}>
                                    <TextInput
                                        placeholder="Titre du lien"
                                        value={link.title}
                                        onChangeText={title => handleLinkChange(index, 'title', title)}
                                        style={styles.inputLink}
                                        placeholderTextColor="#E0E2E8"
                                    />
                                    <TextInput
                                        placeholder="URL du lien"
                                        value={link.url}
                                        onChangeText={url => handleLinkChange(index, 'url', url)}
                                        style={styles.inputLink}
                                        placeholderTextColor="#E0E2E8"
                                    />
                                    <TouchableOpacity onPress={() => handleRemoveLink(index)}>
                                        <Text style={styles.removeLinkButton}>Supprimer le lien</Text>
                                    </TouchableOpacity>
                                </View>
                            ))}
                            <TouchableOpacity onPress={handleAddLink} style={styles.addLinkButton}>
                                <Text style={styles.buttonText}>Ajouter un lien</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={handleCreateOrUpdateCourse}
                            >
                                <Text style={styles.buttonText}>{currentCourse.id ? "Modifier" : "Créer"}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.buttonText}>Annuler</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            )}
            <View style={styles.bottomContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => openCourseModal(null)}
                >
                    <Text style={styles.buttonText}>Créer un cours</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default ManageCoursesScreen;