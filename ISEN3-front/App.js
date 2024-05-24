import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, View, Text, StyleSheet } from 'react-native';

const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  return (
      <View style={styles.container}>
        <Button
            title="Créer une asso"
            onPress={() => navigation.navigate('CreateAsso')}
        />
          <View style={styles.space} />
        <Button
            title="Rejoindre une asso"
            onPress={() => navigation.navigate('JoinAsso')}
        />
      </View>
  );
}

function CreateAssoScreen() {
  return (
      <View style={styles.container}>
        <Text style={styles.text}>Page de création d'une association</Text>
      </View>
  );
}

function JoinAssoScreen() {
  return (
      <View style={styles.container}>
        <Text style={styles.text}>Page pour rejoindre une association</Text>
      </View>
  );
}

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Accueil' }} />
          <Stack.Screen name="CreateAsso" component={CreateAssoScreen} options={{ title: 'Créer une asso' }} />
          <Stack.Screen name="JoinAsso" component={JoinAssoScreen} options={{ title: 'Rejoindre une asso' }} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
  },
    space:{
        height: 20,
    }
});
