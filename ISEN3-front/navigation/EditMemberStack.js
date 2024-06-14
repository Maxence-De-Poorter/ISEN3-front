import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {TouchableOpacity, View} from 'react-native';
import { AuthContext } from '../context/AuthContext';
import styles from "../styles/LoginStyles";
import Icon from "react-native-vector-icons/Ionicons";
import EditMemberScreen from "../screens/EditMemberScreen";

const Stack = createStackNavigator();

function EditMemberStack({ navigation }) {

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="EditMemberScreen"
                component={EditMemberScreen}
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

export default EditMemberStack;