import React, { useContext} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeStack from './HomeStack';
import CourseStack from './CourseStack';
import GestionStack from './GestionStack';
import { AuthContext } from '../context/AuthContext';
import TestScreen from "../screens/TestScreen";

const Tab = createBottomTabNavigator();

function TabNavigator() {
    const { isLoggedIn, user, loading } = useContext(AuthContext);

    if (loading) {
        return ;
    }

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Association') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Cours') {
                        iconName = focused ? 'calendar' : 'calendar-outline';
                    } else if (route.name === 'Gestion') {
                        iconName = focused ? 'settings' : 'settings-outline';
                    }
                    return <Icon name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#E0E2E8',
                tabBarInactiveTintColor: '#394054',
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#1C1C1F',
                },
            })}
        >
            <Tab.Screen name="Association" component={HomeStack} />
            <Tab.Screen name="Test" component={TestScreen} />
            <Tab.Screen name="Cours" component={CourseStack} />
            {isLoggedIn && user?.role !== 'student' && (
                    <Tab.Screen name="Gestion" component={GestionStack} />
            )}
        </Tab.Navigator>
    );
}

export default TabNavigator;