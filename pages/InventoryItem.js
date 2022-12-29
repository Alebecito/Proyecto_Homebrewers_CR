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
} from "react-native";

export default class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  clickEventListener() {
    Alert.alert("Producto Eliminado");
  }

  parseDate = (date) => {
    const d = new Date(date);
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  async getSpecificProduct() {
    const id = this.props.route.params.id;
    await fetch(`http://10.0.2.2:5000/producto/getSpecificProduct/${id}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ data: responseJson[0] });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async componentDidMount() {
    await this.getSpecificProduct();
  }

  render() {
    return (
      <View style={[styles.container, { backgroundColor: "#f0f2f5" }]}>
        <ScrollView>
          <View style={{ alignItems: "center", marginHorizontal: 30 }}>
            <Image
              style={styles.productImg}
              source={{ uri: `${this.state.data.fotoProducto}` }}
            />

            <Text style={styles.name}> {this.state.data.titulo} </Text>
            <Text style={styles.price}>
              Cantidad: {this.state.data.cantidad}
            </Text>
            <Text style={styles.price}>
              Fecha de Caducidad:{" "}
              {this.parseDate(this.state.data.fechaCaducidad)}
            </Text>

            <Text style={styles.description}>{this.state.data.cuerpo}</Text>
          </View>

          <View style={styles.separator}></View>
          <View style={styles.addToCarContainer}>
            <TouchableOpacity
              style={styles.shareButton}
              onPress={() =>
                this.props.navigation.navigate("EditItem", {
                  data: this.state.data,
                })
              }
            >
              <Text style={styles.shareButtonText}>Editar producto</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.shareButton}
              onPress={() => this.clickEventListener()}
            >
              <Text style={styles.shareButtonText}>
                Eliminar del inventario
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  productImg: {
    width: 300,
    height: 300,
  },
  name: {
    fontSize: 28,
    color: "#454545",
    fontWeight: "bold",
  },
  price: {
    marginTop: 10,
    fontSize: 18,
    color: "454545",
    fontWeight: "bold",
  },
  description: {
    textAlign: "center",
    marginTop: 10,
    color: "#454545",
  },
  star: {
    width: 40,
    height: 40,
  },
  btnColor: {
    height: 30,
    width: 30,
    borderRadius: 30,
    marginHorizontal: 3,
  },
  btnSize: {
    height: 40,
    width: 40,
    borderRadius: 40,
    borderColor: "#778899",
    borderWidth: 1,
    marginHorizontal: 3,
    backgroundColor: "white",

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  starContainer: {
    justifyContent: "center",
    marginHorizontal: 30,
    flexDirection: "row",
    marginTop: 20,
  },
  contentColors: {
    justifyContent: "center",
    marginHorizontal: 30,
    flexDirection: "row",
    marginTop: 20,
  },
  contentSize: {
    justifyContent: "center",
    marginHorizontal: 30,
    flexDirection: "row",
    marginTop: 20,
  },
  separator: {
    height: 2,

    marginTop: 20,
    marginHorizontal: 30,
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
  addToCarContainer: {
    marginHorizontal: 30,
  },
});
