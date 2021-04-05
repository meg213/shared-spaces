import React, {useState, useEffect, useRef, Component} from 'react';
import { ScrollView, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import Item from "../components/Item";
import { Icon } from 'react-native-elements';
import Button from "../components/Button";
import Search from '../components/Search';
import {AlphabetList} from 'react-native-section-alphabet-list';
import { db } from '../config/keys';

class SectionHeader extends Component {
  render() {
    var textStyle = {
      textAlign:'center',
      color:'#fff',
      fontWeight:'700',
      fontSize:16
    };

    var viewStyle = {
      backgroundColor: '#ccc'
    };
    return (
      <View style={viewStyle}>
        <Text style={textStyle}>{this.props.title}</Text>
      </View>
    );
  }
}

const itemRef = db.collection('items');
const listRef = db.collection('lists');
const userRef = db.collection('users');
const spaceRef = db.collection('spaces');

export default function AllItemsPage({route, navigation}) {
  //route params: spaceID
  // console.log(route)
  const[allItems, setItems] = useState([]);
  const componentIsMounted = useRef(true);
  const currSpaceID = route.params.data.substring(7);

  useEffect(() => {
    return () => {
      componentIsMounted.current = false;
    };
  }, []);

  useEffect(() => {
    const subscriber = spaceRef.doc(currSpaceID).onSnapshot(documentSnapshot => {createItemsData(documentSnapshot)});
    async function createItemsData(documentSnapshot) {
        // get all the lists of a space
        var all_lists = documentSnapshot.data().lists;
        var data = [];

        //get the users of the space
        var user = documentSnapshot.data().user
        
        //go through each list, get the items in the list
        for (let i = 0; i < all_lists.length; i++) {
          let listData = (await listRef.doc(all_lists[i].substring(6)).get()).data();
          // if there is at least one item in the list
          // console.log('listdata', listData)
            for (let i = 0; i < listData.items.length; i++) {
              console.log('listdata', listData);
              let itemData = (await itemRef.doc(listData.items[i].substring(6)).get()).data();
              console.log(listData.userID);
             // let testowner = (await userRef.doc(listData.userID.substring(6)).get()).data();
    
              console.log('testowner', testowner);
              // if (itemData == undefined || owner == undefined) {
              //     continue
              // }
              // let testowner = 'test'
              data.push({
                // owner: testowner, //might need to check on this
                category: itemData.category,
                name: itemData.name,
                spaceID: itemData.spaceID,
                userID: itemData.userID, 
                isShared: itemData.isShared,
                listName: listData.name
              })
            }
        }
        if (componentIsMounted.current) {
            setItems(data)
        }
    }
    return () => subscriber;
  }, []);

   let data = []
  //  console.log(allItems);
  for (let i = 0; i < allItems.length; i++) {
    data.push({value: allItems[i].name, key: allItems[i]})
  }

  // console.log('data', data);

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Icon 
            style={{
                justifyContent: 'center'
            }} 
            size={50} 
            name='arrow-left' 
            onPress={() => {
                navigation.navigate('SpacePage')
            }}
            />
            <View style={styles.headerMain}>
              <Text style={styles.headerTitle}>All Items</Text>
              <Text>{data.length}</Text>
            </View>
        </View>
        <ScrollView scrollEventThrottle={16}>
            <View>
              <Search/>
            </View>
            <AlphabetList
              data = {data}
              renderSectionHeader={SectionHeader}
              renderCustomItem={(item) => (
                <Item 
                  listPage
                  itemName={item.key.name}
                  list={item.key.listName}
                  shared={item.key.isShared}
                />
              )}
            />
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
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    height: 80,
    width: '100%',
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
    flexDirection: 'row'
  },
  headerMain: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginLeft: 85
  },
  headerTitle: {
      fontSize: 30,
      color: '#184254',
      fontWeight: '500',
      paddingBottom: 12,
  },
});
