import { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext, AuthProvider } from './AuthContext';
import HomeScreen from './screens/HomeScreen';
import CalendarScreen from './screens/CalendarScreen';
import ProfileScreen from './screens/ProfileScreen';
import LoginScreen from './screens/LoginScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import ProfileButton from './components/ProfileButton';
import Tickets from './components/Tickets';
import {View} from "react-native"; // Adjust the path as necessary

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const headerBackgroundColor = 'white';

function HomeStack({ navigation }) {
    const { ticketCount } = useContext(AuthContext);

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    headerTitle: 'DENSHO',
                    headerStyle: {
                        backgroundColor: headerBackgroundColor,
                    },
                    headerRight: () => (
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Tickets count={ticketCount} />
                            <ProfileButton navigation={navigation} />
                        </View>
                    ),
                }}
            />
        </Stack.Navigator>
    );
}

function CalendarStack({ navigation }) {
    const { ticketCount } = useContext(AuthContext);

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="CalendarScreen"
                component={CalendarScreen}
                options={{
                    headerTitle: '',
                    headerStyle: {
                        backgroundColor: headerBackgroundColor,
                    },
                    headerRight: () => (
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Tickets count={ticketCount} />
                            <ProfileButton navigation={navigation} />
                        </View>
                    ),
                }}
            />
        </Stack.Navigator>
    );
}

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