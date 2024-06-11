import React, {useContext} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import ProfileScreen from "../screens/ProfileScreen";
import Tickets from "../components/Tickets";
import {AuthContext} from "../context/AuthContext";

const Stack = createStackNavigator();
const headerBackgroundColor = 'white';

function ProfileStack({ navigation}) {
    const { isLoggedIn, user } = useContext(AuthContext);
    const ticket = user ? user.ticket : 0;

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ProfileScreen"
                component={ProfileScreen}
                options={{
                    headerTitle: 'DENSHO',
                    headerStyle: {
                        backgroundColor: headerBackgroundColor,
                    },
                    headerLeft: () => (
                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 20}}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate("Association")}
                            >
                                <Icon name="arrow-back-outline" size={30} color="black" />
                            </TouchableOpacity>
                        </View>
                    ),
                    headerRight: () => (
                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingRight: 20}}>
                            {isLoggedIn && <Tickets count={ticket} />}
                        </View>
                    ),
                }
                }
            />
        </Stack.Navigator>
    );
}

export default ProfileStack;