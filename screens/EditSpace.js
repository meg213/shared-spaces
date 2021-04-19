import React, { useState, Component, useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, Text, View, SafeAreaView} from 'react-native';
import Button from '../components/Button';
import FormInput from '../components/FormInput';
import Input from "../components/Input";
import {joinCodeMax, joinCodeMin} from "../utils/Constants"
import User from "../components/User";
import {db} from '../config/keys';
import {AlphabetList} from 'react-native-section-alphabet-list';
import { getImageDownloadURL, updateSpace, generateCode, updateJoinCodeForSpace} from '../utils/firebaseMethod';

const itemRef = db.collection('items');
const userRef = db.collection('users');
const spaceRef = db.collection('spaces');

export default function editSpace({route, navigation}) {
    // console.log(route.params);
    //route params: spaceID, currUser
    const componentIsMounted = useRef(true);
    const [users, setUsers] = useState([]);
    const [userIDToData, setMapUserIDToData] = useState(new Map());
    const currentSpaceID = route.params.spaceID.substring(7);
    const [name, setName] = useState(route.params.name);
    const [code, setCode] = useState();

    useEffect(() => {
        const subscriber = spaceRef.doc(currentSpaceID).onSnapshot(documentSnapshot => {createUsersData(documentSnapshot)});
        async function createUsersData(documentSnapshot) {
            var all_users = documentSnapshot.data().user;
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
    
      const handleGenerateCodeSubmit = async() => {
        let code = await generateCode()
        setCode(code)
        await updateJoinCodeForSpace(currentSpaceID, code)
    }
    

    useEffect(() => {
        return () => {
          componentIsMounted.current = false;
        };
    }, []);
      

    const deleteConfirmAlert = () => 
        Alert.alert(
            "Are you sure?",
            "You are about to delete your space. This action cannot be reversed.",
            [
                {
                    text: "Cancel",
                    style: cancel
                },
                {
                    text: "Delete Space",
                    onPress: () => console.log("delete space!")
                }
            ]
        );
    console.log(code)

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
                        labelValue={name}
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
                <Input
                    placeholderText="Join Space Code"
                    labelValue={code}
                />
                <Button
                    name="Generate Code"
                    onClick={handleGenerateCodeSubmit}
                />
            </View>
            <View style={{marginBottom: 50, width: '100%', position: 'absolute', bottom: 0,}}>
                <View style={{paddingVertical: 12}}>
                <Button
                    name="Update Space"
                    color='#184254'
                    onClick={() => { 
                        console.log(currentSpaceId.substring(7))
                        updateSpace(currentSpaceId, name);
                        navigation.navigate('SpacePage') 
                    }}
                />
                </View>
                <Button
                    name="Delete Space"
                    color='#EB5757'
                    onPress = { () => {
                        console.log("Delete?")
                        deleteConfirmAlert
                    }}
                    // onClick={() => createItems(currentUser, currentSpaceId, name, category, shared)}
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