import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  FlatList,
  TextInput,
  AsyncStorage,
} from "react-native";

export default class Album extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      id: "",
      valorDeBusqueda: "",
      dataCargada: [],
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

  loadNews = async () => {
    await fetch(
      `http://10.0.2.2:5000/producto/getAllProductsFromUser/${this.state.id}`,
      { method: "GET" }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        const result = responseJson.map((item, index) => ({
          ...item,
          id: index + 1,
        }));
        this.setState({ dataCargada: result });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  async realizarBusqueda(input) {
    await this.setState({ valorDeBusqueda: input });
    var temporalData = this.state.dataCargada;
    if (input === "") {
      this.setState({ data: this.state.dataCargada });
      return;
    }
    var resultData = [];
    var tituloAuxiliar = "";
    for (var i = 0; i < temporalData.length; i++) {
      var tituloAuxiliar = temporalData[i].titulo;
      if (
        tituloAuxiliar
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLocaleLowerCase()
          .startsWith(
            this.state.valorDeBusqueda
              .toLocaleLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
          ) === true
      ) {
        resultData.push(temporalData[i]);
      }
    }

    this.setState({ data: resultData });
  }

  addProductToCart = () => {
    Alert.alert("Success", "The product has been added to your cart");
  };

  async componentDidMount() {
    await this.loadId();
    await this.loadNews();
    this.setState({ data: this.state.dataCargada });
    this.setState({ valorDeBusqueda: "" });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.formContent}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputs}
              ref={"txtPassword"}
              placeholder="Buscar en tu inventario"
              underlineColorAndroid="transparent"
              onChangeText={(valorDeBusqueda) =>
                this.realizarBusqueda(valorDeBusqueda)
              }
            />
          </View>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("AddItemInventory")}
            style={{
              width: 300,
              alignItems: "center",
              height: 40,
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
              borderRadius: 10,
              backgroundColor: "#ddded9",
              textAlign: "center",
              marginBottom: 10,
              marginTop: 5,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                flex: 1,
                justifyContent: "center",
                fontSize: 15,
              }}
            >
              Agregar elemento al inventario
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          style={styles.list}
          contentContainerStyle={styles.listContainer}
          data={this.state.data}
          horizontal={false}
          numColumns={2}
          keyExtractor={(item) => {
            return item.id;
          }}
          ItemSeparatorComponent={() => {
            return <View style={styles.separator} />;
          }}
          renderItem={(post) => {
            const item = post.item;
            return (
              <TouchableOpacity
                style={styles.card}
                onPress={() =>
                  this.props.navigation.navigate("InventoryItem", {
                    id: item.productoGUID,
                  })
                }
              >
                <View style={styles.imageContainer}>
                  <Image
                    style={styles.cardImage}
                    source={{ uri: item.fotoProducto }}
                  />
                </View>
                <View style={styles.cardContent}>
                  <Text style={styles.title}>{item.titulo}</Text>
                  <Text style={styles.count}>Cantidad: {item.cantidad}</Text>
                  <Text style={styles.count}>
                    Caducidad: {this.parseDate(item.fechaCaducidad)}
                  </Text>
                </View>
              </TouchableOpacity>
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
    marginTop: 20,
  },
  list: {
    paddingHorizontal: 10,
  },
  listContainer: {
    alignItems: "center",
  },
  separator: {
    marginTop: 10,
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
  /******** card **************/
  card: {
    marginVertical: 8,
    backgroundColor: "white",
    flexBasis: "45%",
    marginHorizontal: 10,
  },
  cardContent: {
    paddingVertical: 17,
    justifyContent: "center",
    alignContent: "center",
    textAlign: "center",
    alignItems: "center",
  },
  cardImage: {
    flex: 1,
    height: 150,
    width: null,
  },
  imageContainer: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
  /******** card components **************/
  title: {
    fontSize: 18,
    flex: 1,
    color: "#454545",
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1,
  },
  count: {
    fontSize: 18,
    flex: 1,
    color: "#454545",
  },
});
