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
import NewsContent from './pages/NewsContent'
import Publications from './pages/Publications'
import PublicationContent from './pages/PublicationContent'
import OtherFollowing from './pages/OtherFollowing'
import OtherFollowers from './pages/OtherFollowers'
import ReviewContent from './pages/ReviewContent'
import Inventory from './pages/Inventory'
import InventoryItem from './pages/InventoryItem'
import editProfile from './pages/editProfile'
import AddItemInventory from './pages/AddItemInventory'
import EditItem from './pages/EditItem'
import MyPublicationContent from './pages/MyPublicationContent'
import AddNewPublication from './pages/AddNewPublication'
import MyReviewContent from './pages/MyReviewContent'
import EditPublication from './pages/EditPublication'
import EditReview from './pages/EditReview'
import AddReview from './pages/AddReview'
import RecoverPassword from './pages/recoverPassword'

const PlaceholderImage = require('./assets/images/background.jpg');
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      
      <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen name="Publications" component={Publications} />

       
      <Stack.Screen name="AddNewPublication" component={AddNewPublication} />
      <Stack.Screen name="AddReview" component={AddReview} />
      <Stack.Screen name="EditReview" component={EditReview} />
      <Stack.Screen name="RecoverPassword" component={RecoverPassword} />
      <Stack.Screen name="MyPublicationContent" component={MyPublicationContent} />
      <Stack.Screen name="EditItem" component={EditItem} />
      <Stack.Screen name="HomePage" component={HomePage} />
      <Stack.Screen name="EditPublication" component={EditPublication} />
      <Stack.Screen name="OtherProfile" component={OtherProfile} />
      <Stack.Screen name="Inventory" component={Inventory} />
      <Stack.Screen name="InventoryItem" component={InventoryItem} />
      <Stack.Screen name="editProfile" component={editProfile} />
      <Stack.Screen name="AddItemInventory" component={AddItemInventory} />
      <Stack.Screen name="MyReviewContent" component={MyReviewContent} />
      
      <Stack.Screen name="ReviewContent" component={ReviewContent} />
      
      
        <Stack.Screen name="PublicationContent" component={PublicationContent} />
        <Stack.Screen name="NewsContent" component={NewsContent} />
      
   
        <Stack.Screen name="OtherFollowing" component={OtherFollowing} />
        <Stack.Screen name="OtherFollowers" component={OtherFollowers} />
        
        <Stack.Screen name="Login" component={Login} />
        
        <Stack.Screen name="SearchUser" component={SearchUser} />
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="News" component={News} />


        <Stack.Screen name="Followers" component={Followers} />


        <Stack.Screen name="Inbox" component={Inbox} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="Following" component={Following} />
        



        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="MyProfile" component={MyProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({


});