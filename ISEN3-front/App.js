import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider } from './context/AuthContext';
import TabNavigator from './navigation/TabNavigator';
import ProfileScreen from './screens/ProfileScreen';
import LoginStack from "./navigation/LoginStack";
import RegisterStack from "./navigation/RegisterStack";

const Stack = createStackNavigator();

function App() {
    return (
        <AuthProvider>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Home" component={TabNavigator} />
                    <Stack.Screen name="Profile" component={ProfileScreen} />
                    <Stack.Screen name="Login" component={LoginStack} />
                    <Stack.Screen name="Register" component={RegisterStack} />
                </Stack.Navigator>
            </NavigationContainer>
        </AuthProvider>
    );
}

export default App;