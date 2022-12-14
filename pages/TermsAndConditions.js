import React , {Component} from 'react';
import { View, Text, ScrollView, Dimensions, TouchableOpacity } from 'react-native';

const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
};

class TermsAndConditions extends Component{

  state = {
      accepted: false
  }

  render(){
    return (
     <View style={styles.container}>
            <Text style={styles.title}>Terms and conditions</Text>
            <ScrollView 
            style={styles.tcContainer}
            onScroll={({nativeEvent}) => {
                if (isCloseToBottom(nativeEvent)) {
                  this.setState({
                      accepted: true
                  })
                }
              }}
            >
                <Text style={styles.tcP}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vitae mi nisi. Aenean placerat non ante nec scelerisque. Curabitur varius lacus id quam fermentum lobortis. Vestibulum a auctor mi, et ultricies orci. Cras viverra rhoncus est a commodo. Aenean in ante egestas, interdum justo in, ullamcorper est. Donec convallis velit in ex mollis feugiat. Sed consectetur neque vitae nulla gravida, eu aliquet quam eleifend.</Text>
                <Text style={styles.tcP}>Quisque vitae dui eu libero consequat posuere nec id enim. Maecenas convallis nunc et elit venenatis, sit amet sollicitudin quam congue. Nulla ante libero, convallis vel orci nec, euismod blandit quam. Nunc quis ex ac dolor dapibus gravida et vitae quam. Vivamus sodales elit quis blandit vulputate. Maecenas eget iaculis augue, ac lacinia odio. Nullam placerat urna nisi, in facilisis urna ornare a. In convallis tellus a sagittis auctor.</Text>
                    <Text style={styles.tcL}>{'\u2022'} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vestibulum justo urna, non dignissim nunc varius non. Vestibulum at sem sem. </Text>
                    <Text style={styles.tcL}>{'\u2022'} Nullam interdum ultrices elit, eget laoreet est blandit quis. Duis interdum ut est sed accumsan. Vivamus feugiat sagittis volutpat. Phasellus id tortor iaculis diam finibus pretium in sit amet nulla.</Text>
                    <Text style={styles.tcL}>{'\u2022'} Duis laoreet odio eu ullamcorper aliquam. Donec ac porttitor elit. Curabitur auctor venenatis finibus.</Text>
                    <Text style={styles.tcL}>{'\u2022'}Mauris non justo sagittis, viverra lorem eget, convallis elit. Suspendisse potenti. Quisque congue leo in ex convallis, non eleifend nibh lacinia. Sed et odio pretium dolor malesuada tincidunt. Praesent tincidunt viverra ligula, sit amet suscipit purus porta eget. Morbi luctus lacus enim, vel facilisis magna consequat et. Sed imperdiet ipsum non posuere lacinia. Sed pellentesque, nisi in mollis lobortis, tortor arcu laoreet enim, vitae commodo turpis nisl id odio.</Text>
                    <Text style={styles.tcL}>{'\u2022'}Duis sed eros quis sem maximus ornare. Morbi vitae venenatis lacus. Nunc quis velit et orci rhoncus tristique eu id ligula. Quisque eget interdum lacus. Pellentesque volutpat velit turpis, vitae tristique nisi pharetra vel. Donec vehicula urna eget sapien dignissim aliquet in sit amet quam. Etiam venenatis sodales placerat. Praesent arcu mauris, imperdiet non urna id, tempor accumsan nisi.</Text>
                    <Text style={styles.tcL}>{'\u2022'} Vivamus nec enim mauris. Vivamus sem nisl, blandit sed gravida ac, gravida ac ipsum. Cras nec risus ut nunc eleifend ornare. Sed semper in augue quis lobortis.</Text>
                    <Text style={styles.tcL}>{'\u2022'} Fusce consectetur augue id est sagittis congue. Sed porttitor magna nisl, at lobortis magna ornare in. Vivamus eu vehicula est, a sodales turpis. Aenean eget tincidunt metus, ut auctor nisl. Mauris non eros vel libero volutpat tincidunt. Phasellus convallis erat metus, eu tempor libero sodales at. Sed eget sapien nec libero tempor dictum.</Text>
                    <Text style={styles.tcL}>{'\u2022'} Etiam suscipit, leo iaculis feugiat lobortis, sem ex vehicula mauris, sit amet ultrices turpis ante quis turpis. Praesent tincidunt ultricies ligula, ut condimentum diam condimentum eu.</Text>
                <Text style={styles.tcP}>Al aceptar estos términos y condiciones, se entiende que has leido sus partes, asumiento que existe un compromiso con el contexto descrito</Text>
            </ScrollView>

            <TouchableOpacity disabled={ !this.state.accepted } onPress={ ()=> this.props.navigation.goBack() } style={ this.state.accepted ? styles.button : styles.buttonDisabled }><Text style={styles.buttonLabel}>Aceptar</Text></TouchableOpacity>
      </View>
    );
  }

}

const { width , height } = Dimensions.get('window');

const styles = {

  container:{
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10
  },
  title: {
      fontSize: 22,
      alignSelf: 'center'
  },
  tcP: {
      marginTop: 10,
      marginBottom: 10,
      fontSize: 12
  },
  tcP:{
      marginTop: 10,
      fontSize: 12
  },
  tcL:{
      marginLeft: 10,
      marginTop: 10,
      marginBottom: 10,
      fontSize: 12
  },
  tcContainer: {
      marginTop: 15,
      marginBottom: 15,
      height: height * .7
  },

  button:{
      backgroundColor: '#136AC7',
      borderRadius: 5,
      padding: 10
  },

  buttonDisabled:{
    backgroundColor: '#999',
    borderRadius: 5,
    padding: 10
 },

  buttonLabel:{
      fontSize: 14,
      color: '#FFF',
      alignSelf: 'center'
  }

}

export default TermsAndConditions;