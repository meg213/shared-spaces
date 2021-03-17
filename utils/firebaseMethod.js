import { db } from '../config/keys';
import firebase from 'firebase/app';
import { Alert } from 'react-native';
import Item from '../components/Item';

const spaceRef = db.collection("spaces")
const userRef = db.collection("users")
const itemRef = db.collection("items")

export async function createItems(currentUser, currentSpaceId, itemName, itemCategory, isShared) {
    // console.log(currentUser)
    try {
        const currItem = itemRef.add({
            category: itemCategory,
            isShared: isShared,
            name: itemName,
            spaceID: currentSpaceId,
            userID: "users/" + currentUser.uid
        });
        spaceRef.doc(currentSpaceId.substring(7))
        .update({
            items: firebase.firestore.FieldValue.arrayUnion((await currItem).path)
        })
        Alert.alert("Item Created");
    } catch (e) {
        Alert.alert(e.message)
    }
}

export async function createSpaces(currentUser, spaceName, spaceType) {
    try {
        const currSpace = spaceRef.add({
            name: spaceName,
            spaceType: spaceType,
            items: [],
            user: firebase.firestore.FieldValue.arrayUnion(currentUser.uid)
        });
        userRef.doc(currentUser.uid)
        .update({
            spaces: firebase.firestore.FieldValue.arrayUnion((await currSpace).path)
        });
        Alert.alert("Space created!");
    } catch (e) {
        alert(e.message);
    }
}

export async function signUp(lastName, firstName, email, phone, password, confirmPassword) {
    if (!lastName) {
        alert('First name is required');
    } else if (!firstName) {
        alert('First name is required');
    } else if (!email) {
        alert('Email field is required.');
    } else if (!password) {
        alert('Password field is required.');
    } else if (!confirmPassword) {
        setPassword('');
        alert('Confirm password field is required.');
    } else if (password !== confirmPassword) {
        alert('Password does not match!');
    } else {
        try {
            await firebase.auth().createUserWithEmailAndPassword(email, password);
            const currUser = firebase.auth().currentUser;
            userRef.doc(currUser.uid).set({
                email: currUser.email,
                firstname: firstName,
                lastname: lastName,
                phone: phone,
                spaces: []
            });
        } catch (e) {
            alert(e.message);
        }
    }
}

export async function signIn(email, password) {
    try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (err) {
        alert("Failed to login: ", err.message);
    }
}

export async function logout() {
    try {
        await firebase.auth().signOut();
    } catch (e) {
        console.log(e);
    }
}   

export async function resetPassword(email) {
    try {
        await firebase.auth().resetPassword(email);
    } catch (e) {
        console.log(e);
    }
}
