import React, { Component } from "react";
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
  ScrollView,
} from "react-native";

import { Picker } from "@react-native-picker/picker";
export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false,
      fullName: "",
      email: "",
      password: "",
      productoActual: [],
      productos: [],
      post: [],
      productoGUID: this.props.route.params.post.productoGUID,
      precio: this.props.route.params.post.precioExpuesto,
    };
  }

  parseDate = (date) => {
    const d = new Date(date);
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve);
    });
  }

  popularInformacionProducto = async (value) => {
    await this.setState({ productoGUID: value });
    await this.getSpecificProduct();
  };


  editarPrecio = async () => {

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
    }else{
      await fetch(`http://10.0.2.2:5000/publicacionesnoticias/updatePricePublication/${this.state.post.publicacionNoticiaGUID}`, {method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({precio: this.state.precio})});
      Alert.alert("Éxito", "Precio editado con éxito");
      this.props.navigation.navigate("HomePage");
    }

    
  }

  getUserProducts = async () => {
    await fetch(
      `http://10.0.2.2:5000/producto/getAllProductsFromUser/${this.state.post.usuarioGUID}`
    )
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ productos: responseJson });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  getSpecificProduct = async () => {
    await fetch(
      `http://10.0.2.2:5000/producto/getSpecificProduct/${this.state.productoGUID}`
    )
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ productoActual: responseJson[0] });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  async componentDidMount() {
    await this.setStateAsync({ post: this.props.route.params.post });
    await this.getSpecificProduct();
    await this.getUserProducts();
  }

  onClickListener = (viewId) => {
    Alert.alert("Alert", "Button pressed " + viewId);
  };

  handleChange = (e) => this.setState({ isChecked: e });

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
          <Text style={{ color: "black", textAlign: "center", margin: 20 }}>
            Precio de la publicación{" "}
          </Text>
          <View style={styles.inputContainer}>
            <Image
              style={styles.inputIcon}
              source={{
                uri: "https://png.icons8.com/male-user/ultraviolet/50/3498db",
              }}
            />

            <TextInput
              style={styles.inputs}
              placeholder="Precio de la publicación (CRC)"
              defaultValue={this.state.precio}
              underlineColorAndroid="transparent"
              onChangeText={(precio) => this.setState({ precio })}
            />
          </View>
          

          <TouchableOpacity
            style={[
              styles.buttonContainer,
              styles.signupButton,
              { marginTop: 20 },
            ]}
            onPress={() => this.editarPrecio()}
          >
            <Text style={styles.signUpText}>Editar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f2f5",
    marginTop: 30,
  },
  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  inputContainerBox: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 200,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  inputs: {
    height: 45,

    borderBottomColor: "#FFFFFF",
    flex: 1,
  },
  inputsBox: {
    height: 200,
    width: 250,

    borderBottomColor: "#FFFFFF",
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: "center",
  },
  buttonContainer: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
  },
  signupButton: {
    backgroundColor: "#454545",
  },
  signUpText: {
    color: "white",
  },
});
