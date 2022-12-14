import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Alert, ScrollView
} from 'react-native';

import Checkbox from 'expo-checkbox';

export default class SignUp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isChecked: false,
      fullName: '',
      email   : '',
      password: '',
    }
  }

  onClickListener = (viewId) => {
    Alert.alert("Alert", "Button pressed "+viewId);
  }

  handleChange = e => this.setState({ isChecked: e });


  render() {
    return (
      <ScrollView>
      <View style={styles.container}>
      <Text style={{color:"black", textAlign:"center", margin:20}}>Ingresa tu correo para recibir instrucciones</Text>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/male-user/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Correo Electronico"
          
              underlineColorAndroid='transparent'
              onChangeText={(fullName) => this.setState({fullName})}/>
        </View>

        

        <TouchableOpacity style={[styles.buttonContainer, styles.signupButton]} onPress={() => this.props.navigation.navigate('Login')}>
          <Text style={styles.signUpText}>Recibir instrucciones</Text>
        </TouchableOpacity>

        
      </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f6f2',
    marginTop:30
  },
  inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
      width:250,
      height:45,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center'
  },
  inputContainerBox: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius:30,
    borderBottomWidth: 1,
    width:250,
    height:200,
    marginBottom:20,
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'center',
},
  inputs:{
      height:45,
      
      borderBottomColor: '#FFFFFF',
      flex:1,
  },
  inputsBox:{
    height:200,
    width:250,
    
    borderBottomColor: '#FFFFFF',
    flex:1,
},
  inputIcon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
  },
  signupButton: {
    backgroundColor: "#FF4DFF",
  },
  signUpText: {
    color: 'white',
  }
});
