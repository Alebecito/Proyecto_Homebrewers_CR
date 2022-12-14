import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView, Dimensions, Modal, TextInput
} from 'react-native';

export default class PostView extends Component {

  constructor(props) {
  super(props);

  this.state = {
    modalVisible: false,
  }
  }

  clickEventListener = () => {
    this.setModalVisible(true);
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          

          <View style={styles.postContent}>
              <Text style={styles.postTitle}>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
              </Text>

              <Text style={styles.postDescription}>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. 
                Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. 
                Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. 
              </Text>
             

              <View style={styles.starContainer}>
               
            <Image style={styles.star} source={{uri:"https://img.icons8.com/color/40/000000/star.png"}}/>
            <Image style={styles.star} source={{uri:"https://img.icons8.com/color/40/000000/star.png"}}/>
            <Image style={styles.star} source={{uri:"https://img.icons8.com/color/40/000000/star.png"}}/>
            <Image style={styles.star} source={{uri:"https://img.icons8.com/color/40/000000/star.png"}}/>
            <Image style={styles.star} source={{uri:"https://img.icons8.com/color/40/000000/star.png"}}/>
          </View>
              <Text style={styles.date}>
               Fecha: 2017-11-27
              </Text>

              <TouchableOpacity style={styles.profile} onPress={()=>this.props.navigation.navigate("OtherProfile")}>
                <Image style={styles.avatar}
                  source={{uri: 'https://bootdey.com/img/Content/avatar/avatar1.png'}}/>

                <Text style={styles.name}>
                    Johan Doe
                </Text>
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
            }}>Reportar Reseña</Text>
          </TouchableOpacity>
             
          </View>
        </View>
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
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  header:{
    padding:30,
    alignItems: 'center',
    backgroundColor: "#454545",
  },
  headerTitle:{
    fontSize:30,
    color:"#FFFFFF",
    marginTop:10,
  },
  name:{
    fontSize:22,
    color:"#454545",
    fontWeight:'600',
  },
  postContent: {
    flex: 1,
    padding:30,
  },
  postTitle:{
    fontSize:26,
    fontWeight:'600',
    
  },
  starContainer:{
    justifyContent:'center', 
    marginHorizontal:30, 
    flexDirection:'row', 
    marginTop:20
  },star:{
    width:40,
    height:40,
  },
  postDescription:{
    fontSize:16,
    marginTop:10,
  },
  tags:{
    color: '#454545',
    marginTop:10,
  },
  date:{
    color: '#454545',
    marginTop:10,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 35,
    borderWidth: 4,
    borderColor: "#454545",
  },
  profile:{
    flexDirection: 'row',
    marginTop:20
  },
  name:{
    fontSize:22,
    color:"#454545",
    fontWeight:'600',
    alignSelf:'center',
    marginLeft:10
  }, 
  shareButton: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:30,
    backgroundColor: "#00BFFF",
  },
  shareButtonText:{
    color: "#FFFFFF",
    fontSize:20,
  }
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
    color: "#454545",
    fontWeight: 'bold'
  },
  position: {
    fontSize: 14,
    flex: 1,
    alignSelf: 'center',
    color: "#454545"
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
    backgroundColor: '#454545',
    width: 100
  },
  modalInfo: {
    alignItems: 'center',
    justifyContent: 'center',
  }
});