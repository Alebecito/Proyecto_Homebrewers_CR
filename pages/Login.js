import React from 'react';

import { StyleSheet, View, Text, Button } from 'react-native';

const Home = ({navigation}) => {
return(
    <View>
        <Text>Login</Text>
        <Button title="Go to OtherPage" onPress={() => navigation.navigate('OtherPage')} />
    </View>
);
};

export default Home;