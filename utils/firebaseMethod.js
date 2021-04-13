import  {useState} from 'react';
import { db } from '../config/keys';
import {storage} from '../config/keys';
import firebase from 'firebase/app';
import { Alert } from 'react-native';
import Item from '../components/Item';
import { set } from 'react-native-reanimated';

const spaceRef = db.collection("spaces")
const userRef = db.collection("users")
const itemRef = db.collection("items")
const listRef = db.collection("lists")



export async function joinSpace(currUser, spaceID) {
    const userID = currUser.uid;
    addNewUser(spaceID, userID);
}
/**
 * Add new user to target Space
 * @param targetSpace Space ID new user wishes to join
 * @param requestingUser User requesting to join space
 */
export async function addNewUser(targetSpace, requestingUser) {
    const spaceID = targetSpace;
    console.log(spaceID)
    console.log(requestingUser)
    console.log(("spaces/"+spaceID).replace(" ", ''))
    try {
        // Check if user is already in space.
        const currentUsers = ((await spaceRef.doc(spaceID).get()).data().user);
        console.log(currentUsers)
        for (let i = 0; i < currentUsers.length; i++) {
            if (currentUsers[i] == requestingUser) {
                console.log("found")
                return;
            }
        }
        console.log("spaces/" + spaceID)
        // User is not in group. Add to target space.
        spaceRef.doc(spaceID).update({
            user: firebase.firestore.FieldValue.arrayUnion(requestingUser)
        });
        userRef.doc(requestingUser).update({
            spaces: firebase.firestore.FieldValue.arrayUnion(("spaces/"+spaceID).replace(" ", ''))
        });
    } catch (e) {
        console.error("addNewUser: Error in adding user");
        Alert.alert(e.message);
    }
}
/**
 * Deletes user from Firebase
 * @param currentUser User requesting deletion
 */
export async function deleteUser(currentUser) {
    const userID = currentUser.substring(6);

    try {
        userRef.doc(userID).delete().then(() => {
            console.log("deleteUser: User deleted successfully!")
        })
    } catch (e) {
        console.error("deleteUser: Error in deleting user");
        Alert.alert(e.message);
    }
}

/**
 * Creates new Item within SPACE
 * @param currentUser       User creating the item
 * @param currentSpaceId    Space item belongs to
 * @param itemName          Name of the item
 * @param itemCategory      Type of the item
 * @param isShared          Is the item shared or not?
 */
export async function createItems(currentUser, currentSpaceId, itemName, itemCategory, isShared, image) {
    console.log(image)
    try {
        const currItem = itemRef.add({
            category: itemCategory,
            isShared: isShared,
            name: itemName,
            spaceID: currentSpaceId,
            listID: "",
            userID: ("users/"+currentUser.uid).replace(" ", '')
        });
        spaceRef.doc(currentSpaceId.substring(7))
        .update({
            items: firebase.firestore.FieldValue.arrayUnion((await currItem).path)
        })
        if (image != '') {
            const response = await fetch(image)
            const blob = await response.blob()
            const uploadImage = storage.ref().child(itemName)
            let data =  {
                userID: currentUser.uid,
                spaceID: currentSpaceId
            }
            uploadImage.put(blob, data)
        }
    } catch (e) {
        Alert.alert(e.message)
    }
}

/**
 * Creates new Item within LIST
 * @param currentUser       User creating the item
 * @param targetList        List item belongs to
 * @param itemName          Name of the item
 * @param itemCategory      Type of the item
 * @param isShared          Is the item shared or not?
 */
 export async function createItemInList(currentUser, targetList, itemName, itemCategory, isShared) {
    try {
        const currItem = itemRef.add({
            category: itemCategory,
            isShared: isShared,
            name: itemName,
            spaceID: "",
            listID: targetList,
            userID: "users/" + currentUser.uid
        });

        listRef.doc(targetList.substring(6)).update({
            items: firebase.firestore.FieldValue.arrayUnion((await currItem).path)
        })
    } catch (e) {
        Alert.alert(e.message)
    }
}

/**
 * Moves item from space's items[] to target list's items[]
 * @param currentItem   Item desired to move
 * @param currentSpace  Space currently owning currentItem
 * @param targetList    Desired destination list
 */
export async function moveItemToList(currentItem, currentSpace, targetList) {
    const itemID  = item.substring(6);
    const spaceID = currentSpace.substring(7);
    const listID  = targetList.substring(6);

    try {
        let itemDoc = itemRef.doc(itemID); 

        spaceRef.doc(spaceID).update({
            items: firebase.firestore.FieldValue.arrayRemove((await itemDoc).path)
        })

        listRef.doc(listID).update({
            items: firebase.firestore.FieldValue.arrayUnion((await itemDoc).path)
        })
    } catch (e) {
        alert(e.message);
    }
}

