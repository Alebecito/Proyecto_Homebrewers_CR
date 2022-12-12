import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView, FlatList, TextInput
} from 'react-native';

export default class PostView extends Component {
  constructor(props) {
    super(props);
    this.state2 = {
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

  navigateToOtherProfile() {
    this.props.navigation.navigate("OtherProfile");
  }

  footerComponent() {
    return(
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
          <Image style={styles.productImg} source={{ uri: "https://pixabay.com/get/g74019002753ebb836f43956c1a5742d1a3a091b6652d1c14ec6dbbae1db2ab42a1d4e87f3425a64bb777c6b6af115366_1280.jpg" }} />
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

        
          <Text style={styles.date}>
            Fecha: 2017-11-27
          </Text>

          <View style={styles.profile} >
            

            <Text style={styles.name}>
            20 Me gusta 
            </Text>
            
            
              
     
          </View>
          <TouchableOpacity style={styles.shareButton}>
            <Text style={styles.shareButtonText}>Me gusta esta publicación</Text>
          </TouchableOpacity>
          
          
        </View>
        <Text style={{ textAlign: "center" }}>Comentarios</Text>
      </View>
    )
  }

  render() {
    return (

      <View >
      <FlatList
        style={styles2.root}
        data={this.state2.data}
        ListHeaderComponent={this.headerComponent(this.props.navigation)}
        ListFooterComponent={this.footerComponent()}
        extraData={this.state2}
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
    marginTop: 20,
    textAlign:"center"
  },
  name: {
    fontSize: 22,
    color: "#00BFFF",
    fontWeight: '600',
    alignSelf: 'center',
    marginLeft: 10,
    
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
    width: 350,
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