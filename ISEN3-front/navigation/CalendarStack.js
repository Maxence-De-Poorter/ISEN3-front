import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';
import CalendarScreen from '../screens/CalendarScreen';
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
                name="CalendarScreen"
                component={CalendarScreen}
                options={{
                    headerTitle: 'DENSHO',
                    headerStyle: {
                        backgroundColor: headerBackgroundColor,
                    },
                    headerRight: () => (
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            {isLoggedIn &&<Tickets count={ticket} />}
                            <ProfileButton navigation={navigation} />
                        </View>
                    ),
                }}
            />
        </Stack.Navigator>
    );
}

export default CalendarStack;