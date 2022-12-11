import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
} from 'react-native';

export default class Menu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [
        {id:1, title: "Perfil Personal",      color:"#ce5e04", members:8,  image:"https://img.icons8.com/stickers/512/gender-neutral-user.png", tipo: "", direccion:"MyProfile"},
        {id:2, title: "Inventario Personal",     color:"#f46f04", members:6,  image:"https://img.icons8.com/stickers/512/warehouse-1.png", tipo: "", direccion:""} , 
        {id:3, title: "Notificaciones",     color:"#7c3f04", members:12, image:"https://img.icons8.com/stickers/512/alarm.png", tipo: "Notificaciones", direccion:"Notifications"} ,
        {id:4, title: "Sección de Noticias",   color:"#d4ccce", members:5,  image:"https://img.icons8.com/stickers/512/news--v1.png", tipo: "Noticias", direccion:"News"} ,
        {id:5, title: "Buscar Usuarios",  color:"#342404", members:6,  image:"https://img.icons8.com/stickers/512/find-user-male.png", tipo: "", direccion:"SearchUser"} ,
        {id:6, title: "Explorador de Publicaciones",   color:"#ce5e04", members:7,  image:"https://img.icons8.com/stickers/512/activity-feed-2.png", tipo: "Publicaciones", direccion:""} ,
        {id:7, title: "Buzón de Mensajería",   color:"#f46f04", members:8,  image:"https://img.icons8.com/stickers/512/communication.png", tipo: "Mensajes", direccion:"Inbox"} ,
        {id:8, title: "Calculadora para producción",    color:"#7c3f04", members:23, image:"https://img.icons8.com/stickers/512/calculator--v1.png", tipo: "", direccion:""} ,
        {id:9, title: "Consejos y Tips", color:"#d4ccce", members:45, image:"https://img.icons8.com/stickers/512/tuition.png", tipo: "", direccion:""} ,
        {id:10, title: "Reglas de la comunidad",     color:"#342404", members:13, image:"https://img.icons8.com/stickers/512/information.png", tipo: "", direccion:""} ,
      ]
    };
  }

  clickEventListener(item) {
    
    if(item.direccion !==""){
    
      this.props.navigation.navigate(item.direccion)
    }else{
      Alert.alert(item.title)
    }
  }
  showItemAmount(item){
    return <Text style={styles.subTitle}>Tienes {item.members} {item.tipo} sin revisar</Text>
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList style={styles.list}
          contentContainerStyle={styles.listContainer}
          data={this.state.data}
          horizontal={false}
          numColumns={2}
          keyExtractor= {(item) => {
            return item.id;
          }}
          renderItem={({item}) => {
            if(item.tipo === ""){
                return (
                    <TouchableOpacity style={[styles.card, {backgroundColor:"#e9f1f5"}]} onPress={() => {this.clickEventListener(item)}}>
                      <View style={styles.cardHeader}>
                        <Text style={styles.title}>{item.title}</Text>
                      </View>
                      <Image style={styles.cardImage} source={{uri:item.image}}/>
                      <View style={styles.cardFooter}>
                        
                      </View>
                    </TouchableOpacity>
                  )
            } else{
                return (
                    <TouchableOpacity style={[styles.card, {backgroundColor:"#e9f1f5"}]} onPress={() => {this.clickEventListener(item)}}>
                      <View style={styles.cardHeader}>
                        <Text style={styles.title}>{item.title}</Text>
                      </View>
                      <Image style={styles.cardImage} source={{uri:item.image}}/>
                      <View style={styles.cardFooter}>
                        <Text style={styles.subTitle}>Tienes {item.members} {item.tipo} sin revisar</Text>
                      </View>
                    </TouchableOpacity>
                  )
            }
          }}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:20,
  },
  list: {
    //paddingHorizontal: 5,
    backgroundColor:"#FFFFFF",
  },
  listContainer:{
    alignItems:'center'
  },
  /******** card **************/
  card:{
    marginHorizontal:2,
    marginVertical:2,
    flexBasis: '48%',
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    alignItems:"center", 
    justifyContent:"center"
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardImage:{
    height: 70,
    width: 70,
    alignSelf:'center'
  },
  title:{
    fontSize:16,
    flex:1,
    color:"#37393b",
    fontWeight:'bold'
  },
  subTitle:{
    fontSize:12,
    flex:1,
    color:"#37393b",
  },
  icon:{
    height: 20,
    width: 20, 
  }
});    