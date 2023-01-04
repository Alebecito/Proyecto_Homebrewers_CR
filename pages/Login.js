import React, { Component } from 'react';

//import axios for react native



import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Alert,
  AsyncStorage
} from 'react-native';

export default class Login extends Component {

  constructor(props) {
    super(props);
    state = {
      email: '',
      password: '',
      UsuarioLogeado: '',
    }
  }


  saveId = async (id) => {
    try {
      await AsyncStorage.setItem('UsuarioLogeado', id);
      
    } catch (error) {
      console.log(error);
    }


  }

  loadId = async () => {
    try {
      const id = await AsyncStorage.getItem('UsuarioLogeado');
      this.setState({ UsuarioLogeado: id });
    } catch (error) {
      console.log(error);
    }
  }


  loginFunction = () => {
    try {

    }
    catch (error) {
      console.log(error);
    }
    if (this.state.email === '' || this.state.password === '') {
      alert("Favor de llenar todos los campos");
      return;
    }
    fetch(`http://10.0.2.2:5000/usuario/login/${this.state.email}/${this.state.password}`,
      { method: 'GET', }).then((response) => response.json()).then((responseJson) => {

        if (responseJson.length > 0) {
          
          if (responseJson[0].estado === "habilitado") {
          
            this.saveId(responseJson[0].id);
            this.loadId();
            
            alert("Inicio de Sesión exitoso para el usuario ");
            this.props.navigation.reset({index:0, routes: [{name:"HomePage"}]})
          } else if(responseJson[0].estado === "noValidado"){
            alert("Usuario no validado, favor esperar a que el administrador valide su cuenta");
          }
          
          else {
            alert("Usuario deshabilitado, favor de contactar al administrador");
          }
        } else {
          alert("Usuario o contraseña incorrectos");
        }

      }).catch((error) => {
        console.log(error)
      });

  }

  onClickListener = (viewId) => {
    Alert.alert("Alert", "Button pressed " + viewId);
  }
  componentDidMount() {
    this.setState({ email: '' })
  }

  render() {
    return (
      <View style={styles.container}>

        <Image style={{ width: 300, height: 200, marginBottom: 40 }} source={require('../assets/images/logo.png')} />
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/message/ultraviolet/50/3498db' }} />
          <TextInput style={styles.inputs}
            placeholder="Correo Electrónico"
            keyboardType="email-address"

            underlineColorAndroid='transparent'
            onChangeText={(email) => this.setState({ email })} />
        </View>

        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db' }} />
          <TextInput style={styles.inputs}
            placeholder="Contraseña"
            secureTextEntry={true}
            underlineColorAndroid='transparent'
            onChangeText={(password) => this.setState({ password })} />
        </View>

        <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.loginFunction()}>
          <Text style={styles.loginText}>Iniciar Sesión</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonContainer} onPress={() => this.props.navigation.navigate('RecoverPassword')}>
          <Text>Recuperar contraseña</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonContainer} onPress={() => this.props.navigation.navigate('SignUp')}>
          <Text>Registrate en la aplicación</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#white',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: "#454545",
  },
  loginText: {
    color: 'white',
  }
});
