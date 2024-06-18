import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';
import ProfileButton from '../components/ProfileButton';
import ManageScreen from "../screens/ManageScreen";

const Stack = createStackNavigator();

function ManageStack({ navigation }) {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="AdminScreen"
                component={ManageScreen}
                options={{
                    headerTitle: 'DENSHO',
                    headerStyle: {
                        backgroundColor: "#1C1C1F",
                    },
                    headerTitleStyle: {
                        fontSize: 20,
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

export default ManageStack;