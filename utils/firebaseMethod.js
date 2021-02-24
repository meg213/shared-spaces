import { db } from '../config/keys';
import firebase from 'firebase/app';

const spaceCollection = "spaces"

export async function createSpaces(spaceName, spaceType) {
    try {
        db.collection(spaceCollection).doc(spaceName).set({name: spaceName, type: spaceType});
    } catch (e) {
        alert(e.message);
    }
}

const userCollection = "users";

export async function signUp(lastName, firstName, email, phone, password, confirmPassword) {
    console.log("clicked");
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
            console.log(currUser.uid);
            db.collection(userCollection).doc(currUser.uid).set({
                email: currUser.email,
                firstname: firstName,
                lastname: lastName,
                phone: phone
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