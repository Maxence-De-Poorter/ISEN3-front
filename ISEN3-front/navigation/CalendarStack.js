import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';
import CoursesScreen from '../screens/CoursesScreen';
import EnrollmentHistory from '../components/EnrollmentHistory';
import ProfileButton from '../components/ProfileButton';
import Tickets from '../components/Tickets';
import { AuthContext } from '../context/AuthContext';

const Stack = createStackNavigator();
const headerBackgroundColor = 'white';

function CalendarStack({ navigation }) {
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
                        backgroundColor: headerBackgroundColor,
                    },
                    headerRight: () => (
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            {isLoggedIn && <Tickets count={ticket} />}
                            <ProfileButton navigation={navigation} />
                        </View>
                    ),
                }}
            />
            <Stack.Screen
                name="EnrollmentHistory"
                component={EnrollmentHistory}
                options={{ headerTitle: 'Enrollment History' }}
            />
        </Stack.Navigator>
    );
}

export default CalendarStack;
