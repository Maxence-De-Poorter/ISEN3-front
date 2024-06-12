import React, { useContext} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeStack from './HomeStack';
import CalendarStack from './CalendarStack';
import GestionStack from './GestionStack';
import { AuthContext } from '../context/AuthContext';

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
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
                headerShown: false,
            })}
        >
            <Tab.Screen name="Association" component={HomeStack} />
            <Tab.Screen name="Cours" component={CalendarStack} />
            {isLoggedIn && user?.role !== 'student' && (
                    <Tab.Screen name="Gestion" component={GestionStack} />
            )}
        </Tab.Navigator>
    );
}

export default TabNavigator;