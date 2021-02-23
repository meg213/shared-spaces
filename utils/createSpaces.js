import { db } from '../config/keys';
import { Alert } from 'react-native';

const spaceCollection = "spaces"

export async function createSpaces(spaceName, spaceType) {
    try {
        Alert.alert("Clicked");
        db.collection(spaceCollection).doc(spaceName).set({name: spaceName, type: spaceType});
    } catch (e) {
        Alert.alert(e.message);
    }
}