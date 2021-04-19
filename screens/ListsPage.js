import React, {useState, useEffect, useRef, Component} from 'react';
import { ScrollView, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Icon, SearchBar } from 'react-native-elements';
import List from "../components/List";
import Search from "../components/Search"
import Button from "../components/Button";
import { db } from '../config/keys';
import {AlphabetList} from 'react-native-section-alphabet-list';
import MyItemsPage from './MyItemsPage';
import { getList } from '../utils/firebaseMethod';
import { render } from 'react-dom';

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
  const spaceRef = db.collection('spaces');
  const listRef = db.collection('lists');
  const currSpaceID = route.params.data.substring(7);

  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  const[myLists, setLists] = useState([]);
  const componentIsMounted = useRef(true);

  // To Search a Specific List
  
  
  useEffect(() => {
    return () => {
      componentIsMounted.current = false;
    };
  }, []);

  useEffect(() => {
    const subscriber = spaceRef.doc(currSpaceID).onSnapshot(documentSnapshot => {createListsData(documentSnapshot)});
    async function createListsData(documentSnapshot) {
      // console.log('snapshot:', documentSnapshot.data())
      var currentSpaceLists = documentSnapshot.data().lists;
      var data = [];

      for (let i = 0; i < currentSpaceLists.length; i++) {
        let listID = currentSpaceLists[i].substring(6);
        let listData = (await listRef.doc(listID).get()).data();

        if (listData == undefined) {
          continue;
        }
      
        let listStorage = ({key: listID, value: listData});

        if (listData.spaceID.substring(7) == currSpaceID) {
          data.push(listStorage);
        }
      }

      let newData = [];
      for (let i = 0; i < data.length; i++) {
        newData.push({value: data[i].value.name, 
          key: {
            name: data[i].value.name,
            items: data[i].value.items,
            spaceID: data[i].value.spaceID,
            listID: data[i].key
          }
        })
      }
      setFilteredDataSource(newData);

      if (componentIsMounted.current) {
        setLists(data);
      }
    }
    return () => subscriber;
  }, []);
  
  let originalData = [];
  for (let i = 0; i < myLists.length; i++) {
    originalData.push({value: myLists[i].value.name, 
      key: {
        name: myLists[i].value.name,
        items: myLists[i].value.items,
        spaceID: myLists[i].value.spaceID,
        listID: myLists[i].key
      }
    })
  }
  //setFilteredDataSource(data);

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
              <Text style={styles.headerTitle}>Lists</Text>
              <Text> {myLists.length}</Text>
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
        <ScrollView scrollEventThrottle={16}>
        <AlphabetList
          data = {filteredDataSource}
          renderSectionHeader={SectionHeader}
          renderCustomItem={(item) => (
            <List
              listName={item.key.name}
              numItems={item.key.items.length}
              onPress={() => {
                console.log('item', item);
                navigation.navigate("ListDetail", { listID: item.key.listID, name: item.key.name, numItems: item.key.items.length, data: route.params.data});
                }
              }
                  // TODO: Create custom icon for lists
            />
          )}
        />
        </ScrollView>
        <View style={styles.fab}>
            <Button
                width='80%'
                name="Create List"
                onClick={()=> {navigation.navigate("CreateListScreen", {spaceID:route.params.data})}}
            />
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
    marginLeft: 110
  },
  headerTitle: {
      fontSize: 30,
      color: '#184254',
      fontWeight: '500',
      paddingBottom: 12,
  },
  fab: {
    position: 'absolute',
    bottom: 0,
    //flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 36
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
