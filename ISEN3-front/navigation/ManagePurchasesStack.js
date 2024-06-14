import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {TouchableOpacity, View} from 'react-native';
import styles from "../styles/LoginStyles";
import Icon from "react-native-vector-icons/Ionicons";
import ManagePurchases from "../screens/ManagePurchases";

const Stack = createStackNavigator();

function ManagePurchasesStack({ navigation }) {

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="EditMemberScreen"
                component={ManagePurchases}
                options={{
                    headerTitle: 'DENSHO',
                    headerStyle: {
                        backgroundColor: '#1C1C1F',
                    },
                    headerTintColor: '#E0E2E8',
                    headerLeft: () => (
                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 20}}>
                            <TouchableOpacity
                                style={styles.profileButton}
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

export default ManagePurchasesStack;