import firebase from 'firebase'
import 'firebase/firestore'
require('firebase/auth')

var firebaseConfig = {
    apiKey: "AIzaSyDopiB2WdMvQTKoBXDCwRMRJCL0N-u07lk",
    authDomain: "connectme-1ff61.firebaseapp.com",
    databaseURL: "https://connectme-1ff61.firebaseio.com",
    projectId: "connectme-1ff61",
    storageBucket: "connectme-1ff61.appspot.com",
    messagingSenderId: "861764469101",
    appId: "1:861764469101:web:20efc4887d84ff98f25a64",
    measurementId: "G-VXES8LRFB5"
  };

  let Firebase=firebase.initializeApp(firebaseConfig)

  export const firestore = firebase.firestore()
  export default Firebase