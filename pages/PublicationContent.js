import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView, FlatList, TextInput, Dimensions, Modal,
} from 'react-native';

export default class PostView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,

      data: [
        { id: 1, image: "https://bootdey.com/img/Content/avatar/avatar1.png", name: "Frank Odalthh", comment: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor." },
        { id: 2, image: "https://bootdey.com/img/Content/avatar/avatar6.png", name: "John DoeLink", comment: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor." },
        { id: 3, image: "https://bootdey.com/img/Content/avatar/avatar7.png", name: "March SoulLaComa", comment: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor." },
        { id: 4, image: "https://bootdey.com/img/Content/avatar/avatar2.png", name: "Finn DoRemiFaso", comment: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor." },
        { id: 5, image: "https://bootdey.com/img/Content/avatar/avatar3.png", name: "Maria More More", comment: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor." },
        { id: 6, image: "https://bootdey.com/img/Content/avatar/avatar4.png", name: "Clark June Boom!", comment: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor." },
        { id: 7, image: "https://bootdey.com/img/Content/avatar/avatar5.png", name: "The googler", comment: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor." },
      ]
    }
  }


  clickEventListener = () => {
    this.setModalVisible(true);
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  navigateToOtherProfile() {
    this.props.navigation.navigate("OtherProfile");
  }


  footerComponent() {
    return (
      <View style={styles.container}>
        <View style={styles.postContent}>
          <TextInput editable maxLength={255} style={{
            margin: 15,
            height: 120,
            borderColor: '#000000',
            borderWidth: 1, textAlignVertical: 'top'
          }} placeholder="Agrega un comentario! (255 caracteres)" multiline={true}
            numberOfLines={4} />

          <TouchableOpacity style={styles.shareButton}>
            <Text style={styles.shareButtonText}>Comentar</Text>
          </TouchableOpacity>
        </View>


      </View>
    )
  }

  headerComponent(navigationC) {
    return (
      <View style={styles.container}>

        <View style={styles.header}>
          <Image style={styles.productImg} source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnk8TdboBlcYde9vFO1xpBR2_RxJ578Zhey4LcEsxw5UgkpqFEABDChloQ1tiItk-cTgI&usqp=CAU" }} />
        </View>

        <View style={styles.postContent}>
          <Text style={styles.postTitle}>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
          </Text>

          <Text style={styles.postDescription}>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
            Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.
          </Text>

          <Text style={styles.tags}>
            Precio expuesto: ₡ 200
          </Text>

          <Text style={styles.date}>
            Fecha de caducidad de la publicación: 2017-11-27
          </Text>

          <TouchableOpacity style={styles.profile} onPress={() => navigationC.navigate("OtherProfile")}>
            <Image style={styles.avatar}
              source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar1.png' }} />

            <Text style={styles.name}>
              Johan Doe {"\n"}20 Me gusta
            </Text>




          </TouchableOpacity>
          <TouchableOpacity style={styles.shareButton}>
            <Text style={styles.shareButtonText}>Me gusta esta publicación</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{
            width:120,
            marginTop: 10,
            height: 20,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 30,
            backgroundColor: "red",
          }} onPress={() => { this.clickEventListener() }}>
            <Text style={{
              color: "#FFFFFF",
              fontSize: 10,
            }}>Reportar Publicación</Text>
          </TouchableOpacity>


        </View>
        <Text style={{ textAlign: "center" }}>Comentarios</Text>
        <Modal
          animationType={'fade'}
          transparent={true}
          onRequestClose={() => this.setModalVisible(false)}
          visible={this.state.modalVisible}>

          <View style={stylesReport.popupOverlay}>
            <View style={stylesReport.popup}>
              <View style={stylesReport.popupContent}>
                <ScrollView contentContainerStyle={stylesReport.modalInfo}>
                  <Image style={stylesReport.image} source={{ uri: "https://img.icons8.com/stickers/512/system-report.png" }} />
                  <Text style={stylesReport.name}>Realizar un Reporte</Text>
                  <Text style={stylesReport.about}>Descripción del reporte</Text>
                </ScrollView>
                <TextInput editable maxLength={255} style={{
                  margin: 15,

                  height: 80,
                  borderColor: '#000000',
                  borderWidth: 1, textAlignVertical: 'top'
                }} placeholder="Describe el motivo del reporte (255 caracteres)" multiline={true}
                  numberOfLines={4} />
              </View>
              <View style={stylesReport.popupButtons}>
                <TouchableOpacity onPress={() => { this.setModalVisible(false) }} style={[stylesReport.btnClose, { marginRight: 10 }]}>
                  <Text style={{ textAlign: "center", fontSize: 20, color: "white" }}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { this.setModalVisible(false) }} style={[stylesReport.btnClose, { marginLeft: 10 }]}>
                  <Text style={{ textAlign: "center", fontSize: 20, color: "white" }}>Enviar</Text>
                </TouchableOpacity>
              </View>

            </View>
          </View>
        </Modal>

      </View>
    )
  }

  render() {
    return (

      <View >
        <FlatList
          style={styles2.root}
          data={this.state.data}
          ListHeaderComponent={this.headerComponent(this.props.navigation)}
          ListFooterComponent={this.footerComponent()}
          extraData={this.state}
          ItemSeparatorComponent={() => {
            return (
              <View style={styles2.separator} />
            )
          }}
          keyExtractor={(item) => {
            return item.id;
          }}
          renderItem={(item) => {
            const Notification = item.item;
            return (
              <View style={styles2.container}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("OtherProfile")}>
                  <Image style={styles2.image} source={{ uri: Notification.image }} />
                </TouchableOpacity>
                <View style={styles2.content}>
                  <View style={styles2.contentHeader}>
                    <Text style={styles2.name}>{Notification.name}</Text>
                    <Text style={styles2.time}>
                      9:58 am
                    </Text>
                  </View>
                  <Text rkType='primary3 mediumLine'>{Notification.comment}</Text>
                </View>
              </View>
            );
          }} />
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
    alignItems: 'center',
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
    fontWeight: '600',
  },
  postContent: {
    flex: 1,
    padding: 30,
  },
  postTitle: {
    fontSize: 26,
    fontWeight: '600',
  },
  postDescription: {
    fontSize: 16,
    marginTop: 10,
  },
  tags: {
    color: '#00BFFF',
    marginTop: 10,
  },
  date: {
    color: '#696969',
    marginTop: 10,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 35,
    borderWidth: 4,
    borderColor: "#00BFFF",
  },
  profile: {
    flexDirection: 'row',
    marginTop: 20
  },
  name: {
    fontSize: 22,
    color: "#00BFFF",
    fontWeight: '600',
    alignSelf: 'center',
    marginLeft: 10
  },
  shareButton: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: "#00BFFF",
  },
  productImg: {
    width: 200,
    height: 200,

  },
  shareButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
  }
});

