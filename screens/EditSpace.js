import React, { useState, Component, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, SafeAreaView, Modal} from 'react-native';
import Button from '../components/Button';
import User from '../components/User';
import FormInput from '../components/FormInput';
import { Icon } from 'react-native-elements';
import { changeSpaceOwner, deleteSpace, getSpace, leaveSpace, updateSpace } from '../utils/firebaseMethod';
import { db } from '../config/keys';

export default function editSpace({route, navigation}) {
    //route params: spaceID, currUser
    const [name, setName] = useState(route.params.name);
    const [modalVisible, setModalVisible] = useState(false)
    const [isOwner, setIsOwner] = useState(false);
    const [members, setMembers] = useState([]);
    const currentUser = route.params.currUser;
    const currentSpaceId = route.params.spaceID;

    // db refs
    const userRef = db.collection('users');


    // Get the owner of a space
    //TODO HAS ERRORS??? UNSURE WHY
    useEffect(() => {
        async function getOwner() {
            let spaceOwner = (await getSpace(currentSpaceId)).owner;
            let user = currentUser.uid
            // compare to see if current user is the space owner
            if (spaceOwner === user ){
                console.log('hello')
            }
            (spaceOwner === user) ? setIsOwner(true) : setIsOwner(false);
        }
       getOwner();
    }, []);

    //grab the potential new owners (exclude current owner)
    const nonOwners = [];
    const changeOwner = () => {
        for (var i = 0; i < members.length; i++){
            if (!members[i].owner){
                nonOwners.push(members[i]);
            }
        }
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
                    users.push({firstName: userData.firstname, lastName: userData.lastname, initials: initials, owner: true})
                else {
                    users.push({firstName: userData.firstname, lastName: userData.lastname, initials: initials, owner: false})
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
                            <View style={[styles.users, {justifyContent:'space-between'}]}>
                                <View style={styles.users}>
                                    <User
                                        initials={user.initials}
                                    />
                                    <Text style={styles.userText}>{user.firstName} {user.lastName} </Text>
                                </View>
                                <View style={{paddingRight: 12, paddingTop:16}}>
                                 {user.owner ? <Icon  name='star' size={36}/> : null}
                                </View>
                            </View>
                    )})}
                </View>
                <Text style={[styles.subtext, {paddingVertical: 12}]}>Add Members</Text>
                <Button
                    name="Generate Code"
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
                <View>
                    <View style={{paddingVertical: 8}}>
                        <Button
                            name="Change Owner"
                            color='#219653'
                            onClick={() => {
                                changeOwner();
                                setModalVisible(true)
                                // TODO: Change null to new owner id through modal
                                // changeSpaceOwner(currentUser, null, currentSpaceId);
                            }}
                        /> 
                    </View>
                    <Button
                        name="Delete Space"
                        color='#EB5757'
                        onClick={() => {
                            deleteSpace(currentUser, currentSpaceId);
                            navigation.navigate('MySpacesPage')
                        }}
                    />
                </View>
                :                
                <View style={{paddingVertical: 12}}>
                    <Button
                        name="Leave Space"
                        color='#F2994A'
                        onClick= {() => {
                            leaveSpace(currentUser, currentSpaceId, null);
                            navigation.navigate('MySpacesPage') 
                        }}
                    />
                 </View> 
                }
            </View>
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
                    <Text style={styles.modalText}>Change Owner</Text>
                    <View>
                        {nonOwners.map((user) => {
                            return (
                                <Text>{user.firstName}</Text>
                            )
                        })}
                    </View>
                    <Button
                        name="Update Owner"
                        color= "#184254"
                        onClick={() => setModalVisible(!modalVisible)}
                    >
                    <Text style={styles.textStyle}>Hide Modal</Text>
                    </Button>
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
        margin: 20,
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
        fontSize: 18,
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