import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList, Alert, TextInput
} from "react-native";

export default class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          id: 3,
          image: "https://bootdey.com/img/Content/avatar/avatar7.png",
          name: "March SoulLaComa",
          text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
          attachment: "https://via.placeholder.com/100x100/FFB6C1/000000",
        },
        {
          id: 2,
          image: "https://bootdey.com/img/Content/avatar/avatar6.png",
          name: "John DoeLink",
          text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
          attachment: "https://via.placeholder.com/100x100/20B2AA/000000",
        },
        {
          id: 4,
          image: "https://bootdey.com/img/Content/avatar/avatar2.png",
          name: "Finn DoRemiFaso",
          text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
          attachment: "",
        },
        {
          id: 5,
          image: "https://bootdey.com/img/Content/avatar/avatar3.png",
          name: "Maria More More",
          text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
          attachment: "",
        },
        {
          id: 1,
          image: "https://bootdey.com/img/Content/avatar/avatar1.png",
          name: "Frank Odalthh",
          text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
          attachment: "https://via.placeholder.com/100x100/7B68EE/000000",
        },
        {
          id: 6,
          image: "https://bootdey.com/img/Content/avatar/avatar4.png",
          name: "Clark June Boom!",
          text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
          attachment: "",
        },
        {
          id: 7,
          image: "https://bootdey.com/img/Content/avatar/avatar5.png",
          name: "The googler",
          text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
          attachment: "",
        },
      ],
    };
  }

  clickEventListener(item) {

    this.props.navigation.navigate("Chat")
  }

  render() {
    return (
      <View style={styles.containerView}>
        <View style={styles.formContent}>
          <View style={styles.inputContainer}>
            <Image style={[styles.icon, styles.inputIcon]} source={{ uri: 'https://png.icons8.com/search/androidL/100/000000' }} />
            <TextInput style={styles.inputs}
              ref={'txtPassword'}
              placeholder="Buscar contactos"
              underlineColorAndroid='transparent'
              onChangeText={(name_address) => this.setState({ name_address })} />
          </View>
        </View>
        <FlatList
          style={styles.root}
          data={this.state.data}
          extraData={this.state}
          ItemSeparatorComponent={() => {
            return <View style={styles.separator} />;
          }}
          keyExtractor={(item) => {
            return item.id;
          }}
          renderItem={(item) => {
            const Notification = item.item;
            let attachment = <View />;

            let mainContentStyle;

            return (
              // <View style={styles.container}>
              <TouchableOpacity
                style={styles.container}
                onPress={() => {
                  { this.clickEventListener(Notification) }
                }}
              >
                <Image
                  source={{ uri: Notification.image }}
                  style={styles.avatar}
                />
                <View style={styles.content}>
                  <View style={mainContentStyle}>
                    <View style={styles.text}>
                      <Text style={styles.name}>{Notification.name}</Text>
                      <Text>{Notification.text}</Text>
                    </View>
                    <Text style={styles.timeAgo}>2 hours ago</Text>
                  </View>
                  {attachment}
                </View>
              </TouchableOpacity>

              // </View>
            );
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#FFFFFF",
  },
  container: {
    padding: 16,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#FFFFFF",
    alignItems: "flex-start",
  },
  containerView: {
    flex: 1,
    backgroundColor: '#EBEBEB',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  text: {
    marginBottom: 5,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  content: {
    flex: 1,
    marginLeft: 16,
    marginRight: 0,
  },
  mainContent: {
    marginRight: 60,
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
  img: {
    height: 50,
    width: 50,
    margin: 0,
  },
  attachment: {
    position: "absolute",
    right: 0,
    height: 50,
    width: 50,
  },
  separator: {
    height: 1,
    backgroundColor: "#CCCCCC",
  },
  timeAgo: {
    fontSize: 12,
    color: "#696969",
  },
  name: {
    fontSize: 16,
    color: "#454545",
  },
  chatbox: {
    backgroundColor: "red", padding: 20, height: 50,
    width: 100,
  },
});
