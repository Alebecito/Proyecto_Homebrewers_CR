import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Alert,
  ImageBackground,
  Dimensions,
  Modal,
  TextInput,
  AsyncStorage,
} from "react-native";

export default class ProfileView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      usuarioSeguido: false,
      usuarioBloqueado: "Bloquear usuario",
      userData: [],
      idOtroUsuario: "",
      usuarioLogeado: "",
      modalVisible: false,
      posts: [],
      reviews: [],
    };
  }

  checkIfBlocked = async (id) => {
    await fetch(
      `http://10.0.2.2:5000/relaciones/CheckIfUserBlocked/${id}/${this.state.idOtroUsuario}`,
      { method: "GET" }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          usuarioBloqueado:
            responseJson[0].length > 0
              ? "Desbloquear usuario"
              : "Bloquear usuario",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  parseDate = (date) => {
    const d = new Date(date);
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  checkIfFollows = async (id) => {
    await fetch(
      `http://10.0.2.2:5000/relaciones/CheckIfUserFollowsAnother/${id}/${this.state.idOtroUsuario}`,
      { method: "GET" }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          usuarioSeguido: responseJson[0].length > 0 ? true : false,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  loadUserData = async () => {
    await fetch(
      `http://10.0.2.2:5000/usuario/getSpecificUser/${this.state.idOtroUsuario}`
    )
      .then((response) => response.json())
      .then((json) => {
        this.setState({ userData: json[0] });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  loadId = async () => {
    try {
      const id = await AsyncStorage.getItem("UsuarioLogeado");
      this.setState({ usuarioLogeado: id });
    } catch (error) {
      console.log(error);
    }
  };

  loadPosts = async () => {
    await fetch(
      `http://10.0.2.2:5000/publicacionesnoticias/getallPublicationsfromUser/${this.state.idOtroUsuario}`
    )
      .then((response) => response.json())
      .then((json) => {
        const result = json.map((item, index) => ({
          ...item,
          id: index + 1,
        }));
        this.setState({ posts: result });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  loadReviews = async () => {
    await fetch(
      `http://10.0.2.2:5000/resena/getAllReviewsFromUser/${this.state.idOtroUsuario}`
    )
      .then((response) => response.json())
      .then((json) => {
        const result = json[0].map((item, index) => ({
          ...item,
          id: index + 1,
        }));
        this.setState({ reviews: result });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  async componentDidMount() {
    this.setState({ idOtroUsuario: this.props.route.params.idOtroUsuario });
    await this.loadId();
    await this.loadUserData();
    await this.checkIfFollows(this.state.usuarioLogeado);
    await this.checkIfBlocked(this.state.usuarioLogeado);

    await this.loadPosts();
    await this.loadReviews();
  }

  clickGoToReview(item) {
    let direccion = "";
    if (this.state.usuarioLogeado === item.deGUID) {
      direccion = "MyReviewContent";
    } else {
      direccion = "ReviewContent";
    }
    this.props.navigation.navigate(direccion, {
      data: item,
    });
  }

  clickEventListener = () => {
    this.setModalVisible(true);
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  CheckIfUserFollowed = () => {
    if (this.state.usuarioSeguido) {
      return (
        <TouchableOpacity style={styles.detailContent} onPress={() => {}}>
          <Text style={styles.title}>
            {"\r\r\r"}Dejar{"\n"}de Seguir
          </Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity style={styles.detailContent} onPress={() => {}}>
          <Text style={styles.title}>Seguir</Text>
        </TouchableOpacity>
      );
    }
  };
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <ImageBackground
            source={{ uri: this.state.userData.fotoPortada }}
            resizeMode="cover"
            style={styles.header}
          >
            <View style={styles.headerContent}>
              <Image
                style={styles.avatar}
                source={{ uri: this.state.userData.fotoDePerfil }}
              />
              <Text style={styles.name}>{this.state.userData.nombre}</Text>
              <Text style={styles.name}>{this.state.userData.descripcion}</Text>
              <Text style={styles.name}>{this.state.userData.correo}</Text>
            </View>
          </ImageBackground>

          <View style={styles.profileDetail}>
            <TouchableOpacity
              style={styles.detailContent}
              onPress={() => {
                {
                  this.props.navigation.navigate("OtherFollowers", {
                    idOtroUsuario: this.state.idOtroUsuario,
                  });
                }
              }}
            >
              <Text style={styles.title}>Seguidores</Text>
              <Text style={styles.count}>{this.state.userData.seguidores}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.detailContent}
              onPress={() => {
                {
                  this.props.navigation.navigate("OtherFollowing", {
                    idOtroUsuario: this.state.idOtroUsuario,
                  });
                }
              }}
            >
              <Text style={styles.title}>Seguidos</Text>
              <Text style={styles.count}>{this.state.userData.seguidos}</Text>
            </TouchableOpacity>
            {this.CheckIfUserFollowed()}
          </View>

          <View style={styles.body}>
            <View style={styles.bodyContent}>
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
                  Reportar Usuario
                </Text>
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
                onPress={() => Alert.alert("Bloquear Usuario")}
              >
                <Text
                  style={{
                    color: "#FFFFFF",
                    fontSize: 10,
                  }}
                >
                  {this.state.usuarioBloqueado}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => this.props.navigation.navigate("Chat")}
              >
                <Text style={{ color: "white" }}>Enviar Mensaje</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => this.props.navigation.navigate("AddReview")}
              >
                <Text style={{ color: "white" }}>Añadir reseña</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={{ textAlign: "center" }}>Publicaciones Activas</Text>
          <FlatList
            style={styles2.list}
            contentContainerStyle={styles2.listContainer}
            data={this.state.posts}
            horizontal={true}
            keyExtractor={(item) => {
              return item.id;
            }}
            ItemSeparatorComponent={() => {
              return <View style={styles2.separator} />;
            }}
            renderItem={(post) => {
              const item = post.item;

              return (
                <TouchableOpacity
                  style={styles2.card}
                  onPress={() =>
                    this.props.navigation.navigate("PublicationContent", {
                      id: item.publicacionNoticiaGUID,
                    })
                  }
                >
                  <View style={styles2.cardHeader}>
                    <View>
                      <Text style={styles2.title}>{item.titulo}</Text>
                      <Text style={styles2.price}>₡{item.precioExpuesto}</Text>
                    </View>
                  </View>

                  <Image
                    style={styles2.cardImage}
                    source={{ uri: item.image }}
                  />
                  <View style={styles2.timeContainer}>
                    <Image
                      style={styles2.iconData}
                      source={{
                        uri: "https://img.icons8.com/color/96/3498db/calendar.png",
                      }}
                    />
                    <Text style={styles2.time}>
                      Fecha de Caducidad: {this.parseDate(item.fecha)}
                    </Text>
                  </View>
                  <View style={styles2.cardFooter}>
                    <View style={styles2.socialBarContainer}>
                      <View style={styles2.socialBarSection}>
                        <View
                          style={styles2.socialBarButton}
                          onPress={() => Alert.alert("Me gusta")}
                        >
                          <Image
                            style={styles2.icon}
                            source={{
                              uri: "https://img.icons8.com/ios-glyphs/75/2ecc71/comments.png",
                            }}
                          />
                          <Text
                            style={[styles2.socialBarLabel, styles2.buyNow]}
                          >
                            {item.cantidadDeComentarios}
                          </Text>
                        </View>
                      </View>
                      <View style={styles2.socialBarSection}>
                        <View style={styles2.socialBarButton}>
                          <Image
                            style={styles2.icon}
                            source={{
                              uri: "https://img.icons8.com/stickers/512/good-quality.png",
                            }}
                          />
                          <Text style={styles2.socialBarLabel}>
                            {item.cantidadDeLikes}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
          <Text style={{ textAlign: "center" }}>Reseñas</Text>
          <FlatList
            style={styles2.list}
            contentContainerStyle={styles2.listContainer}
            data={this.state.reviews}
            horizontal={true}
            keyExtractor={(item) => {
              return item.id;
            }}
            ItemSeparatorComponent={() => {
              return <View style={styles2.separator} />;
            }}
            renderItem={(post) => {
              const item = post.item;

              return (
                <TouchableOpacity
                  style={styles2.card}
                  onPress={() => {
                    this.props.navigation.navigate("MyReviewContent", {
                      usuarioLogueado: this.state.usuarioLogeado,
                      item: item,
                    });
                  }}
                >
                  <View style={styles2.cardHeader}>
                    <View>
                      <Text style={styles2.title}>{item.titulo}</Text>
                      <Text style={styles2.price}>{item.cuerpo}</Text>
                    </View>
                  </View>

                  <Image
                    style={styles2.cardImage}
                    source={{ uri: item.image }}
                  />
                  <View style={styles2.timeContainer}>
                    <Image
                      style={styles2.iconData}
                      source={{
                        uri: "https://img.icons8.com/color/96/3498db/calendar.png",
                      }}
                    />
                    <Text style={styles2.time}>
                      Fecha: {this.parseDate(item.fecha)}
                    </Text>
                  </View>
                  <View style={styles2.cardFooter}>
                    <View style={styles2.socialBarContainer}>
                      <View style={styles2.socialBarSection}>
                        <View
                          style={styles2.socialBarButton}
                          onPress={() => Alert.alert("Me gusta")}
                        >
                          <Text
                            style={[styles2.socialBarLabel, styles2.buyNow]}
                          >
                            Reseña: {item.puntuacion}/5
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
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
                      this.setModalVisible(false);
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
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: 300,
    width: 400,
  },
  headerContent: {
    padding: 30,
    alignItems: "center",
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "454545",
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: "600",
    backgroundColor: "rgba(52, 52, 52, 0.8)",
  },
  profileDetail: {
    alignSelf: "center",
    marginTop: 275,
    alignItems: "center",
    flexDirection: "row",
    position: "absolute",
    backgroundColor: "#ffffff",
  },
  detailContent: {
    margin: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    color: "#454545",
  },
  count: {
    fontSize: 18,
  },
  bodyContent: {
    flex: 1,
    alignItems: "center",
    padding: 30,
    marginTop: 20,
  },
  textInfo: {
    fontSize: 18,
    marginTop: 20,
    color: "#454545",
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#454545",
  },
  description: {
    fontSize: 20,
    color: "#454545",
    marginTop: 10,
    textAlign: "center",
  },
});

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  list: {
    paddingHorizontal: 5,
    backgroundColor: "#E6E6E6",
    height: 150,
  },
  listContainer: {
    alignItems: "center",
  },
  separator: {
    marginTop: 10,
  },
  /******** card **************/
  card: {
    shadowColor: "#00000021",
    shadowOffset: {
      width: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 8,
    backgroundColor: "white",
    flexBasis: "47%",
    marginHorizontal: 5,
  },
  cardHeader: {
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardImage: {
    flex: 1,
    height: 150,
    width: null,
  },
  /******** card components **************/
  title: {
    fontSize: 16,
    color: "#454545",
    marginTop: 5,
  },
  price: {
    fontSize: 16,
    color: "#454545",
    marginTop: 5,
  },
  buyNow: {
    color: "#454545",
  },
  formContent: {
    flexDirection: "row",
  },
  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderBottomWidth: 1,
    height: 45,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    margin: 10,
  },
  icon: {
    width: 25,
    height: 25,
  },
  /******** social bar ******************/
  socialBarContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
  },
  socialBarSection: {
    justifyContent: "center",
    flexDirection: "row",
    flex: 1,
  },
  socialBarlabel: {
    marginLeft: 8,
    alignSelf: "flex-end",
    justifyContent: "center",
  },
  timeContainer: {
    flexDirection: "row",
  },
  iconData: {
    width: 15,
    height: 15,
    marginTop: 5,
    marginRight: 5,
  },
  time: {
    fontSize: 13,
    color: "#454545",
    marginTop: 5,
  },
  socialBarButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
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
