import React, { useState, Component, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, SafeAreaView, Modal} from 'react-native';
import Button from '../components/Button';
import FormInput from '../components/FormInput';
import { Icon } from 'react-native-elements';
import { changeSpaceOwner, deleteSpace, getSpace, leaveSpace, updateSpace, getAllMembers } from '../utils/firebaseMethod';

export default function editSpace({route, navigation}) {
    //route params: spaceID, currUser
    const [name, setName] = useState(route.params.name);
    const [modalVisible, setModalVisible] = useState(false)
    const [isOwner, setIsOwner] = useState(false);
    const [members, setMembers] = useState([]);
    const toggleShared = () => setShared(previousState => ! previousState);
    const currentUser = route.params.currUser;
    const currentSpaceId = route.params.spaceID;


    // Conditional rendering for the change ownership button
    // User ID must be equal to the owner ID
    useEffect(() => {
        async function getOwner() {
            let spaceOwner = (await getSpace(currentSpaceId)).owner;
            let user = currentUser.uid
            (spaceOwner === user) ? setIsOwner(true) : setIsOwner(false);
        }
       getOwner();
    }, []);

    // get the members of a space
    useEffect(() => {
        async function getMembers() {
            let users = (await getSpace(currentSpaceId)).user;
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
                
                <Text style={[styles.subtext, {paddingVertical: 12}]}>Add Members</Text>
                <Button
                    name="Generate Code"
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
                {isOwner ? 
                <Button
                    name="Change Owner"
                    color='#219653'
                    onClick={() => {
                        setModalVisible(true)
                        // TODO: Change null to new owner id through modal
                        // changeSpaceOwner(currentUser, null, currentSpaceId);
                    }}
                /> : null
                }
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
                <Button
                    name="Delete Space"
                    color='#EB5757'
                    onClick={() => {
                        deleteSpace(currentUser, currentSpaceId);
                        navigation.navigate('MySpacesPage')
                    }}
                />
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
      }
    

})