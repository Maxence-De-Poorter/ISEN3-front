import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {TouchableOpacity, View} from 'react-native';
import { AuthContext } from '../context/AuthContext';
import EditAssociationScreen from "../screens/EditAssociationScreen";
import styles from "../styles/LoginStyles";
import Icon from "react-native-vector-icons/Ionicons";

const Stack = createStackNavigator();

function EditAssociationStack({ navigation }) {
    const { isLoggedIn, user } = useContext(AuthContext);
    const ticket = user ? user.ticket : 0;

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="AdminScreen"
                component={EditAssociationScreen}
                options={{
                    headerTitle: 'DENSHO',
                    headerStyle: {
                        backgroundColor: '#1C1C1F',
                    },
                    headerTintColor: '#E0E2E8',
                    headerLeft: () => (
                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 20}}>
                            <TouchableOpacity
                                style={styles.profileButton}
                                onPress={() => navigation.navigate("Gestion")}
                            >
                                <Icon name="arrow-back-outline" size={30} color="#E0E2E8" />
                            </TouchableOpacity>
                        </View>
                    ),
                }}
            />
        </Stack.Navigator>
    );
}

export default EditAssociationStack;