import firebase from 'firebase'
var config = {
    apiKey: "AIzaSyD9_sUa5MnIA0CxsO44Oofd5_7y-j45SXg",
    authDomain: "end-slavery-now.firebaseapp.com",
    databaseURL: "https://end-slavery-now.firebaseio.com",
    projectId: "end-slavery-now",
    storageBucket: "end-slavery-now.appspot.com",
    messagingSenderId: "48416679514"
  };
var fire = firebase.initializeApp(config);
export default fire;
