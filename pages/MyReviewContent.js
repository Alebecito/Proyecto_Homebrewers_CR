import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native';

export default class PostView extends Component {

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

              <TouchableOpacity style={styles.profile} onPress={()=>this.props.navigation.navigate("MyProfile")}>
                <Image style={styles.avatar}
                  source={{uri: 'https://bootdey.com/img/Content/avatar/avatar1.png'}}/>

                <Text style={styles.name}>
                    Johan Doe
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.shareButton} onPress={()=>this.props.navigation.navigate("EditReview")}>
                <Text style={styles.shareButtonText}>Editar</Text>  
              </TouchableOpacity> 
              <TouchableOpacity style={styles.shareButton}>
                <Text style={styles.shareButtonText}>Eliminar</Text>  
              </TouchableOpacity> 
             
          </View>
        </View>
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
    backgroundColor: "#00BFFF",
  },
  headerTitle:{
    fontSize:30,
    color:"#FFFFFF",
    marginTop:10,
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
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
    backgroundColor: "#454545",
  },
  shareButtonText:{
    color: "#FFFFFF",
    fontSize:20,
  }
});
 