/**
 * Returns item data for given ID, or null if error occurs
 * @param item Firebase ID of desired item, assumed to be "items/..."
 */
export async function getItem(item) {
    const itemID = item.substring(6);
    let itemData;
    
    try {
        itemData = itemRef.doc(itemID).get().data();
    } catch (e) {
        console.error("getItem: Error in getting item with ID: ", itemID);
        alert(e.message);
        return null;
    }

    return itemData;
}

/**
 * Creates a new Space in Firebase
 * @param currentUser User requesting creation, will be the owner
 * @param spaceName Name of the new space
 * @param spaceType Type of the new space
 */
export async function createSpaces(currentUser, spaceName, spaceType) {
    try {
        const currSpace = spaceRef.add({
            name: spaceName,
            spaceType: spaceType,
            owner: currentUser.uid,
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

/**
 * Deletes the Space ONLY IF currentUser is the owner of the Space
 * @param currentUser User requesting deletion
 * @param currentSpace Space targeted for deletion
 * @returns 
 */
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

/**
 * Returns space data for given ID, or null if error occurs
 * @param space Firebase ID of desired space, assumed to be "spaces/..."
 */
 export async function getSpace(space) {
    const spaceID = space.substring(7);
    let spaceData;
    
    try {
        spaceData = spaceRef.doc(spaceID).get().data();
    } catch (e) {
        console.error("getSpace: Error in getting space with ID: ", spaceID);
        alert(e.message);
        return null;
    }

    return spaceData;
}

/**
 * Creates a new list reference in Firebase
 * @param currentSpaceID Space to own the newly created list
 * @param listName Name of the list
 */
export async function createNewList(currentSpaceID, listName) {
    try {
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

/**
 * Deletes List reference and transfers all items to corresponding space
 * @param currentList List to delete
 * @param currentSpace Space to move all list items to, must own currentList
 * @returns 
 */
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

/**
 * Returns list data for given ID, or null if error occurs
 * @param list Firebase ID of desired list, assumed to be "lists/..."
 */
 export async function getList(list) {
    const listID = list.substring(6);
    let listData;
    
    try {
        listData = listRef.doc(listID).get().data();
    } catch (e) {
        console.error("getSpace: Error in getting space with ID: ", listID);
        alert(e.message);
        return null;
    }

    return listData;
}

export async function uploadImageToStorage(userID, image) {
    if (image != '') {
        var photoURL = ""
        const response = await fetch(image)
        const blob = await response.blob()
        const uploadImage = storage.ref().child(userID)
        await uploadImage.put(blob)
    }
}

export async function getImageDownloadURL(imageID) {
    var photoURL = null
    try {
        await storage.ref(imageID).getDownloadURL().then((url) => {
            photoURL = url
        })
    } catch (e) {
        alert(e.message);
    } finally {
        return photoURL
    }
}

export async function updateProfileInformation(user, lastName, firstName, email, phone, imageURI, newPassword, currPassword) {
    const userID = user.uid;
    if (imageURI != null) {
        console.log(await getImageDownloadURL(userID))
        if (await getImageDownloadURL(userID) != null) {
            await storage.ref(userID).delete()
        }
        await uploadImageToStorage(userID, imageURI)
        
    }
    userRef.doc(userID).update({
        firstname: firstName,
        lastname: lastName,
        phone: phone,
        email: email,
    });
    await user.updateProfile({
        displayName: firstName[0] + lastName[0],
        email: email
    })
    await user.updateEmail(email)
    if (newPassword != "" && currPassword != "") {
        const currUser = firebase.auth().currentUser;
        var creds = firebase.auth.EmailAuthProvider.credential(email, currPassword)
        currUser.reauthenticateWithCredential(creds).then(() => {
            currUser.updatePassword(newPassword)
            Alert.alert("password updated")
        }).catch(() => {
            Alert.alert("update password failed")
        })
    }
}

/** 
 * Authentication Functions
*/
export async function signUp(lastName, firstName, email, phone, password, confirmPassword, image) {
    if (!lastName) {
        Alert.alert('First name is required');
    } else if (!firstName) {
        Alert.alert('First name is required');
    } else if (!email) {
        Alert.alert('Email field is required.');
    } else if (!password) {
        Alert.alert('Password field is required.');
    } else if (!confirmPassword) {
        setPassword('');
        Alert.alert('Confirm password field is required.');
    } else if (password !== confirmPassword) {
        Alert.alert('Password does not match!');
    } else {
        try {
            await firebase.auth().createUserWithEmailAndPassword(email, password);
            const currUser = firebase.auth().currentUser;
            const userID = currUser.uid;
            uploadImageToStorage(userID, image)
            await currUser.updateProfile({
                displayName: firstName[0] + lastName[0]
            })
            userRef.doc(userID).set({
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
