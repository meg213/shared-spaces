import React, { useState, Component, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, SafeAreaView, Switch } from 'react-native';
import Button from '../components/Button';
import { Dropdown } from 'react-native-material-dropdown-v2-fixed';
import FormInput from '../components/FormInput';
import { db } from '../config/keys';
import { updateItem } from '../utils/firebaseMethod';

export default function EditItem({route, navigation}) {

    // route params: spaceID, currUser
    const [name, setName] = useState(route.params.route.name);
    const [category, setCategory] = useState("Select List");
    const [listData, setListData] = useState('')
    const [shared, setShared] = useState(route.params.route.isShared);
    const toggleShared = () => setShared(previousState => ! previousState);
    const currentSpaceId = route.params.route.spaceID;

    // db refs
    const itemRef = db.collection('items');
    const listRef = db.collection('lists');
    const spaceRef = db.collection('spaces');

    console.log('route', route)

  //grab lists
  useEffect(() => {
    const subscriber = spaceRef.doc(currentSpaceId.substring(7)).onSnapshot(documentSnapshot => {createListData(documentSnapshot)});
    async function createListData(documentSnapshot) {
        // get all the lists of a space
        var all_lists = documentSnapshot.data().lists;
        var data = [];

        //go through each list, get the data fo the list
        for (let i = 0; i < all_lists.length; i++) {
            let listData = (await listRef.doc(all_lists[i].substring(6)).get()).data();
            data.push({
                listID:  all_lists[i].substring(6),
                items: listData.items,
                name: listData.name,
                spaceID: listData.spaceID
            });
        }
        setListData(data);
    
    }
    return () => subscriber;
  }, []);

// putting together lists
let data = []
for (let i = 0; i < listData.length; i++) {
    data.push({value: listData[i].name, key: listData[i]})
}

    return(
        <SafeAreaView style = {[styles.container]}>
            <View>
                <Text style = {[styles.text]}>
                    Edit Item
                </Text>
            </View>
            <View style={{
                    paddingVertical:12
                }}>
                <Text style={styles.subtext}>Item Name</Text>
                <FormInput
                        labelValue={name}
                        onChangeText={(itemName) => setName(itemName)}
                        placeholderText=""
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
            </View>
            <View
                style={{
                    height:80,
                    width: '100%'
                }}>
                    <Dropdown
                        label={'Select List'}
                        data={data}
                        onChangeText={(value) => {
                            for (var i = 0; i < data.length; i++) {
                                if (data[i].value === value) {
                                    setCategory('lists/' + data[i].key.listID)
                                }
                            }
                        }}
                    />
                </View>
            <View style={styles.shared}>
                <Text style={styles.subtext}>Is this item is shared?</Text>
                <Switch
                    trackColor={{ false: "#000", true: "#79AAB5" }}
                    thumbColor={ shared ? "#fff" : "#79AAB5"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleShared}
                    value={shared}
                />
            </View>
            <View style={{marginBottom: 50, width: '100%', position: 'absolute', bottom: 0,}}>
                <Button
                    name="Update Item"
                    color='#184254'
                    onClick={() => { 
                      //  if the item wasn't set to a list
                        if (category.toString() === 'Select List'){
                            updateItem(route.params.route.spaceID, route.params.route.itemID, name, shared, 'None', route.params.route.listID)
                            console.log('here')
                        } 
                        else { // if the item has a list
                            updateItem(route.params.route.spaceID, route.params.route.itemID, name, shared, category, route.params.route.listID)
                        }
                      navigation.navigate('SpacePage') 
                    console.log('update' , route.params.route)
                    }}
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
    shared: {
        paddingVertical: 12,
        width: '100%',
        paddingHorizontal: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
})