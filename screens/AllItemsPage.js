import React, {useState, useEffect, useRef, Component} from 'react';
import { ScrollView, StyleSheet, Text, View, SafeAreaView } from 'react-native';
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
        if (componentIsMounted.current) {
            setItems(data)
        }
    }
    return () => subscriber;
  }, []);

  let data = []
  for (let i = 0; i < allItems.length; i++) {
    data.push({value: allItems[i].item.name, key: allItems[i]})
  }
  
  return (
    <SafeAreaView style={styles.container}>
        <ScrollView scrollEventThrottle={16}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>All Items</Text>
                <Text>{allItems.length} items</Text>
            </View>
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
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    height: 80,
    width: '100%',
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
  },
  headerTitle: {
      fontSize: 30,
      color: '#184254',
      fontWeight: '500',
      paddingBottom: 12,
  }
});
