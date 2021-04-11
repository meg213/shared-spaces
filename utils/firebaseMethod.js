import { db } from '../config/keys';
import firebase from 'firebase/app';
import { Alert } from 'react-native';
import Item from '../components/Item';

const spaceRef = db.collection("spaces")
const userRef = db.collection("users")
const itemRef = db.collection("items")
const listRef = db.collection("lists")

/**
 * Add new user to target Space
 * @param targetSpace Space ID new user wishes to join
 * @param requestingUser User requesting to join space
 */
export async function addNewUser(targetSpace, requestingUser) {
    const spaceID = targetSpace.substring(7);
    const userID  = requestingUser.substring(6);

    try {
        // Check if user is already in space.
        const currentUsers = spaceRef.doc(spaceID).user;
        for (let i = 0; i < currentUsers.length; i++) {
            if (currentUsers[i] == requestingUser) {
                return;
            }
        }

        // User is not in group. Add to target space.
        spaceRef.doc(spaceID).update({
            user: firebase.firestore.FieldValue.arrayUnion((await requestingUser).path)
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
 * @param isShared          Is the item shared or not?
 */
export async function createItems(currentUser, currentSpaceId, itemName, isShared) {
    try {
        const currItem = itemRef.add({
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

/**
 * Creates new Item within LIST
 * @param currentUser       User creating the item
 * @param targetList        List item belongs to
 * @param itemName          Name of the item
 * @param isShared          Is the item shared or not?
 */
 export async function createItemInList(currentUser, targetList, itemName,isShared) {
    try {
        const currItem = itemRef.add({
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

// /**
//  * Moves array of items 
//  * @param itemArray     array of item IDs to move
//  * @param currentSpace  spaceID holding all unlisted items
//  * @param targetList    target listID to move all items to
//  */
// export async function moveCheckedItemsToList(itemArray, currentSpace, targetList) {

// }

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
 * Updates a space's info in firebase
 * Unused fields should be NULL
 * 
 * @param targetSpace ID of space requesting change, assumed spaces/...
 * @param newOwner Optional: New owner user ID
 * @param newName Optional: New name of the new space
 * @param newType Optional: New type of the new space
 */
 export async function updateSpaces(targetSpace, newOwner, newName, newType) {
    const spaceID = targetSpace.substring(7);
    
    try {
        if (newOwner != null) {
            spaceRef.doc(targetSpace).update({
                owner: newOwner
            });
        }

        if (newName != null) {
            spaceRef.doc(targetSpace).update({
                name: newName
            });
        }

        if (newType != null) {
            spaceRef.doc(targetSpace).update({
                spaceType: newType
            });
        }
    } catch (e) {
        alert(e.message);
    }
}

/**
 * Removes user from space
 * @param currentUser   User requesting or marked for removal
 * @param currentSpace  Space where currentUser is a member
 */
export async function leaveSpace(currentUser, currentSpace) 
{
    const spaceID = currentSpace.substring(7);
    const userID  = currentUser.uid;

    try {
        // const spaceData = getSpace(currentSpace);
        const spaceData = (await getSpace(currentSpace));
        const owner = spaceData.owner
        const numUsers = spaceData.user.length;

        if (numUsers == 1) {
            // Owner is the sole member of the space
            deleteSpace(currentUser, currentSpace);
        } else if (userID == owner) {
            Alert.alert("Attempted to leave space as owner. Please change ownership before continuing.");
            return -1;
        } else {
            // Remove users from space
            spaceRef.doc(spaceID).update({
                users: firebase.firestore.FieldValue.arrayRemove((await userID))
            });
            // Remove space from user
            userRef.doc(userID).update({
                spaces: firebase.firestore.FieldValue.arrayRemove((await currentSpace))
            });
        }
    } catch (e) {
        console.error("Error leaving space: ", e);
        alert(e.message);
    }
}

/**
 * Changes owner for the current space
 * @param currentUser   User requesting ownership change
 * @param newOwner      Target owner
 * @param currentSpace  Space where both users are members
 */
export async function changeSpaceOwner(currentUser, newOwner, currentSpace)
{
    const spaceID = currentSpaceID.substring(7);
    const userID  = currentUser.uid;

    try {
        const owner = (await getSpace(currentSpace)).owner;

        if (userID != owner) {
            Alert.alert("Invalid Permissions: Only the owner may change ownership of the Space.");
            return -1;
        }

        spaceRef.doc(spaceID).update({
            owner: newOwner
        });

        return 0;
    } catch (e) {
        console.error("Error change space owner: ", e);
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
        const spaceID = currentSpace.substring(7);
        const spaceData = (await getSpace(currentSpace));

        const owner = spaceData.owner;
        const userID = currentUser.uid;

        if (userID != owner) {
            // Requesting user is not the owner, alert and exit.
            Alert.alert("Invalid Permissions: Only the owner may delete the Space.");
            return;
        }

        // User is authenticated. Delete the space.
        // 1. Delete the lists.
        const lists = spaceData.lists;
        console.log(lists)

        for (let i = 0; i < lists.length; i++) {
            deleteList(lists[i], currentSpace);
        }

        // 2. Delete the items.
        const items = spaceData.items;  // Items array in space's unnamed list
        for (let i = 0; i < items.length; i++) {
            let currItemID = items[i].substring(6);
            itemRef.doc(currItemID).delete();
        }

        // 3. Delete the space.
        spaceRef.doc(spaceID).delete().then(() => {
            console.log("Space sucessfully deleted!");
        });

        // 4. Delete the user reference to the space
        userRef.doc(userID).update({
            spaces: firebase.firestore.FieldValue.arrayRemove((await currentSpace))
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
        spaceData = (await spaceRef.doc(spaceID).get()).data();
    } catch (e) {
        console.error("getSpace: Error in getting space with ID: ", spaceID);
        alert(e.message);
        return null;
    }
    return spaceData;
}


/**
 * Updates the name of a Space
 * In future, add to this method with more updates
 * @param spaceID           Current Space
 * @param newName           New space Name
 */
 export async function updateSpace(spaceID, newName) {
    try {
        spaceRef.doc(spaceID.substring(7)).update({
            name: newName
        })
        let itemData = (await spaceRef.doc(spaceID.substring(7)).get()).data();
        console.log( itemData)
        console.log('space updated');
    } catch (e) {
        Alert.alert(e.message)
    }
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

        let path = newList.ref().toString();
        return path;
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

        const availableLists = (await getSpace(currentSpace)).lists;

        let canDeleteList = 0;
        for (let i = 0; i < availableLists.length; i++) {
            let currList = availableLists[i].substring(6);
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
 * @param space ID of the current space, should be of form spaces/...
 * @returns     items[], or the default list of the space
 */
export async function getDefaultList(space) {
    const spaceID = currentSpace.substring(7);

    try {
        return spaceRef.doc(spaceID).items;
    } catch (e) {
        console.error("Error retrieivng lists from space: ", e);
        alert(e.message);
    }
}

/**
 * Return all lists belonging to corresponding page
 * 
 * @param space ID of the current space, should be of form spaces/...
 * @returns [] of Firebase List objects
 */
export async function getAllLists(space) {
    const spaceID = currentSpace.substring(7);

    try {
        return spaceRef.doc(spaceID).lists;
    } catch (e) {
        console.error("Error retrieivng lists from space: ", e);
        alert(e.message);
    }
}

/**
 * Returns list data for given ID, or null if error occurs
 * @param list Firebase ID of desired list, assumed to be "lists/..."
 */
 export async function getListData(list) {
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

/** 
 * Authentication Functions
*/
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
