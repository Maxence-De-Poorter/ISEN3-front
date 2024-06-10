import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';
import ProfileButton from '../components/ProfileButton';
import Tickets from '../components/Tickets';
import { AuthContext } from '../context/AuthContext';
import GestionScreen from "../screens/GestionScreen";

const Stack = createStackNavigator();
const headerBackgroundColor = 'white';

function GestionStack({ navigation }) {
    const { isLoggedIn, user } = useContext(AuthContext);
    const ticket = user ? user.ticket : 0;

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="AdminScreen"
                component={GestionScreen}
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
        </Stack.Navigator>
    );
}

export default GestionStack;