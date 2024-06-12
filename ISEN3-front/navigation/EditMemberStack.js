import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {TouchableOpacity, View} from 'react-native';
import ProfileButton from '../components/ProfileButton';
import Tickets from '../components/Tickets';
import { AuthContext } from '../context/AuthContext';
import styles from "../styles/LoginStyles";
import Icon from "react-native-vector-icons/Ionicons";
import EditMemberScreen from "../screens/EditMemberScreen";

const Stack = createStackNavigator();
const headerBackgroundColor = 'white';

function EditMemberStack({ navigation }) {
    const { isLoggedIn, user } = useContext(AuthContext);
    const ticket = user ? user.ticket : 0;

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="EditMemberScreen"
                component={EditMemberScreen}
                options={{
                    headerTitle: 'DENSHO',
                    headerStyle: {
                        backgroundColor: headerBackgroundColor,
                    },
                    headerLeft: () => (
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity
                                style={styles.profileButton}
                                onPress={() => navigation.navigate("Gestion")}
                            >
                                <Icon name="arrow-back-outline" size={30} color="black" />
                            </TouchableOpacity>
                        </View>
                    ),
                }}
            />
        </Stack.Navigator>
    );
}

export default EditMemberStack;