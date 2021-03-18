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
const spaceRef = db.collection('spaces');

export default function MyItemsPage({route, navigation}) {
  console.log(route)
  //route params: spaceID
  const[myItems, setItems] = useState([])
  const componentIsMounted = useRef(true);
  const currSpaceID = route.params.data.substring(7);
  const ownerID = route.params.currUser.uid;

  useEffect(() => {
    return () => {
      componentIsMounted.current = false;
    };
  }, []);

  useEffect(() => {
    const subscriber = spaceRef.doc(currSpaceID).onSnapshot(documentSnapshot => {createItemsData(documentSnapshot)});
    async function createItemsData(documentSnapshot) {
        console.log(documentSnapshot.data())
        var currentUserItems = documentSnapshot.data().items;
        var data = []
        for (let i = 0; i < currentUserItems.length; i++) {
            let itemData = (await itemRef.doc(currentUserItems[i].substring(6)).get()).data();
            console.log(itemData)
            if (itemData == undefined) {
                continue
            }
            if (itemData.userID.substring(6) == ownerID) {
              data.push(itemData)
            }
        }
        if (componentIsMounted.current) {
            setItems(data)
        }
    }
    return () => subscriber;
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
             <Search/>
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
