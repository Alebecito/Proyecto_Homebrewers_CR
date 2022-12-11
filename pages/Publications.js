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
  TextInput,
} from 'react-native';

export default class Store extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [
        { id: 1, title: "Product 1", price: " 25.00 ", image: "https://pixabay.com/get/g79f3315bdebe3f77372a3254710845fd9d0bdfb013ce7df55bef32c2cf7ecf9eca470ff3c5543b5309a7a3a717823e79_1280.jpg", teGusta:true, caducidad: "12/2/2022" },
        { id: 2, title: "Product 2", price: " 10.13 ", image: "https://pixabay.com/get/g974dfe2cd5041ad8f4867bd9e6d665bebba2348eea669d065cebba9f3753fcafa0a181d8c706ba8ebc6258736317ea06_1280.jpg",teGusta:true, caducidad: "12/2/2022" },
        { id: 3, title: "Product 3", price: " 12.12 ", image: "https://pixabay.com/get/g514cbf9f284baa71694ca8e538a0d3de6bd80f63df9beae02af764aad4161912736f31a88e22b3ea994c414a655f6e4f_1280.jpg",teGusta:true, caducidad: "12/2/2022" },
        { id: 4, title: "Product 4", price: " 11.00 ", image: "https://pixabay.com/get/g625fd4805c005c37f9e8d05f1fba38792247f45d6c2b98bbc8d71d7546b34bc23bb9ed66ffdd21dcf57ec2972e0b9a55_1280.jpg",teGusta:false, caducidad: "12/2/2022" },
        { id: 5, title: "Product 5", price: " 20.00 ", image: "https://pixabay.com/get/g3129b9fdef7fadbc48878c91a0213e57bee676608bc7cb8bb4607696af5c4ee3d84d2103638df398925ce6e8e0b6529e_1280.jpg",teGusta:true, caducidad: "12/2/2022" },
        { id: 6, title: "Product 6", price: " 33.00 ", image: "https://pixabay.com/get/gaff02c0122d79363bb955a8c426d0468ebc46e25143771e9ca4728352939be6ac7d0be2293fc3bd684a92915319d5092_1280.jpg",teGusta:false, caducidad: "12/2/2022" },
        { id: 7, title: "Product 7", price: " 20.95 ", image: "https://pixabay.com/get/gf6ae54ae4fdfda7d71035768ff848f264a8e75300520095e95a832c13bf1614bfc42c45fb98d578f2e65f97c4d1b2ec3_1280.jpg",teGusta:true, caducidad: "12/2/2022" },
        { id: 8, title: "Product 8", price: " 13.60 ", image: "https://pixabay.com/get/ge64665775509489d814e96b7c2049a53972638f3962813658c709c6ccce487804613490aced0c1e3f4bb45de8e5bb969_1280.jpg",teGusta:true , caducidad: "12/2/2022"},
        { id: 9, title: "Product 9", price: " 15.30 ", image: "https://pixabay.com/get/g58c217bba6669ccc0db8881ad30685f06be2814cb582b980909095e584aa7c3d5139fbfcf84609b2473b7d0b02f6b82f_1280.jpg",teGusta:true , caducidad: "12/2/2022"},
        { id: 9, title: "Product 10", price: " 21.30 ", image: "https://pixabay.com/get/gef13e348b675f7930e49a4710a9e2b004a53a912caaf002edb76b51ab9e00f1735f3c719bf8198a8a0090829df8841c3_1280.jpg",teGusta:true , caducidad: "12/2/2022"},
      ]
    };
  }

  addProductToCart = () => {
    Alert.alert('Te gusta')
  }

  goToPublication = () => {
    this.props.navigation.navigate("PublicationContent");
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.formContent}>
          <View style={styles.inputContainer}>
            <Image style={[styles.icon, styles.inputIcon]} source={{ uri: 'https://png.icons8.com/search/androidL/100/000000' }} />
            <TextInput style={styles.inputs}
              ref={'txtPassword'}
              placeholder="Buscar publicación"
              underlineColorAndroid='transparent'
              onChangeText={(name_address) => this.setState({ name_address })} />
          </View>
        </View>
        <FlatList style={styles.list}
          contentContainerStyle={styles.listContainer}
          data={this.state.data}
          horizontal={false}
          numColumns={2}
          keyExtractor={(item) => {
            return item.id;
          }}
          ItemSeparatorComponent={() => {
            return (
              <View style={styles.separator} />
            )
          }}
          renderItem={(post) => {
            const item = post.item;
            if(item.teGusta===true){
              return (
                <TouchableOpacity style={styles.card} onPress={() => this.goToPublication()}>
  
                  <View style={styles.cardHeader}>
                    <View>
                      <Text style={styles.title}>{item.title}</Text>
                      <Text style={styles.price}>₡{item.price}</Text>
                    </View>
                  </View>
  
                  <Image style={styles.cardImage} source={{ uri: item.image }} />
                  <View style={styles.timeContainer}>
                        <Image style={styles.iconData} source={{uri: 'https://img.icons8.com/color/96/3498db/calendar.png'}}/>
                        <Text style={styles.time}>Fecha de Caducidad: {item.caducidad}</Text>
                      </View>
                  <View style={styles.cardFooter}>
                    <View style={styles.socialBarContainer}>
                      <View style={styles.socialBarSection}>
                        <View style={styles.socialBarButton} onPress={() => this.addProductToCart()}>
                          <Image style={styles.icon} source={{ uri: 'https://img.icons8.com/ios-glyphs/75/2ecc71/comments.png' }} />
                          <Text style={[styles.socialBarLabel, styles.buyNow]}>34</Text>
                        </View>
                      </View>
                      <View style={styles.socialBarSection}>
                        <TouchableOpacity style={styles.socialBarButton} onPress={() => this.addProductToCart()}>
                          <Image style={styles.icon} source={{ uri: 'https://img.icons8.com/stickers/512/good-quality.png' }} />
                          <Text style={styles.socialBarLabel}>Te Gusta</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              )

            } else{
              return (
                <TouchableOpacity style={styles.card} onPress={() => this.goToPublication()}>
  
                  <View style={styles.cardHeader}>
                    <View>
                      <Text style={styles.title}>{item.title}</Text>
                      <Text style={styles.price}>{item.price}</Text>
                    </View>
                  </View>
  
                  <Image style={styles.cardImage} source={{ uri: item.image }} />
                  <View style={styles.timeContainer}>
                        <Image style={styles.iconData} source={{uri: 'https://img.icons8.com/color/96/3498db/calendar.png'}}/>
                        <Text style={styles.time}>Fecha de Caducidad: {item.caducidad}</Text>
                      </View>
                  <View style={styles.cardFooter}>
                    <View style={styles.socialBarContainer}>
                      <View style={styles.socialBarSection}>
                        <View style={styles.socialBarButton} onPress={() => this.addProductToCart()}>
                          <Image style={styles.icon} source={{ uri: 'https://img.icons8.com/ios-glyphs/75/2ecc71/comments.png' }} />
                          <Text style={[styles.socialBarLabel, styles.buyNow]}>34</Text>
                        </View>
                      </View>
                      <View style={styles.socialBarSection}>
                        <TouchableOpacity style={styles.socialBarButton} onPress={() => this.addProductToCart()}>
                          <Image style={styles.icon} source={{ uri: 'https://img.icons8.com/stickers/512/good-quality.png' }} />
                          <Text style={styles.socialBarLabel}>78</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              )
            }
           
          }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  list: {
    paddingHorizontal: 5,
    backgroundColor: "#E6E6E6",
  },
  listContainer: {
    alignItems: 'center'
  },
  separator: {
    marginTop: 10,
  },
  /******** card **************/
  card: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 8,
    backgroundColor: "white",
    flexBasis: '47%',
    marginHorizontal: 5,
  },
  cardHeader: {
    
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
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardImage: {
    flex: 1,
    height: 150,
    width: null,
  },
  /******** card components **************/
  title: {
    fontSize: 18,
    flex: 1,
  },
  price: {
    fontSize: 16,
    color: "green",
    marginTop: 5
  },
  buyNow: {
    color: "purple",
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
  icon: {
    width: 25,
    height: 25,
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
  timeContainer:{
    flexDirection:'row'
  },
  iconData:{
    width:15,
    height:15,
    marginTop:5,
    marginRight:5
  },
  time:{
    fontSize:13,
    color: "#808080",
    marginTop: 5
  },
  socialBarButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
});  