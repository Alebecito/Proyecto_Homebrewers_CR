import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import HomePage from './pages/HomePage'
import Inbox from './pages/Inbox'
import Chat from './pages/Chat' 
import MyProfile from './pages/MyProfile'
import Following from './pages/Following' 
import Followers from './pages/Followers'
import OtherProfile from './pages/otherProfile' 
import Notifications from './pages/Notifications';
import SearchUser from './pages/SearchUser'
import News from './pages/News'

const PlaceholderImage = require('./assets/images/background.jpg');
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      
    <Stack.Navigator intialRouteName='HomePage'>
    <Stack.Screen name="HomePage" component={HomePage} />
    <Stack.Screen name="SearchUser" component={SearchUser}/>
    <Stack.Screen name="Notifications" component={Notifications}/>
    <Stack.Screen name="News" component={News}/>
      
      <Stack.Screen name="Followers" component={Followers}/>
      <Stack.Screen name="Login" component={Login} />
      
      <Stack.Screen name="Inbox" component={Inbox}/>
      <Stack.Screen name="Chat" component={Chat}/>
      <Stack.Screen name="Following" component={Following}/>
      <Stack.Screen name="OtherProfile" component={OtherProfile}/>
   
      
     
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="MyProfile" component={MyProfile} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({

  
});