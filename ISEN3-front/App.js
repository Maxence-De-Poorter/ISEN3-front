import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider } from './context/AuthContext';
import TabNavigator from './navigation/TabNavigator';
import LoginStack from "./navigation/LoginStack";
import RegisterStack from "./navigation/RegisterStack";
import ProfileStack from "./navigation/ProfileStack";
import ManageAssociationStack from "./navigation/ManageAssociationStack";
import ManageMembersStack from "./navigation/ManageMembersStack";
import ManageCoursesStack from "./navigation/ManageCoursesStack";
import ManagePurchasesStack from "./navigation/ManagePurchasesStack";

const Stack = createStackNavigator();

function App() {
    return (
        <AuthProvider>
                <NavigationContainer>
                    <Stack.Navigator screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="Home" component={TabNavigator} />
                        <Stack.Screen name="Profile" component={ProfileStack} />
                        <Stack.Screen name="Login" component={LoginStack} />
                        <Stack.Screen name="Register" component={RegisterStack} />
                        <Stack.Screen name="EditAssociation" component={ManageAssociationStack} />
                        <Stack.Screen name="EditMember" component={ManageMembersStack} />
                        <Stack.Screen name="EditCourse" component={ManageCoursesStack} />
                        <Stack.Screen name="ManagePurchases" component={ManagePurchasesStack} />
                    </Stack.Navigator>
                </NavigationContainer>
        </AuthProvider>
    );
}

export default App;
