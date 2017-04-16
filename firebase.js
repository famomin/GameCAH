import * as firebase from 'firebase';

const config = {
     apiKey: "AIzaSyCTKP5CD183HRaUy3NnS13iHAQNFJab8oo",
     authDomain: "project3database.firebaseapp.com",
     databaseURL: "https://project3database.firebaseio.com",
     storageBucket: "project3database.appspot.com",
   };
const firebaseApp = firebase.initializeApp(config);
  
module.exports = firebase.database();