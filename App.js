import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './pages/Login';
import OtherPage from './pages/otherPage';
const PlaceholderImage = require('./assets/images/background.jpg');
const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator intialRouteName='Login'>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="OtherPage" component={OtherPage} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({

  
});