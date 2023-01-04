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

import * as ImagePicker from 'expo-image-picker';

import Checkbox from 'expo-checkbox';

export default class SignUp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isChecked: false,
      fullName: '',
      email   : '',
      description: '',
      password: '',
      passwordConfirm: '',
      image: 'https://media.istockphoto.com/id/1073597286/vector/driver-license-with-male-photo-identification-or-id-card-template-vector-illustration.jpg?s=170667a&w=is&k=20&c=ZGfrRxbVbSOjW5dV0XKrfYOYHIuOJwo4Du3R5NDxcFY=',
      uploading: false,
      sourceImage: null,
      resultURL:''
   
    }
  }


  get_url_extension( url ) {
    return url.split(/[#?]/)[0].split('.').pop().trim();
}
  _pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      aspect: [4, 3],
    });
    
    const uri = pickerResult.uri
    const type = "image/"+this.get_url_extension(uri)
    const name = pickerResult.assetId
    const source = { uri, type,  name}
    
    this.setState({ image: pickerResult.uri });
    this.setState({ sourceImage: source });
    


  };

  async componentDidMount() {
    const {
      status,
    } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }
  }

 

  handleChange = e => this.setState({ isChecked: e });

  validateEmail = (email) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  };


uploadImage = async () => {

  const data = new FormData()
  data.append('file', this.state.sourceImage)
  data.append("upload_preset", "UserUploadImages")
  data.append("cloud_name", "dlzxkdsau")
  await fetch("https://api.cloudinary.com/v1_1/dlzxkdsau/image/upload", {
    method: 'POST',
    body: data,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data'
    }
  }).then(res => res.json())
    .then(data => {
      this.setState({ resultURL: data.url })

    }).catch(err => {
      Alert.alert("Error While Uploading")
    })

}

registerFunction = async () => {

  
  

  if(this.state.description==='' || this.state.fullName==='' || this.state.email==='' || this.state.password==='' || this.state.passwordConfirm === ''){
  
    Alert.alert("Error", "Por favor, llena todos los campos");
  
  }
  else if(this.validateEmail(this.state.email) === false){
    Alert.alert("Error", "Por favor, introduce un correo electrónico válido");
  }

  else if(this.state.isChecked===false){
    Alert.alert("Error", "Por favor, acepta los términos y condiciones");
  }
  else if(this.state.password !== this.state.passwordConfirm){
    Alert.alert("Error", "Las contraseñas no coinciden");
  } else if(this.state.sourceImage === null){
    Alert.alert("Error", "Por favor, selecciona una imagen");
  }
  else{
    await this.uploadImage()
    let formData = new FormData();
    formData.append('nombre', this.state.fullName);
    formData.append('correoElectronico', this.state.email);
    formData.append('descripcionPerfil', this.state.description);
    formData.append('contrasena', this.state.password);
    formData.append('imagen', this.state.resultURL);
  
   await fetch('http://10.0.2.2:5000/usuario/SignUpUser/',{method: 'POST',  body: formData});
   Alert.alert("Usuario registrado exitosamente");
    this.props.navigation.navigate('Login');
  }
  


}



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
              onChangeText={(description) => this.setState({description})}/>
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
              onChangeText={(passwordConfirm) => this.setState({passwordConfirm})}/>
        </View >
       
        <Text style={{color:"black", textAlign:"center", margin:20}}>Agrega identificador personal (Cédula de mayor, licencia de conducción, etc)</Text>
        <TouchableOpacity style={[styles.buttonContainer, styles.signupButton, {marginTop:20}]} onPress={() => this._pickImage()}>
          <Text style={styles.signUpText}>Seleccionar imagen</Text>
        </TouchableOpacity>

        <Image
          style={{ width: 300,
            height: 200,}}
          source={{uri: this.state.image}}
        />

        <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom:20, marginTop:20}}>


            <Text >  <Checkbox value={this.state.isChecked} onValueChange={this.handleChange} />  He leido y acepto los <Text style={{color:"blue"}} onPress={()=> this.props.navigation.navigate("TermsAndConditions")}>términos y condiciones</Text> </Text>

          </View>

        

        <TouchableOpacity style={[styles.buttonContainer, styles.signupButton]} onPress={() => this.registerFunction()}>
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
