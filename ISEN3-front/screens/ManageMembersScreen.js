import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, SectionList, Modal, TextInput, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import styles from '../styles/ManageMembersStyles';
import AsyncStorage from "@react-native-async-storage/async-storage";

const ManageMembersScreen = ({ navigation }) => {
    const { user, checkAndRefreshToken } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [expandedRoles, setExpandedRoles] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [creditModalVisible, setCreditModalVisible] = useState(false);
    const [createModalVisible, setCreateModalVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [offers, setOffers] = useState([]);
    const [selectedOffer, setSelectedOffer] = useState('');

    useEffect(() => {
        fetchUsers();
        fetchOffers();
    }, []);

    const fetchUsers = async () => {
        try {
            const isAuthenticated = await checkAndRefreshToken();
            if (!isAuthenticated) {
                navigation.navigate('Login');
            }

            const token = await AsyncStorage.getItem('token');

            const response = await axios.get('https://isen3-back.onrender.com/api/users/all', {
                headers: { Authorization: `Bearer ${token}` }
            });

            const filteredUsers = response.data.filter(u => u.id !== user.id);

            const sortedUsers = filteredUsers.sort((a, b) => {
                const roleOrder = { administrator: 0, teacher: 1, student: 2 };
                if (roleOrder[a.role] !== roleOrder[b.role]) {
                    return roleOrder[a.role] - roleOrder[b.role];
                }
                return a.surname.localeCompare(b.surname);
            });

            const groupedUsers = sortedUsers.reduce((acc, user) => {
                if (!acc[user.role]) {
                    acc[user.role] = [];
                }
                acc[user.role].push(user);
                return acc;
            }, {});

            const roleMapping = {
                administrator: 'Administrateur',
                teacher: 'Professeurs',
                student: 'Élèves'
            };

            setUsers(Object.entries(groupedUsers).map(([role, users]) => ({ title: roleMapping[role], data: users })));
            setExpandedRoles(Object.keys(groupedUsers).reduce((acc, role) => {
                acc[roleMapping[role]] = true;
                return acc;
            }, {}));
        } catch (error) {
            console.error('Failed to fetch users', error);
            Alert.alert("Erreur", "La récupération des utilisateurs a échoué.");
        }
    };

    const fetchOffers = async () => {
        try {
            const isAuthenticated = await checkAndRefreshToken();
            if (!isAuthenticated) {
                navigation.navigate('Login');
            }

            const token = await AsyncStorage.getItem('token');

            const response = await axios.get('https://isen3-back.onrender.com/api/offers', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setOffers(response.data);
            if (response.data.length > 0) {
                setSelectedOffer(response.data[0].id); // Set default selected offer
            }
        } catch (error) {
            console.error('Failed to fetch offers', error);
        }
    };

    const toggleExpandRole = (role) => {
        setExpandedRoles(prevState => ({
            ...prevState,
            [role]: !prevState[role]
        }));
    };

    const openEditModal = (user) => {
        setSelectedUser(user);
        setFirstName(user.name);
        setSurname(user.surname);
        setEmail(user.email);
        setRole(user.role);
        setModalVisible(true);
    };

    const openCreditModal = (user) => {
        setSelectedUser(user);
        setSelectedOffer(offers.length > 0 ? offers[0].id : ''); // Set default selected offer
        setCreditModalVisible(true);
    };

    const openCreateModal = () => {
        setFirstName('');
        setSurname('');
        setEmail('');
        setCreateModalVisible(true);
    };

    const handleCreateUser = async () => {
        try {
            const isAuthenticated = await checkAndRefreshToken();
            if (!isAuthenticated) {
                navigation.navigate('Login');
            }

            const token = await AsyncStorage.getItem('token');

            await axios.post('https://isen3-back.onrender.com/api/auth/create-student', {
                name: firstName,
                surname: surname,
                email: email,
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            await fetchUsers();
            setCreateModalVisible(false);
        } catch (error) {
            console.error('Failed to create user', error);
            Alert.alert("Erreur", "La création de l'utilisateur a échoué.");
        }
    };

    const handleUpdateUser = async () => {
        try {
            const isAuthenticated = await checkAndRefreshToken();
            if (!isAuthenticated) {
                navigation.navigate('Login');
            }

            const token = await AsyncStorage.getItem('token');

            await axios.put(`https://isen3-back.onrender.com/api/users/update/${selectedUser.id}`, {
                name: firstName,
                surname: surname,
                email: email,
                role: role,
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            await fetchUsers();
            setModalVisible(false);
        } catch (error) {
            console.error('Failed to update user', error);
            Alert.alert("Erreur", "La mise à jour de l'utilisateur a échoué.");
        }
    };

    const handleCreditUser = async () => {
        try {
            const isAuthenticated = await checkAndRefreshToken();
            if (!isAuthenticated) {
                navigation.navigate('Login');
            }

            const token = await AsyncStorage.getItem('token');
            const offer = offers.find(o => o.id === selectedOffer);

            await axios.post(`https://isen3-back.onrender.com/api/offers/credit/${selectedUser.id}`, {
                offerId: selectedOffer
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            await fetchUsers();
            setCreditModalVisible(false);
        } catch (error) {
            console.error('Failed to credit user', error);
            Alert.alert("Erreur", "Le crédit de l'utilisateur a échoué.");
        }
    };

    const handleDeleteUser = async () => {
        Alert.alert(
            "Confirmation",
            "Êtes-vous sûr de vouloir supprimer cet utilisateur ?",
            [
                {
                    text: "Annuler",
                    style: "cancel"
                },
                {
                    text: "Supprimer",
                    onPress: async () => {
                        try {
                            const isAuthenticated = await checkAndRefreshToken();
                            if (!isAuthenticated) {
                                navigation.navigate('Login');
                            }

                            const token = await AsyncStorage.getItem('token');

                            await axios.delete(`https://isen3-back.onrender.com/api/users/delete/${selectedUser.id}`, {
                                headers: { Authorization: `Bearer ${token}` }
                            });

                            fetchUsers();
                            setModalVisible(false);
                        } catch (error) {
                            console.error('Failed to delete user', error);
                            Alert.alert("Erreur", "La suppression de l'utilisateur a échoué.");
                        }
                    }
                }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Gestion des membres</Text>
            <TouchableOpacity style={styles.createButton} onPress={openCreateModal}>
                <Text style={styles.buttonText}>Créer un membre</Text>
            </TouchableOpacity>
            <SectionList
                sections={users}
                keyExtractor={(item) => item.id.toString()}
                renderSectionHeader={({ section: { title } }) => (
                    <TouchableOpacity onPress={() => toggleExpandRole(title)}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionHeaderText}>{title}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                renderItem={({ item, section }) => (
                    expandedRoles[section.title] ? (
                        <View style={styles.userContainer}>
                            <Text style={styles.userText}>{item.surname} {item.name}</Text>
                            {(user.role === 'administrator' || (user.role === 'teacher' && item.role === 'student')) && (
                                <View style={styles.actionButtonsContainer}>
                                    <TouchableOpacity
                                        style={styles.editButton}
                                        onPress={() => openEditModal(item)}
                                    >
                                        <Text style={styles.buttonText}>Modifier</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.creditButton}
                                        onPress={() => openCreditModal(item)}
                                    >
                                        <Text style={styles.buttonText}>Créditer</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    ) : null
                )}
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Modifier les informations</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Prénom"
                            value={firstName}
                            onChangeText={setFirstName}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Nom"
                            value={surname}
                            onChangeText={setSurname}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="E-mail"
                            value={email}
                            onChangeText={setEmail}
                        />
                        {user.role === 'administrator' && (
                            <Picker
                                selectedValue={role}
                                onValueChange={(itemValue) => setRole(itemValue)}
                                style={styles.picker}
                                itemStyle={styles.pickerItem}
                            >
                                <Picker.Item label="Élève" value="student" />
                                <Picker.Item label="Professeur" value="teacher" />
                                <Picker.Item label="Administrateur" value="administrator" />
                            </Picker>
                        )}
                        <TouchableOpacity
                            style={styles.saveButton}
                            onPress={handleUpdateUser}
                        >
                            <Text style={styles.buttonText}>Enregistrer</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={handleDeleteUser}
                        >
                            <Text style={styles.buttonText}>Supprimer</Text>
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
            <Modal
                animationType="slide"
                transparent={true}
                visible={creditModalVisible}
                onRequestClose={() => setCreditModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Créditer un utilisateur</Text>
                        <Picker
                            selectedValue={selectedOffer}
                            onValueChange={(itemValue) => setSelectedOffer(itemValue)}
                            style={styles.picker}
                            itemStyle={styles.pickerItem}
                        >
                            {offers.map((offer) => (
                                <Picker.Item key={offer.id} label={`${offer.title} - ${offer.price}€`} value={offer.id} />
                            ))}
                        </Picker>
                        <TouchableOpacity
                            style={styles.saveButton}
                            onPress={handleCreditUser}
                        >
                            <Text style={styles.buttonText}>Créditer</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={() => setCreditModalVisible(false)}
                        >
                            <Text style={styles.buttonText}>Annuler</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={createModalVisible}
                onRequestClose={() => setCreateModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Créer un membre</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Prénom"
                            value={firstName}
                            onChangeText={setFirstName}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Nom"
                            value={surname}
                            onChangeText={setSurname}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="E-mail"
                            value={email}
                            onChangeText={setEmail}
                        />
                        <TouchableOpacity
                            style={styles.saveButton}
                            onPress={handleCreateUser}
                        >
                            <Text style={styles.buttonText}>Créer</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={() => setCreateModalVisible(false)}
                        >
                            <Text style={styles.buttonText}>Annuler</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default ManageMembersScreen;