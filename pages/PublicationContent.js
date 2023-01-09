import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  TextInput,
  Dimensions,
  Modal,
  AsyncStorage,
  Alert,
} from "react-native";
import moment from "moment";

export default class PostView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idPublication: "",
      UsuarioLogeado: "",
      modalVisible: false,
      relacionAuxiliar: false,
      dataCargada: [{}],
      data: [],
      comment: "",
      reporte: "",
    };
  }

  checkIfLike = async (id) => {
    await fetch(
      `http://10.0.2.2:5000/relaciones/getSpecificLikeState/${this.state.UsuarioLogeado}/${id}`,
      { method: "GET" }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          relacionAuxiliar: responseJson[0].length > 0 ? true : false,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  formatDate(date) {
    var temporalDate = new Date(date);
    var month = temporalDate.getMonth() + 1;
    var day = temporalDate.getDate();
    var year = temporalDate.getFullYear();

    var formattedDate = day + "/" + month + "/" + year + " ";
    return formattedDate;
  }

  loadPublications = async () => {
    await fetch(
      `http://10.0.2.2:5000/publicacionesnoticias/getAllActivePublications/${this.state.UsuarioLogeado}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then(async (responseJson) => {
        var temporalData = [];
        var temporalResult = [];
        for (var i = 0; i < responseJson.length; i++) {
          await this.checkIfLike(responseJson[i].publicacionNoticiaGUID);
          temporalData.push({
            id: responseJson[i].publicacionNoticiaGUID,
            title: responseJson[i].titulo,
            time: this.formatDate(responseJson[i].fecha),
            image: responseJson[i].fotoPublicacionNoticia,
            description: responseJson[i].cuerpo,
            teGusta: this.state.relacionAuxiliar,
            likes: responseJson[i].cantidadDeLikes,
            comentarios: responseJson[i].cantidadDeComentarios,
            price: responseJson[i].precioExpuesto,
            fotoPerfil: responseJson[i].fotoDePerfil,
            nombreUsuario: responseJson[i].nombreUsuario,
            usuarioGUID: responseJson[i].usuarioGUID,
          });
        }

        for (var i = 0; i < temporalData.length; i++) {
          if (temporalData[i].id === this.state.idPublication) {
            temporalResult.push(temporalData[i]);
            break;
          }
        }

        this.setState({ dataCargada: temporalResult });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  loadCommentaries = async () => {
    await fetch(
      `http://10.0.2.2:5000/comentarios/getAllCommentsFromPublicationNew/${this.state.idPublication}`,
      { method: "GET" }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        var temporalData = [];
        for (var i = 0; i < responseJson[0].length; i++) {
          temporalData.push({
            id: responseJson[0][i].comentariosGUID,
            image: responseJson[0][i].fotoDePerfil,
            name: responseJson[0][i].nombre,
            comment: responseJson[0][i].contenido,
            time: this.formatDate(responseJson[0][i].fecha),
            usuarioGUID: responseJson[0][i].deUsuarioGUID,
          });
        }
        this.setState({ data: temporalData });
      })
      .catch((error) => {
        console.log(error);
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

  renderIfyoulike() {
    if (this.state.dataCargada[0].teGusta) {
      return (
        <TouchableOpacity
          style={styles.shareButton}
          onPress={() => this.likeUnlikePost()}
        >
          <Text style={styles.shareButtonText}>Me gusta esta publicación</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={styles.shareButton}
          onPress={() => this.likeUnlikePost()}
        >
          <Text style={styles.shareButtonText}>
            Dar me gusta a esta publicación
          </Text>
        </TouchableOpacity>
      );
    }
  }

  async componentDidMount() {
    const id = this.props.route.params.id;
    await this.setState({ idPublication: id });
    await this.loadId();
    await this.loadPublications();
    await this.loadCommentaries();
  }

  clickEventListener = () => {
    this.setModalVisible(true);
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  navigateToOtherProfile(id) {
    this.props.navigation.navigate("OtherProfile", { idOtroUsuario: id });
  }

  navigateFromComments(id) {
    if (id === this.state.UsuarioLogeado) {
      this.props.navigation.navigate("MyProfile");
    } else {
      this.props.navigation.navigate("OtherProfile", { idOtroUsuario: id });
    }
  }

  addComment = async () => {
    const formData = new FormData();
    const currentDate = new Date();
    formData.append("contenido", this.state.comment);
    formData.append("deUsuarioGUID", this.state.UsuarioLogeado);
    formData.append("fecha", moment(currentDate).format("YYYY-MM-DD"));

    await fetch(
      `http://10.0.2.2:5000/comentarios/addComment/${this.state.idPublication}`,
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
    Alert.alert("Comentario agregado exitosamente");
    this.props.navigation.navigate("HomePage");
  };

  likeUnlikePost = async () => {
    Alert.alert(
      "Sistema",
      "¿Está seguro que desea dar me gusta o quitar me gusta a esta publicación?",
      [
        {
          text: "Cancelar",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Aceptar",
          onPress: async () => {
            var formData = new FormData();
            formData.append("de", this.state.UsuarioLogeado);
            formData.append("hacia", this.state.idPublication);
            formData.append("tipo", "meGusta");
            if (this.state.dataCargada[0].teGusta === false) {
              await fetch("http://10.0.2.2:5000/relaciones/createRelation", {
                method: "POST",
                body: formData,
              });
              Alert.alert("Sistema", "Te gusta esta publicación");
              await this.componentDidMount();
            } else {
              await fetch("http://10.0.2.2:5000/relaciones/deleteRelation", {
                method: "DELETE",
                body: formData,
              });
              Alert.alert("Sistema", "Ya no te gusta esta publicación");
              await this.componentDidMount();
            }
          },
        },
      ]
    );
  };

  handleReport = async () => {
    const currentDate = new Date();
    var formData = new FormData();
    formData.append("deGUID", this.state.UsuarioLogeado);
    formData.append("haciaGUID", this.state.idPublication);
    formData.append("tipoReporte", "Publicación");
    formData.append("fecha", moment(currentDate).format("YYYY-MM-DD"));
    formData.append("descripcion", this.state.reporte);
    formData.append("estado", "abierto");
    formData.append("realizadoPor", this.state.dataCargada[0].usuarioGUID);

    await fetch("http://10.0.2.2:5000/reportes/createReport", {
      method: "POST",
      body: formData,
    });
    Alert.alert("Sistema", "Reporte Enviado");
    this.setModalVisible(false);
  };

  footerComponent() {
    return (
      <View style={styles.container}>
        <View style={styles.postContent}>
          <TextInput
            maxLength={255}
            style={{
              margin: 15,
              height: 120,
              borderColor: "#000000",
              borderWidth: 1,
              textAlignVertical: "top",
            }}
            placeholder="Agrega un comentario! (255 caracteres)"
            multiline={true}
            numberOfLines={4}
            onChangeText={(comment) => this.setState({ comment })}
          />

          <TouchableOpacity
            style={styles.shareButton}
            onPress={() => this.addComment()}
          >
            <Text style={styles.shareButtonText}>Comentar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  headerComponent(navigationC) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            style={styles.productImg}
            source={{ uri: this.state.dataCargada[0].image }}
          />
        </View>

        <View style={styles.postContent}>
          <Text style={styles.postTitle}>
            {this.state.dataCargada[0].title}
          </Text>

          <Text style={styles.postDescription}>
            {this.state.dataCargada[0].description}
          </Text>

          <Text style={styles.tags}>
            Precio expuesto: ₡ {this.state.dataCargada[0].price}
          </Text>

          <Text style={[styles.date, { color: "#454545" }]}>
            Fecha de caducidad de la publicación:{" "}
            {this.state.dataCargada[0].time}
          </Text>

          <TouchableOpacity
            style={styles.profile}
            onPress={() =>
              this.navigateToOtherProfile(this.state.dataCargada[0].usuarioGUID)
            }
          >
            <Image
              style={styles.avatar}
              source={{ uri: this.state.dataCargada[0].fotoPerfil }}
            />

            <Text style={styles.name}>
              {this.state.dataCargada[0].nombreUsuario} {"\n"}
              {this.state.dataCargada[0].likes} Me gusta
            </Text>
          </TouchableOpacity>
          {this.renderIfyoulike()}
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
              Reportar Publicación
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={{ textAlign: "center" }}>Comentarios</Text>
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
      </View>
    );
  }

  render() {
    return (
      <View>
        <FlatList
          style={styles2.root}
          data={this.state.data}
          ListHeaderComponent={this.headerComponent(this.props.navigation)}
          ListFooterComponent={this.footerComponent()}
          extraData={this.state}
          ItemSeparatorComponent={() => {
            return <View style={styles2.separator} />;
          }}
          keyExtractor={(item) => {
            return item.id;
          }}
          renderItem={(item) => {
            const Notification = item.item;
            return (
              <View style={styles2.container}>
                <TouchableOpacity
                  onPress={() =>
                    this.navigateFromComments(Notification.usuarioGUID)
                  }
                >
                  <Image
                    style={styles2.image}
                    source={{ uri: Notification.image }}
                  />
                </TouchableOpacity>
                <View style={styles2.content}>
                  <View style={styles2.contentHeader}>
                    <Text style={styles2.name}>{Notification.name}</Text>
                    <Text style={styles2.time}>{Notification.time}</Text>
                  </View>
                  <Text rkType="primary3 mediumLine">
                    {Notification.comment}
                  </Text>
                </View>
              </View>
            );
          }}
        />
      </View>
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
    backgroundColor: "#FFFFFF",
  },
  headerTitle: {
    fontSize: 30,
    color: "#FFFFFF",
    marginTop: 10,
  },
  name: {
    fontSize: 22,
    color: "#454545",
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
  productImg: {
    width: 200,
    height: 200,
  },
  shareButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
  },
});

const styles2 = StyleSheet.create({
  root: {
    backgroundColor: "#ffffff",
    marginTop: 10,
    flexGrow: 0,
  },
  container: {
    paddingLeft: 19,
    paddingRight: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  content: {
    marginLeft: 16,
    flex: 1,
  },
  contentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  separator: {
    height: 1,
    backgroundColor: "#CCCCCC",
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 20,
    marginLeft: 20,
  },
  time: {
    fontSize: 11,
    color: "#808080",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
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
