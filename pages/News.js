import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
  Button,
  TextInput,
  AsyncStorage,
} from "react-native";
import Checkbox from "expo-checkbox";

export default class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valorDeBusqueda: "",
      UsuarioLogeado: "",
      relacionAuxiliar: false,
      isChecked: false,
      dataCargada: [],
      data: [],
    };
  }
  handleChange = async (e) => {
    await this.setState({ isChecked: e });
    this.realizarBusqueda(this.state.valorDeBusqueda);
  };

  formatDate(date) {
    var temporalDate = new Date(date);
    var month = temporalDate.getMonth() + 1;
    var day = temporalDate.getDate();
    var year = temporalDate.getFullYear();

    var formattedDate = day + "/" + month + "/" + year + " ";
    return formattedDate;
  }

  loadId = async () => {
    try {
      const id = await AsyncStorage.getItem("UsuarioLogeado");
      this.setState({ UsuarioLogeado: id });
    } catch (error) {
      console.log(error);
    }
  };

  goToNewsContent(item) {
    this.props.navigation.navigate("NewsContent", {id: item});
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

  loadNews = async () => {
    await fetch(`http://10.0.2.2:5000/publicacionesnoticias/getAllNews/`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then(async (responseJson) => {
        var temporalData = [];
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
          });
        }

        this.setState({ dataCargada: temporalData });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  async componentDidMount() {
    await this.loadId();
    await this.loadNews();

    this.setState({ data: this.state.dataCargada });
    this.setState({ valorDeBusqueda: "" });
  }

  async realizarBusqueda(input) {
    if (this.state.isChecked === true) {
      var resultData = [];
      await this.setState({ valorDeBusqueda: input });
      var temporalData = this.state.dataCargada;
      if (input === "") {
        for (var i = 0; i < temporalData.length; i++) {
          var teGustaAxiliar = temporalData[i].teGusta;
          if (teGustaAxiliar === true) {
            resultData.push(temporalData[i]);
          }
        }
        this.setState({ data: resultData });
        return;
      }

      var tituloAuxiliar = "";

      for (var i = 0; i < temporalData.length; i++) {
        var tituloAuxiliar = temporalData[i].title;
        var teGustaAxiliar = temporalData[i].teGusta;
        if (
          teGustaAxiliar === true &&
          tituloAuxiliar
            .toLocaleLowerCase()
            .startsWith(this.state.valorDeBusqueda.toLocaleLowerCase()) === true
        ) {
          resultData.push(temporalData[i]);
        }
      }

      this.setState({ data: resultData });
    } else {
      await this.setState({ valorDeBusqueda: input });
      var temporalData = this.state.dataCargada;
      if (input === "") {
        this.setState({ data: this.state.dataCargada });
        return;
      }
      var resultData = [];
      var tituloAuxiliar = "";

      for (var i = 0; i < temporalData.length; i++) {
        var tituloAuxiliar = temporalData[i].title;
        if (
          tituloAuxiliar
            .toLocaleLowerCase()
            .startsWith(this.state.valorDeBusqueda.toLocaleLowerCase()) === true
        ) {
          resultData.push(temporalData[i]);
        }
      }

      this.setState({ data: resultData });
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.formContent}>
          <View style={styles.inputContainer}>
            <Image
              style={[styles.icon, styles.inputIcon]}
              source={{
                uri: "https://png.icons8.com/search/androidL/100/000000",
              }}
            />
            <TextInput
              style={styles.inputs}
              ref={"txtPassword"}
              placeholder="Buscar noticia"
              underlineColorAndroid="transparent"
              onChangeText={(valorDeBusqueda) =>
                this.realizarBusqueda(valorDeBusqueda)
              }
            />
          </View>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          <Text>
            {" "}
            <Checkbox
              value={this.state.isChecked}
              onValueChange={this.handleChange}
            />{" "}
            Mostrar solo noticias que te gustan{" "}
          </Text>
        </View>
        <FlatList
          style={styles.list}
          data={this.state.data}
          keyExtractor={(item) => {
            return item.id;
          }}
          ItemSeparatorComponent={() => {
            return <View style={styles.separator} />;
          }}
          renderItem={(post) => {
            const item = post.item;
            if (item.teGusta === true) {
              return (
                <TouchableOpacity
                  style={styles.card}
                  onPress={() => this.goToNewsContent(item.id)}
                >
                  <Image
                    style={styles.cardImage}
                    source={{ uri: item.image }}
                  />
                  <View style={styles.cardHeader}>
                    <View>
                      <Text style={styles.title}>{item.title}</Text>
                      <Text style={styles.description}>{item.description}</Text>
                      <View style={styles.timeContainer}>
                        <Image
                          style={styles.iconData}
                          source={{
                            uri: "https://img.icons8.com/color/96/3498db/calendar.png",
                          }}
                        />
                        <Text style={styles.time}>{item.time}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.cardFooter}>
                    <View style={styles.socialBarContainer}>
                      
                      <View style={styles.socialBarSection}>
                        <TouchableOpacity style={styles.socialBarButton}>
                          <Image
                            style={styles.icon}
                            source={{
                              uri: "https://img.icons8.com/stickers/512/good-quality.png",
                            }}
                          />
                          <Text style={styles.socialBarLabel}>Te Gusta</Text>
                        </TouchableOpacity>
                      </View>
                      <View style={styles.socialBarSection}>
                        <View style={styles.socialBarButton}>
                          <Image style={styles.icon} source={{ uri: 'https://img.icons8.com/ios-glyphs/75/2ecc71/comments.png' }} />
                          <Text style={styles.socialBarLabel}>{item.likes}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            } else {
              return (
                <TouchableOpacity
                  style={styles.card}
                  onPress={() => this.goToNewsContent(item.id)}
                >
                  <Image
                    style={styles.cardImage}
                    source={{ uri: item.image }}
                  />
                  <View style={styles.cardHeader}>
                    <View>
                      <Text style={styles.title}>{item.title}</Text>
                      <Text style={styles.description}>{item.description}</Text>
                      <View style={styles.timeContainer}>
                        <Image
                          style={styles.iconData}
                          source={{
                            uri: "https://img.icons8.com/color/96/3498db/calendar.png",
                          }}
                        />
                        <Text style={styles.time}>{item.time}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.cardFooter}>
                    <View style={styles.socialBarContainer}>

                      
                      <View style={styles.socialBarSection}>
                        <TouchableOpacity style={styles.socialBarButton}>
                          <Image
                            style={styles.icon}
                            source={{
                              uri: "https://img.icons8.com/stickers/512/good-quality.png",
                            }}
                          />
                          <Text style={styles.socialBarLabel}>
                            {item.likes}
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View style={styles.socialBarSection}>
                        <View style={styles.socialBarButton}>
                          <Image style={styles.icon} source={{ uri: 'https://img.icons8.com/ios-glyphs/75/2ecc71/comments.png' }} />
                          <Text style={styles.socialBarLabel}>{item.comentarios}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  list: {
    paddingHorizontal: 17,
    backgroundColor: "#E6E6E6",
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
  },
  cardHeader: {
    paddingVertical: 17,
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
    backgroundColor: "#EEEEEE",
  },
  cardImage: {
    flex: 1,
    height: 150,
    width: null,
  },
  /******** card components **************/
  title: {
    fontSize: 18,
    flex: 1,
  },
  description: {
    fontSize: 15,
    color: "#888",
    flex: 1,
    marginTop: 5,
    marginBottom: 5,
  },
  time: {
    fontSize: 13,
    color: "#808080",
    marginTop: 5,
  },
  icon: {
    width: 25,
    height: 25,
  },
  iconData: {
    width: 15,
    height: 15,
    marginTop: 5,
    marginRight: 5,
  },
  timeContainer: {
    flexDirection: "row",
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
  socialBarButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
