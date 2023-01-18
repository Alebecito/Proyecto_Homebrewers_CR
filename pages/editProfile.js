import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
// import moment from "moment";
import {auth} from '../firebase';
import {createUserWithEmailAndPassword,updateProfile  } from "firebase/auth";


export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      email: "",
      password: "",
      description: "",
      passwordConfirm: "",
      data: [],
      profileImage: "",
      coverImage: "",
      image: null,
      imgSources: ["", ""],
      resultURLS: ["", ""],
      coverEdited: false,
      profileEdited: false,
    };
  }

  validateEmail = (email) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  get_url_extension(url) {
    return url.split(/[#?]/)[0].split(".").pop().trim();
  }

  _pickImage = async (imgType) => {
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

    let imgSources = this.state.imgSources;

    if (imgType === "cover") {
      this.setState({ coverImage: pickerResult.uri });
      imgSources[0] = source;
      this.setState({ imgSources });
      this.setState({ coverEdited: true });
    } else {
      imgSources[1] = source;
      this.setState({ imgSources });
      this.setState({ profileImage: pickerResult.uri });
      this.setState({ profileEdited: true });
    }
  };

  uploadImage = async (file, type) => {
    const data = new FormData();
    data.append("file", file);
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
        let resultURLS = this.state.resultURLS;
        if (type === "cover") {
          resultURLS[0] = data.url;
          this.setState({ resultURLS });
        } else {
          resultURLS[1] = data.url;
          this.setState({ resultURLS });
        }
      })
      .catch((err) => {
        Alert.alert("Error While Uploading");
      });
  };

  editInFirebase = (entrada) => {
            const user = auth.currentUser;
            updateProfile(user, {
                displayName: this.state.fullName, 
                photoURL: entrada
              }).then(() => {
                Alert.alert("Perfil editado exitosamente");
                this.props.navigation.navigate("HomePage");
                // ...
              }).catch((error) => {
                // An error occurred
                alert(error);
              });
}

  editFunction = async () => {
    let imagenAEditar="";
    if (
      this.state.description === "" ||
      this.state.fullName === "" ||
      this.state.email === "" ||
      this.state.password === "" ||
      this.state.passwordConfirm === ""
    ) {
      Alert.alert("Error", "Por favor, llena todos los campos");
    } else if (this.validateEmail(this.state.email) === false) {
      Alert.alert("Error", "Por favor, introduce un correo electrónico válido");
    } else if (this.state.password !== this.state.passwordConfirm) {
      Alert.alert("Error", "Las contraseñas no coinciden");
    } else {
      let formData = new FormData();
      formData.append("nombre", this.state.fullName);
      formData.append("correoElectronico", this.state.email);
      formData.append("descripcionPerfil", this.state.description);
      formData.append("password", this.state.data.password);

      if (this.state.coverEdited === true) {
        await this.uploadImage(this.state.imgSources[0], "cover");
        formData.append("imagenPortada", this.state.resultURLS[0]);
      } else {
        formData.append("imagenPortada", this.state.data.fotoPortada);
      }

      if (this.state.profileEdited === true) {
        await this.uploadImage(this.state.imgSources[1], "profile");
        formData.append("imagenPerfil", this.state.resultURLS[1]);
        imagenAEditar= this.state.resultURLS[1];
      } else {
        formData.append("imagenPerfil", this.state.data.fotoDePerfil);
        imagenAEditar = this.state.data.fotoDePerfil;
      }

      await fetch(
        `https://homebrewersapis.onrender.com/usuario/editUser/${this.state.data.usuarioGUID}`,
        {
          method: "PUT",
          body: formData,
        }
      );
      this.editInFirebase(imagenAEditar);
     
    }
  };

 

  onClickListener = (viewId) => {
    Alert.alert("Alert", "Button pressed " + viewId);
  };

  handleChange = (e) => this.setState({ isChecked: e });

  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve);
    });
  }

  async componentDidMount() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }
    await this.setStateAsync({ data: this.props.route.params.data });
    await this.setStateAsync({ profileImage: this.state.data.fotoDePerfil });
    await this.setStateAsync({ coverImage: this.state.data.fotoPortada });
    await this.setStateAsync({ fullName: this.state.data.nombre });
    await this.setStateAsync({ email: this.state.data.correo });
    await this.setStateAsync({ description: this.state.data.descripcion });
    await this.setStateAsync({ password: this.state.data.password });
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
              uri: `${this.state.profileImage}`,
            }}
          />
          <TouchableOpacity
            style={[
              styles.buttonContainer,
              styles.signupButton,
              { marginTop: 20 },
            ]}
            onPress={() => this._pickImage("profile")}
          >
            <Text style={styles.signUpText}>Seleccionar imagen</Text>
          </TouchableOpacity>
          <Text style={{ color: "black", textAlign: "center", margin: 20 }}>
            Imagen de Portada
          </Text>

          <Image
            style={{ width: 350, height: 200 }}
            source={{
              uri: `${this.state.coverImage}`,
            }}
          />
          <TouchableOpacity
            style={[
              styles.buttonContainer,
              styles.signupButton,
              { marginTop: 20 },
            ]}
            onPress={() => this._pickImage("cover")}
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
              defaultValue={this.state.fullName}
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
              defaultValue={this.state.email}
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
              defaultValue={this.state.description}
              underlineColorAndroid="transparent"
              onChangeText={(description) => this.setState({ description })}
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
              defaultValue={this.state.passwordConfirm}
              secureTextEntry={true}
              underlineColorAndroid="transparent"
              onChangeText={(passwordConfirm) =>
                this.setState({ passwordConfirm })
              }
            />
          </View>

          <TouchableOpacity
            style={[styles.buttonContainer, styles.signupButton]}
            onPress={() => this.editFunction()}
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
