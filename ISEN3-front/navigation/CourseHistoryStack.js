import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {TouchableOpacity, View} from 'react-native';
import CoursesHistoryScreen from "../screens/CoursesHistoryScreen";
import Icon from "react-native-vector-icons/Ionicons";

const Stack = createStackNavigator();

function CourseHistoryStack({ navigation }) {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="CoursesHistoryScreen"
                component={CoursesHistoryScreen}
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
                                onPress={() => navigation.navigate("CoursesScreen")}
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

export default CourseHistoryStack;