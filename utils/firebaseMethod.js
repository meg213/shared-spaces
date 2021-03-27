import { db } from '../config/keys';
import firebase from 'firebase/app';
import { Alert } from 'react-native';
import Item from '../components/Item';

const spaceRef = db.collection("spaces")
const userRef = db.collection("users")
const itemRef = db.collection("items")
const listRef = db.collection("lists")

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
            owner: currentUser,
            user: firebase.firestore.FieldValue.arrayUnion(currentUser.uid),
            lists: [],
            items: []
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

export async function deleteSpace(currentUser, currentSpace) {
    try {
        // Authenticate owner is requesting deletion.
        const spaceID = currentSpaceID.substring(7);
        const owner = spaceRef.doc(spaceID).owner;

        console.log("Owner: ", owner);
        console.log("Current User: ", currentUser);

        if (currentUser != owner) {
            // Requesting user is not the owner, alert and exit.
            Alert.alert("Invalid Permissions: Only the owner may delete the Space.");
            return;
        }

        // User is authenticated. Delete the space.
        // 1. Delete the lists.
        // TODO: Delete list 

        // 2. Delete the items.
        const items = spaceRef.doc(spaceID).items;  // Items array in space's unnamed list
        for (let i = 0; i < items.length; i++) {
            let currItemID = items[i].substring(6);
            itemsRef.doc(currItemID).delete();
        }

        // 3. Delete the space.
        spaceRef.doc(spaceID).delete().then(() => {
            console.log("Space sucessfully deleted!");
        });
    } catch (e) {
        console.error("Error deleting space: ", e);
        alert(e.message);
    }
}

export async function createNewList(currentSpaceID, listName) {
    try {
        console.log("Creating new list!")

        const newList = listRef.add({
            name: listName,
            spaceID: currentSpaceID,
            items: []
        })
        spaceRef.doc(currentSpaceID.substring(7)).update({
            lists: firebase.firestore.FieldValue.arrayUnion((await newList).path)
        })

        Alert.alert("Created a new list!");
    } catch (e) {
        alert(e.message);
    }
}

export async function deleteList(currentList, currentSpace) {
    try {
        // Verify given list to delete belongs to corresponding space.
        const spaceID = currentSpace.substring(7);
        const listID  = currentList.substring(6);

        const availableLists = spaceRef.doc(spaceID).lists;
        let canDeleteList = 0;
        for (let i = 0; i < availableLists.length; i++) {
            let currList = availableLists[i].subtring(6);
            if (currList == listID) {
                // Found list in corresponding space.
                canDeleteList = 1;
                break;
            }
        }

        if (!canDeleteList) {
            // Did not find list in corresponding space.
            console.log("deleteList: Invalid Permissions");
            console.log("deleteList: List must belong to corresponding Space");
            return;
        }

        // NOTE: Deleting a list should move items to the unnamed list
        // A.K.A Transfer all items from list's "items" to space's "items"
        
        // Add items to space's "items"
        const listItems = listRef.doc(listID).items;

        spaceRef.doc(currentSpaceID.substring(7)).update({
            items: firebase.firestore.FieldValue.arrayUnion((await listItems).path)
        })

        // Delete reference to list.
        listRef.doc(listID).delete();
    } catch (e) {
        console.error("Error deleting list: ", e);
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
