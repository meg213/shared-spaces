import React, {useState, useEffect, useRef, Component} from 'react';
import { ScrollView, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Icon, SearchBar } from 'react-native-elements';
import Item from "../components/Item";
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

export default function MyItemsPage({route, navigation}) {
  //route params: spaceID
  const[myItems, setItems] = useState([])
  const componentIsMounted = useRef(true);
  const currSpaceID = route.params.data.substring(7);
  const ownerID = route.params.currUser.uid;

  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);

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
        var all_items_not_in_lists = documentSnapshot.data().items;
        var data = [];

        //go through each list, get the items in the list
        for (let i = 0; i < all_lists.length; i++) {
          let listData = (await listRef.doc(all_lists[i].substring(6)).get()).data();
            // if there is at least one item in the list
            for (let i = 0; i < listData.items.length; i++) {
              let itemData = (await itemRef.doc(listData.items[i].substring(6)).get()).data();
              //console.log('itemdata', itemData)
              //get the owner
              let owner; 
              if (itemData.userID === undefined) {
                  owner = 'none'
              } else {
                  owner = (await userRef.doc(itemData.userID.substring(6)).get()).data();
              }

              //if the itemData user === current user
              if (itemData.userID.substring(6) === route.params.currUser.uid){
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
              console.log('data', data)
            }
        }
        

        for (let i = 0; i < all_items_not_in_lists.length; i++) {
          let itemData = (await itemRef.doc(all_items_not_in_lists[i].substring(6)).get()).data();
          //console.log('itemdata', itemData)
          //get the owner
          let owner; 
          if (itemData.userID === undefined) {
              owner = 'none'
          } else {
              owner = (await userRef.doc(itemData.userID.substring(6)).get()).data();
          }

          //if the itemData user === current user
          if (itemData.userID.substring(6) === route.params.currUser.uid){
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
          console.log('data', data)
        }
        /////////
        let newData = []
        for (let i = 0; i < data.length; i++) {
          newData.push({value: data[i].name, key: data[i]})
        }
        setFilteredDataSource(newData);
        /////////

        if (componentIsMounted.current) {
            setItems(data)
        }
    }
    return () => subscriber;
  }, []);

   let originalData = []
  for (let i = 0; i < myItems.length; i++) {
    originalData.push({value: myItems[i].name, key: myItems[i]})
  }

  const searchFilterFunction = (text) => {
    //if the search bar is not empty
    if (text) {
      //we want to filter the data
      //Update FilteredDataSource
      const newData = originalData.filter(function (item) {
        const itemData = item.key.name ? item.key.name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
        }
      );
      setFilteredDataSource(newData);
      setSearch(text);
    } else { //otherwise, if the searchbar IS empty
      //Inserted text is blank, Update FiltereDataSource with original data
      setFilteredDataSource(originalData);
      setSearch(text);
    }
  };

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
              <Text style={styles.headerTitle}>My Items</Text>
              <Text> {myItems.length} </Text>
            </View>
        </View>
        <View style={styles.search}>
          <SearchBar
            placeholder="Search here..."
            onChangeText={(text) => searchFilterFunction(text)}
            value = {search}
            containerStyle={styles.container}
            inputContainerStyle={styles.inputContainer}
            placeholderTextColor='#4E7580'
            round='true'
            lightTheme='true'
          />
        </View>
        <View style={{height: '80%'}}>
          <ScrollView scrollEventThrottle={16}>
            <View> 
              <AlphabetList
                data = {filteredDataSource}
                renderSectionHeader={SectionHeader}
                renderCustomItem={(item) => (
                  <Item 
                    listPage
                    owner={item.key.owner}
                    itemName={item.key.name}
                    list={item.key.listName}
                    shared={item.key.isShared}
                    onClick={()=> {navigation.navigate('ItemDetailScreen', {data: item.key})}}
                  />
                )}
              />
          </View>    
          </ScrollView>
        </View>
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
  search: {
    width: '100%',
  },
  inputContainer: {
    backgroundColor: '#D9DED8',
  },
  container: {
    backgroundColor: '#F2F0EB',
    borderBottomColor: '#F2F0EB',
    borderTopColor: '#F2F0EB',
  }
});
