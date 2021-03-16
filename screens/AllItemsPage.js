import React, {useState, useEffect, useRef, Component} from 'react';
import { ScrollView, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import Item from "../components/Item";
import Button from "../components/Button";
import {AlphabetList} from 'react-native-section-alphabet-list';
import { db } from '../config/keys';

const itemRef = db.collection('items');
const userRef = db.collection('users');

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

export default function AllItemsPage({route, navigation}) {
  const[allItems, setItems] = useState([])
  
  const items = route.params.data.spaceData.items
  const componentIsMounted = useRef(true);

  useEffect(() => {
    return () => {
      componentIsMounted.current = false;
    };
  }, []);

  useEffect(() => {
    async function getAllItems() {
      var all_items = [];
      for (let i = 0; i < items.length; i++) {
        let itemData = (await itemRef.doc(items[i].substring(6)).get()).data();
        let owner = (await userRef.doc(itemData.userID.substring(6)).get()).data().firstname;
        all_items.push({owner: owner, item: itemData})
      }
      // currentUserItems.sort((a, b) => {return a.name.toLowerCase().localeCompare(b.name.toLowerCase())})
      if (componentIsMounted.current) {
        setItems(all_items)
      }
    }
    getAllItems()
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
                <Text>104 Total Items</Text>
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
