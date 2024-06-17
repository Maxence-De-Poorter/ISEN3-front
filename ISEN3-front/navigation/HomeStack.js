import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import ProfileButton from '../components/ProfileButton';

const Stack = createStackNavigator();

function HomeStack({ navigation }) {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    headerTitle: 'DENSHO',
                    headerStyle: {
                        backgroundColor: "#1C1C1F",

                    },
                    headerTintColor: '#E0E2E8',
                    headerRight: () => (
                        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                            <ProfileButton navigation={navigation} />
                        </View>
                    ),
                }}
            />
        </Stack.Navigator>
    );
}

export default HomeStack;