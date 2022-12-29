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

  onClickListener = (viewId) => {
    Alert.alert("Alert", "Button pressed " + viewId);
  };

  handleChange = (e) => this.setState({ isChecked: e });

  async componentDidMount() {
    this.setState({ data: this.props.route.params.data });
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={{ color: "black", textAlign: "center", margin: 20 }}>
            Imagen de Perfil
          </Text>

          <Image
            style={{ width: 200, height: 200 }}
            source={{
              uri: `${this.state.data.fotoDePerfil}`,
            }}
          />
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
          <Text style={{ color: "black", textAlign: "center", margin: 20 }}>
            Imagen de Portada
          </Text>

          <Image
            style={{ width: 350, height: 200 }}
            source={{
              uri: `${this.state.data.fotoPortada}`,
            }}
          />
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
          <Text style={{ color: "black", textAlign: "center", margin: 20 }}>
            Nombre Completo
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
              placeholder="Nombre Completo"
              defaultValue={this.state.data.nombre}
              underlineColorAndroid="transparent"
              onChangeText={(fullName) => this.setState({ fullName })}
            />
          </View>
          <Text style={{ color: "black", textAlign: "center", margin: 20 }}>
            Correo Electrónico
          </Text>
          <View style={styles.inputContainer}>
            <Image
              style={styles.inputIcon}
              source={{
                uri: "https://png.icons8.com/message/ultraviolet/50/3498db",
              }}
            />
            <TextInput
              style={styles.inputs}
              placeholder="Correo Electrónico"
              defaultValue={this.state.data.correo}
              underlineColorAndroid="transparent"
              onChangeText={(email) => this.setState({ email })}
            />
          </View>
          <Text style={{ color: "black", textAlign: "center", margin: 20 }}>
            Descripción de Perfil
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
              placeholder="¿Cómo describes tu perfil? (Eg: Cervecero Artesanal)"
              defaultValue={this.state.data.descripcion}
              underlineColorAndroid="transparent"
              onChangeText={(email) => this.setState({ email })}
            />
          </View>
          <Text style={{ color: "black", textAlign: "center", margin: 20 }}>
            Contraseña
          </Text>
          <View style={styles.inputContainer}>
            <Image
              style={styles.inputIcon}
              source={{
                uri: "https://png.icons8.com/key-2/ultraviolet/50/3498db",
              }}
            />
            <TextInput
              style={styles.inputs}
              placeholder="Contraseña"
              defaultValue={this.state.data.password}
              secureTextEntry={true}
              underlineColorAndroid="transparent"
              onChangeText={(password) => this.setState({ password })}
            />
          </View>
          <Text style={{ color: "black", textAlign: "center", margin: 20 }}>
            Confirmar contraseña
          </Text>
          <View style={styles.inputContainer}>
            <Image
              style={styles.inputIcon}
              source={{
                uri: "https://png.icons8.com/key-2/ultraviolet/50/3498db",
              }}
            />
            <TextInput
              style={styles.inputs}
              placeholder="Confirmar contraseña"
              defaultValue={""}
              secureTextEntry={true}
              underlineColorAndroid="transparent"
              onChangeText={(password) => this.setState({ password })}
            />
          </View>

          <TouchableOpacity
            style={[styles.buttonContainer, styles.signupButton]}
            onPress={() => this.props.navigation.navigate("Login")}
          >
            <Text style={styles.signUpText}>Actualizar Perfil</Text>
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
    backgroundColor: "#f7f6f2",
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
