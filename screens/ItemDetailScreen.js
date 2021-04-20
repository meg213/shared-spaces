import React, { useState, Component, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, SafeAreaView, Modal, Image} from 'react-native';
import Button from '../components/Button';
import {storage, db} from '../config/keys';
import User from '../components/User';
import { deleteItem } from '../utils/firebaseMethod';

export default function ItemDetailScreen ({route, navigation}) {
    const itemData = route.params.data;
    const itemName = itemData.name;
    const list = itemData.listID;
    const shared = itemData.isShared;
    const [owner, setOwner] = useState()
    const [initials, setInitials] = useState()
    const [modalVisible, setModalVisible] = useState(false);
    const[image, setImage] = useState();

    useEffect(() => {
        (async () => {
          let imageRef = storage.ref(itemName);
        //   console.log(imageRef)
          await imageRef.getDownloadURL().then((url) => {
              setImage(url)
          })
          let userData = ((await db.collection("users").doc(itemData.userID.substring(6)).get()).data())
          let firstname = userData.firstname
          let lastname = userData.lastname
          let initial = firstname[0] + lastname[0]
          setOwner(firstname + lastname)
          setInitials(initial)
        })();
    }, []);

    console.log('route.params!', route.params.data.listName);
    return (
        <SafeAreaView style = {[styles.container]}>
            <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 4,paddingHorizontal: 30, flexDirection: 'row' }}>
                {image && <Image source={{ uri: image }} style={[styles.icon]} />}
                <Image source={require('../assets/icon.png')} style={[styles.icon]}/>
            </View>
            <View style={{paddingVertical: 30, paddingHorizontal: 30}}>
                <Text style={[styles.text]}>
                    {itemName}
                </Text>
                <Text style={[styles.subtext]}>
                    {route.params.data.listName}
                </Text>
            </View>
            { shared ?             
            <View style={{paddingVertical: 16, paddingHorizontal: 30, flexDirection: 'row', alignItems: 'center'}}>
                <Image source={require('../assets/logo.png')} style={[styles.image]}/>
                <View style={{paddingHorizontal: 6}}/>
                <Text style={[styles.small]}>
                    This item is {shared ? '' : "not "}
                    shared
                </Text>
            </View> : null}
            <View style={{paddingVertical: 16, paddingHorizontal: 30, flexDirection: 'row', alignItems: 'center'}}>
                <User initials={initials}/>
                <View style={{paddingHorizontal: 6}}/>
                <Text style={[styles.small]}>
                    {owner}
                </Text>
            </View>

            <View style={{ position: 'absolute', bottom: 48, flexDirection: 'row', paddingTop: 48, paddingHorizontal: 30, justifyContent: 'center'}}>
                <Button name="edit" width="55%" textColor="#184254" color="#ffffff" icon='edit' iconColor="#D9BD4B"
                    onClick={()=> {navigation.navigate("EditItemScreen", {route: route.params.data})}}
                />       
                <Button name="delete" width="55%" color="#ffffff" textColor="#184254" icon="close" iconColor="#EB5757"
                    onClick={()=> {setModalVisible(true)}}
                />
            </View>



        {/* MODAL FOR HANDLING DELETE ITEM*/}
        <View style={styles.centeredView}>
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            setModalVisible(!modalVisible);
            }}
        >
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Text style={styles.modalText}>Are you sure you wish to delete this item?</Text>
                <View style={{flexDirection: 'row', paddingVertical: 12}}>
                    <View style={{ paddingRight: 12}}>
                        <Button
                            name="Yes"
                            color= "#EB5757"
                            width={100}
                            onClick={() =>{
                                // delete item
                                deleteItem(route.params.data.itemID, route.params.data.listID, route.params.data.spaceID)
                                setModalVisible(!modalVisible)}}
                                onClick={()=> {navigation.navigate('SpacePage')}}
                        />
                    </View>
                          <Button
                            name="No"
                            color= "#6FCF97"
                            width={100}
                            onClick={() =>{setModalVisible(!modalVisible)}}
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
        paddingTop:50,
        marginHorizontal: 12,
    },
    text: {
        fontSize: 36,
        textAlign: "left",
        fontWeight: "600",
        color: "#184254",
    },
    subtext: {
        fontSize: 24,
        fontWeight: "400",
        color: '#4E7580',
    },
    small: {
        fontSize: 18,
        fontWeight: "400",
        color: '#4E7580',
    },
    shared: {
        paddingVertical: 12,
        paddingHorizontal: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    buttonGroupSelected: {
        backgroundColor: '#184254'
    },
    containerStyle: {
        borderRadius: 6,
        height: 60,
        padding: 8,
        width: "100%"
    },
    buttonGroupStyle: {
        height: 30,
        padding: 6,
        borderRadius: 12,
    },
    innerBorderStyle: {
        color: '#FFFFFF',
        backgroundColor: '#FFFFFF'
    },
    image: {
        width: 50,
        height: 50,
    },
    icon: {
        width: 320,
        height: 300
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 18
      },
      modalView: {
        margin: 6,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 18,
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
      modalHeader: {
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'stretch',
    },
    modalText: {
        fontSize: 24,
        color: '#4E7580',
        paddingHorizontal: 20,
        paddingTop: 16
    },

});