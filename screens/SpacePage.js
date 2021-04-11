import React, {useState, useEffect, useRef, Component} from 'react';
import { ScrollView, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Icon } from 'react-native-elements';
import Item from "../components/Item";
import User from "../components/User";
import Card from "../components/Card";
import Button from "../components/Button";
import RecentMessageShow from "../components/RecentMessageShow";
import { db } from '../config/keys';
import { FlatList } from 'react-native';
import List from '../components/List';
import { cos, max } from 'react-native-reanimated';
import { AlphabetList } from 'react-native-section-alphabet-list';

// References to Firebase collections
const itemRef = db.collection('items');
const userRef = db.collection('users');
const spaceRef = db.collection('spaces');
const listRef = db.collection('lists');

export default function SpacePage({route, navigation}){
  // Tracks what Space we're in using "route"
  const currSpaceID = route.params.data.substring(7);
  // Items array in reverse order; recently added items are first in array
  const[recentItems, setItems] = useState([]);
  const[spaceName, setSpaceName] = useState('');
  const componentIsMounted = useRef(true);
  
  useEffect(() => {
    return () => {
      componentIsMounted.current = false;
    };
  }, []);

  useEffect(() => {
    const subscriber = spaceRef.doc(currSpaceID).onSnapshot(documentSnapshot => {getSpaceName(documentSnapshot)});
     async function getSpaceName(documentSnapshot) {
        console.log('snap', documentSnapshot.data())
        setSpaceName(documentSnapshot.data().name)
     }
     return () => subscriber;
    }, []);

  // Updates recentItems on every new item instance
  useEffect(() => {
    const subscriber = spaceRef.doc(currSpaceID).onSnapshot(documentSnapshot => {updateRecentItems(documentSnapshot)});
    async function updateRecentItems(documentSnapshot) {
        // Return the Space data for the snapshot
        var space = documentSnapshot.data();
        // Return the items lists, not in chronological order
        var items = space.items;
        // Return all the lists in a given space
        var all_lists = space.lists;
        // Empty array of items in order
        var data = [];

        for (let i = 0; i < all_lists.length; i++) {
            let listData = (await listRef.doc(all_lists[i].substring(6)).get()).data();
  
              // if there is at least one item in the list
              for (let i = 0; i < listData.items.length; i++) {
                let itemData = (await itemRef.doc(listData.items[i].substring(6)).get()).data();
                //get the owner
                let owner; 
                if (itemData.userID === undefined) {
                    owner = 'none'
                } else {
                    owner = (await userRef.doc(itemData.userID.substring(6)).get()).data();
                }
                data.push({
                    owner: owner.firstname,
                    name: itemData.name,
                    spaceID: itemData.spaceID,
                    userID: itemData.userID, 
                    isShared: itemData.isShared,
                    listName: listData.name
                })
            }
        }

        for (let i = 0; i < items.length; i++) {
            // Get item reference
            let itemData = (await itemRef.doc(items[i].substring(6)).get()).data();
            // Get corresponding item owner reference
            let owner = (await userRef.doc(itemData.userID.substring(6)).get()).data().firstname;
            // Abort if either data is undefined
            if (itemData == undefined || owner == undefined) {
                continue
            }

            // Else push owner and item key-value pair into data
            data.push({
                owner: owner.firstname,
                name: itemData.name,
                spaceID: itemData.spaceID,
                userID: itemData.userID, 
                isShared: itemData.isShared,
            });
        }

        if (componentIsMounted.current) {
            setItems(data);
        }
    }
    return () => subscriber;
  }, []);

  let recent_items_stack = []   // Stack representing the recent items page
  const max_items_shown = 10;    // How many items we want to show in "Recently Added Items"

  for (let i = recentItems.length - 1; i >= 0; i--) {
    // Push most recent items onto the stack 
    // Track total number of items added
    let count = recent_items_stack.push({value: recentItems[i].name, key: recentItems[i]});

    // Compare total items to constant maximum
    if (count == max_items_shown) {
        // Exit as we equal maximum items shown
        break;
    } else if (count > max_items_shown) {
        // Delete the last item (which is least recently added)
        recent_items_stack.pop();
        // Exit as we equal maximum items shown
        break;
    }
  }

  return (
    <SafeAreaView style={styles.container}>
        <View style ={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#F2F0EB',
            paddingRight: 12,
            justifyContent: 'space-between'
        }}>
            <Icon 
                size={50} 
                name='arrow-left' 
                onPress={() => {
                    navigation.navigate('MySpacesPage')
                }}
            />
            <Text style={{
                flex: 1,
                textAlign: 'center',
                alignContent: 'center',
                fontSize: 30, 
                fontWeight:'500',
                color: "#184254"
                }}>
                {spaceName}
            </Text>
            <Icon
                size={40} 
                name='more-horiz' 
                onPress={() => {
                   navigation.navigate('EditSpace', {spaceID: route.params.data, currUser: route.params.currUser, name: route.params.name})}}/>
        </View>
        <ScrollView scrollEventThrottle={16}>
            <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                margin: 6,
                }}
            >
                <User/>
            </View>
            <View>
                <Text style={{
                    fontSize: 18, 
                    fontWeight: '400',
                    margin: 6,
                    marginHorizontal: 12,
                    color: '#4E7580'
                }}> 
                    Messages 
                </Text>
                <RecentMessageShow/>
            </View>
            <View style={{height: 120, marginTop: 6, marginLeft: 6}}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <Card name="Shared"
                        onClick={() => {
                            console.log('card click test');
                            navigation.navigate('SharedList', {data:route.params.data, currUser: route.params.currUser});
                            }}/>
                    <Card name="My Items"
                        icon='account-circle'
                        backgroundColor="#6FCF97"
                        onClick={() => {
                            navigation.navigate('MyItemList', {data:route.params.data, currUser: route.params.currUser});
                            }}/>
                    <Card name="Lists"
                        icon='list'
                        backgroundColor="#D9DED8"
                        onClick={() => {
                            navigation.navigate('ListsList', {data:route.params.data, currUser: route.params.currUser});
                            }}/>
                    <Card name="All Items"
                        icon='group'
                        backgroundColor="#F2994A"
                        onClick={() => {
                            navigation.navigate('AllItems', {data:route.params.data, currUser: route.params.currUser});
                            }}/>
                </ScrollView>
            </View>
            <Button name="Add an Item" onClick={() => {navigation.navigate('CreateItem', {spaceID: route.params.data, currUser: route.params.currUser})}}/>
            <View style={{
                backgroundColor: 'white',
                borderRadius: 12,
                marginTop: 12
            }}>
                <Text style={{
                    fontSize: 18, 
                    fontWeight: '400',
                    paddingTop: 12,
                    paddingBottom: 6,
                    color: '#4E7580',
                    marginHorizontal: 12
                }}> 
                    Recently Added Items 
                </Text>

                {/* List Containing Recently Added Items */}
                <AlphabetList
                    data = {recent_items_stack}
                    renderCustomItem={(item) => (
                      <Item 
                        owner={item.key.owner}
                        itemName={item.key.name}
                        list={item.key.listName}
                        shared={item.key.isShared}
                        onClick={()=> {
                            console.log(item.key)
                            navigation.navigate('ItemDetailScreen', {data: item.key})}}
                        // itemName={item.name}
                        // list={item.key.item.listID}
                        // owner={item.key.owner}
                        // shared={item.key.item.isShared}
                      />
                    )}
                />
            </View>
        </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F0EB',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:50
  },
  buttonView: {
    backgroundColor: 'rgba(0,0,0,0)',
  }
});
