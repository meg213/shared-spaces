import React, {useState, useEffect, useRef, Component} from 'react';
import { ScrollView, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Icon } from 'react-native-elements';
import List from "../components/List";
import Search from "../components/Search"
import Button from "../components/Button";
import { db } from '../config/keys';
import {AlphabetList} from 'react-native-section-alphabet-list';
import MyItemsPage from './MyItemsPage';


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

  const[myLists, setLists] = useState([])
  const componentIsMounted = useRef(true);

  useEffect(() => {
    return () => {
      componentIsMounted.current = false;
    };
  }, []);

  useEffect(() => {
    const subscriber = spaceRef.doc(currSpaceID).onSnapshot(documentSnapshot => {createListsData(documentSnapshot)});
    async function createListsData(documentSnapshot) {
      console.log(documentSnapshot.data())
      var currentSpaceLists = documentSnapshot.data().lists;
      var data = [];

      for (let i = 0; i < currentSpaceLists.length; i++) {
        let listData = (await listRef.doc(currentSpaceLists[i].substring(6)).get()).data();
        console.log(listData)
        if (listData == undefined) {
          continue;
        }
        if (listData.spaceID.substring(7) == currSpaceID) {
          data.push(listData);
        }
      }

      if (componentIsMounted.current) {
        setLists(data);
      }
    }
    return () => subscriber;
  }, []);

  let data = []
  for (let i = 0; i < myLists.length; i++) {
    data.push({value: myLists[i].name, key: myLists[i]})
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
              <Text style={styles.headerTitle}>Lists</Text>
              <Text> 2</Text>
            </View>
        </View>
            <View style={styles.search}>
              <Search/>
            </View>
        <ScrollView scrollEventThrottle={16}>
            <List/>
            <List/>
        </ScrollView>
        <View style={styles.fab}>
            <Button
                width='80%'
              // onClick={()=> {navigation.navigate('SpacePage')}}
                name="Create List"
                onClick={()=> {navigation.navigate("CreateListScreen", {spaceID:route.params.data})}}
            />

            <AlphabetList
              data = {data}
              renderSectionHeader={SectionHeader}
              renderCustomItem={(item) => (
                <List
                  listName={item.value}
                  numItems={item.key.number}
                  // TODO: Create custom icon for lists
                />
              )}
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
