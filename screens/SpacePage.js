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
import { cos } from 'react-native-reanimated';
import { AlphabetList } from 'react-native-section-alphabet-list';

const itemRef = db.collection('items');
const userRef = db.collection('users');
const spaceRef = db.collection('spaces');

export default function SpacePage({route, navigation}){
  //route params: spaceId, currUser

  const[recentItems, setItems] = useState([]);
  const componentIsMounted = useRef(true);
  const currSpaceID = route.params.data.substring(7);

  useEffect(() => {
    return () => {
      componentIsMounted.current = false;
    };
  }, []);

  useEffect(() => {
    const subscriber = spaceRef.doc(currSpaceID).onSnapshot(documentSnapshot => {updateRecentItems(documentSnapshot)});
    async function updateRecentItems(documentSnapshot) {
        var space = documentSnapshot.data();
        var items = space.items.reverse();

        var recent_items_in_order = [];

        for (let i = 0; i < items.length; i++) {
            let itemData = (await itemRef.doc(items[i].substring(6)).get()).data();
            let owner = (await userRef.doc(itemData.userID.substring(6)).get()).data().firstname;
            if (itemData == undefined || owner == undefined) {
                continue
            }
            recent_items_in_order.push({owner: owner, item: itemData});
        }

        if (componentIsMounted.current) {
            setItems(recent_items_in_order)
        }
    }
    return () => subscriber;
  }, []);

  let recent_items_stack = []   // Stack representing the recent items page
  const max_items_shown = 5;    // How many items we want to show in "Recently Added Items"
  for (let i = recentItems.length - 1; i > -1; i--) {
    recent_items_stack.push({key: recentItems[i], value: recentItems[i].item.name})
    
    if (recent_items_stack.length > max_items_shown) {
        recent_items_stack.shift();      // Remove first element of the array, in queue fashion
        break;                         // Recent items stack is filled, exit loop
    }
  }

  return (
    <SafeAreaView style={styles.container}>
        <View style ={{
            flexDirection: 'row',
            alignItems: 'center',        
        }}>
            <Icon 
                style={{
                    justifyContent: 'center'
                }} 
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
                The Apartment
            </Text>
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
                            navigation.navigate('ItemList');
                            }}/>
                    <Card name="My Items"
                        onClick={() => {
                            navigation.navigate('MyItemList', {data:route.params.data, currUser: route.params.currUser});
                            }}/>
                    <Card name="Lists"
                        onClick={() => {
                            navigation.navigate('ListsList', {data:route.params.data, currUser: route.params.currUser});
                            }}/>
                    <Card name="All Items"
                        onClick={() => {
                            navigation.navigate('AllItems', {data:route.params.data});
                            }}/>
                </ScrollView>
            </View>
            <Button name="Add an Item" onClick={() => {navigation.navigate('CreateItem', {spaceID: route.params.data, currUser: route.params.currUser})}}/>
            <View style={{
                backgroundColor: 'white',
                borderRadius: 12,
                marginTop: 6
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

                <AlphabetList
                    data = {recent_items_stack}
                    renderCustomItem={(item) => (
                      <Item 
                        listPage
                        itemName={item.value}
                        list={item.key.item.category}
                        owner={item.key.owner}
                        shared={item.key.item.isShared}
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
});
