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
    await this.setStateAsync({ productoGUID: value });
    await this.getSpecificProduct();
  };

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
              defaultValue={this.state.post.precioExpuesto}
              underlineColorAndroid="transparent"
              onChangeText={(fullName) => this.setState({ fullName })}
            />
          </View>
          <Text style={{ color: "black", textAlign: "center", margin: 20 }}>
            Producto
          </Text>

          <View style={[styles.inputContainer]}>
            <Picker
              selectedValue={this.state.productoGUID}
              style={{
                height: 50,
                width: 250,
                justifyContent: "center",
                alignItems: "center",
              }}
              onValueChange={(value) => this.popularInformacionProducto(value)}
            >
              {this.state.productos.map((producto) => (
                <Picker.Item
                  label={producto.titulo}
                  value={producto.productoGUID}
                />
              ))}
            </Picker>
          </View>
          <Text
            style={{
              color: "black",
              textAlign: "center",
              margin: 20,
              fontSize: 20,
            }}
          >
            Información del Producto
          </Text>
          <Text style={{ color: "black", textAlign: "center", margin: 20 }}>
            Nombre del Producto
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
              editable={false}
              placeholder="Nombre del Producto"
              defaultValue={this.state.productoActual.titulo}
              underlineColorAndroid="transparent"
              onChangeText={(fullName) => this.setState({ fullName })}
            />
          </View>
          <Text style={{ color: "black", textAlign: "center", margin: 20 }}>
            Cantidad
          </Text>
          <View style={[styles.inputContainer]}>
            <Picker
              enabled={false}
              selectedValue={`${this.state.productoActual.cantidad}`}
              style={{
                height: 50,
                width: 250,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {myloop}
            </Picker>
          </View>
          <Text style={{ color: "black", textAlign: "center", margin: 20 }}>
            Días antes de la caducidad para enviar recordatorio
          </Text>
          <View style={[styles.inputContainer]}>
            <Picker
              enabled={false}
              selectedValue="10"
              style={{
                height: 50,
                width: 250,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {myloop}
            </Picker>
          </View>
          <Text style={{ color: "black", textAlign: "center", margin: 20 }}>
            Fecha de Caducidad
          </Text>

          <Text style={{ color: "black", textAlign: "center", margin: 20 }}>
            {this.parseDate(this.state.productoActual.fechaCaducidad)}
          </Text>

          <Text style={{ color: "black", textAlign: "center", margin: 20 }}>
            Descripción del Producto
          </Text>
          <View style={styles.inputContainerBox}>
            <Image
              style={styles.inputIcon}
              source={{
                uri: "https://png.icons8.com/message/ultraviolet/50/3498db",
              }}
            />
            <TextInput
              UselessTextInput
              multiline
              numberOfLines={4}
              style={styles.inputsBox}
              placeholder="Descripción del Producto"
              editable={false}
              defaultValue={this.state.productoActual.cuerpo}
              underlineColorAndroid="transparent"
              onChangeText={(email) => this.setState({ email })}
            />
          </View>
          <Text style={{ color: "black", textAlign: "center", margin: 20 }}>
            Imagen del producto
          </Text>

          <Image
            style={{
              width: 250,
              height: 250,
            }}
            source={{ uri: this.state.productoActual.fotoProducto }}
          />

          <TouchableOpacity
            style={[
              styles.buttonContainer,
              styles.signupButton,
              { marginTop: 20 },
            ]}
            onPress={() => this.props.navigation.navigate("HomePage")}
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
