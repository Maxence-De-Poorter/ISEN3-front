import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider } from './context/AuthContext';
import { CourseProvider } from './context/CourseContext';
import TabNavigator from './navigation/TabNavigator';
import LoginStack from "./navigation/LoginStack";
import RegisterStack from "./navigation/RegisterStack";
import ProfileStack from "./navigation/ProfileStack";
import EditAssociationStack from "./navigation/EditAssociationStack";
import EditMemberStack from "./navigation/EditMemberStack";

const Stack = createStackNavigator();

function App() {
    return (
        <AuthProvider>
            <CourseProvider>
                <NavigationContainer>
                    <Stack.Navigator screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="Home" component={TabNavigator} />
                        <Stack.Screen name="Profile" component={ProfileStack} />
                        <Stack.Screen name="Login" component={LoginStack} />
                        <Stack.Screen name="Register" component={RegisterStack} />
                        <Stack.Screen name="EditAssociation" component={EditAssociationStack} />
                        <Stack.Screen name="EditMember" component={EditMemberStack} />
                    </Stack.Navigator>
                </NavigationContainer>
            </CourseProvider>
        </AuthProvider>
    );
}

export default App;