const styles2 = StyleSheet.create({
  root: {
    backgroundColor: "#ffffff",
    marginTop: 10,
    flexGrow: 0
  },
  container: {
    paddingLeft: 19,
    paddingRight: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  content: {
    marginLeft: 16,
    flex: 1,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6
  },
  separator: {
    height: 1,
    backgroundColor: "#CCCCCC"
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 20,
    marginLeft: 20
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



const stylesReport = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: "#eeeeee"
  },
  header: {
    backgroundColor: "#00CED1",
    height: 200
  },
  headerContent: {
    padding: 30,
    alignItems: 'center',
    flex: 1,
  },
  detailContent: {
    top: 80,
    height: 500,
    width: Dimensions.get('screen').width - 90,
    marginHorizontal: 30,
    flexDirection: 'row',
    position: 'absolute',
    backgroundColor: "#ffffff"
  },
  userList: {
    flex: 1,
  },
  cardContent: {
    marginLeft: 20,
    marginTop: 10
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },



  card: {
    shadowColor: '#00000021',
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
    flexBasis: '46%',
    padding: 10,
    flexDirection: 'row'
  },

  name: {
    fontSize: 18,
    flex: 1,
    alignSelf: 'center',
    color: "#008080",
    fontWeight: 'bold'
  },
  position: {
    fontSize: 14,
    flex: 1,
    alignSelf: 'center',
    color: "#696969"
  },
  about: {
    marginHorizontal: 10
  },

  followButton: {
    marginTop: 10,
    height: 35,
    width: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: "#00BFFF",
  },
  followButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
  },
  /************ modals ************/
  popup: {
    backgroundColor: 'white',
    marginTop: 80,
    marginHorizontal: 20,
    borderRadius: 7,
  },
  popupOverlay: {
    backgroundColor: "#00000057",
    flex: 1,
    marginTop: 30
  },
  popupContent: {
    //alignItems: 'center',
    margin: 5,
    height: 250,
  },
  popupHeader: {
    marginBottom: 45
  },
  popupButtons: {
    marginTop: 15,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: "#eee",
    justifyContent: 'center'
  },
  popupButton: {
    flex: 1,
    marginVertical: 16
  },
  btnClose: {
    height: 35,
    backgroundColor: '#20b2aa',
    width: 100
  },
  modalInfo: {
    alignItems: 'center',
    justifyContent: 'center',
  }
});