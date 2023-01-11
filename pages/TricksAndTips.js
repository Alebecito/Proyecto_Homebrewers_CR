import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  Alert,
  ScrollView,
} from "react-native";

export default class CompanyDescriptionView extends Component {
  constructor(props) {
    super(props);
  }

  onClickListener = (viewId) => {
    Alert.alert("Alert", "Button pressed ");
  };

  render() {
    return (
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.container}>
          <Image
            style={{ width: 300, height: 200, marginBottom: 40 }}
            source={require("../assets/images/logo.png")}
          />
          <Image
            style={styles.logo}
            source={{
              uri: "https://img.icons8.com/stickers/512/classroom.png",
            }}
          />
          <Text style={styles.slogan}>
            ¡Tu también puedes ser cervecero artesanal!
          </Text>
          <View style={styles.descriptionContent}>
            <Text style={styles.description}>
              Se puede hacer buena cerveza con un equipo muy básico. Es por eso
              que no se recomienda gastar mucho. Por dos razones, si nos damos
              cuenta que la cervecería no es lo nuestro, no incurrimos en un
              gasto muy grande. La segunda es que se aprende mucho más con
              equipos más básicos, uno tiene más contacto con el proceso y los
              materiales.
            </Text>
            <Image
              style={{ width: 350, height: 350 }}
              source={{
                uri: "https://images.squarespace-cdn.com/content/v1/56e0a7dae707eb4ea75d3915/1529437610464-V5RA145CM71Z2GQ6WUJZ/brewing_beer_ingredients.jpg?format=1000w",
              }}
            />
            <Text style={styles.description}>
              Se recomienda iniciar con una receta que no presente
              complicaciones, generalmente, estas carecen de lúpulos adicionales
              y con poca malta, esto disminuye la dificultad del cocinado. Otro
              método útil es iniciar por estilos de cerveza más oscuros, ya que
              de esta forma se pueden ocultar imperfecciones en la cerveza.
            </Text>
            <Image
              style={{ width: 350, height: 350 }}
              source={{
                uri: "https://www.liquor.com/thmb/g8j81x1BLqWicFenwikKnVWbtQg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-910481830-3c75cb0cfadb4e868961a02e748c2b27.jpg",
              }}
            />
            <Text style={styles.description}>
              Es recomendable antes de iniciarnos con una cerveza nueva, probar
              varias muestras de ese estilo para saber qué nos gusta y que no
              nos gusta del mismo. En base a eso podemos tener en mente la
              cerveza que queremos lograr.
            </Text>
            <Image
              style={{ width: 350, height: 350 }}
              source={{
                uri: "https://i0.wp.com/farmfreshex.com/wp-content/uploads/2019/10/iStock-854848732_0_0.jpg?fit=870%2C565&ssl=1",
              }}
            />
          </View>
          <TouchableHighlight
            style={[styles.buttonContainer, styles.sendButton]}
            onPress={() => this.props.navigation.goBack()}
          >
            <Text style={styles.buttonText}>Regresar</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
    justifyContent: "center",
    marginBottom: 10,
    marginTop: 30,
  },
  companyName: {
    fontSize: 32,
    fontWeight: "600",
    color: "black",
  },
  slogan: {
    fontSize: 18,
    fontWeight: "600",
    color: "#454545",
    marginTop: 10,
  },
  descriptionContent: {
    padding: 30,
  },
  description: {
    fontSize: 18,
    textAlign: "left",
    marginTop: 10,
    color: "#black",
  },
  buttonContainer: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 100,
    borderRadius: 30,
  },
  sendButton: {
    backgroundColor: "#FFFFFF",
  },
  buttonText: {
    color: "#black",
  },
});
