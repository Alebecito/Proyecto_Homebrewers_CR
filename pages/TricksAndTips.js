            
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  Alert,
  ScrollView,
} from 'react-native';

export default class CompanyDescriptionView extends Component {

  constructor(props) {
    super(props);
  }

  onClickListener = (viewId) => {
    Alert.alert("Alert", "Button pressed ");
  }

  render() {
    return (
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.container}>
        
          <Image style={{width: 300, height: 200, marginBottom:40}} source={require('../assets/images/logo.png')}/>
          <Image style={styles.logo} source={{uri: 'https://img.icons8.com/stickers/512/classroom.png'}}/>
          <Text style={styles.slogan}>¡Tu también puedes ser cervecero artesanal!</Text>
          <View style={styles.descriptionContent}>
            <Text style={styles.description}>
              Lorem ipsum dolor sit amet, altera conceptam ei cum. Hinc temporibus repudiandae eu mel, cum impetus legendos ei. 
              Fugit everti dissentias duo cu, nihil fabellas id pri, nonumy verear ea pri. Sit et nisl eros. Ad sapientem forensibus est, 
              ne vis sonet iuvaret, his sint fabulas dolores ad. Repudiare gubergren voluptatum ius ne, nec nostro possim nostrud ad, 
            </Text>
            <Image style={{width:350, height:350}} source={{uri: 'https://pixabay.com/get/ga36f1ee345fa43b48d073da9916c746aed3bc55f1aabf62c56d5efe2b1f00c7bd16d99fb456b3043f7ba074f02cc1114_1280.jpg'}}/>
            <Text style={styles.description}>
              Lorem ipsum dolor sit amet, altera conceptam ei cum. Hinc temporibus repudiandae eu mel, cum impetus legendos ei. 
              Fugit everti dissentias duo cu, nihil fabellas id pri, nonumy verear ea pri. Sit et nisl eros. Ad sapientem forensibus est, 
              ne vis sonet iuvaret, his sint fabulas dolores ad. Repudiare gubergren voluptatum ius ne, nec nostro possim nostrud ad, 
            </Text>
            <Image style={{width:350, height:350}} source={{uri: 'https://pixabay.com/get/g05c9034316f900bef52b128419ac1dd54fe5368a34722e5fa6d886283c398d153ce3bb26f50f50bf796421ecf74e2906_1280.jpg'}}/>
            <Text style={styles.description}>
              Lorem ipsum dolor sit amet, altera conceptam ei cum. Hinc temporibus repudiandae eu mel, cum impetus legendos ei. 
              Fugit everti dissentias duo cu, nihil fabellas id pri, nonumy verear ea pri. Sit et nisl eros. Ad sapientem forensibus est, 
              ne vis sonet iuvaret, his sint fabulas dolores ad. Repudiare gubergren voluptatum ius ne, nec nostro possim nostrud ad, 
            </Text>
            <Image style={{width:350, height:350}} source={{uri: 'https://pixabay.com/get/gaa6fcb92a36158817524b9d55bbca1eab08292110e7438fd5fe34e0c2f37ad95c60b824770db6e8ccaedd296f7e0086e_1280.jpg'}}/>
          </View>
          <TouchableHighlight style={[styles.buttonContainer, styles.sendButton]} onPress={()=>this.props.navigation.goBack()}>
            <Text style={styles.buttonText}>Regresar</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollContainer:{
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
   
  },
  logo:{
    width:100,
    height:100,
    justifyContent: 'center',
    marginBottom:10,
    marginTop:30,
  },
  companyName: {
    fontSize:32,
    fontWeight: '600',
    color: 'black',
  },
  slogan:{
    fontSize:18,
    fontWeight: '600',
    color: '#454545',
    marginTop:10,
  },
  descriptionContent:{
    padding:30
  },
  description:{
    fontSize:18,
    textAlign:'left',
    marginTop:10,
    color: '#black',
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:100,
    borderRadius:30,
  },
  sendButton: {
    backgroundColor: "#FFFFFF",
  },
  buttonText: {
    color: '#black',
  }
});