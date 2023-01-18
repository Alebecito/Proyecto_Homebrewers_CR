import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  Dimensions,
  Alert,
} from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import moment from "moment";

export default class PostView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: [],
      usuarioLogueado: "",
      ownReview: false,
      modalVisible: false,
      reporte: "",
    };
  }

  clickEventListener = () => {
    this.setModalVisible(true);
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  parseDate = (date) => {
    const d = new Date(date);
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  checkIfOwnReview = async (item) => {
    if (this.state.usuarioLogueado === item.deGUID) {
      this.setState({ ownReview: true });
    } else {
      this.setState({ ownReview: false });
    }
  };

  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve);
    });
  }

  async componentDidMount() {
    await this.setStateAsync({ item: this.props.route.params.item });
    await this.setStateAsync({
      usuarioLogueado: this.props.route.params.usuarioLogueado,
    });
    await this.checkIfOwnReview(this.state.item);
  }

  deleteReview = async () => {
    await fetch(
      `https://homebrewersapis.onrender.com/resena/deleteReview/${this.state.item.reseñaGUID}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
    Alert.alert("Reseña eliminada exitosamente");
    this.props.navigation.navigate("HomePage");
  };

  handleReport = async () => {
    const currentDate = new Date();
    var formData = new FormData();
    formData.append("deGUID", this.state.usuarioLogueado);
    formData.append("haciaGUID", this.state.item.reseñaGUID);
    formData.append("tipoReporte", "Reseña");
    formData.append("fecha", moment(currentDate).format("YYYY-MM-DD"));
    formData.append("descripcion", this.state.reporte);
    formData.append("estado", "abierto");
    formData.append("realizadoPor", this.state.item.deGUID);

    await fetch("https://homebrewersapis.onrender.com/reportes/createReport", {
      method: "POST",
      body: formData,
    });
    Alert.alert("Sistema", "Reporte Enviado");
    this.setModalVisible(false);
  };

  render() {
    return (
      <>
        {this.state.ownReview ? (
          <ScrollView>
            <View style={styles.container}>
              <View style={styles.postContent}>
                <Text style={styles.postTitle}>{this.state.item.titulo}</Text>

                <Text style={styles.postDescription}>
                  {this.state.item.cuerpo}
                </Text>

                <View style={styles.starContainer}>
                  {[...new Array(5)].map((_, i) => {
                    return i < this.state.item.puntuacion ? (
                      <Icon
                        name={"star"}
                        size={30}
                        style={[styles.myStarStyle]}
                      />
                    ) : (
                      <Icon
                        name={"star-outline"}
                        size={30}
                        style={[styles.myStarStyle, styles.myEmptyStarStyle]}
                      />
                    );
                  })}
                </View>
                <Text style={styles.date}>
                  Fecha: {this.parseDate(this.state.item.fecha)}
                </Text>

                <TouchableOpacity
                  style={styles.profile}
                  onPress={() => this.props.navigation.navigate("MyProfile")}
                >
                  <Image
                    style={styles.avatar}
                    source={{
                      uri: `${this.state.item.fotoDePerfil}`,
                    }}
                  />

                  <Text style={styles.name}>{this.state.item.nombre}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.shareButton}
                  onPress={() =>
                    this.props.navigation.navigate("EditReview", {
                      review: this.state.item,
                    })
                  }
                >
                  <Text style={styles.shareButtonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.shareButton}
                  onPress={() => this.deleteReview()}
                >
                  <Text style={styles.shareButtonText}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        ) : (
          <ScrollView>
            <View style={styles.container}>
              <View style={styles.postContent}>
                <Text style={styles.postTitle}>{this.state.item.titulo}</Text>

                <Text style={styles.postDescription}>
                  {this.state.item.cuerpo}
                </Text>

                <View style={styles.starContainer}>
                  {[...new Array(5)].map((_, i) => {
                    return i < this.state.item.puntuacion ? (
                      <Icon
                        name={"star"}
                        size={30}
                        style={[styles.myStarStyle]}
                      />
                    ) : (
                      <Icon
                        name={"star-outline"}
                        size={30}
                        style={[styles.myStarStyle, styles.myEmptyStarStyle]}
                      />
                    );
                  })}
                </View>
                <Text style={styles.date}>
                  Fecha: {this.parseDate(this.state.item.fecha)}
                </Text>

                <TouchableOpacity
                  style={styles.profile}
                  onPress={() =>
                    this.props.navigation.navigate("OtherProfile", {
                      idOtroUsuario: this.state.item.deGUID,
                    })
                  }
                >
                  <Image
                    style={styles.avatar}
                    source={{
                      uri: `${this.state.item.fotoDePerfil}`,
                    }}
                  />

                  <Text style={styles.name}>{this.state.item.nombre}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: 120,
                    marginTop: 10,
                    height: 20,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 30,
                    backgroundColor: "red",
                  }}
                  onPress={() => {
                    this.clickEventListener();
                  }}
                >
                  <Text
                    style={{
                      color: "#FFFFFF",
                      fontSize: 10,
                    }}
                  >
                    Reportar Reseña
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <Modal
              animationType={"fade"}
              transparent={true}
              onRequestClose={() => this.setModalVisible(false)}
              visible={this.state.modalVisible}
            >
              <View style={stylesReport.popupOverlay}>
                <View style={stylesReport.popup}>
                  <View style={stylesReport.popupContent}>
                    <ScrollView contentContainerStyle={stylesReport.modalInfo}>
                      <Image
                        style={stylesReport.image}
                        source={{
                          uri: "https://img.icons8.com/stickers/512/system-report.png",
                        }}
                      />
                      <Text style={stylesReport.name}>Realizar un Reporte</Text>
                      <Text style={stylesReport.about}>
                        Descripción del reporte
                      </Text>
                    </ScrollView>
                    <TextInput
                      editable
                      maxLength={255}
                      style={{
                        margin: 15,

                        height: 80,
                        borderColor: "#000000",
                        borderWidth: 1,
                        textAlignVertical: "top",
                      }}
                      placeholder="Describe el motivo del reporte (255 caracteres)"
                      multiline={true}
                      numberOfLines={4}
                      onChangeText={(reporte) => this.setState({ reporte })}
                    />
                  </View>
                  <View style={stylesReport.popupButtons}>
                    <TouchableOpacity
                      onPress={() => {
                        this.setModalVisible(false);
                      }}
                      style={[stylesReport.btnClose, { marginRight: 10 }]}
                    >
                      <Text
                        style={{
                          textAlign: "center",
                          fontSize: 20,
                          color: "white",
                        }}
                      >
                        Cancelar
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        this.handleReport();
                      }}
                      style={[stylesReport.btnClose, { marginLeft: 10 }]}
                    >
                      <Text
                        style={{
                          textAlign: "center",
                          fontSize: 20,
                          color: "white",
                        }}
                      >
                        Enviar
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          </ScrollView>
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 30,
    alignItems: "center",
    backgroundColor: "#00BFFF",
  },
  headerTitle: {
    fontSize: 30,
    color: "#FFFFFF",
    marginTop: 10,
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  postContent: {
    flex: 1,
    padding: 30,
  },
  postTitle: {
    fontSize: 26,
    fontWeight: "600",
  },
  starContainer: {
    justifyContent: "center",
    marginHorizontal: 30,
    flexDirection: "row",
    marginTop: 20,
  },
  star: {
    width: 40,
    height: 40,
  },
  postDescription: {
    fontSize: 16,
    marginTop: 10,
  },
  tags: {
    color: "#454545",
    marginTop: 10,
  },
  date: {
    color: "#454545",
    marginTop: 10,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 35,
    borderWidth: 4,
    borderColor: "#454545",
  },
  profile: {
    flexDirection: "row",
    marginTop: 20,
  },
  name: {
    fontSize: 22,
    color: "#454545",
    fontWeight: "600",
    alignSelf: "center",
    marginLeft: 10,
  },
  shareButton: {
    marginTop: 10,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "#454545",
  },
  shareButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
  },
  myStarStyle: {
    color: "yellow",
    backgroundColor: "transparent",
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  myEmptyStarStyle: {
    color: "white",
  },
});

const stylesReport = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: "#eeeeee",
  },
  header: {
    backgroundColor: "#00CED1",
    height: 200,
  },
  headerContent: {
    padding: 30,
    alignItems: "center",
    flex: 1,
  },
  detailContent: {
    top: 80,
    height: 500,
    width: Dimensions.get("screen").width - 90,
    marginHorizontal: 30,
    flexDirection: "row",
    position: "absolute",
    backgroundColor: "#ffffff",
  },
  userList: {
    flex: 1,
  },
  cardContent: {
    marginLeft: 20,
    marginTop: 10,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },

  card: {
    shadowColor: "#00000021",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginVertical: 10,
    marginHorizontal: 20,
    backgroundColor: "white",
    flexBasis: "46%",
    padding: 10,
    flexDirection: "row",
  },

  name: {
    fontSize: 18,
    flex: 1,
    alignSelf: "center",
    color: "#454545",
    fontWeight: "bold",
  },
  position: {
    fontSize: 14,
    flex: 1,
    alignSelf: "center",
    color: "#454545",
  },
  about: {
    marginHorizontal: 10,
  },

  followButton: {
    marginTop: 10,
    height: 35,
    width: 100,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "#00BFFF",
  },
  followButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
  },
  /************ modals ************/
  popup: {
    backgroundColor: "white",
    marginTop: 80,
    marginHorizontal: 20,
    borderRadius: 7,
  },
  popupOverlay: {
    backgroundColor: "#00000057",
    flex: 1,
    marginTop: 30,
  },
  popupContent: {
    //alignItems: 'center',
    margin: 5,
    height: 250,
  },
  popupHeader: {
    marginBottom: 45,
  },
  popupButtons: {
    marginTop: 15,
    flexDirection: "row",
    borderTopWidth: 1,
    borderColor: "#eee",
    justifyContent: "center",
  },
  popupButton: {
    flex: 1,
    marginVertical: 16,
  },
  btnClose: {
    height: 35,
    backgroundColor: "#454545",
    width: 100,
  },
  modalInfo: {
    alignItems: "center",
    justifyContent: "center",
  },
});
