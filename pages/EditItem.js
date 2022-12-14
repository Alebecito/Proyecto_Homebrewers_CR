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
import { Picker } from '@react-native-picker/picker';
export default class SignUp extends Component {

  constructor(props) {
    super(props);
    this.state = {

      isChecked: false,
      fullName: '',
      email: '',
      password: '',
    }
  }







  onClickListener = (viewId) => {
    Alert.alert("Alert", "Button pressed " + viewId);
  }

  handleChange = e => this.setState({ isChecked: e });


  render() {
    var myloop = [];
    for (let i = 0; i < 100; i++) {
      myloop.push(
        <Picker.Item label={i.toString()} value={i.toString()} key={i} />


      );
    }
    return (
      <ScrollView>

        <View style={styles.container}>
          <Text style={{ color: "black", textAlign: "center", margin: 20 }}>Nombre del Producto</Text>
          <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/male-user/ultraviolet/50/3498db' }} />

            <TextInput style={styles.inputs}
              placeholder="Nombre del Producto"
              defaultValue='Sandia Gris'
              underlineColorAndroid='transparent'
              onChangeText={(fullName) => this.setState({ fullName })} />
          </View>
          <Text style={{ color: "black", textAlign: "center", margin: 20 }}>Cantidad</Text>
          <View style={[styles.inputContainer]}>

            <Picker
              selectedValue={"4"}
              style={{ height: 50, width: 250, justifyContent: 'center', alignItems: 'center', }}

            >
              {myloop}
            </Picker>


          </View>
          <Text style={{ color: "black", textAlign: "center", margin: 20 }}>Días antes de la caducidad para enviar recordatorio</Text>
          <View style={[styles.inputContainer]}>

            <Picker
              selectedValue={"20"}
              style={{ height: 50, width: 250, justifyContent: 'center', alignItems: 'center', }}

            >
              {myloop}
            </Picker>
          </View>
          <Text style={{ color: "black", textAlign: "center", margin: 20 }}>Fecha de Caducidad</Text>
          <TouchableOpacity style={[styles.buttonContainer, styles.signupButton,]} onPress={() => { }}>
            <Text style={styles.signUpText}>Seleccionar Fecha</Text>
          </TouchableOpacity>
          <Text style={{ color: "black", textAlign: "center", margin: 20 }}>12/07/2022</Text>

          <Text style={{ color: "black", textAlign: "center", margin: 20 }}>Descripción del Producto</Text>
          <View style={styles.inputContainerBox}>
            <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/message/ultraviolet/50/3498db' }} />
            <TextInput UselessTextInput
              multiline
              numberOfLines={4} style={styles.inputsBox}
              placeholder="Descripción del Producto"
              defaultValue='Sandias muy ricas'
              underlineColorAndroid='transparent'
              onChangeText={(email) => this.setState({ email })} />
          </View>



          <Text style={{ color: "black", textAlign: "center", margin: 20 }}>Imagen del producto</Text>
          <TouchableOpacity style={[styles.buttonContainer, styles.signupButton, { marginTop: 20 }]} onPress={() => { }}>
            <Text style={styles.signUpText}>Seleccionar imagen</Text>
          </TouchableOpacity>

          <Image
            style={{
              width: 250,
              height: 250,
            }}
            source={{ uri: 'https://pixabay.com/get/g905baba9b9b76350266df398110b6e23a5f5b83291495b169f6ef1bfe1d4a8e86f90c265d334d253b542411276cd208b_1280.jpg' }}
          />





          <TouchableOpacity style={[styles.buttonContainer, styles.signupButton, { marginTop: 20 }]} onPress={() => this.props.navigation.navigate('HomePage')}>
            <Text style={styles.signUpText}>Editar Producto</Text>
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
    marginTop: 30
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
  inputContainerBox: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 200,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputs: {
    height: 45,

    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputsBox: {
    height: 200,
    width: 250,

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
  signupButton: {
    backgroundColor: "#FF4DFF",
  },
  signUpText: {
    color: 'white',
  }
});
