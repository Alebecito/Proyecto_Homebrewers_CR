import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import HomePage from './pages/HomePage'
const PlaceholderImage = require('./assets/images/background.jpg');
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator intialRouteName='HomePage'>
      <Stack.Screen name="HomePage" component={HomePage} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      
    </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({

  
});