import React, {useState, useEffect, useRef, Component} from 'react';
import { ScrollView, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import Item from "../components/Item";
import { Icon } from 'react-native-elements';
import Button from "../components/Button";
import Search from '../components/Search';
import {AlphabetList} from 'react-native-section-alphabet-list';
import { db } from '../config/keys';
import createItem from './CreateItem';

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
const userRef = db.collection('users');
const spaceRef = db.collection('spaces');

export default function AllItemsPage({route, navigation}) {
  //route params: spaceID
  console.log(route)
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
        console.log(documentSnapshot.data())
        var all_items = documentSnapshot.data().items;
        var data = [];
        for (let i = 0; i < all_items.length; i++) {
            let itemData = (await itemRef.doc(all_items[i].substring(6)).get()).data();
            let owner = (await userRef.doc(itemData.userID.substring(6)).get()).data().firstname;
            if (itemData == undefined || owner == undefined) {
                continue
            }
            data.push({owner: owner, item: itemData})
        }
        console.log(data)
        if (componentIsMounted.current) {
            setItems(data)
        }
    }
    return () => subscriber;
  }, []);
  console.log(allItems)

  let data = []
  for (let i = 0; i < allItems.length; i++) {
    data.push({value: allItems[i].item.name, key: allItems[i]})
  }
  
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
                navigation.navigate('MySpacesPage')
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
                  itemName={item.value}
                  list={item.key.item.category}
                  owner={item.key.owner}
                  shared={item.key.item.isShared}
                  onClick={() => navigation.navigate('ItemDetailScreen', {itemData: item.key.item})}
                />
              )}
            />
            <Button
                onClick={()=> {navigation.navigate('SpacePage')}}
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
