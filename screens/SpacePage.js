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
import { getImageDownloadURL, getItem, getListData, getUser } from '../utils/firebaseMethod'

// References to Firebase collections
const itemRef = db.collection('items');
const userRef = db.collection('users');
const spaceRef = db.collection('spaces');
const messagesRef = db.collection('messages');
const listRef = db.collection('lists');

export default function SpacePage({route, navigation}){
  // Tracks what Space we're in using "route"
  const currUser = route.params.currUser;
  const userID = currUser.uid;
  const spaceID = route.params.data;
  const currSpaceID = route.params.data.substring(7);

  // List of all items in order of time added
  const[recentItems, setItems] = useState([]);
//   // Stack of items for the "Recent Added Items" view
//   const[recent_items_stack, setRecentList] = useState([]);
//   // How many items do we want to show in "Recently Added Items"?
//   const max_items_shown = 10;    

  const[spaceName, setSpaceName] = useState('');
  const componentIsMounted = useRef(true);
  const [recentMessData, setRecentMessData] = useState("")
  const [imgURL, setImgURL] = useState()

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
       var all_lists = documentSnapshot.data().lists;
       var all_items_not_in_lists = documentSnapshot.data().items;
       var data = [];

       for (let i = 0; i < all_lists.length; i++) {
         let listData = (await listRef.doc(all_lists[i].substring(6)).get()).data();

           for (let i = 0; i < listData.items.length; i++) {
             let itemData = (await itemRef.doc(listData.items[i].substring(6)).get()).data();
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
               listName: listData.name,
               itemID: listData.items[i],
               listID: all_lists[i],
             })
           }
       }

       for (let i = 0; i < all_items_not_in_lists.length; i++) {
         let itemData = (await itemRef.doc(all_items_not_in_lists[i].substring(6)).get()).data();
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
           itemID: all_items_not_in_lists[i],
           listID: 'None'
         })
       }

    //    let newData = []
    //    for (let i = 0; i < data.length; i++) {
    //      newData.push({value: data[i].name, key: data[i]})
    //    }
    //    setFilteredDataSource(newData);

       if (componentIsMounted.current) {
           setItems(data)
       }
    }
    return () => subscriber;
  }, []);

//   useEffect(() => {
//     // Add most recent items to recent items stack
//     let mostRecentItems = [];

//     setRecentList([])

//     for (let i = 0; i < recentItems.length && i < max_items_shown; i++) {
//         // mostRecentItems.set(recentItems[i].key, recentItems[i]);
//         //mostRecentItems.push({key: recentItems[i].key, value: recentItems[i]});
//         mostRecentItems.push({value: recentItems[i].name, key: recentItems[i]});
//     }

//     console.log("ITEMS\n\n\n\n")
//     console.log(mostRecentItems);

//     setRecentList(mostRecentItems);
//   }, [recentItems]);

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
                {/* <AlphabetList
                    data = {recent_items_stack}
                    renderCustomItem={(item) => (
                        console.log(item),
                        <Item 
                            owner={item.key.owner}
                            itemName={item.value}
                            list={item.key.listName}
                            shared={item.key.isShared}
                            onClick={()=> {
                                console.log(item)
                                navigation.navigate('ItemDetailScreen', {data: item.key})
                            }}
                        />
                    )}
                /> */}
                {/* <AlphabetList
                    data = {recentItems}
                    renderCustomItem={(item) => (
                        <Item 
                            listPage
                            owner={item.key.owner}
                            itemName={item.key.name}
                            list={item.key.listName}
                            shared={item.key.isShared}
                            onClick={()=> {
                                console.log(item.key)
                                navigation.navigate('ItemDetailScreen', {data: item.key})}}
                            />
                    )}
                /> */}
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
