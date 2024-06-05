import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RegistrationScreen from "../screens/RegistrationScreen";
import {TouchableOpacity, View} from "react-native";
import styles from "../styles/LoginScreen";
import Icon from "react-native-vector-icons/Ionicons";

const Stack = createStackNavigator();
const headerBackgroundColor = 'white';

function RegisterStack({ navigation}) {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="RegisterScreen"
                component={RegistrationScreen}
                options={{
                    headerTitle: 'DENSHO',
                    headerStyle: {
                        backgroundColor: headerBackgroundColor,
                    },
                    headerLeft: () => (
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity
                                style={styles.profileButton}
                                onPress={() => navigation.navigate('LoginScreen')}
                            >
                                <Icon name="arrow-back-outline" size={30} color="black" />
                            </TouchableOpacity>
                        </View>
                    ),
                }
                }
            />
        </Stack.Navigator>
    );
}

export default RegisterStack;