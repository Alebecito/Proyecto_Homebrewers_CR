import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Alert,
    ScrollView,
    FlatList, TextInput
} from 'react-native';

export default class Album extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
                { id: 1, title: "Product 1", count: 4, image: "https://pixabay.com/get/g905baba9b9b76350266df398110b6e23a5f5b83291495b169f6ef1bfe1d4a8e86f90c265d334d253b542411276cd208b_1280.jpg" },
                { id: 2, title: "Product 2", count: 4, image: "https://pixabay.com/get/g534b14dafe83d94b0afe7bee3b0ec4a29c8bf028f3f4161fa2661ececade7ceab0ea0b0dc324c1704f30294ff1930d32_1280.jpg" },
                { id: 3, title: "Product 3", count: 4, image: "https://pixabay.com/get/ga656c0aeae806bd51d20de202aa6c31f4f4cce2d5c3316b6dd845d8a7e806549e1c0e4e77fb7996f2e3e3e996c26cd29_1280.jpg" },
                { id: 4, title: "Product 4", count: 4, image: "https://pixabay.com/get/g2e14d761ea6ed6fd18078cf8203d2d7c24eeff67677c6c49b8e73db02c0a70ae521b3284ae7c778b75c5876566b3f26b_1280.jpg" },
                { id: 6, title: "Product 6", count: 4, image: "https://pixabay.com/get/g2e14d761ea6ed6fd18078cf8203d2d7c24eeff67677c6c49b8e73db02c0a70ae521b3284ae7c778b75c5876566b3f26b_1280.jpg" },
                { id: 7, title: "Product 7", count: 4, image: "https://pixabay.com/get/g631b0a56c8d1531f861d9ea70aeb5e41964886c04df5081219b21fcb89fb8ce4306100e072e49431f557ab6f369149cc_1280.jpg" },
                { id: 8, title: "Product 8", count: 4, image: "https://pixabay.com/get/gd73fbc2ae096ab00ae84220cd43c1e2e7ea63da570f2a8d1b150246bfb4fbdb9ecd91f8d4541aad830bb9037f7a2db0a_1280.jpg" },
                { id: 9, title: "Product 9", count: 4, image: "https://pixabay.com/get/gf3388261a7d853385b853251f1cb9fc2613f1c554304c42b57eaf3df47701113cbf18f1bfd214c1ecf1147dad2654398_1280.jpg" },
                { id: 9, title: "Product 10", count: 4, image: "https://pixabay.com/get/g101dd83b1f34954be5eb7bab2a2aa9d97dfbfbc9353049f1ca01a57c0e1161c108af4ed8f1aeb8a87ae8ff66815c2835_1280.jpg" },
            ]
        };
    }

    addProductToCart = () => {
        Alert.alert('Success', 'The product has been added to your cart')
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.formContent}>
                    <View style={styles.inputContainer}>

                        <TextInput style={styles.inputs}
                            ref={'txtPassword'}
                            placeholder="Buscar en tu inventario"
                            underlineColorAndroid='transparent'
                        />
                    </View>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', }}>

                <TouchableOpacity
                onPress={() => this.props.navigation.navigate("AddItemInventory")}
            style={{
              width: 300,
              alignItems: 'center',
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10,
              borderRadius: 10,
              backgroundColor: '#ddded9',
              textAlign: 'center',
              marginBottom: 10,
              marginTop: 5
            }}
            
          >
            <Text style={{ textAlign: "center", flex: 1, justifyContent: "center", fontSize: 15 }}>Agregar elemento al inventario</Text>
          </TouchableOpacity>
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
                        return (
                            <TouchableOpacity style={styles.card} onPress={()=>this.props.navigation.navigate("InventoryItem")}>
                                <View style={styles.imageContainer}>
                                    <Image style={styles.cardImage} source={{ uri: item.image }} />
                                </View>
                                <View style={styles.cardContent}>
                                    <Text style={styles.title}>{item.title}</Text>
                                    <Text style={styles.count}>Cantidad: {item.count}</Text>
                                    <Text style={styles.count}>Caducidad: 12/07/2022</Text>
                                </View>
                            </TouchableOpacity>
                        )
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
        paddingHorizontal: 10,
    },
    listContainer: {
        alignItems: 'center'
    },
    separator: {
        marginTop: 10,
    }, formContent: {
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
    /******** card **************/
    card: {
        marginVertical: 8,
        backgroundColor: "white",
        flexBasis: '45%',
        marginHorizontal: 10,
    },
    cardContent: {
        paddingVertical: 17,
        justifyContent: 'center',
        alignContent: 'center',
        textAlign: 'center',
        alignItems: 'center',

    },
    cardImage: {
        flex: 1,
        height: 150,
        width: null,
    },
    imageContainer: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 9,
    },
    /******** card components **************/
    title: {
        fontSize: 18,
        flex: 1,
        color: "#778899"
    },
    inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
    },
    count: {
        fontSize: 18,
        flex: 1,
        color: "#B0C4DE"
    },
}); 