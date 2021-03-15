import React, {useState, useEffect, useRef, Component} from 'react';
import { ScrollView, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Icon } from 'react-native-elements';
import Item from "../components/Item";
import User from "../components/User";
import Card from "../components/Card";
import Button from "../components/Button";
import RecentMessageShow from "../components/RecentMessageShow";
import { SearchBar } from 'react-native-elements';
import firebase from 'firebase/app';
import {AlphabetList} from 'react-native-section-alphabet-list'
import { db } from '../config/keys';

const userRef = db.collection('users');
const spaceRef = db.collection('spaces');
const itemRef = db.collection('items');

class SectionHeader extends Component {
  render() {
    // inline styles used for brevity, use a stylesheet when possible
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


export default function MyItemsPage({route, navigation}) {
  const[myItems, setItems] = useState([])
  
  const items = route.params.data.spaceData.items
  const componentIsMounted = useRef(true);

  useEffect(() => {
    return () => {
      componentIsMounted.current = false;
    };
  }, []);
  
  useEffect(() => {
    async function getAllItemsBelongToCurrentUser(currentUser) {
      var currentUserItems = [];
      for (let i = 0; i < items.length; i++) {
        let itemData = (await itemRef.doc(items[i].substring(6)).get()).data();
        if (itemData.userID.substring(6) == currentUser.uid) {
          currentUserItems.push(itemData)
        }
      }
      currentUserItems.sort((a, b) => {return a.name.toLowerCase().localeCompare(b.name.toLowerCase())})
      if (componentIsMounted.current) {
        setItems(currentUserItems)
      }
    }
    getAllItemsBelongToCurrentUser(route.params.data.currentUser)
  }, []);

  let data = []
  for (let i = 0; i < myItems.length; i++) {
    data.push({value: myItems[i].name, key: myItems[i]})
  }

  return (
    <SafeAreaView style={styles.container}>
        <ScrollView scrollEventThrottle={16}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>My Items</Text>
                <Text> {myItems.length} </Text>
            </View>
            <View style={styles.search}>
            <SearchBar
                    placeholder="Type Here..."
                    // onChangeText={this.updateSearch}
                    // value={search}
                    lightTheme
                />
        </View>
            <AlphabetList
              data = {data}
              renderSectionHeader={SectionHeader}
              renderCustomItem={(item) => (
                <Item
                  listPage
                  itemName={item.value}
                  list={item.key.category}
                  shared={item.key.isShared}
                  owner={null}
                />
              )}
            />
            <Button
                onClick={()=> {navigation.navigate('SpacePage')}}
                name="Back"
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
  },
  sortedLetters: {
    fontSize: 22,
    color: '#4E7580',
    paddingHorizontal: 12,
    paddingVertical: 6
  }
});
