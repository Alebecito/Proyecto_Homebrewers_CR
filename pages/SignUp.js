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
      <Text style={{color:"black", textAlign:"center", margin:20}}>Nombre Completo</Text>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/male-user/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Nombre Completo"
          
              underlineColorAndroid='transparent'
              onChangeText={(fullName) => this.setState({fullName})}/>
        </View>
<Text style={{color:"black", textAlign:"center", margin:20}}>Correo Electrónico</Text>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Correo Electrónico"
            
              underlineColorAndroid='transparent'
              onChangeText={(email) => this.setState({email})}/>
        </View>
        <Text style={{color:"black", textAlign:"center", margin:20}}>Descripción de Perfil</Text>
        <View style={styles.inputContainerBox}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
          <TextInput UselessTextInput
        multiline
        numberOfLines={4} style={styles.inputsBox}
              placeholder="¿Cómo describes tu perfil? (Eg: Cervecero Artesanal)"
            
              underlineColorAndroid='transparent'
              onChangeText={(email) => this.setState({email})}/>
        </View>
        <Text style={{color:"black", textAlign:"center", margin:20}}>Contraseña</Text>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Contraseña"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({password})}/>
        </View>
        <Text style={{color:"black", textAlign:"center", margin:20}}>Confirmar contraseña</Text>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Confirmar contraseña"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({password})}/>
        </View >
       
        <Text style={{color:"black", textAlign:"center", margin:20}}>Agrega identificador personal (Cédula de mayor, licencia de conducción, etc)</Text>
        <TouchableOpacity style={[styles.buttonContainer, styles.signupButton, {marginTop:20}]} onPress={() => {}}>
          <Text style={styles.signUpText}>Seleccionar imagen</Text>
        </TouchableOpacity>

        <Image
          style={{ width: 300,
            height: 200,}}
          source={{uri: 'https://media.istockphoto.com/id/1073597286/vector/driver-license-with-male-photo-identification-or-id-card-template-vector-illustration.jpg?s=170667a&w=is&k=20&c=ZGfrRxbVbSOjW5dV0XKrfYOYHIuOJwo4Du3R5NDxcFY='}}
        />

        <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom:20, marginTop:20}}>


            <Text >  <Checkbox value={this.state.isChecked} onValueChange={this.handleChange} />  He leido y acepto los <Text style={{color:"blue"}} onPress={()=> this.props.navigation.navigate("TermsAndConditions")}>términos y condiciones</Text> </Text>

          </View>

        

        <TouchableOpacity style={[styles.buttonContainer, styles.signupButton]} onPress={() => this.props.navigation.navigate('Login')}>
          <Text style={styles.signUpText}>Registrarse</Text>
        </TouchableOpacity>
        <Text style={{marginTop:20, marginBottom:20}}>¿Ya estás registrado? <Text style={{color:"blue"}} onPress={()=>this.props.navigation.navigate("Login")}>Inicia Sesión</Text></Text>
        
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
    backgroundColor: '#white',
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
    backgroundColor: "#454545",
  },
  signUpText: {
    color: 'white',
  }
});
