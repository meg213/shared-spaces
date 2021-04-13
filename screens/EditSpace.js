import React, { useState, Component, useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, Text, View, SafeAreaView} from 'react-native';
import Button from '../components/Button';
import FormInput from '../components/FormInput';
import { Icon } from 'react-native-elements';
import { createItems } from '../utils/firebaseMethod';
import User from "../components/User";
import {db} from '../config/keys';
import {AlphabetList} from 'react-native-section-alphabet-list';
import { getImageDownloadURL } from '../utils/firebaseMethod';

const itemRef = db.collection('items');
const userRef = db.collection('users');
const spaceRef = db.collection('spaces');

export default function editSpace({route, navigation}) {
    console.log(route.params);
    //route params: spaceID, currUser
    // const currentUser = route.params.currUser;
    const componentIsMounted = useRef(true);
    const [users, setUsers] = useState([]);
    const [userIDToData, setMapUserIDToData] = useState(new Map());
    const currentSpaceID = route.params.spaceID.substring(7);

    useEffect(() => {
        return () => {
          componentIsMounted.current = false;
        };
      }, []);

    useEffect(() => {
        const subscriber = spaceRef.doc(currentSpaceID).onSnapshot(documentSnapshot => {createUsersData(documentSnapshot)});
        async function createUsersData(documentSnapshot) {
            var all_users = documentSnapshot.data().user;
            console.log(all_users);
            var data = [];
            var mapUserIDtoData = new Map();
            for (let i = 0; i < all_users.length; i++) {
                let userID = all_users[i];
                let userData = (await userRef.doc(userID).get()).data();
                let initials = userData.firstname[0] + userData.lastname[0]
                let avatar = await getImageDownloadURL(userID)
                mapUserIDtoData.set(userID, [userData, initials, avatar])
                data.push({value: userData.firstname + " " + userData.lastname, key: userID})
            }
            if (componentIsMounted.current) {
                setUsers(data)
                setMapUserIDToData(mapUserIDtoData)
            }
        }
        return () => subscriber;
      }, []);
    console.log(users)
    console.log(userIDToData)

    return(
        <SafeAreaView style = {[styles.container]}>
            <View>
                <Text style = {[styles.text]}>
                    Edit Space
                </Text>
            </View>
            <View style={{
                    paddingVertical:12
                }}>
                <Text style={styles.subtext}>Space Name</Text>
                <FormInput
                        labelValue={route.params.name}
                        onChangeText={(spaceName) => setName(spaceName)}
                        placeholderText="List Name"
                        autoCapitalize="none"
                        autoCorrect={false}
                />
                <Text style={styles.subtext}>{currentSpaceID}</Text>
                <Text style={styles.subtext}>Current Members</Text>
                <Text style={{paddingVertical: 12}}>To Do: Method for current list of users</Text>
                <AlphabetList
                    data = {users}
                    renderCustomItem={(user) => (
                        <User
                            size="medium"
                            title={userIDToData.get(user.key)[1]}
                            source={userIDToData.get(user.key)[2]}
                            name={userIDToData.get(user.key)[0].firstname}
                        />
                    )}
                />
                <Text style={[styles.subtext, {paddingVertical: 12}]}>Add Members</Text>
                <Button
                    name="Generate Code"
                />
            </View>
            <View style={{marginBottom: 50, width: '100%', position: 'absolute', bottom: 0}}>
                <Button
                    name="Delete Space"
                    color='#EB5757'
                    // onPress={() => createItems(currentUser, currentSpaceId, name, category, shared)}
                />
            </View>
        </SafeAreaView>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F0EB',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginHorizontal: 12,
    },
    text: {
        fontSize: 30,
        textAlign: "left",
        fontWeight: "500",
        color: "#184254",
    },
    subtext: {
        fontSize: 18,
        color: '#4E7580',
    },

})