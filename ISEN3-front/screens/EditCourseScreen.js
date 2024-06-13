import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Modal, TextInput, Button, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from '../styles/EditGestionCourseStyles';

function EditCourseScreen() {
    const [modalVisible, setModalVisible] = useState(false);
    const [courseName, setCourseName] = useState('');
    const [courseDate, setCourseDate] = useState(new Date());
    const [courseTime, setCourseTime] = useState(new Date());
    const [courseDuration, setCourseDuration] = useState(new Date(0));
    const [coursePrice, setCoursePrice] = useState('');
    const [courseType, setCourseType] = useState('');

    const handleCreateCourse = () => {
        const durationHours = courseDuration.getUTCHours();
        const durationMinutes = courseDuration.getUTCMinutes();
        const duration = `${durationHours}h ${durationMinutes}m`;
        // Logique pour créer un cours
        console.log({
            name: courseName,
            date: courseDate.toDateString(),
            time: courseTime.toTimeString(),
            duration: duration,
            price: coursePrice,
            type: courseType,
        });
        setModalVisible(false);
        // Réinitialiser les champs de saisie
        setCourseName('');
        setCourseDate(new Date());
        setCourseTime(new Date());
        setCourseDuration(new Date(0));
        setCoursePrice('');
        setCourseType('');
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
                        placeholder="Prix du cours"
                        value={coursePrice}
                        onChangeText={setCoursePrice}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Type du cours"
                        value={courseType}
                        onChangeText={setCourseType}
                        style={styles.input}
                    />
                    <Button title="Créer" onPress={handleCreateCourse} />
                    <Button title="Annuler" onPress={() => setModalVisible(false)} />
                </View>
            </Modal>
        </View>
    );
}

export default EditCourseScreen;
