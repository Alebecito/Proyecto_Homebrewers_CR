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
  Button,TextInput
} from 'react-native';

export default class Blog extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [
        {id:1, title: "Lorem ipsum dolor",                  time:"2018-08-01 12:15 pm", image:"https://pixabay.com/get/g74019002753ebb836f43956c1a5742d1a3a091b6652d1c14ec6dbbae1db2ab42a1d4e87f3425a64bb777c6b6af115366_1280.jpg", description:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean  ligula...", teGusta:true},
        {id:2, title: "Sit amet, consectetuer",             time:"2018-08-12 12:00 pm", image:"https://pixabay.com/get/g4d4fbe9a7bb86a8903cb2c87195f501b93cc14f0cf086b132caf7a7ef98117cdb1fbf964f773e23ac3b6906444314881_1280.jpg", description:"Lorem  dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula...", teGusta:true} ,
        {id:3, title: "Dipiscing elit. Aenean ",            time:"2017-08-05 12:21 pm", image:"https://pixabay.com/get/ge4d617dab10e7392876103f0cae47cdc37210f6cc1252b8d3fb85eab1c4f4fd791bcb1f43038e938fd1deaa3d4ef91da_1280.jpg", description:"Lorem ipsum dolor sit , consectetuer  elit. Aenean commodo ligula...", teGusta:true}, 
        {id:4, title: "Commodo ligula eget dolor.",         time:"2015-08-12 12:00 pm", image:"https://pixabay.com/get/g6ad00d2d229d9404960eb13dec36256efceed2e616e2bb3cf60c0c5d26600722ea20210ee22c23f69a0f3a3ddb20c193_1280.jpg", description:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula...", teGusta:true}, 
        {id:5, title: "Aenean massa. Cum sociis",           time:"2013-06-12 12:11 pm", image:"https://pixabay.com/get/g49106dd8fed58f9b5c41bea5ee3482506c079c0f08130e53121fdc80b379b5ee4dae7f77540500b717b15fd39ea2bd21_1280.jpg", description:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit.  commodo ligula...", teGusta:true}, 
        {id:6, title: "Natoque penatibus et magnis",        time:"2018-08-12 12:56 pm", image:"https://pixabay.com/get/gc7bbbb4efc11de7856a22c437b4c7d131f36077632fffb369b5f03f2525af22057fc8258bd4768861cc02f0cab44fc98_1280.jpg", description:"Lorem ipsum  sit amet, consectetuer adipiscing elit. Aenean commodo ligula...", teGusta:true}, 
        {id:7, title: "Dis parturient montes, nascetur",    time:"2018-08-12 12:33 pm", image:"https://pixabay.com/get/g3943b56419832f12c27de7c27fb6be886ab92d7096430e0da4aae9904b80d5fd3aac24d8f276c84680236b87f46373b5_1280.jpg", description:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula...", teGusta:true}, 
        {id:8, title: "Ridiculus mus. Donec quam",          time:"2018-06-12 12:44 pm", image:"https://pixabay.com/get/g2af4348388ec410b03da4234f3c30dc939d9c6a8ecdd688ca715fd07d39a6ee2c26316a4a76192dc640df476a3a3c5de_1280.jpg", description:"Lorem ipsum  sit amet, consectetuer adipiscing elit.  commodo ligula...", teGusta:true},
        {id:9, title: "Felis, ultricies nec, pellentesque", time:"2012-07-12 12:23 pm", image:"https://pixabay.com/get/ga27c996d3a281991c30bfe4f259b211d10337e2d760a851ccec7a2efc5effdf1ed1371a9f97268815b5bd53d5b9fbd4f_1280.jpg", description:"Lorem ipsum dolor sit amet, consectetuer  elit. Aenean commodo ligula...", teGusta:true},
      ]
    };
  }

  goToNewsContent() {
    this.props.navigation.navigate('NewsContent');
  }
  render() {
    return (
      <View style={styles.container}>
 <View style={styles.formContent}>
          <View style={styles.inputContainer}>
            <Image style={[styles.icon, styles.inputIcon]} source={{ uri: 'https://png.icons8.com/search/androidL/100/000000' }} />
            <TextInput style={styles.inputs}
              ref={'txtPassword'}
              placeholder="Buscar noticia"
              underlineColorAndroid='transparent'
              onChangeText={(name_address) => this.setState({ name_address })} />
          </View>
        </View>
        <FlatList style={styles.list}
          data={this.state.data}
          keyExtractor= {(item) => {
            return item.id;
          }}
          ItemSeparatorComponent={() => {
            return (
              <View style={styles.separator}/>
            )
          }}
          renderItem={(post) => {
            const item = post.item;
            if(item.teGusta===true){
              return (
                <TouchableOpacity style={styles.card} onPress={()=>this.goToNewsContent()}>
                  <Image style={styles.cardImage} source={{uri:item.image}}/>
                  <View style={styles.cardHeader}>
                    <View>
                      <Text style={styles.title}>{item.title}</Text>
                      <Text style={styles.description}>{item.description}</Text>
                      <View style={styles.timeContainer}>
                        <Image style={styles.iconData} source={{uri: 'https://img.icons8.com/color/96/3498db/calendar.png'}}/>
                        <Text style={styles.time}>{item.time}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.cardFooter}>
                    <View style={styles.socialBarContainer}>
                    <View style={styles.socialBarSection}>
                        <View style={styles.socialBarButton}>
                          <Image style={styles.icon} source={{uri: 'https://img.icons8.com/ios-glyphs/75/2ecc71/comments.png'}}/>
                          <Text style={styles.socialBarLabel}>25</Text>
                        </View>
                      </View>
                      <View style={styles.socialBarSection}>
                        <TouchableOpacity style={styles.socialBarButton}>
                          <Image style={styles.icon} source={{uri: 'https://img.icons8.com/stickers/512/good-quality.png'}}/>
                          <Text style={styles.socialBarLabel}>Te Gusta</Text>
                        </TouchableOpacity>
                      </View>
                      
                    </View>
                  </View>
                </TouchableOpacity>
              )

            }else{
              return (
                <TouchableOpacity style={styles.card} onPress={()=>this.goToNewsContent()}>
                  <Image style={styles.cardImage} source={{uri:item.image}}/>
                  <View style={styles.cardHeader}>
                    <View>
                      <Text style={styles.title}>{item.title}</Text>
                      <Text style={styles.description}>{item.description}</Text>
                      <View style={styles.timeContainer}>
                        <Image style={styles.iconData} source={{uri: 'https://img.icons8.com/color/96/3498db/calendar.png'}}/>
                        <Text style={styles.time}>{item.time}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.cardFooter}>
                    <View style={styles.socialBarContainer}>
                      
                      <View style={styles.socialBarSection}>
                        <View style={styles.socialBarButton}>
                          <Image style={styles.icon} source={{uri: 'https://img.icons8.com/ios-glyphs/75/2ecc71/comments.png'}}/>
                          <Text style={styles.socialBarLabel}>25</Text>
                        </View>
                      </View>
                      <View style={styles.socialBarSection}>
                        <TouchableOpacity style={styles.socialBarButton}>
                          <Image style={styles.icon} source={{uri: 'https://img.icons8.com/stickers/512/good-quality.png'}}/>
                          <Text style={styles.socialBarLabel}>78</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
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
    paddingHorizontal: 17,
    backgroundColor:"#E6E6E6",
  },
  separator: {
    marginTop: 10,
  },
  /******** card **************/
  card:{
    shadowColor: '#00000021',
    shadowOffset: {
      width: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 8,
    backgroundColor:"white"
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    backgroundColor:"#EEEEEE",
  },
  cardImage:{
    flex: 1,
    height: 150,
    width: null,
  },
  /******** card components **************/
  title:{
    fontSize:18,
    flex:1,
  }, 
  description:{
    fontSize:15,
    color:"#888",
    flex:1,
    marginTop:5,
    marginBottom:5,
  },
  time:{
    fontSize:13,
    color: "#808080",
    marginTop: 5
  },
  icon: {
    width:25,
    height:25,
  },
  iconData:{
    width:15,
    height:15,
    marginTop:5,
    marginRight:5
  },
  timeContainer:{
    flexDirection:'row'
  },
  /******** social bar ******************/
  socialBarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1
  },
  socialBarSection: {
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  socialBarlabel: {
    marginLeft: 8,
    alignSelf: 'flex-end',
    justifyContent: 'center',
  },
  formContent: {
    flexDirection: 'row',
    
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
  socialBarButton:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
});  