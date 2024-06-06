import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeStack from './HomeStack';
import CalendarStack from './CalendarStack';
import { AuthContext } from '../context/AuthContext';

const Tab = createBottomTabNavigator();

function TabNavigator() {
    const { isLoggedIn } = useContext(AuthContext);

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Association') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Calendar') {
                        iconName = focused ? 'calendar' : 'calendar-outline';
                    }
                    return <Icon name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
                headerShown: false,
            })}
        >
            <Tab.Screen name="Association" component={HomeStack} />
            {isLoggedIn && <Tab.Screen name="Calendar" component={CalendarStack} />}
        </Tab.Navigator>
    );
}

export default TabNavigator;