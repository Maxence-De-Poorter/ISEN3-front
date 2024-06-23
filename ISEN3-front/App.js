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
import CourseHistoryStack from "./navigation/CourseHistoryStack";
import ManageOffersStack from "./navigation/ManageOffersStack";
import UserOffersStack from "./navigation/UserOffersStack";
import PurchaseOffersStack from "./navigation/PurchaseOffersStack";
import CreateStudentScreen from "./screens/CreateStudentScreen";
import RequestResetPasswordScreen from "./screens/RequestResetPasswordScreen";
import ResetPasswordScreen from "./screens/ResetPasswordScreen";
import RequestResetPasswordStack from "./navigation/RequestResetPasswordStack";

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
                        <Stack.Screen name="CoursesHistory" component={CourseHistoryStack} />
                        <Stack.Screen name="ManageOffers" component={ManageOffersStack} />
                        <Stack.Screen name="UserOffers" component={UserOffersStack} />
                        <Stack.Screen name="PurchaseOffers" component={PurchaseOffersStack} />
                        <Stack.Screen name="CreateStudent" component={CreateStudentScreen} />
                        <Stack.Screen name="RequestResetPassword" component={RequestResetPasswordStack} />
                    </Stack.Navigator>
                </NavigationContainer>
        </AuthProvider>
    );
}

export default App;
