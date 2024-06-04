import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthProvider, AuthContext } from './AuthContext';
import HomeScreen from './screens/HomeScreen';
import CalendarScreen from "./screens/CalendarScreen";
import ProfileScreen from './screens/ProfileScreen';
import LoginScreen from './screens/LoginScreen';
import RegistrationScreen from "./screens/RegistrationScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const headerBackgroundColor = 'white';

function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    headerTitle: '',
                    headerStyle: {
                        backgroundColor: headerBackgroundColor,
                    },
                }}
            />
        </Stack.Navigator>
    );
}

function CalendarStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Calendar"
                component={CalendarScreen}
                options={{
                    headerTitle: '',
                    headerStyle: {
                        backgroundColor: headerBackgroundColor,
                    },
                }}
            />
        </Stack.Navigator>
    );
}

function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Calendar') {
                        iconName = focused ? 'calendar' : 'calendar-outline';
                    }
                    return <Icon name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: "tomato",
                tabBarInactiveTintColor: "gray",
                headerShown: false,
            })}
        >
            <Tab.Screen name="Home" component={HomeStack} />
            <Tab.Screen name="Calendar" component={CalendarStack} />
        </Tab.Navigator>
    );
}

function App() {
    return (
        <AuthProvider>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Tabs" component={TabNavigator} />
                    <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false, gestureEnabled: false }} />
                    <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false, gestureEnabled: false }} />
                    <Stack.Screen name="Register" component={RegistrationScreen} options={{ headerShown: false, gestureEnabled: false }} />
                </Stack.Navigator>
            </NavigationContainer>
        </AuthProvider>
    );
}

export default App;