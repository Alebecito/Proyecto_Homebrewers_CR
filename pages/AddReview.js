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
  AsyncStorage,
} from "react-native";

import moment from "moment";

import { Picker } from "@react-native-picker/picker";
export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      rating: 0,
      idOtroUsuario: "",
      UsuarioLogeado: "",
    };
  }

  onClickListener = (viewId) => {
    Alert.alert("Alert", "Button pressed " + viewId);
  };

  loadId = async () => {
    try {
      const id = await AsyncStorage.getItem("UsuarioLogeado");
      this.setState({ UsuarioLogeado: id });
    } catch (error) {
      console.log(error);
    }
  };

  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve);
    });
  }

  addReview = async () => {
    const formData = new FormData();
    const currentDate = new Date();
    formData.append("titulo", this.state.title);
    formData.append("cuerpo", this.state.description);
    formData.append("calificacion", this.state.rating);
    formData.append("haciaUsuarioGUID", this.state.idOtroUsuario);
    formData.append("deUsuarioGUID", this.state.UsuarioLogeado);
    formData.append("fecha", moment(currentDate).format("YYYY-MM-DD"));

    await fetch(
      `https://homebrewersapis.onrender.com/resena/addReview`,
      {
        method: "POST",
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
    Alert.alert("Reseña agregada exitosamente");
    this.props.navigation.navigate("HomePage");
  };

  async componentDidMount() {
    await this.loadId();
    await this.setStateAsync({ idOtroUsuario: this.props.route.params.idOtroUsuario });
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={{ color: "black", textAlign: "center", margin: 20 }}>
            Título de la reseña
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
              placeholder="Descripción Corta de la reseña"
              underlineColorAndroid="transparent"
              onChangeText={(title) => this.setState({ title })}
            />
          </View>

          <Text style={{ color: "black", textAlign: "center", margin: 20 }}>
            Descripción amplia de la reseña
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
              placeholder="Explica a detalle tu experiencia con el usuario"
              underlineColorAndroid="transparent"
              onChangeText={(description) => this.setState({ description })}
            />
          </View>

          <Text style={{ color: "black", textAlign: "center", margin: 20 }}>
            Nota que le das al usuario
          </Text>
          <View style={[styles.inputContainer]}>
            <Picker
              selectedValue={this.state.rating}
              style={{
                height: 50,
                width: 250,
                justifyContent: "center",
                alignItems: "center",
              }}
              onValueChange={(value) => this.setState({ rating: value })}
            >
              <Picker.Item label={"No seleccionado"} value={0} />
              <Picker.Item label={"1/5"} value={1} />
              <Picker.Item label={"2/5"} value={2} />
              <Picker.Item label={"3/5"} value={3} />
              <Picker.Item label={"4/5"} value={4} />
              <Picker.Item label={"5/5"} value={5} />
            </Picker>
          </View>
          <TouchableOpacity
            style={[styles.buttonContainer, styles.signupButton]}
            onPress={() => this.addReview()}
          >
            <Text style={styles.signUpText}>Añadir Reseña</Text>
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
