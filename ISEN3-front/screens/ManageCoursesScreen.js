import React, { useContext, useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Modal, TextInput, Button, ScrollView, Alert, Linking } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/ManageCoursesStyles';

function ManageCoursesScreen({ navigation }) {
    const { checkAndRefreshToken, association } = useContext(AuthContext);
    const [modalVisible, setModalVisible] = useState(false);
    const [courses, setCourses] = useState([]);
    const [searchVisible, setSearchVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchDate, setSearchDate] = useState(null);
    const [searchDuration, setSearchDuration] = useState(new Date(0));
    const [currentCourse, setCurrentCourse] = useState({
        id: null,
        name: '',
        date: new Date(),
        time: new Date(),
        duration: new Date(0),
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
        const durationHours = currentCourse.duration.getHours();
        const durationMinutes = currentCourse.duration.getMinutes();
        const duration = `${durationHours}h ${durationMinutes}m`;

        try {
            const isAuthenticated = await checkAndRefreshToken();
            if (!isAuthenticated) {
                navigation.navigate('Login');
                return;
            }

            const token = await AsyncStorage.getItem('token');

            // Combine the date and time into a single Date object
            const combinedDateTime = new Date(
                currentCourse.date.getFullYear(),
                currentCourse.date.getMonth(),
                currentCourse.date.getDate(),
                currentCourse.time.getHours(),
                currentCourse.time.getMinutes()
            );

            const requestData = {
                name: currentCourse.name,
                schedule: combinedDateTime.toISOString(),
                duration,
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
                date: new Date(),
                time: new Date(),
                duration: new Date(0),
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
            const courseTime = new Date(course.schedule);
            const courseDurationParts = course.duration.split(' ');
            const durationHours = parseInt(courseDurationParts[0]);
            const durationMinutes = parseInt(courseDurationParts[1]);

            const courseDuration = new Date();
            courseDuration.setHours(durationHours);
            courseDuration.setMinutes(durationMinutes);

            setCurrentCourse({
                id: course.id,
                name: course.name,
                date: courseDate,
                time: courseTime,
                duration: courseDuration,
                capacity: course.capacity.toString(),
                imageUrl: course.imageUrl,
                tags: course.tags || '',
                links: course.links || []
            });
        } else {
            setCurrentCourse({
                id: null,
                name: '',
                date: new Date(),
                time: new Date(),
                duration: new Date(0),
                capacity: '',
                imageUrl: '',
                tags: '',
                links: []
            });
        }
        setModalVisible(true);
    };

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || currentCourse.date;
        setCurrentCourse({ ...currentCourse, date: currentDate });
    };

    const handleTimeChange = (event, selectedTime) => {
        const currentTime = selectedTime || currentCourse.time;
        setCurrentCourse({ ...currentCourse, time: currentTime });
    };

    const handleDurationChange = (event, selectedDuration) => {
        const currentDuration = selectedDuration || currentCourse.duration;
        setCurrentCourse({ ...currentCourse, duration: currentDuration });
    };

    const handleSearchDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || searchDate;
        setSearchDate(currentDate);
    };

    const handleSearchDurationChange = (event, selectedDuration) => {
        const currentDuration = selectedDuration || searchDuration;
        setSearchDuration(currentDuration);
    };

    const filterCourses = () => {
        return courses.filter(course => {
            const matchesName = course.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesDate = searchDate ? new Date(course.schedule).toDateString() === searchDate.toDateString() : true;
            const matchesDuration = searchDuration.getHours() || searchDuration.getMinutes() ? course.duration === `${searchDuration.getHours()}h ${searchDuration.getMinutes()}m` : true;
            return matchesName && matchesDate && matchesDuration;
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
            <TouchableOpacity onPress={() => setSearchVisible(!searchVisible)} style={styles.searchButton}>
                <Text style={styles.buttonText}>{searchVisible ? 'Cacher la recherche' : 'Afficher la recherche'}</Text>
            </TouchableOpacity>
            {searchVisible && (
                <View style={styles.searchContainer}>
                    <TextInput
                        placeholder="Rechercher par nom"
                        value={searchTerm}
                        onChangeText={setSearchTerm}
                        style={styles.input}
                    />
                    <View style={styles.dateTimeContainer}>
                        <Text>Date :</Text>
                        <DateTimePicker
                            value={searchDate || new Date()}
                            mode="date"
                            display="default"
                            onChange={handleSearchDateChange}
                            style={styles.picker}
                        />
                    </View>
                    <View style={styles.dateTimeContainer}>
                        <Text>Durée :</Text>
                        <DateTimePicker
                            value={searchDuration}
                            mode="time"
                            display="default"
                            onChange={handleSearchDurationChange}
                            style={styles.picker}
                        />
                    </View>
                    <Button title="Rechercher" onPress={filterCourses} />
                </View>
            )}
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                {filterCourses().map(course => (
                    <View key={course.id} style={styles.courseContainer}>
                        <Text style={styles.courseName}>{course.name}</Text>
                        <Text style={styles.courseSchedule}>{new Date(course.schedule).toLocaleString()}</Text>
                        {course.tags && (
                            <Text style={styles.courseTags}>Tags: {course.tags}</Text>
                        )}
                        {course.links && course.links.length > 0 && (
                            <View>
                                {course.links.map((link, index) => (
                                    <TouchableOpacity key={index} onPress={() => Linking.openURL(link.url)}>
                                        <Text style={styles.courseLink}>{link.title}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                        <TouchableOpacity
                            style={styles.modifyButton}
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

            <TouchableOpacity
                style={styles.createButton}
                onPress={() => openCourseModal(null)}
            >
                <Text style={styles.buttonText}>Créer un nouveau cours</Text>
            </TouchableOpacity>

            {currentCourse && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{currentCourse.id ? "Modifier le cours" : "Créer un nouveau cours"}</Text>
                        <TextInput
                            placeholder="Nom du cours"
                            value={currentCourse.name}
                            onChangeText={name => setCurrentCourse({ ...currentCourse, name })}
                            style={styles.input}
                        />
                        <View style={styles.dateTimeContainer}>
                            <Text>Date :</Text>
                            <DateTimePicker
                                value={currentCourse.date}
                                mode="date"
                                display="default"
                                onChange={handleDateChange}
                                style={styles.picker}
                            />
                        </View>
                        <View style={styles.dateTimeContainer}>
                            <Text>Heure de début :</Text>
                            <DateTimePicker
                                value={currentCourse.time}
                                mode="time"
                                display="default"
                                onChange={handleTimeChange}
                                style={styles.picker}
                            />
                        </View>
                        <View style={styles.dateTimeContainer}>
                            <Text>Durée :</Text>
                            <DateTimePicker
                                value={currentCourse.duration}
                                mode="time"
                                display="default"
                                onChange={handleDurationChange}
                                style={styles.picker}
                            />
                        </View>
                        <TextInput
                            placeholder="Capacité"
                            value={currentCourse.capacity}
                            onChangeText={capacity => setCurrentCourse({ ...currentCourse, capacity })}
                            keyboardType="numeric"
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="URL de l'image"
                            value={currentCourse.imageUrl}
                            onChangeText={imageUrl => setCurrentCourse({ ...currentCourse, imageUrl })}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Tags (séparés par des virgules)"
                            value={currentCourse.tags}
                            onChangeText={tags => setCurrentCourse({ ...currentCourse, tags })}
                            style={styles.input}
                        />
                        {currentCourse.links.map((link, index) => (
                            <View key={index} style={styles.linkContainer}>
                                <TextInput
                                    placeholder="Titre du lien"
                                    value={link.title}
                                    onChangeText={title => handleLinkChange(index, 'title', title)}
                                    style={styles.inputLink}
                                />
                                <TextInput
                                    placeholder="URL du lien"
                                    value={link.url}
                                    onChangeText={url => handleLinkChange(index, 'url', url)}
                                    style={styles.inputLink}
                                />
                                <TouchableOpacity onPress={() => handleRemoveLink(index)}>
                                    <Text style={styles.removeLinkButton}>Supprimer le lien</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                        <TouchableOpacity onPress={handleAddLink} style={styles.addLinkButton}>
                            <Text style={styles.buttonText}>Ajouter un lien</Text>
                        </TouchableOpacity>
                        <Button title={currentCourse.id ? "Modifier" : "Créer"} onPress={handleCreateOrUpdateCourse} />
                        <Button title="Annuler" onPress={() => setModalVisible(false)} />
                    </View>
                </Modal>
            )}
        </View>
    );
}

export default ManageCoursesScreen;