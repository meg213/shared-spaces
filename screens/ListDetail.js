import { db } from '../config/keys';
import React, {useState, useEffect, useRef, Component} from 'react';
import { ScrollView, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Icon, ListItem, SearchBar } from 'react-native-elements';
import Search from "../components/Search"
import Button from "../components/Button";
import Item from "../components/Item";
import {AlphabetList} from 'react-native-section-alphabet-list';
import MyItemsPage from './MyItemsPage';
import { getList } from '../utils/firebaseMethod';
import { getItem } from '../utils/firebaseMethod';


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

export default function ListsPage({navigation, route}) {
  const itemRef = db.collection('items');
  const listRef = db.collection('lists');
  const userRef = db.collection('users');
  // const spaceRef = db.collection('spaces');

  const[items, setItems] = useState([])
  const componentIsMounted = useRef(true);

  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);

  useEffect(() => {
    return () => {
      componentIsMounted.current = false;
    };
  }, []);

  const listID = route.params.listID;

  useEffect(() => {
    const subscriber = listRef.doc(listID).onSnapshot(documentSnapshot => {createItemData(documentSnapshot)});
    async function createItemData(documentSnapshot) {
     // console.log('snapshot:', documentSnapshot.data())
      var listName = documentSnapshot.data().name;
      var currentItemList = documentSnapshot.data().items;
      var data = [];

      for (let i = 0; i < currentItemList.length; i++) {
        let itemData = (await itemRef.doc(currentItemList[i].substring(6)).get()).data();
        if (itemData == undefined) {
          continue;
        }
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
          listName: listName,
          itemID: currentItemList[i],
          listID: 'lists/' + listID
        })
       console.log('data List Detail', data)
      }

      let newData = []
        for (let i = 0; i < data.length; i++) {
          newData.push({value: data[i].name, key: data[i]})
        }
      setFilteredDataSource(newData);

      if (componentIsMounted.current) {
        setItems(data);
      }
    }
    return () => subscriber;
  }, []);

  let originalData = []
  for (let i = 0; i < items.length; i++) {
    originalData.push({value: items[i].name, key: items[i]})
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
          <View style={styles.headerIcon}>
            <Icon 
              size={50} 
              name='arrow-left' 
              onPress={() => {
                  navigation.navigate('ListsList')
              }}
              />
            </View>
            <View style={styles.headerMain}>
              <Text style={styles.headerTitle}>{route.params.name}</Text>
              <Text> {route.params.numItems} </Text>
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
          <ScrollView scollEventThrottle={16}>
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
    //justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    height: 80,
    width: '100%',
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
    flexDirection: 'row'
  },
  headerIcon: {
      // made this absolute bc list names will have 
      // variable length and this button kept making it not centered
      position: 'absolute',
      top: 15,
      right: 335
  },
  headerMain: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginLeft: 115
  },
  headerTitle: {
      fontSize: 30,
      color: '#184254',
      fontWeight: '500',
      //justifyContent: 'center',
      paddingBottom: 12,
      //alignItems: 'center'
  },
  search: {
    width: '100%'
  },
  fab: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 40
  },
  inputContainer: {
    backgroundColor: '#D9DED8',
  },
});
