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
} from 'react-native';

export default class Store extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [
        {id:1, title: "Product 1",  price:"$ 25.00 USD", image:"https://pixabay.com/get/g79f3315bdebe3f77372a3254710845fd9d0bdfb013ce7df55bef32c2cf7ecf9eca470ff3c5543b5309a7a3a717823e79_1280.jpg"},
        {id:2, title: "Product 2",  price:"$ 10.13 USD", image:"https://pixabay.com/get/g974dfe2cd5041ad8f4867bd9e6d665bebba2348eea669d065cebba9f3753fcafa0a181d8c706ba8ebc6258736317ea06_1280.jpg"} ,
        {id:3, title: "Product 3",  price:"$ 12.12 USD", image:"https://pixabay.com/get/g514cbf9f284baa71694ca8e538a0d3de6bd80f63df9beae02af764aad4161912736f31a88e22b3ea994c414a655f6e4f_1280.jpg"}, 
        {id:4, title: "Product 4",  price:"$ 11.00 USD", image:"https://pixabay.com/get/g625fd4805c005c37f9e8d05f1fba38792247f45d6c2b98bbc8d71d7546b34bc23bb9ed66ffdd21dcf57ec2972e0b9a55_1280.jpg"}, 
        {id:5, title: "Product 5",  price:"$ 20.00 USD", image:"https://pixabay.com/get/g3129b9fdef7fadbc48878c91a0213e57bee676608bc7cb8bb4607696af5c4ee3d84d2103638df398925ce6e8e0b6529e_1280.jpg"}, 
        {id:6, title: "Product 6",  price:"$ 33.00 USD", image:"https://pixabay.com/get/gaff02c0122d79363bb955a8c426d0468ebc46e25143771e9ca4728352939be6ac7d0be2293fc3bd684a92915319d5092_1280.jpg"}, 
        {id:7, title: "Product 7",  price:"$ 20.95 USD", image:"https://pixabay.com/get/gf6ae54ae4fdfda7d71035768ff848f264a8e75300520095e95a832c13bf1614bfc42c45fb98d578f2e65f97c4d1b2ec3_1280.jpg"}, 
        {id:8, title: "Product 8",  price:"$ 13.60 USD", image:"https://pixabay.com/get/ge64665775509489d814e96b7c2049a53972638f3962813658c709c6ccce487804613490aced0c1e3f4bb45de8e5bb969_1280.jpg"},
        {id:9, title: "Product 9",  price:"$ 15.30 USD", image:"https://pixabay.com/get/g58c217bba6669ccc0db8881ad30685f06be2814cb582b980909095e584aa7c3d5139fbfcf84609b2473b7d0b02f6b82f_1280.jpg"},
        {id:9, title: "Product 10", price:"$ 21.30 USD", image:"https://pixabay.com/get/gef13e348b675f7930e49a4710a9e2b004a53a912caaf002edb76b51ab9e00f1735f3c719bf8198a8a0090829df8841c3_1280.jpg"},
      ]
    };
  }

  addProductToCart = () => {
    Alert.alert('Success', 'The product has been added to your cart')
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
          ItemSeparatorComponent={() => {
            return (
              <View style={styles.separator}/>
            )
          }}
          renderItem={(post) => {
            const item = post.item;
            return (
              <View style={styles.card}>
               
               <View style={styles.cardHeader}>
                  <View>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.price}>{item.price}</Text>
                  </View>
                </View>

                <Image style={styles.cardImage} source={{uri:item.image}}/>
                
                <View style={styles.cardFooter}>
                  <View style={styles.socialBarContainer}>
                    <View style={styles.socialBarSection}>
                      <TouchableOpacity style={styles.socialBarButton} onPress={() => this.addProductToCart()}>
                        <Image style={styles.icon} source={{uri: 'https://img.icons8.com/ios-glyphs/75/2ecc71/comments.png'}}/>
                        <Text style={[styles.socialBarLabel, styles.buyNow]}>Comentar</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.socialBarSection}>
                      <TouchableOpacity style={styles.socialBarButton}>
                        <Image style={styles.icon} source={{uri: 'https://img.icons8.com/stickers/512/good-quality.png'}}/>
                        <Text style={styles.socialBarLabel}>25</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            )
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
    paddingHorizontal: 5,
    backgroundColor:"#E6E6E6",
  },
  listContainer:{
    alignItems:'center'
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
    backgroundColor:"white",
    flexBasis: '47%',
    marginHorizontal: 5,
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
  price:{
    fontSize:16,
    color: "green",
    marginTop: 5
  },
  buyNow:{
    color: "purple",
  },
  icon: {
    width:25,
    height:25,
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
  socialBarButton:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
});  