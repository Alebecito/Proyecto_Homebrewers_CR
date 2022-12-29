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
  AsyncStorage,
} from "react-native";

export default class ProfileView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      userData: [],
      posts: [],
      reviews: [],
    };
  }

  parseDate = (date) => {
    const d = new Date(date);
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  loadId = async () => {
    try {
      const id = await AsyncStorage.getItem("UsuarioLogeado");
      this.setState({ id: id });
    } catch (error) {
      console.log(error);
    }
  };

  loadUserData = async () => {
    await fetch(`http://10.0.2.2:5000/usuario/getSpecificUser/${this.state.id}`)
      .then((response) => response.json())
      .then((json) => {
        this.setState({ userData: json[0] });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  loadPosts = async () => {
    await fetch(
      `http://10.0.2.2:5000/publicacionesnoticias/getallPublicationsfromUser/${this.state.id}`
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
      `http://10.0.2.2:5000/resena/getAllReviewsFromUser/${this.state.id}`
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
    await this.loadId();
    await this.loadPosts();
    await this.loadUserData();
    await this.loadReviews();
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <ImageBackground
            source={{
              uri: `${this.state.userData.fotoPortada}`,
            }}
            resizeMode="cover"
            style={styles.header}
          >
            <View style={styles.headerContent}>
              <Image
                style={styles.avatar}
                source={{ uri: `${this.state.userData.fotoDePerfil}` }}
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
                  this.props.navigation.navigate("Followers");
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
                  this.props.navigation.navigate("Following");
                }
              }}
            >
              <Text style={styles.title}>Seguidos</Text>
              <Text style={styles.count}>{this.state.userData.seguidos}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() =>
                  this.props.navigation.navigate("editProfile", {
                    data: this.state.userData,
                  })
                }
              >
                <Text style={{ color: "white" }}>Editar Perfil</Text>
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
                    this.props.navigation.navigate("MyPublicationContent", {
                      postData: item,
                      userData: this.state.userData,
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
                        <TouchableOpacity
                          style={styles2.socialBarButton}
                          onPress={() => Alert.alert("Me gusta")}
                        >
                          <Image
                            style={styles2.icon}
                            source={{
                              uri: "https://img.icons8.com/stickers/512/good-quality.png",
                            }}
                          />
                          <Text style={styles2.socialBarLabel}>
                            {item.cantidadDeLikes}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
          <Text style={{ textAlign: "center" }}>Reseñas de otros usuarios</Text>
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
                  onPress={() =>
                    this.props.navigation.navigate("ReviewContent", {
                      data: item,
                      userData: this.state.userData,
                    })
                  }
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
    borderColor: "white",
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
