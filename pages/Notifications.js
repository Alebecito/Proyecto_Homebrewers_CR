import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList
} from 'react-native';

export default class Notifications extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data:[
        {id:3, image: "https://bootdey.com/img/Content/avatar/avatar7.png", name:"March SoulLaComa", text:"Un nuevo usuario te ha empezado a seguir.", attachment:"https://via.placeholder.com/100x100/FFB6C1/000000", tiempo:"2", visto: false},
        {id:2, image: "https://bootdey.com/img/Content/avatar/avatar6.png", name:"John DoeLink",     text:"Un usuario ha dicho que le gusta tu publicación", attachment:"https://via.placeholder.com/100x100/20B2AA/000000", tiempo:"2", visto: true},
        {id:4, image: "https://img.icons8.com/stickers/512/system-report.png", name:"Notificación del Sistema",  text:"Una de tus publicaciones ha sido eliminada por incumplir las normas de la comunidad", attachment:"", tiempo:"9", visto: false},
        {id:5, image: "https://bootdey.com/img/Content/avatar/avatar3.png", name:"Maria More More",  text:"Un usuario que sigues ha publicado recientemente!", attachment:"", tiempo:"4", visto: true},
        {id:1, image: "https://img.icons8.com/stickers/512/system-report.png", name:"Notificación del Sistema",    text:"Un producto en tu inventario está próximo a alcanzar su fecha de caducidad!", attachment:"https://via.placeholder.com/100x100/7B68EE/000000", tiempo:"12", visto: true},
        {id:6, image: "https://img.icons8.com/stickers/512/system-report.png", name:"Notificación del Sistema", text:"Una de tus publicaciones ha sido eliminada pues ha alcanzado su fecha de caducidad ", attachment:"", tiempo:"7", visto: true},
        {id:7, image: "https://bootdey.com/img/Content/avatar/avatar5.png", name:"The googler",      text:"Un usuario ha comentado una de tus publicaciones.", attachment:"", visto: true},
      ]
    }
  }

  render() {
    return (
        

        
      <FlatList
        style={styles.root}
        data={this.state.data}
        extraData={this.state}
        ItemSeparatorComponent={() => {

          return (
            <View style={styles.separator}/>
          )
        }}
        keyExtractor={(item)=>{
          return item.id;
        }}
        renderItem={(item) => {
            
                const Notification = item.item;
              
      
                let mainContentStyle;
                
                if(Notification.visto === true){
                return(
                    <View style={styles.containerRead}>
                    
        
                      <Image source={{uri:Notification.image}} style={styles.avatar}/>
                      <View style={styles.content}>
                        <View style={mainContentStyle}>
                          <View style={styles.text}>
                            <Text style={styles.name}>{Notification.name}</Text>
                            <Text>{Notification.text}</Text>
        
                          </View>
                          
                          <Text style={styles.timeAgo}>
                          hace {Notification.tiempo} horas
                          </Text>
                        </View>
                      </View>
                    </View>
                  );

                }else{
                     return(
                    <View style={styles.containerNotRead}>
                    
        
                      <Image source={{uri:Notification.image}} style={styles.avatar}/>
                      <View style={styles.content}>
                        <View style={mainContentStyle}>
                          <View style={styles.text}>
                            <Text style={styles.name}>{Notification.name}</Text>
                            <Text>{Notification.text}</Text>
        
                          </View>
                          
                          <Text style={styles.timeAgo}>
                          hace {Notification.tiempo} horas
                          </Text>
                          <Text style={{color:"red"}}>
                           Nueva notificación!
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                }

          

          
         
        }}/>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#FFFFFF"
  },

  containerRead: {
    padding: 16,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: "black",
    backgroundColor:"#asa345",
    alignItems: 'flex-start'
  },containerNotRead: {
    padding: 16,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: "black",
    backgroundColor:"#7fd3fa",
    alignItems: 'flex-start'
  },
  avatar: {
    marginTop: 10,
   
    width:50,
    height:50,
    borderRadius:25,
  },
  text: {
    marginBottom: 5,
    flexDirection: 'row',
    flexWrap:'wrap'
  },
  content: {
    flex: 1,
    marginLeft: 16,
    marginRight: 0
  },
  mainContent: {
    marginRight: 60
  },
  img: {
    height: 50,
    width: 50,
    margin: 0
  },
  attachment: {
    position: 'absolute',
    right: 0,
    height: 50,
    width: 50
  },
  separator: {
    height: 1,
    backgroundColor: "#CCCCCC"
  },
  timeAgo:{
    fontSize:12,
    color:"#696969"
  },
  icon:{
    width:20,
    height:20,
    alignSelf:'center',
    marginRight:10
  },
  name:{
    fontSize:16,
    color:"#1E90FF"
  }
}); 