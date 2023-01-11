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

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false,
      fullName: "",
      email: "",
      password: "",
      acidos: ["", "", "", "", ""],
      pesos: ["", "", "", "", ""],
      tiempos: ["", "", "", "", ""],
      ibus: ["0", "0", "0", "0", "0"],
      densidad: "",
      volumen: "",
      resultado: "",
    };
  }

  handleClear = () => {
    const listaVacia = ["", "", "", "", ""];
    this.setState({ acidos: listaVacia });
    this.setState({ pesos: listaVacia });
    this.setState({ tiempos: listaVacia });
    this.setState({ densidad: "" });
    this.setState({ volumen: "" });
    this.setState({ resultado: "" });
  };

  handleAlfaAcido = (input, index) => {
    const acidos = this.state.acidos;
    acidos[index] = input;
    this.setState({ acidos: acidos });
  };

  handlePeso = (input, index) => {
    const pesos = this.state.pesos;
    pesos[index] = input;
    this.setState({ pesos: pesos });
  };

  handleTiempo = (input, index) => {
    const tiempos = this.state.tiempos;
    tiempos[index] = input;
    this.setState({ tiempos: tiempos });
  };

  handleCalcular = () => {
    const acidos = this.state.acidos;
    const pesos = this.state.pesos;
    const tiempos = this.state.tiempos;
    const densidad = this.state.densidad;
    const volumen = this.state.volumen;
    const ibus = this.state.ibus;

    for (let i = 0; i < 5; i++) {
      if (
        acidos[i] !== "" &&
        pesos[i] !== "" &&
        tiempos[i] !== "" &&
        densidad !== "" &&
        volumen !== ""
      ) {
        const ibu =
          ((parseFloat(acidos[i]) * parseFloat(pesos[i]) * 1000) /
            (parseFloat(densidad) * parseFloat(volumen) * 60)) *
          parseFloat(tiempos[i]);
        ibus[i] = ibu.toFixed(2);
      } else {
        ibus[i] = "0";
      }
    }

    let totalIbu = 0;
    for (let i = 0; i < 5; i++) {
      totalIbu += parseFloat(ibus[i]);
    }

    this.setState({ resultado: totalIbu.toFixed(2) });
    this.setState({ ibus: ibus });
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text
            style={{
              fontSize: 15,
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            Llenar uno o más lúpulos es opcional dependiendo de la cantidad de
            lúpulos que se usen
          </Text>
          <Text style={{ fontSize: 30 }}>Lúpulo 1</Text>
          <Text style={{ color: "black", textAlign: "center", margin: 1 }}>
            Alfa-acidos (%)
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputs}
              placeholder="Ejem: 5.5"
              underlineColorAndroid="transparent"
              onChangeText={(input) => this.handleAlfaAcido(input, 0)}
              value={this.state.acidos[0]}
            />
          </View>
          <Text style={{ color: "black", textAlign: "center", margin: 1 }}>
            Peso
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputs}
              placeholder="Gramos"
              underlineColorAndroid="transparent"
              onChangeText={(input) => this.handlePeso(input, 0)}
              value={this.state.pesos[0]}
            />
          </View>
          <Text style={{ color: "black", textAlign: "center", margin: 1 }}>
            Tiempo
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputs}
              placeholder="Minutos"
              underlineColorAndroid="transparent"
              onChangeText={(input) => this.handleTiempo(input, 0)}
              value={this.state.tiempos[0]}
            />
          </View>
          <Text style={{ color: "black", textAlign: "center", margin: 1 }}>
            IBUs del lúpulo
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputs}
              editable={false}
              defaultValue="0"
              underlineColorAndroid="transparent"
              value={this.state.ibus[0]}
            />
          </View>

          <Text style={{ fontSize: 30 }}>Lúpulo 2</Text>
          <Text style={{ color: "black", textAlign: "center", margin: 1 }}>
            Alfa-acidos (%)
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputs}
              placeholder="Ejem: 5.5"
              underlineColorAndroid="transparent"
              onChangeText={(input) => this.handleAlfaAcido(input, 1)}
              value={this.state.acidos[1]}
            />
          </View>
          <Text style={{ color: "black", textAlign: "center", margin: 1 }}>
            Peso
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputs}
              placeholder="Gramos"
              underlineColorAndroid="transparent"
              onChangeText={(input) => this.handlePeso(input, 1)}
              value={this.state.pesos[1]}
            />
          </View>
          <Text style={{ color: "black", textAlign: "center", margin: 1 }}>
            Tiempo
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputs}
              placeholder="Minutos"
              underlineColorAndroid="transparent"
              onChangeText={(input) => this.handleTiempo(input, 1)}
              value={this.state.tiempos[1]}
            />
          </View>
          <Text style={{ color: "black", textAlign: "center", margin: 1 }}>
            IBUs del lúpulo
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputs}
              editable={false}
              defaultValue="0"
              underlineColorAndroid="transparent"
              value={this.state.ibus[1]}
            />
          </View>

          <Text style={{ fontSize: 30 }}>Lúpulo 3</Text>
          <Text style={{ color: "black", textAlign: "center", margin: 1 }}>
            Alfa-acidos (%)
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputs}
              placeholder="Ejem: 5.5"
              underlineColorAndroid="transparent"
              onChangeText={(input) => this.handleAlfaAcido(input, 2)}
              value={this.state.acidos[2]}
            />
          </View>
          <Text style={{ color: "black", textAlign: "center", margin: 1 }}>
            Peso
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputs}
              placeholder="Gramos"
              underlineColorAndroid="transparent"
              onChangeText={(input) => this.handlePeso(input, 2)}
              value={this.state.pesos[2]}
            />
          </View>
          <Text style={{ color: "black", textAlign: "center", margin: 1 }}>
            Tiempo
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputs}
              placeholder="Minutos"
              underlineColorAndroid="transparent"
              onChangeText={(input) => this.handleTiempo(input, 2)}
              value={this.state.tiempos[2]}
            />
          </View>
          <Text style={{ color: "black", textAlign: "center", margin: 1 }}>
            IBUs del lúpulo
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputs}
              editable={false}
              defaultValue="0"
              underlineColorAndroid="transparent"
              value={this.state.ibus[2]}
            />
          </View>

          <Text style={{ fontSize: 30 }}>Lúpulo 4</Text>
          <Text style={{ color: "black", textAlign: "center", margin: 1 }}>
            Alfa-acidos (%)
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputs}
              placeholder="Ejem: 5.5"
              underlineColorAndroid="transparent"
              onChangeText={(input) => this.handleAlfaAcido(input, 3)}
              value={this.state.acidos[3]}
            />
          </View>
          <Text style={{ color: "black", textAlign: "center", margin: 1 }}>
            Peso
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputs}
              placeholder="Gramos"
              underlineColorAndroid="transparent"
              onChangeText={(input) => this.handlePeso(input, 3)}
              value={this.state.pesos[3]}
            />
          </View>
          <Text style={{ color: "black", textAlign: "center", margin: 1 }}>
            Tiempo
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputs}
              placeholder="Minutos"
              underlineColorAndroid="transparent"
              onChangeText={(input) => this.handleTiempo(input, 3)}
              value={this.state.tiempos[3]}
            />
          </View>
          <Text style={{ color: "black", textAlign: "center", margin: 1 }}>
            IBUs del lúpulo
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputs}
              editable={false}
              defaultValue="0"
              underlineColorAndroid="transparent"
              value={this.state.ibus[3]}
            />
          </View>

          <Text style={{ fontSize: 30 }}>Lúpulo 5</Text>
          <Text style={{ color: "black", textAlign: "center", margin: 1 }}>
            Alfa-acidos (%)
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputs}
              placeholder="Ejem: 5.5"
              underlineColorAndroid="transparent"
              onChangeText={(input) => this.handleAlfaAcido(input, 4)}
              value={this.state.acidos[4]}
            />
          </View>
          <Text style={{ color: "black", textAlign: "center", margin: 1 }}>
            Peso
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputs}
              placeholder="Gramos"
              underlineColorAndroid="transparent"
              onChangeText={(input) => this.handlePeso(input, 4)}
              value={this.state.pesos[4]}
            />
          </View>
          <Text style={{ color: "black", textAlign: "center", margin: 1 }}>
            Tiempo
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputs}
              placeholder="Minutos"
              underlineColorAndroid="transparent"
              onChangeText={(input) => this.handleTiempo(input, 4)}
              value={this.state.tiempos[4]}
            />
          </View>
          <Text style={{ color: "black", textAlign: "center", margin: 1 }}>
            IBUs del lúpulo
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputs}
              editable={false}
              defaultValue="0"
              underlineColorAndroid="transparent"
              value={this.state.ibus[4]}
            />
          </View>

          <Text style={{ fontSize: 30 }}>Parmáteros de producción</Text>
          <Text style={{ color: "black", textAlign: "center", margin: 1 }}>
            Densidad Inicial
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputs}
              placeholder="Ejemplo: 100"
              underlineColorAndroid="transparent"
              onChangeText={(input) => this.setState({ densidad: input })}
              value={this.state.densidad}
            />
          </View>
          <Text style={{ color: "black", textAlign: "center", margin: 1 }}>
            Volumen en Litros
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputs}
              placeholder="Ejemplo: 100"
              underlineColorAndroid="transparent"
              onChangeText={(input) => this.setState({ volumen: input })}
              value={this.state.volumen}
            />
          </View>

          <TouchableOpacity
            style={[styles.buttonContainer, styles.signupButton]}
            onPress={() => {
              this.handleClear();
            }}
          >
            <Text style={styles.signUpText}>Limpiar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonContainer, styles.signupButton]}
            onPress={() => this.handleCalcular()}
          >
            <Text style={styles.signUpText}>Calcular</Text>
          </TouchableOpacity>

          <Text style={{ color: "black", textAlign: "center", margin: 20 }}>
            Resultado
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
              editable={false}
              placeholder="Total de IBUs"
              underlineColorAndroid="transparent"
              value={this.state.resultado}
            />
          </View>
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
    backgroundColor: "#white",
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
