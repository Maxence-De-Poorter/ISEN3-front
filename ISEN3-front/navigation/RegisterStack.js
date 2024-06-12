import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RegistrationScreen from "../screens/RegistrationScreen";
import {TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const Stack = createStackNavigator();

function RegisterStack({ navigation}) {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="RegisterScreen"
                component={RegistrationScreen}
                options={{
                    headerTitle: 'DENSHO',
                    headerStyle: {
                        backgroundColor: "#1C1C1F",
                    },
                    headerTintColor: '#E0E2E8',
                    headerLeft: () => (
                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 20}}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('LoginScreen')}
                            >
                                <Icon name="arrow-back-outline" size={30} color="#E0E2E8" />
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