import React, { useState, Component, useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, Text, View, SafeAreaView, Modal, Pressable} from 'react-native';
import Button from '../components/Button';
import User from '../components/User';
import FormInput from '../components/FormInput';
import { Icon } from 'react-native-elements';
import Input from "../components/Input";
import {joinCodeMax, joinCodeMin} from "../utils/Constants"
import {db} from '../config/keys';
import {AlphabetList} from 'react-native-section-alphabet-list';
import { changeSpaceOwner, deleteSpace, getSpace, leaveSpace, getImageDownloadURL, updateSpace, generateCode, updateJoinCodeForSpace, removeUser} from '../utils/firebaseMethod';

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

    const [modalVisible, setModalVisible] = useState(false)
    const [optionModalVisible, setOptionModalVisible] = useState(false);
    const [isOwner, setIsOwner] = useState(false);
    const [members, setMembers] = useState([]);
    const [memberClicked, setMemberClicked] = useState('');
    const [memberClickedId, setMemberClickedID] = useState('');
    const [option, setOption] = useState('');
    const currentUser = route.params.currUser;
    const currentSpaceId = route.params.spaceID;
    
    // db refs
    const userRef = db.collection('users');

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
      
    // Get the owner of a space
    useEffect(() => {
        async function getOwner() {
            let spaceOwner = (await getSpace(currentSpaceId)).owner;
            let user = currentUser.uid;
            // compare to see if current user is the space owner
            if (spaceOwner.toString() === user.toString() ){
                setIsOwner(true);
            } else {
                setIsOwner(false);
            }
        }
       getOwner();
    }, []);

    const openModal = (user, id) => {
        setMemberClicked(user);
        setMemberClickedID(id);
        setModalVisible(true);
    }
    // get the members of a space
    useEffect(() => {
        async function getMembers() {
            // get the array of users
            let userIDs = (await getSpace(currentSpaceId)).user;
            let owner = (await getSpace(currentSpaceId)).owner;

            let users = []
            for (var i = 0; i < userIDs.length; i++) {
                let userData = (await userRef.doc(userIDs[i]).get()).data();
                let initials = userData.firstname.substring(0, 1) + userData.lastname.substring(0, 1);
                if (userIDs[i] === owner)
                    users.push({firstName: userData.firstname, lastName: userData.lastname, initials: initials, owner: true, id: userIDs[i]})
                else {
                    users.push({firstName: userData.firstname, lastName: userData.lastname, initials: initials, owner: false, id: userIDs[i]})
                }
            }
            setMembers(users);
        }
        getMembers();
    })

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
                <Text style={styles.subtext}>Current Members</Text>
                <View>
                    {members.map((user) =>
                        { return (
                            <Pressable  style={({ pressed }) => [{opacity: pressed ? 0.6 : 1}]}
                                onPress={ () => {
                                    if (isOwner) {
                                        openModal(user.firstName + ' ' + user.lastName, user.id)
                                    }
                                    } } >
                                <View style={[styles.users, {justifyContent:'space-between'}]}>
                                    <View style={styles.users}>
                                        <User
                                            title={user.initials}
                                        />
                                        <Text style={styles.userText}>{user.firstName} {user.lastName} </Text>
                                    </View>
                                    <View style={{paddingRight: 12, paddingTop:16}}>
                                    {user.owner ? <Icon  name='star' size={36}/> : null}
                                    </View>
                                </View>
                            </Pressable>
                    )})}
                </View>
                <Text style={[styles.subtext, {paddingVertical: 12}]}>Add Members with code: {code}</Text>
                <Button
                    name="Generate Code"
                    onClick={handleGenerateCodeSubmit}
                />
            </View>
            <View style={{marginBottom: 50, width: '100%', position: 'absolute', bottom: 0,}}>
                <Button
                    name="Update Space"
                    color='#184254'
                    onClick={() => { 
                        console.log(currentSpaceId.substring(7))
                        updateSpace(currentSpaceId, name);
                        navigation.navigate('SpacePage') 
                    }}
                />
                {isOwner ? 
                <View style={{paddingVertical: 8}}>
                    <Button
                        name="Delete Space"
                        color='#EB5757'
                        onClick={() => {
                            setOptionModalVisible(true);
                            setOption('delete')
                        }}
                    />
                </View>
                :<View style={{paddingVertical: 8}}>
                    <Button
                        name="Leave Space"
                        color='#F2994A'
                        onClick= {() => {
                            setOptionModalVisible(true);
                            setOption('leave')
                        }}
                    />
                 </View> 
                }
            </View>


        {/* MODAL FOR USERS */}
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
                }}
            >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={{marginLeft:'auto', marginBottom: -10}}>
                        <Icon name="close" size={36} onPress={()=> { setModalVisible(false)}} />
                    </View>
                    <Text style={styles.modalText}>{memberClicked}</Text>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{paddingRight: 10}}>
                            <Button
                                name="Make Owner"
                                color= "#219653"
                                width={100}
                                onClick={() =>
                                    {
                                    changeSpaceOwner(currentUser, memberClickedId, currentSpaceId);
                                    setIsOwner(false)
                                    setModalVisible(!modalVisible)
                                    }
                                }
                            />
                        </View>
                        <Button
                            name="Remove Member"
                            color= "#9B51E0"
                            width={100}
                            onClick={() => setModalVisible(!modalVisible)}
                        />
                    </View>
                </View>
            </View>
            </Modal>
        </View>


        {/* MODAL FOR LEAVING/DELETING SPACE*/}
        <View style={styles.centeredView}>
        <Modal
            animationType="slide"
            transparent={true}
            visible={optionModalVisible}
            onRequestClose={() => {
            setOptionModalVisible(!optionModalVisible);
            }}
        >
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Text style={styles.modalText}>Are you sure you wish to {option} the Space?</Text>
                <View style={{flexDirection: 'row'}}>
                    <View style={{paddingRight: 10}}>
                        <Button
                            name="Yes"
                            color= "#EB5757"
                            width={100}
                            onClick={() =>
                                {
                                if (option === 'delete'){
                                    // deleteSpace(currentUser, currentSpaceId);
                                    removeUser(currentSpaceID, currentUser, currentUser)
                                    navigation.navigate('MySpacesPage') 
                                } else {
                                    leaveSpace(currentUser, currentSpaceId, null);
                                    navigation.navigate('MySpacesPage') 
                                }
                                setOptionModalVisible(!optionModalVisible)
                                }
                            }
                        />
                    </View>
                    <Button
                        name="No"
                        color= "#219653"
                        width={100}
                        onClick={() => setOptionModalVisible(!optionModalVisible)}
                    />
                </View>
            </View>
        </View>
        </Modal>
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
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 12,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 24,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        color: '#184254',
        fontSize: 24,
        textAlign: "center"
      },
      users: {
        flexDirection: 'row',
        alignContent: 'center',
        paddingVertical: 6,
      },
      userText: {
        fontSize: 18,
        color: '#184254',
        paddingLeft: 12,
        paddingTop: 18 //temp solution, needs to be aligned verticaly
      }
    

})