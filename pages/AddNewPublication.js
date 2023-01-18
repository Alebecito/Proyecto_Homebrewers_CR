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
  Alert, ScrollView, AsyncStorage,LogBox
} from 'react-native';

import Checkbox from 'expo-checkbox';
import { Picker } from '@react-native-picker/picker';
import moment from "moment";
const _today = moment().format("YYYY-MM-DD");

export default class SignUp extends Component {
  initialState = {
    [_today]: { disabled: true },
  };

  constructor(props) {
    super(props);
    this.state = {
      UsuarioLogeado: "",
      elementoSeleccionado: "No seleccionado",
      isChecked: false,
      fullName: '',
      email: '',
      password: '',
      productoActual: [],
      productos: [],
      productoGUID: '',
      cantidad:'',
      precio:''

    }
  }


  parseDate = (date) => {
    const d = new Date(date);
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };



  getUserProducts = async () => {
    await fetch(
      `https://homebrewersapis.onrender.com/producto/getAllProductsFromUser/${this.state.UsuarioLogeado}`
    )
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ productos: responseJson });
        if(responseJson.length > 0){
          this.setState({ productoGUID: responseJson[0].productoGUID });
        }

      })
      .catch((error) => {
        console.error(error);
      });
  };


  loadId = async () => {
    try {
      const id = await AsyncStorage.getItem("UsuarioLogeado");
      this.setState({ UsuarioLogeado: id });
    } catch (error) {
      console.log(error);
    }
  };

  getSpecificProduct = async () => {
    await fetch(
      `https://homebrewersapis.onrender.com/producto/getSpecificProduct/${this.state.productoGUID}`
    )
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ productoActual: responseJson[0] , cantidad: responseJson[0].cantidad.toString()});
        
      })
      .catch((error) => {
        console.error(error);
      });
  };


  popularInformacionProducto = async (value) => {
    
    await this.setState({ productoGUID: value });  
    await this.getSpecificProduct();
  }






 async componentDidMount() {
  await this.loadId();
  await this.getUserProducts();
  await this.getSpecificProduct();

  if(this.state.productos.length === 0){
    Alert.alert("Error", "No tienes productos para publicar");
    this.props.navigation.navigate("HomePage");

  }
  


  
  }

  crearPublicacion = async () => {
    await Alert.alert(
      "Agregar Publicación",
      "¿Estas seguro que deseas agregar esta publicación?\n\nLas Publicaciones no se pueden editar, además de que pierdes el item del inventario",
      [
        {
          text: "Cancelar",
          onPress: () => {},
          style: "cancel"
        },
        { text: "Aceptar", onPress: async () => {

          if(this.state.precio === ''){
            Alert.alert("Error", "Debe ingresar un precio");
            return;
          }else if(isNaN(this.state.precio)){
            Alert.alert("Error", "El precio debe ser un número");
            return;
          }
          else if(parseInt(this.state.precio)<500){
            Alert.alert("Error", "El precio mínimo son 500 CRC");
            return;
          }
      
          else{
      
            let data = new FormData();
            data.append("productoGUID", this.state.productoActual.productoGUID);
            data.append("titulo", this.state.productoActual.titulo);
            data.append("cuerpo", this.state.productoActual.cuerpo);
            data.append("precio", this.state.precio);
            data.append("fecha", moment(this.state.productoActual.fechaCaducidad).format("YYYY-MM-DD"));
            data.append("usuarioGUID", this.state.UsuarioLogeado);
            data.append("foto", this.state.productoActual.fotoProducto);
            await fetch("https://homebrewersapis.onrender.com/publicacionesnoticias/AddPublication", {method: "POST",body: data});
            Alert.alert("Transacción Exitosa", "¡La publicación se ha creado exitosamente!\n\nPuedes revisar la publicación en tu perfil");
            
            
            
            this.props.navigation.navigate("HomePage");
          }

        }
       }
      ]
    );
   
    
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
          <Text style={{ color: "black", textAlign: "center", margin: 20 }}>Precio de la publicación </Text>
          <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/male-user/ultraviolet/50/3498db' }} />

            <TextInput style={styles.inputs}
              placeholder="Precio de la publicación (CRC)"

              underlineColorAndroid='transparent'
              onChangeText={(precio) => this.setState({ precio })} />
          </View>
          <Text style={{ color: "black", textAlign: "center", margin: 20 }}>Producto</Text>



          <View style={[styles.inputContainer]}>

            <Picker
              selectedValue={this.state.productoGUID}
              style={{ height: 50, width: 250, justifyContent: 'center', alignItems: 'center', }}
              onValueChange={(value) =>
                this.popularInformacionProducto(value)
              }
            >
              {this.state.productos.map((producto) => (
                <Picker.Item
                  label={producto.titulo}
                  value={producto.productoGUID}
                />
              ))}
            </Picker>
          </View>
          <Text style={{ color: "black", textAlign: "center", margin: 20, fontSize: 20 }}>Información del Producto</Text>
          <Text style={{ color: "black", textAlign: "center", margin: 20 }}>Nombre del Producto</Text>
          <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/male-user/ultraviolet/50/3498db' }} />

            <TextInput style={styles.inputs} editable={false}
              placeholder="Nombre del Producto"
              defaultValue={this.state.productoActual.titulo}
              underlineColorAndroid='transparent'
              onChangeText={(fullName) => this.setState({ fullName })} />
          </View>
          <Text style={{ color: "black", textAlign: "center", margin: 20 }}>Cantidad restante en tu inventario</Text>
          <View style={[styles.inputContainer]}>

            <Picker enabled={false}
              selectedValue={this.state.cantidad}
              style={{ height: 50, width: 250, justifyContent: 'center', alignItems: 'center', }}

            >
              {myloop}
            </Picker>
          </View>
        
          <Text style={{ color: "black", textAlign: "center", margin: 20 }}>Fecha de Caducidad</Text>

          <Text style={{ color: "black", textAlign: "center", margin: 20 }}>{this.parseDate(this.state.productoActual.fechaCaducidad)}</Text>

          <Text style={{ color: "black", textAlign: "center", margin: 20 }}>Descripción del Producto</Text>
          <View style={styles.inputContainerBox}>
            <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/message/ultraviolet/50/3498db' }} />
            <TextInput UselessTextInput
              multiline
              numberOfLines={4} style={styles.inputsBox}
              placeholder="Descripción del Producto"
              editable={false}
              defaultValue={this.state.productoActual.cuerpo}
              underlineColorAndroid='transparent'
              onChangeText={(email) => this.setState({ email })} />
          </View>
          <Text style={{ color: "black", textAlign: "center", margin: 20 }}>Imagen del producto</Text>


          <Image
            style={{
              width: 250,
              height: 250,
            }}
            source={{ uri: this.state.productoActual.fotoProducto }}
          />


          <TouchableOpacity style={[styles.buttonContainer, styles.signupButton, { marginTop: 20 }]} onPress={() => this.crearPublicacion()}>
            <Text style={styles.signUpText}>Agregar</Text>
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
    backgroundColor: '#f0f2f5',
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
    backgroundColor: "#454545",
  },
  signUpText: {
    color: 'white',
  }
});
