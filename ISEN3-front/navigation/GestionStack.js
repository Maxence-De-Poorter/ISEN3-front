import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';
import ProfileButton from '../components/ProfileButton';
import { AuthContext } from '../context/AuthContext';
import GestionScreen from "../screens/GestionScreen";

const Stack = createStackNavigator();

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

export default GestionStack;