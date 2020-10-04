import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDg2Y611SMPR0t3114MpmsYSQlIK7EInyI",
    authDomain: "myreact-7ef1a.firebaseapp.com",
    databaseURL: "https://myreact-7ef1a.firebaseio.com",
    projectId: "myreact-7ef1a",
    storageBucket: "myreact-7ef1a.appspot.com",
    messagingSenderId: "835520010368",
    appId: "1:835520010368:web:c393af706860323833ee65",
    measurementId: "G-GGKYFPE3C4"
  };

const fire = firebase.initializeApp(firebaseConfig);

export default fire;