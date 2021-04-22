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
import { getImageDownloadURL } from '../utils/firebaseMethod'

// References to Firebase collections
const itemRef = db.collection('items');
const userRef = db.collection('users');
const spaceRef = db.collection('spaces');
const messagesRef = db.collection('messages');
const listRef = db.collection('lists');

export default function SpacePage({route, navigation}){
    // console.log(route.params)
  // Tracks what Space we're in using "route"
  const currUser = route.params.currUser;
  const userID = currUser.uid;
  const spaceID = route.params.data;
  const currSpaceID = route.params.data.substring(7);
  // List of all items in order of time added
  const[recentItems, setItems] = useState([]);
  // Stack of items for the "Recent Added Items" view
  const[recent_items_stack, setRecentList] = useState([]);

  // How many items do we want to show in "Recently Added Items"?
  const max_items_shown = 10;    

  const[spaceName, setSpaceName] = useState('');
  const componentIsMounted = useRef(true);
  const [recentMessData, setRecentMessData] = useState("")
  const [imgURL, setImgURL] = useState()

  // image stuff
  useEffect(() => {
    (async () => {
        setImgURL(await(getImageDownloadURL(userID)))
    })();
    return;
  }, []);
  
  useEffect(() => {
    return () => {
      componentIsMounted.current = false;
    };
  }, []);

  // setting the space name
  useEffect(() => {
    const subscriber = spaceRef.doc(currSpaceID).onSnapshot(documentSnapshot => {getSpaceName(documentSnapshot)});
     async function getSpaceName(documentSnapshot) {
        // console.log('snap', documentSnapshot.data())
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
        // Empty array of items
        var data = [];

        // Add items from all lists
        for (let i = 0; i < all_lists.length; i++) {
            let listData = (await listRef.doc(all_lists[i].substring(6)).get()).data();
  
              // if there is at least one item in the list
              for (let i = 0; i < listData.items.length; i++) {
                let itemID = listData.items[i].substring(6);
                let itemData = (await itemRef.doc(itemID).get()).data();
                //get the owner
                let owner; 
                if (itemData.userID === undefined) {
                    owner = 'none'
                } else {
                    owner = (await userRef.doc(itemData.userID.substring(6)).get()).data().firstname;
                }
                data.push({
                    key: itemID,
                    owner: owner,
                    name: itemData.name,
                    spaceID: itemData.spaceID,
                    userID: itemData.userID, 
                    isShared: itemData.isShared,
                    listName: listData.name,
                    timestamp: itemData.timestamp
                })
            }
        }

        // Add items from defaultList
        for (let i = 0; i < items.length; i++) {
            let itemID = items[i].substring(6);
            // Get item reference
            let itemData = (await itemRef.doc(itemID).get()).data();
            // Get corresponding item owner reference
            let owner = (await userRef.doc(itemData.userID.substring(6)).get()).data().firstname;
            // Abort if either data is undefined
            if (itemData == undefined || owner == undefined) {
                continue
            }

            // Else push owner and item key-value pair into data
            data.push({
                key: itemID, 
                owner: owner,
                name: itemData.name,
                spaceID: itemData.spaceID,
                userID: itemData.userID, 
                isShared: itemData.isShared,
                listName: "none",
                timestamp: itemData.timestamp
            });
        }

        if (componentIsMounted.current) {
            data.sort((a,b) => b.timestamp - a.timestamp);
            setItems(data);
           // console.log('data', data)

            let mostRecentItems = [];

            for (let i = 0; i < (data.length || i < max_items_shown); i++) {
              //  console.log('recent items!', data[i])
              //  console.log('recent items key', data[i].key)
                mostRecentItems.push({key: data[i], value: data[i].key})
            }
            setRecentList(mostRecentItems);
        }
    }
    return () => subscriber;
  }, [recent_items_stack, setRecentList]);

 // console.log('fingers crossed', recent_items_stack);

  // messaging
  useEffect(() => {
        const subscriber = messagesRef
        .orderBy('createdAt', 'desc')
        .where('user.spaceID', '==', spaceID)
        .limit(1)
        .onSnapshot(documentSnapshot => {createMessagesData(documentSnapshot)});
        async function createMessagesData(documentSnapshot) {
          for (let i = 0; i < documentSnapshot.docs.length; i++) {
              let m = await documentSnapshot.docs[i].data()
              let data = {
                  name: m.user.name,
                  text: m.text.text
              }
              setRecentMessData(data)
          }
        }
        return () => subscriber;
      }, []);

  
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
                <User
                    size="medium"
                    title={currUser.displayName}
                    source={imgURL}
                />
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
                <RecentMessageShow
                    name={recentMessData.name}
                    lastestMessage={recentMessData.text}
                    onClick={() => {navigation.navigate('ChatScreen', {spaceID: route.params.data, currUser: route.params.currUser})}}
                />
            </View>
            <View style={{height: 120, marginTop: 6, marginLeft: 6}}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <Card name="Shared"
                        onClick={() => {
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
                {
                    recent_items_stack.map((item) => {
                        return (
                            <Item 
                            owner={item.key.owner}
                            itemName={item.key.name}
                            list={item.key.listName}
                            shared={item.key.isShared}
                            onClick={()=> {
                                console.log(item)
                                navigation.navigate('ItemDetailScreen', {data: item.key})
                            }}
                          />
                        )
                    })
                }
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
