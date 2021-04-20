import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/database'


let config = {
    apiKey: "AIzaSyC8uZps5AmZ3LDJbZl9i3Cc8lz7BIoUEqM",
    authDomain: "sharedspace-dev-73ffe.firebaseapp.com",
    databaseURL: "https://sharedspace-dev-73ffe-default-rtdb.firebaseio.com",
    projectId: "sharedspace-dev-73ffe",
    storageBucket: "sharedspace-dev-73ffe.appspot.com",
    messagingSenderId: "1062647294947",
    appId: "1:1062647294947:web:717481cabcac83ace34ed6"
};

let app = firebase.initializeApp(config);
const db = app.firestore();
const storage = app.storage();
export {
    db, storage
}



