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
  Alert,
} from "react-native";
import moment from "moment";

export default class PostView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: [],
      userData: [],
      comentarios: [],
      comment: "",
    };
  }


  
  parseDate = (date) => {
    const d = new Date(date);
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };




  eliminarPublicacion = async () => {
    await Alert.alert(
      "Eliminar Publicación",
      "¿Estas seguro que deseas eliminar esta publicación?",
      [
        {
          text: "Cancelar",
          onPress: () => {},
          style: "cancel"
        },
        { text: "Aceptar", onPress: async () => {
          await fetch(`http://10.0.2.2:5000/publicacionesnoticias/deleteNewOrPublication/${this.state.post.publicacionNoticiaGUID}`,
          {method: 'DELETE'});
          Alert.alert("Sistema","Publicación eliminada!")
          this.props.navigation.navigate("HomePage");
        }
       }
      ]
    );

    
    
  };


  async getComments() {
    await fetch(
      `http://10.0.2.2:5000/comentarios/getAllCommentsFromPublicationNew/${this.state.post.publicacionNoticiaGUID}`
    )
      .then((response) => response.json())
      .then((responseJson) => {
        const result = responseJson[0].map((item, index) => ({
          ...item,
          id: index + 1,
        }));
        this.setState({ comentarios: result });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve);
    });
  }

  async componentDidMount() {
    await this.setStateAsync({ post: this.props.route.params.postData });
    await this.setStateAsync({ userData: this.props.route.params.userData });
    await this.getComments();
  }

  addComment = async () => {

    
    const formData = new FormData();
    const currentDate = new Date();
    formData.append("contenido", this.state.comment);
    formData.append("deUsuarioGUID", this.state.userData.usuarioGUID);
    formData.append("fecha", moment(currentDate).format("YYYY-MM-DD"));

    await fetch(
      `http://10.0.2.2:5000/comentarios/addComment/${this.state.post.publicacionNoticiaGUID}`,
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

  navigateToOtherProfile(id) {
   
    
    if(id === this.state.userData.usuarioGUID){
      this.props.navigation.navigate("MyProfile");
    }else{
      this.props.navigation.navigate("OtherProfile",{idOtroUsuario: id});
    }
  }

  footerComponent() {
    return (
      <View style={styles.container}>
        <View style={styles.postContent}>
          <TextInput
            editable
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

          <TouchableOpacity style={styles.shareButton}
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
            source={{
              uri: `${this.state.post.fotoPublicacionNoticia}`,
            }}
          />
        </View>

        <View style={styles.postContent}>
          <Text style={styles.postTitle}>{this.state.post.titulo}</Text>

          <Text style={styles.postDescription}>{this.state.post.cuerpo}</Text>

          <Text style={styles.tags}>
            Precio expuesto: ₡ {this.state.post.precioExpuesto}
          </Text>

          <Text style={styles.date}>
            Fecha de caducidad de la publicación:{" "}
            {this.parseDate(this.state.post.fecha)}
          </Text>

          <TouchableOpacity
            style={styles.profile}
            onPress={() => navigationC.navigate("MyProfile")}
          >
            <Image
              style={styles.avatar}
              source={{
                uri: `${this.state.userData.fotoDePerfil}`,
              }}
            />

            <Text style={styles.name}>
              {this.state.userData.nombre} {"\n"}
              {this.state.post.cantidadDeLikes} Me gusta
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.shareButton}
            onPress={() =>
              navigationC.navigate("EditPublication", { post: this.state.post })
            }
          >
            <Text style={styles.shareButtonText}>Editar precio de la publicación</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareButton} onPress={()=> this.eliminarPublicacion()}>
            <Text style={styles.shareButtonText}>Eliminar Publicación</Text>
          </TouchableOpacity>
        </View>
        <Text style={{ textAlign: "center" }}>Comentarios</Text>
      </View>
    );
  }

  render() {
    return (
      <View>
        <FlatList
          style={styles2.root}
          data={this.state.comentarios}
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
                  onPress={() => this.navigateToOtherProfile(Notification.deUsuarioGUID)}
                >
                  <Image
                    style={styles2.image}
                    source={{ uri: Notification.fotoDePerfil }}
                  />
                </TouchableOpacity>
                <View style={styles2.content}>
                  <View style={styles2.contentHeader}>
                    <Text style={styles2.name}>{Notification.nombre}</Text>
                    <Text style={styles2.time}>
                      {this.parseDate(Notification.fecha)}
                    </Text>
                  </View>
                  <Text rkType="primary3 mediumLine">
                    {Notification.contenido}
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
    color: "#FFFFFF",
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
    color: "#696969",
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
