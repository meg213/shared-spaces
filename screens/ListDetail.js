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
  const spaceRef = db.collection('spaces');
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
  //const listID = '0jYR944RNWGKdJDc75fR'; 

  const listID = route.params.listID;

  useEffect(() => {
    const subscriber = listRef.doc(listID).onSnapshot(documentSnapshot => {createItemData(documentSnapshot)});
    async function createItemData(documentSnapshot) {
      console.log('snapshot:', documentSnapshot.data())
      var currentItemList = documentSnapshot.data().items;
      var data = [];

      for (let i = 0; i < currentItemList.length; i++) {
        let itemData = (await itemRef.doc(currentItemList[i].substring(6)).get()).data();
        // console.log('itemdata', itemData);
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
    data.push({value: items[i].name, key: items[i]})
  }
  console.log('data!', data);

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
            <AlphabetList
              data = {data}
              renderSectionHeader={SectionHeader}
              renderCustomItem={(item) => (
                <Item
                  itemName={item.value}
                  list={route.params.name}
                  isShared={item.key.isShared}
                  listPage
                />
              )}
            />
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