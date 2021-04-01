import React, {useState, useEffect, useRef, Component} from 'react';
import { ScrollView, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Icon, ListItem } from 'react-native-elements';
import Search from "../components/Search"
import Button from "../components/Button";
import { db } from '../config/keys';
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
  // 1. get correct list
  // 2. get list of item references
  // 3. get item data
  // 4. make items out of data

  const listRef = db.collection('lists');
  const itemRef = db.collection('items');

  const[items, setItems] = useState([])


  const componentIsMounted = useRef(true);

  useEffect(() => {
    return () => {
      componentIsMounted.current = false;
    };
  }, []);

  // replace with whatever list id given from route
  const list = '0jYR944RNWGKdJDc75fR'; 

  useEffect(() => {
    const subscriber = listRef.doc(list).
    onSnapshot(documentSnapshot => {createItemData(documentSnapshot)});
    async function createItemData(documentSnapshot) {
      console.log('snapshot of items:', documentSnapshot.data().items)

      var currentItemList = documentSnapshot.data().items;
      var data = [];

      console.log(currentItemList[0]);
      for (let i = 0; i < currentItemList.length; i++) {
        console.log('hi');
        let itemData = (await itemRef.doc(currentItemLists[i].substring(6)).get()).data();
        console.log('itemdata', itemData);
        if (itemData == undefined) {
          continue;
        }
        data.push(itemData);
      }

      if (componentIsMounted.current) {
        setItems(data);
      }
    }
    return () => subscriber;
  }, []);

  let data = []
  for (let i = 0; i < items.length; i++) {
    console.log(item);
  }

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
            <Search/>
        </View>
        <ScrollView>
          {/* <Item
            listPage
          /> */}
              {/* <AlphabetList
              data = {route.params.items}
              renderSectionHeader={SectionHeader}
              renderCustomItem={(item) => (
                <Item
                  itemName={item.name}
                  listPage
                  // numItems={item.key.number}
                  // onPress={() => {
                  //   navigation.navigate('ListDetail', { name: item.value, numItems: item.key.number })}}
                  // TODO: Create custom icon for lists
                />
              )}
            /> */}
        </ScrollView>
        <View style={styles.fab}>
            <Button
                width='80%'
                name="Add Item"
                onClick={()=> {
                  console.log(route.params.items);
                  // navigation.navigate("CreateItem", {spaceID:route.params.data})
                }
                }
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
    justifyContent: 'center',
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
    // marginLeft: 110
  },
  headerTitle: {
      fontSize: 30,
      color: '#184254',
      fontWeight: '500',
      justifyContent: 'center',
      paddingBottom: 12,
      alignItems: 'center'
  },
  fab: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 40
  },
  search: {
    width: '95%'
  },
  fab: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 40
  },
  icon: {

  }
});
