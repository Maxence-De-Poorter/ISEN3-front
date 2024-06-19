import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import ProfileScreen from "../screens/ProfileScreen";
import UserOffersScreen from "../screens/UserOffersScreen";

const Stack = createStackNavigator();

function UserOffersStack({ navigation}) {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="UserOffersScreen"
                component={UserOffersScreen}
                options={{
                    headerTitle: 'DENSHO',
                    headerStyle: {
                        backgroundColor: "#1C1C1F",
                        borderBottomWidth: 1,
                        borderBottomColor: '#5DA5B3',
                    },
                    headerTitleStyle: {
                        fontSize: 20,
                        color: '#E0E2E8',
                        fontWeight: 'bold',
                    },
                    headerTintColor: '#E0E2E8',
                    headerLeft: () => (
                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 20}}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate("Profile")}
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

export default UserOffersStack;