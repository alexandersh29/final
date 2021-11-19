import firebase from "firebase/app";
import 'firebase/firestore';


const firebaseConfig = {

  apiKey: "AIzaSyCNVAs2mn4iBxBUZpG8aF_Vll4-7NAblUA",
  authDomain: "final-react-312c1.firebaseapp.com",
  projectId: "final-react-312c1",
  storageBucket: "final-react-312c1.appspot.com",
  messagingSenderId: "400662096168",
  appId: "1:400662096168:web:6cd8b6225f60276d4d881d"

};

  export const firebaseApp = firebase.initializeApp(firebaseConfig);