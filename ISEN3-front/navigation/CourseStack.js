import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';
import CoursesScreen from '../screens/CoursesScreen';
import ProfileButton from '../components/ProfileButton';
import { AuthContext } from '../context/AuthContext';

const Stack = createStackNavigator();

function CourseStack({ navigation }) {
    const { isLoggedIn, user } = useContext(AuthContext);
    const ticket = user ? user.ticket : 0;

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="CoursesScreen"
                component={CoursesScreen}
                options={{
                    headerTitle: 'DENSHO',
                    headerStyle: {
                        backgroundColor: "#1C1C1F",
                    },
                    headerTintColor: '#E0E2E8',
                    headerRight: () => (
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <ProfileButton navigation={navigation} />
                        </View>
                    ),
                }}
            />
        </Stack.Navigator>
    );
}

export default CourseStack;
