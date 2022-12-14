import React, { Component } from 'react';
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
} from 'react-native';

export default class ProductDetail extends Component {

  constructor(props) {
    super(props);
  }

  clickEventListener() {
    Alert.alert("Producto Eliminado")
  }

  render() {
    return (
      <View style={[styles.container,{backgroundColor:"#f0f2f5"}]}>
        <ScrollView>
          <View style={{alignItems:'center', marginHorizontal:30,}}>
            <Image style={styles.productImg} source={{uri:"https://pixabay.com/get/g905baba9b9b76350266df398110b6e23a5f5b83291495b169f6ef1bfe1d4a8e86f90c265d334d253b542411276cd208b_1280.jpg"}}/>
           
            <Text style={styles.name}>Sandía Gris</Text>
            <Text style={styles.price}>Cantidad: 4</Text>
            <Text style={styles.price}>Fecha de Caducidad: 12/07/2022</Text>
           
            <Text style={styles.description}>
              Sandías muy dulces y jugosas, de color gris, con un sabor muy agradable.
              Tienen un alto contenido de agua, por lo que son muy refrescantes.
              Son una excelente fuente de vitamina C, vitamina A, potasio y magnesio.
            </Text>
            
          </View>
         
          <View style={styles.separator}></View>
          <View style={styles.addToCarContainer}>
            <TouchableOpacity style={styles.shareButton} onPress={()=> this.props.navigation.navigate("EditItem")}>
              <Text style={styles.shareButtonText}>Editar producto</Text>  
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareButton} onPress={()=> this.clickEventListener()}>
              <Text style={styles.shareButtonText}>Eliminar del inventario</Text>  
            </TouchableOpacity>
          </View> 
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:20,
  },
  productImg:{
    width:300,
    height:300,
  },
  name:{
    fontSize:28,
    color:"#454545",
    fontWeight:'bold'
  },
  price:{
    marginTop:10,
    fontSize:18,
    color:"454545",
    fontWeight:'bold'
  },
  description:{
    textAlign:'center',
    marginTop:10,
    color:"#454545",
  },
  star:{
    width:40,
    height:40,
  },
  btnColor: {
    height:30,
    width:30,
    borderRadius:30,
    marginHorizontal:3
  },
  btnSize: {
    height:40,
    width:40,
    borderRadius:40,
    borderColor:'#778899',
    borderWidth:1,
    marginHorizontal:3,
    backgroundColor:'white',

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  starContainer:{
    justifyContent:'center', 
    marginHorizontal:30, 
    flexDirection:'row', 
    marginTop:20
  },
  contentColors:{ 
    justifyContent:'center', 
    marginHorizontal:30, 
    flexDirection:'row', 
    marginTop:20
  },
  contentSize:{ 
    justifyContent:'center', 
    marginHorizontal:30, 
    flexDirection:'row', 
    marginTop:20
  },
  separator:{
    height:2,

    marginTop:20,
    marginHorizontal:30
  },
  shareButton: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:30,
    backgroundColor: "#454545",
  },
  shareButtonText:{
    color: "#FFFFFF",
    fontSize:20,
  },
  addToCarContainer:{
    marginHorizontal:30
  }
});    