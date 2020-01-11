import firebase from 'firebase';
var config = {
    apiKey: "AIzaSyAFL7aGFHP7Chz4d8W00-AWKvYXN937psg",
    authDomain: "hardwarestorestock.firebaseapp.com",
    databaseURL: "https://hardwarestorestock.firebaseio.com",
    projectId: "hardwarestorestock",
    storageBucket: "hardwarestorestock.appspot.com",
    messagingSenderId: "463081255449",
    appId: "1:463081255449:web:87b66d53071bdea13bf088",
    measurementId: "G-SF0J6BJ8VY"
};
  // Initialize Firebase
var app = firebase.initializeApp(config);
var fire = firebase.firestore(app);
export default fire;