import React, { useLayoutEffect, useEffect, useState, useCallback } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { confirmPasswordReset, getAuth, signOut } from "firebase/auth";
import { auth, db } from '../firebase';
import { AntDesign } from '@expo/vector-icons';
import { Avatar } from 'react-native-elements';
import { GiftedChat } from 'react-native-gifted-chat'
import {
    addDoc,
    collection,
    orderBy,
    onSnapshot,
    query, 
    where
   
} from "firebase/firestore";


const ChatScreen = ({route, navigation }) => {
    const [messages, setMessages] = useState([]);
    const [otherUser, setOtherUser] = useState("");
    const [insertInSQL, setinsertInSQL] = useState("");
    let globalVariable=false;
    const logOut = () => {

       navigation.goBack();
    }





   

    useLayoutEffect(() => {

        const fetchData = async () => {
            await checkIfPreviousChatted();
            getMessages();
          }
          fetchData()
         
         
   

   
    }, [])
    

    const checkIfPreviousChatted = async () => {
        
       await fetch(`https://homebrewersapis.onrender.com/mensajes/getMyInbox/${route.params.usuarioLogeado}`,{method: 'GET', }).
        then((response) => response.json()).then((responseJson) => {
                for(let element of responseJson) {
                    if(element.usuarioGUID === route.params.idOtroUsuario){
                        globalVariable=true;
                        return;
                    }
                }
               
                }).catch((error) => {});

    }
   

    const getMessages =  async () => {
        let referencia = await collection(db, "chat");
       
       let primerCaso = route.params.usuarioLogeado+"-"+route.params.idOtroUsuario;
       let segundoCaso = route.params.idOtroUsuario+"-"+route.params.usuarioLogeado;
        let filteredReferencia = await query(referencia, await where('dePara', 'in', [primerCaso,segundoCaso]));
        let orderedReferencia  = await query(filteredReferencia,orderBy('createdAt', 'desc'));
        const unsubscribe = await onSnapshot(orderedReferencia, async  (snapshot) => await setMessages(
            snapshot.docs.map(doc=>({
                _id: doc.data()._id,
                createdAt: doc.data().createdAt.toDate(),
                text: doc.data().text,
                user: doc.data().user,
            }))
        ));   
        return unsubscribe
      
    }


    const insertInbox = async () =>{
        let formdata = new FormData();
        formdata.append("de", route.params.usuarioLogeado);
        formdata.append("hacia", route.params.idOtroUsuario);
        await fetch(`https://homebrewersapis.onrender.com/mensajes/createNewInbox`,{method: 'POST', body:formdata}).
        then((response) => response.json()).catch((error) => {console.log(error)});
    }


    const onSend = useCallback(async (messagesP = []) => {
        if(globalVariable===false){
           
            await insertInbox();
            globalVariable=true;
        }

        setMessages(previousMessages => GiftedChat.
            append(previousMessages, messagesP))
        const {
            _id,
            createdAt,
            text,
            user

        } = messagesP[0]
       let referencia = collection(db, "chat")
       await addDoc(referencia, {
            _id,
            createdAt,
            text,
            user,
            dePara: route.params.usuarioLogeado+"-"+route.params.idOtroUsuario
        });

    }, [])



    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={{ marginRight: 20 }}>
                    <Avatar
                        rounded
                        source={{
                            uri: auth?.currentUser?.photoURL,
                        }}
                    />
                </View>
            ),
            headerLeft: () => (
                <TouchableOpacity style={{
                    marginLeft: 10
                }}
                    onPress={logOut}
                >
                    <AntDesign name="arrowleft" size={24} color="black" />
                </TouchableOpacity>
            )
        })
    }, [navigation])







    return (
        <GiftedChat
            messages={messages}
            showAvatarForEveryMessage={true}
            onSend={messages => onSend(messages)}
            user={{
                _id: auth?.currentUser?.email,
                name: auth?.currentUser?.displayName,
                avatar: auth?.currentUser?.photoURL
            }}
        />
    )
}
export default ChatScreen;