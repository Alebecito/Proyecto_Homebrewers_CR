import React from 'react';

import { StyleSheet, View, Text, Button } from 'react-native';

const OtherPage = ({navigation}) => {
return(
    <View>
        <Text>Other Page</Text>
        <Button title="Go to Login" onPress={() => navigation.navigate('Login')} />
    </View>
);
};

export default OtherPage;