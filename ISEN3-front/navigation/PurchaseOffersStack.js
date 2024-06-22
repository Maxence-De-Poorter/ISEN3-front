import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PurchaseOffersScreen from '../screens/PurchaseOffersScreen';
import PaymentScreen from '../screens/PaymentScreen';

const Stack = createStackNavigator();

function PurchaseOffersStack({ navigation }) {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="PurchaseOffersScreen"
                component={PurchaseOffersScreen}
                options={{
                    headerTitle: 'DENSHO',
                    headerStyle: {
                        backgroundColor: '#1C1C1F',
                        borderBottomWidth: 1,
                        borderBottomColor: '#5DA5B3',
                    },
                    headerTitleStyle: {
                        fontSize: 20,
                        color: '#E0E2E8',
                        fontWeight: 'bold',
                    },
                    headerTintColor: '#E0E2E8',
                    headerLeft: () => (
                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 20 }}>
                            <TouchableOpacity onPress={() => navigation.navigate('UserOffers')}>
                                <Icon name="arrow-back-outline" size={30} color="#E0E2E8" />
                            </TouchableOpacity>
                        </View>
                    ),
                }}
            />
            <Stack.Screen
                name="Payment"
                component={PaymentScreen}
                options={{
                    headerTitle: 'Paiement',
                    headerStyle: {
                        backgroundColor: '#1C1C1F',
                        borderBottomWidth: 1,
                        borderBottomColor: '#5DA5B3',
                    },
                    headerTitleStyle: {
                        fontSize: 20,
                        color: '#E0E2E8',
                        fontWeight: 'bold',
                    },
                    headerTintColor: '#E0E2E8',
                }}
            />
        </Stack.Navigator>
    );
}

export default PurchaseOffersStack;