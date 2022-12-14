import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert,
  ScrollView
} from 'react-native';

export default class Craigslist extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible:false,
      userSelected:[],
      data: [
        {id:1,  name: "Estimar Amargor",   image:"https://img.icons8.com/stickers/512/spoon.png",           count:124.711, direccion:"CalculatorIBU"},
        {id:2,  name: "Estimar densidad",    image:"https://img.icons8.com/stickers/512/humidity.png",       count:234.722, direccion:"CalculatorDensity"},
        {id:3,  name: "Estimar % de Acohol",       image:"https://img.icons8.com/stickers/512/percentage.png", count:324.723, direccion:"CalculatorPercentage"} ,
              ]
    };
  }

  clickEventListener = (item) => {
    Alert.alert('Message', 'Item clicked. '+item.name);
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList 
          style={styles.contentList}
          columnWrapperStyle={styles.listContainer}
          data={this.state.data}
          keyExtractor= {(item) => {
            return item.id;
          }}
          renderItem={({item}) => {
          return (
            <TouchableOpacity style={styles.card} onPress={() => this.props.navigation.navigate(item.direccion)}>
              <Image style={styles.image} source={{uri: item.image}}/>
              <View style={styles.cardContent}>
                <Text style={[styles.name, {marginTop:30}]}>{item.name}</Text>
       
                
              </View>
            </TouchableOpacity>
          )}}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:20,
    backgroundColor:"#ebf0f7"
  },
  contentList:{
    flex:1,
  },
  cardContent: {
    marginLeft:20,
    marginTop:10,
  },
  image:{
    width:90,
    height:90,
  
    
  },

  card:{
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginLeft: 20,
    marginRight: 20,
    marginTop:20,
    backgroundColor:"white",
    padding: 10,
    flexDirection:'row',
    borderRadius:30,
  },

  name:{
    fontSize:18,
    flex:1,
    alignSelf:'center',
    color:"#3399ff",
    fontWeight:'bold'
  },
  count:{
    fontSize:14,
    flex:1,
    alignSelf:'center',
    color:"#6666ff"
  },
  followButton: {
    marginTop:10,
    height:35,
    width:100,
    padding:10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:30,
    backgroundColor: "white",
    borderWidth:1,
    borderColor:"#dcdcdc",
  },
  followButtonText:{
    color: "#dcdcdc",
    fontSize:12,
  },
}); 