import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {TouchableOpacity, View} from 'react-native';
import ManageAssociationScreen from "../screens/ManageAssociationScreen";
import Icon from "react-native-vector-icons/Ionicons";

const Stack = createStackNavigator();

function ManageAssociationStack({ navigation }) {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="AdminScreen"
                component={ManageAssociationScreen}
                options={{
                    headerTitle: 'DENSHO',
                    headerStyle: {
                        backgroundColor: '#1C1C1F',
                    },
                    headerTitleStyle: {
                        fontSize: 20,
                    },
                    headerTintColor: '#E0E2E8',
                    headerLeft: () => (
                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 20}}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate("Gestion")}
                            >
                                <Icon name="arrow-back-outline" size={30} color="#E0E2E8" />
                            </TouchableOpacity>
                        </View>
                    ),
                }}
            />
        </Stack.Navigator>
    );
}

export default ManageAssociationStack;