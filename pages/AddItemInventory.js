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

import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import moment from "moment";
import { Calendar } from "react-native-calendars";

const _today = moment().format("YYYY-MM-DD");

export default class SignUp extends Component {
  initialState = {
    [_today]: { disabled: true },
  };

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      quantity: "0",
      expirationDate: _today,
      description: "",
      image:
        "https://thumbs.dreamstime.com/b/el-logotipo-linear-negro-de-la-c%C3%A1mara-foto-no-le-gusta-ninguna-imagen-disponible-106031126.jpg",
      sourceImage: "",
      resultURL: "",
      _markedDates: this.initialState,
      usuarioLogeado: "",
      inventoryId: "",
    };
  }

  loadId = async () => {
    try {
      const id = await AsyncStorage.getItem("UsuarioLogeado");
      this.setState({ usuarioLogeado: id });
    } catch (error) {
      console.log(error);
    }
  };

  getUserInventory = async () => {
    await fetch(
      `http://10.0.2.2:5000/inventario/getUserInventory/${this.state.usuarioLogeado}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ inventoryId: responseJson[0][0].inventarioGUID });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  get_url_extension(url) {
    return url.split(/[#?]/)[0].split(".").pop().trim();
  }

  _pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      aspect: [4, 3],
    });

    if (pickerResult.cancelled === true) {
      return;
    }

    const uri = pickerResult.uri;
    const type = "image/" + this.get_url_extension(uri);
    const name = pickerResult.assetId;
    const source = { uri, type, name };

    this.setState({ image: pickerResult.uri });
    this.setState({ sourceImage: source });
  };

  uploadImage = async () => {
    const data = new FormData();
    data.append("file", this.state.sourceImage);
    data.append("upload_preset", "UserUploadImages");
    data.append("cloud_name", "dlzxkdsau");
    await fetch("https://api.cloudinary.com/v1_1/dlzxkdsau/image/upload", {
      method: "POST",
      body: data,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ resultURL: data.url });
      })
      .catch((err) => {
        Alert.alert("Error While Uploading");
      });
  };

  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve);
    });
  }

  async componentDidMount() {
    await this.loadId();
    await this.getUserInventory();
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }
  }

  onDaySelect = async (day) => {
    const _selectedDay = moment(day.dateString).format("YYYY-MM-DD");

    let selected = true;
    if (this.state._markedDates[_selectedDay]) {
      selected = !this.state._markedDates[_selectedDay].selected;
    }

    const updatedMarkedDates = {
      ...{ [_selectedDay]: { selected } },
    };

    await this.setStateAsync({ expirationDate: _selectedDay });
    await this.setStateAsync({ _markedDates: updatedMarkedDates });
  };

  createProduct = async () => {
    if (
      this.state.name == "" ||
      this.state.quantity == "" ||
      this.state.expirationDate == "" ||
      this.state.description == "" ||
      this.state.image == ""
    ) {
      Alert.alert("Por favor, llene todos los campos");
    } else {
      let formData = new FormData();

      await this.uploadImage();
      formData.append("titulo", this.state.name);
      formData.append("cantidad", this.state.quantity);
      formData.append("fechaCaducidad", this.state.expirationDate);
      formData.append("cuerpo", this.state.description);
      formData.append("fotoProducto", this.state.resultURL);

      await fetch(
        `http://10.0.2.2:5000/producto/addProduct/${this.state.inventoryId}`,
        {
          method: "POST",
          body: formData,
        }
      );
      Alert.alert("Producto creado exitosamente");
      this.props.navigation.navigate("HomePage");
    }
  };

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
              underlineColorAndroid="transparent"
              onChangeText={(name) => this.setState({ name })}
            />
          </View>
          <Text style={{ color: "black", textAlign: "center", margin: 20 }}>
            Cantidad
          </Text>
          <View style={[styles.inputContainer]}>
            <Picker
              selectedValue={`${this.state.quantity}`}
              style={{
                height: 50,
                width: 250,
                justifyContent: "center",
                alignItems: "center",
              }}
              onValueChange={(itemValue) =>
                this.setState({ quantity: itemValue })
              }
            >
              {myloop}
            </Picker>
          </View>
        
         
          <Text style={{ color: "black", textAlign: "center", margin: 20 }}>
            Fecha de Caducidad
          </Text>
          <Calendar
            minDate={_today}
            onDayPress={this.onDaySelect}
            markedDates={this.state._markedDates}
          />
          <Text style={{ color: "black", textAlign: "center", margin: 20 }}>
            {moment(this.state.expirationDate).format("YYYY-MM-DD")}
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
              underlineColorAndroid="transparent"
              onChangeText={(description) => this.setState({ description })}
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
            onPress={() => this._pickImage()}
          >
            <Text style={styles.signUpText}>Seleccionar imagen</Text>
          </TouchableOpacity>

          <Image
            style={{
              width: 250,
              height: 250,
            }}
            source={{
              uri: `${this.state.image}`,
            }}
          />

          <TouchableOpacity
            style={[
              styles.buttonContainer,
              styles.signupButton,
              { marginTop: 20 },
            ]}
            onPress={() => this.createProduct()}
          >
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
