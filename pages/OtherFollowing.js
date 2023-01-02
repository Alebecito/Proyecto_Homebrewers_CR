import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList, AsyncStorage
} from "react-native";

export default class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idOtroUsuario: '',
      UsuarioLogeado: "",
      data: [
        
      ],
    };
  }

  loadUsers = async () => {
    await fetch(`http://10.0.2.2:5000/relaciones/getFollowingFromUser/${this.state.idOtroUsuario}`, 
    {method: 'GET'}).then((response) => response.json()).then((responseJson) => {
      var temporalData = [];
      for (var i = 0; i < responseJson[0].length; i++) {
        temporalData.push({
          id: responseJson[0][i].usuarioGUID,
          name: responseJson[0][i].nombre,
          position: responseJson[0][i].descripcion,
          image: responseJson[0][i].fotoDePerfil,
          relacion: "Dejar de Seguir",
        });

      }

      this.setState({ data: temporalData });



    }).catch((error) => {
      console.error(error);
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
  async componentDidMount() {
    this.setState({ idOtroUsuario: this.props.route.params.idOtroUsuario });
    await this.loadId();
    await this.loadUsers();

  }

  clickEventListenerProfile(item) {
    this.props.navigation.navigate("OtherProfile",{idOtroUsuario:item.id});
  }

  clickEventListenerFollow(item) {
    Alert.alert(item.relacion);
  }
 

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.list}
          contentContainerStyle={styles.listContainer}
          data={this.state.data}
          horizontal={false}
          numColumns={2}
          keyExtractor={(item) => {
            return item.id;
          }}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={styles.card}
                onPress={() => {
                  this.clickEventListenerProfile(item);
                }}
              >
                <View style={styles.cardHeader}></View>
                <Image style={styles.userImage} source={{ uri: item.image }} />
                <View style={styles.cardFooter}>
                  <View
                    style={{ alignItems: "center", justifyContent: "center" }}
                  >
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.position}>{item.position}</Text>
                    <TouchableOpacity
                      style={
                        item.relacion === "Seguir"
                          ? styles.followButton
                          : styles.UnfollowButton
                      }
                      onPress={() => this.clickEventListenerFollow(item)}
                    >
                      <Text
                        style={
                          item.relacion === "Seguir"
                            ? styles.followButtonText
                            : styles.UnfollowButtonText
                        }
                      >
                        {item.relacion}
                      </Text>
                    </TouchableOpacity>
                  </View>
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
    paddingHorizontal: 5,
    backgroundColor: "#E6E6E6",
  },
  listContainer: {
    alignItems: "center",
  },
  /******** card **************/
  card: {
    shadowColor: "#00000021",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginVertical: 5,
    backgroundColor: "white",
    flexBasis: "46%",
    marginHorizontal: 5,
  },
  cardFooter: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  userImage: {
    height: 120,
    width: 120,
    borderRadius: 60,
    alignSelf: "center",
    borderColor: "#454545",
    borderWidth: 3,
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
  followButton: {
    marginTop: 10,
    height: 35,
    width: 130,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "#454545",
  },

  UnfollowButton: {
    marginTop: 10,
    height: 35,
    width: 130,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "#e4e8f0",
  },
  followButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    textAlign: "center",
  },
  unfollowButtonText: {
    color: "#5b6069",
    fontSize: 17,
    textAlign: "center",
  },
  icon: {
    height: 20,
    width: 20,
  },
});
