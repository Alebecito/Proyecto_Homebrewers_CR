import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList, AsyncStorage
} from 'react-native';

export default class Notifications extends Component {

  constructor(props) {
    super(props);
    this.state = {
      UsuarioLogeado: "",
      data:[      ]
    }
  }


  formatDate(date) {

    var temporalDate = new Date(date);
    var month = temporalDate.getMonth() + 1;
    var day = temporalDate.getDate();
    var year = temporalDate.getFullYear();

    var formattedDate ="\n"+ day + "/" + month + "/" + year + " ";
    return formattedDate;
  }


  loadNotifications = async () => {

    await fetch(
      `https://homebrewersapis.onrender.com/notificacion/getAllNotificationsFromUser/${this.state.UsuarioLogeado}`
    )
      .then((response) => response.json())
      .then((responseJson) => {
        let temporalData=[];
        for (let i = 0; i < responseJson.length; i++) {
          temporalData.push(
            {id:responseJson[i].notificacionGUID,
            image: responseJson[i].fotoDePerfil===null?"https://img.icons8.com/stickers/512/system-report.png":responseJson[i].fotoDePerfil, 
            name:responseJson[i].nombre===null?"Notificación del Sistema":responseJson[i].nombre, 
            text:responseJson[i].contenido,
            tiempo:this.formatDate(responseJson[i].fechaNotificacion), 
            visto: responseJson[i].revisada===1?true:false}
          );
        }
        this.setState({data:temporalData});
      })
      .catch((error) => {
        console.error(error);
      });
  }

  
  loadId = async () => {
    try {
      const id = await AsyncStorage.getItem("UsuarioLogeado");
      this.setState({ UsuarioLogeado: id });
    } catch (error) {
      console.log(error);
    }
  };

  async componentDidMount () {
    await this.loadId();
    await this.loadNotifications();

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
                          {Notification.tiempo}
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
                          {Notification.tiempo}
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
    backgroundColor:"#FBEAAB",
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
    color:"#454545"
  },
  icon:{
    width:20,
    height:20,
    alignSelf:'center',
    marginRight:10
  },
  name:{
    fontSize:16,
    color:"#454545"
  }
}); 