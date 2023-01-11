import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore,  } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyCyAu_gDEy7nEH1KjWPQb0lEet23RI69W8",
    authDomain: "homebrewerschat.firebaseapp.com",
    projectId: "homebrewerschat",
    storageBucket: "homebrewerschat.appspot.com",
    messagingSenderId: "835330407083",
    appId: "1:835330407083:web:5cc1fd2b74f636200fd5ee"
  };



const app = initializeApp(firebaseConfig);


  const db = getFirestore(app);

  const auth = getAuth(app);

  export {db, auth};