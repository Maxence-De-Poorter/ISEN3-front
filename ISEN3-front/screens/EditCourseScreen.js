import React, {useContext, useState} from 'react';
import { View, TouchableOpacity, Text, Modal, TextInput, Button, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from '../styles/EditGestionCourseStyles';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {AuthContext} from "../context/AuthContext";

function EditCourseScreen({ navigation}) {
    const { checkAndRefreshToken, fetchAssociationInfo} = useContext(AuthContext);
    const [modalVisible, setModalVisible] = useState(false);
    const [courseName, setCourseName] = useState('');
    const [courseDate, setCourseDate] = useState(new Date());
    const [courseTime, setCourseTime] = useState(new Date());
    const [courseDuration, setCourseDuration] = useState(new Date(0));
    const [courseTickets, setCourseTickets] = useState(0);
    const [courseCapacity, setCourseCapacity] = useState('');

    const handleCreateCourse = async () => {
        const durationHours = courseDuration.getUTCHours();
        const durationMinutes = courseDuration.getUTCMinutes();
        const duration = `${durationHours}h ${durationMinutes}m`;

        try {
            const isAuthenticated = await checkAndRefreshToken();
            if (!isAuthenticated) {
                navigation.navigate('Login');
                return;
            }

            const token = await AsyncStorage.getItem('token');

            const requestData = {
                name: courseName,
                schedule: `${courseDate.toISOString().split('T')[0]}T${courseTime.toTimeString().split(' ')[0]}`,
                duration,
                capacity: parseInt(courseCapacity, 10),
                tickets: courseTickets,
            };

            const response = await axios.post('https://isen3-back.onrender.com/api/courses/', requestData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            await fetchAssociationInfo();

            if (response.status !== 201) {
                console.error('Error creating course:', response.data);
                return;
            }

            const course = response.data;
            console.log('Course created:', course);
            setModalVisible(false);
            setCourseName('');
            setCourseDate(new Date());
            setCourseTime(new Date());
            setCourseDuration(new Date(0));
            setCourseTickets(0);
            setCourseCapacity('');
        } catch (error) {
            console.error('Error creating course:', error.response ? error.response.data : error.message);
        }
    };

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || courseDate;
        setCourseDate(currentDate);
    };

    const handleTimeChange = (event, selectedTime) => {
        const currentTime = selectedTime || courseTime;
        setCourseTime(currentTime);
    };

    const handleDurationChange = (event, selectedDuration) => {
        const currentDuration = selectedDuration || courseDuration;
        setCourseDuration(currentDuration);
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => setModalVisible(true)}
                >
                    <Text style={styles.buttonText}>Créer un nouveau cours</Text>
                </TouchableOpacity>
            </ScrollView>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Créer un nouveau cours</Text>
                    <TextInput
                        placeholder="Nom du cours"
                        value={courseName}
                        onChangeText={setCourseName}
                        style={styles.input}
                    />
                    <View style={styles.dateTimeContainer}>
                        <Text>Date :</Text>
                        <DateTimePicker
                            value={courseDate}
                            mode="date"
                            display="default"
                            onChange={handleDateChange}
                            style={styles.picker}
                        />
                    </View>
                    <View style={styles.dateTimeContainer}>
                        <Text>Heure de début :</Text>
                        <DateTimePicker
                            value={courseTime}
                            mode="time"
                            display="default"
                            onChange={handleTimeChange}
                            style={styles.picker}
                        />
                    </View>
                    <View style={styles.dateTimeContainer}>
                        <Text>Durée :</Text>
                        <DateTimePicker
                            value={courseDuration}
                            mode="time"
                            display="default"
                            onChange={handleDurationChange}
                            style={styles.picker}
                        />
                    </View>
                    <TextInput
                        placeholder="Capacité"
                        value={courseCapacity}
                        onChangeText={setCourseCapacity}
                        keyboardType="numeric"
                        style={styles.input}
                    />
                    <View style={styles.ticketContainer}>
                        <Text>Prix (tickets) :</Text>
                        <Picker
                            selectedValue={courseTickets}
                            style={styles.picker}
                            onValueChange={(itemValue) => setCourseTickets(itemValue)}
                        >
                            <Picker.Item label="Gratuit" value={0} />
                            <Picker.Item label="1 ticket" value={1} />
                            <Picker.Item label="2 tickets" value={2} />
                            <Picker.Item label="3 tickets" value={3} />
                            <Picker.Item label="4 tickets" value={4} />
                            <Picker.Item label="5 tickets" value={5} />
                        </Picker>
                    </View>
                    <Button title="Créer" onPress={handleCreateCourse} />
                    <Button title="Annuler" onPress={() => setModalVisible(false)} />
                </View>
            </Modal>
        </View>
    );
}

export default EditCourseScreen;
