import React, {useState, useEffect, useRef, Component} from 'react';
import { ScrollView, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Icon } from 'react-native-elements';
import List from "../components/List";
import Search from "../components/Search"
import Button from "../components/Button";
import { db } from '../config/keys';
import {AlphabetList} from 'react-native-section-alphabet-list';
import MyItemsPage from './MyItemsPage';
import { getList } from '../utils/firebaseMethod';

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

  const[myLists, setLists] = useState([]);
  const componentIsMounted = useRef(true);

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

      if (componentIsMounted.current) {
        setLists(data);
      }
    }
    return () => subscriber;
  }, []);
  
  let data = [];
  for (let i = 0; i < myLists.length; i++) {
    console.log(myLists[i].value.icon);
    data.push({value: myLists[i].value.name, 
      key: {
        name: myLists[i].value.name,
        items: myLists[i].value.items,
        spaceID: myLists[i].value.spaceID,
        icon: myLists[i].value.icon,
        listID: myLists[i].key
      }
    })
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
                navigation.navigate('SpacePage')
            }}
            />
            <View style={styles.headerMain}>
              <Text style={styles.headerTitle}>Lists</Text>
              <Text> {myLists.length}</Text>
            </View>
        </View>
            <View style={styles.search}>
              <Search/>
            </View>
        <ScrollView scrollEventThrottle={16}>
        <AlphabetList
              data = {data}
              renderSectionHeader={SectionHeader}
              renderCustomItem={(item) => (
                <List
                  listName={item.key.name}
                  numItems={item.key.items.length}
                  icon={item.key.icon}
                  onPress={() => {
                    console.log(item.key.icon);
                    console.log('item', item);
                    navigation.navigate("ListDetail", { listID: item.key.listID, currUser: route.params.currUser, name: item.key.name, numItems: item.key.items.length, data: route.params.data});
                  }}
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
    left: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 40
  },
  search: {
    width: '95%'
  }
});
