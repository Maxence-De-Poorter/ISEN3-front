import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RegistrationScreen from "../screens/RegistrationScreen";
import {StyleSheet, TouchableOpacity, View} from "react-native";
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
                                style={styles.backButton}
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

const styles = StyleSheet.create({
    backButton: {
        paddingLeft: 20,
    },
});

export default RegisterStack;