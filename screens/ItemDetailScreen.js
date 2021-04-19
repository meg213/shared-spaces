import React, { useState, Component, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, SafeAreaView, Switch, Image} from 'react-native';
import Button from '../components/Button';
import {storage, db} from '../config/keys';

import User from '../components/User';

export default function ItemDetailScreen ({route, navigation}) {
    const itemData = route.params.data;
    const itemName = itemData.name;
    const list = itemData.listID;
    const shared = itemData.isShared;
    const [owner, setOwner] = useState()
    const [initials, setInitials] = useState()
    const[image, setImage] = useState()
    useEffect(() => {
        (async () => {
          let imageRef = storage.ref(itemName);
          console.log(imageRef)
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

    console.log('route.params', route.params.data);
    return (
        <SafeAreaView style = {[styles.container]}>
            <ScrollView>
                <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 4,paddingHorizontal: 30, flexDirection: 'row' }}>
                    {image && <Image source={{ uri: image }} style={[styles.icon]} />}
                </View>
                <View style={{paddingVertical: 30, paddingHorizontal: 30}}>
                    <Text style={[styles.text]}>
                        ItemName: {itemName}
                    </Text>
                    <Text style={[styles.subtext]}>
                        List:  {list}
                    </Text>
                </View>
                <View style={{paddingVertical: 16, paddingHorizontal: 30, flexDirection: 'row', alignItems: 'center'}}>
                    <Image source={require('../assets/logo.png')} style={[styles.image]}/>
                    <View style={{paddingHorizontal: 6}}/>
                    <Text style={[styles.small]}>
                        This item is {shared ? '' : "not "}
                        shared
                    </Text>
                </View>
                <View style={{paddingVertical: 16, paddingHorizontal: 30, flexDirection: 'row', alignItems: 'center'}}>
                    <User initials={initials}/>
                    <View style={{paddingHorizontal: 6}}/>
                    <Text style={[styles.small]}>
                        {owner}
                    </Text>
                </View>
                <View style={{flexDirection: 'row', paddingTop: 48, paddingHorizontal: 30, justifyContent: 'center'}}>
                    <Button name="edit" width="55%"/>       
                    <Button name="delete" width="55%"/>
                </View>
            </ScrollView>
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
    }


});