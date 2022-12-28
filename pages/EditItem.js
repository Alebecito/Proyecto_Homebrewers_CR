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

import Checkbox from "expo-checkbox";
import { Picker } from "@react-native-picker/picker";
export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false,
      fullName: "",
      email: "",
      password: "",
      data: [],
    };
  }

  parseDate = (date) => {
    const d = new Date(date);
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  async componentDidMount() {
    this.setState({ data: this.props.route.params.data });
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
              placeholder="Nombre del Producto"
              defaultValue={this.state.data.titulo}
              underlineColorAndroid="transparent"
              onChangeText={(fullName) => this.setState({ fullName })}
            />
          </View>
          <Text style={{ color: "black", textAlign: "center", margin: 20 }}>
            Cantidad
          </Text>
          <View style={[styles.inputContainer]}>
            <Picker
              selectedValue={`${this.state.data.cantidad}`}
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
              selectedValue={"20"}
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
          <TouchableOpacity
            style={[styles.buttonContainer, styles.signupButton]}
            onPress={() => {}}
          >
            <Text style={styles.signUpText}>Seleccionar Fecha</Text>
          </TouchableOpacity>
          <Text style={{ color: "black", textAlign: "center", margin: 20 }}>
            {this.parseDate(this.state.data.fechaCaducidad)}
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
              defaultValue={this.state.data.cuerpo}
              underlineColorAndroid="transparent"
              onChangeText={(email) => this.setState({ email })}
            />
          </View>

          <Text style={{ color: "black", textAlign: "center", margin: 20 }}>
            Imagen del producto
          </Text>
          <TouchableOpacity
            style={[
              styles.buttonContainer,
              styles.signupButton,
              { marginTop: 20 },
            ]}
            onPress={() => {}}
          >
            <Text style={styles.signUpText}>Seleccionar imagen</Text>
          </TouchableOpacity>

          <Image
            style={{
              width: 250,
              height: 250,
            }}
            source={{
              uri: `${this.state.data.fotoProducto}`,
            }}
          />

          <TouchableOpacity
            style={[
              styles.buttonContainer,
              styles.signupButton,
              { marginTop: 20 },
            ]}
            onPress={() => this.props.navigation.navigate("HomePage")}
          >
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

    borderBottomColor: "#454545",
    flex: 1,
  },
  inputsBox: {
    height: 200,
    width: 250,

    borderBottomColor: "#454545",
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
