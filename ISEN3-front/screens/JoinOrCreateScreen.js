import React from 'react';
import { View, Text, Button } from 'react-native';

function JoinOrCreateScreen({ navigation }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>JoinOrCreate Screen</Text>
            <Button
                title="Go to home"
                onPress={() => navigation.navigate('Tabs')}
            />
        </View>
    );
}

export default JoinOrCreateScreen;
