import React, {useState, useEffect, useRef, Component} from 'react';
import { ScrollView, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Icon } from 'react-native-elements';
import Search from "../components/Search"
import Button from "../components/Button";
import { db } from '../config/keys';
import Item from "../components/Item";
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

  const[myLists, setLists] = useState([])
  const componentIsMounted = useRef(true);

  // console.log(getList('lists/0jYR944RNWGKdJDc75fR'))

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
          <Item
            listPage
          />
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
