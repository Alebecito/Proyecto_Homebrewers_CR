
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  Alert,
  ScrollView,
  TextInput,
  FlatList,
  TouchableOpacity, Button, AsyncStorage
} from 'react-native';

export default class ContactsView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      valorDeBusqueda: '',
      UsuarioLogeado: '',
      bloqueadoAuxiliar: false,
      dataCargada: [],
      data: [],
    };
  }

  checkIfBlocked = async (id) => {
      
    await fetch(`http://10.0.2.2:5000/relaciones/CheckIfUserBlocked/${id}/${this.state.UsuarioLogeado}`,
      { method: 'GET', }).then((response) => response.json()).then((responseJson) => {
        
        this.setState({ bloqueadoAuxiliar: responseJson[0].length>0?true:false });

      }
      ).catch((error) => {
        console.log(error)
      }
      );

}


  async realizarBusqueda(input) {
    await this.setState({ valorDeBusqueda: input });
    var temporalData = this.state.dataCargada;
    if (input === '') {

      this.setState({ data: this.state.dataCargada });
      return;
    }
    var resultData = [];
    var tituloAuxiliar = '';
    for (var i = 0; i < temporalData.length; i++) {

      var tituloAuxiliar = temporalData[i].description;
      if (tituloAuxiliar.toLocaleLowerCase().startsWith(this.state.valorDeBusqueda.toLocaleLowerCase()) === true) {
        resultData.push(temporalData[i]);
      }
    }

    this.setState({ data: resultData });
  }
  loadId = async () => {
    try {
      const id = await AsyncStorage.getItem('UsuarioLogeado');
      this.setState({ UsuarioLogeado: id });
    } catch (error) {
      console.log(error);
    }
  }

  loadUsers = async () => {
    await fetch('http://10.0.2.2:5000/usuario/getAllEnabledUsersInfo/',
      { method: 'GET', }).then((response) => response.json()).then(async(responseJson) => {
        var temporalData = [];
        for (var i = 0; i < responseJson.length; i++) {
          await this.checkIfBlocked(responseJson[i].usuarioGUID);
          if(this.state.bloqueadoAuxiliar!=true){
          if (responseJson[i].usuarioGUID != this.state.UsuarioLogeado) {
            temporalData.push({ id: responseJson[i].usuarioGUID, icon: responseJson[i].fotoDePerfil, description: responseJson[i].nombre });
          }
        }
      }
        this.setState({ dataCargada: temporalData });
      });
  }

  async componentDidMount() {
    await this.loadId();
    await this.loadUsers();
    this.setState({ data: this.state.dataCargada });
    this.setState({valorDeBusqueda:''});

  }

  onClickListener = (viewId) => {
    Alert.alert("Alert", "Button pressed " + viewId);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.formContent}>
          <View style={styles.inputContainer}>

            <TextInput style={styles.inputs}
              ref={'txtPassword'}
              placeholder="Buscar nombre de usuario"
              underlineColorAndroid='transparent'
              onChangeText={(valorDeBusqueda) => this.realizarBusqueda(valorDeBusqueda)} />
          </View>
        </View>

        <FlatList
          style={styles.notificationList}
          data={this.state.data}
          keyExtractor={(item) => {
            return item.id;
          }}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity style={styles.notificationBox} onPress={() => { this.props.navigation.navigate("OtherProfile") }}>
                <Image style={styles.image} source={{ uri: item.icon }} />
                <Text style={styles.name}>{item.description}</Text>

              </TouchableOpacity>
            )
          }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
  },
  formContent: {
    flexDirection: 'row',
    marginTop: 30,
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    margin: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
  iconBtnSearch: {
    alignSelf: 'center'
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputIcon: {
    marginLeft: 15,
    justifyContent: 'center'
  },
  notificationList: {
    marginTop: 20,
    padding: 10,
  },
  notificationBox: {
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 5,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    borderRadius: 10,
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 20,
    marginLeft: 20
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "#000000",
    marginLeft: 10,
    alignSelf: 'center'
  },
}); 