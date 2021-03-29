import React, {useState, useEffect, useRef, Component} from 'react';
import { ScrollView, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Icon } from 'react-native-elements';
import Item from "../components/Item";
import Button from "../components/Button";
import Search from '../components/Search';


export default function SharedPage({navigation}) {
  const [search, setSearch] = useState("");

  const itemList = (list) => {
        //this is where all the items would be sorted
    list.sort(function(a,b){
        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        return 0
        });
  };

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
              <Text style={styles.headerTitle}>Shared Items</Text>
              <Text> 2</Text>
            </View>
        </View>
        <View style={styles.search}>
              <Search/>
        </View>
        <ScrollView scrollEventThrottle={16}>
        <View>
            <Item
                listPage
                onClick={() => {navigation.navigate('ItemDetailScreen')}}
            />
            <Item
                listPage
                onClick={() => {navigation.navigavte('ItemDetailScreen')}}
            />
            <Button
                onClick={()=> {navigation.navigate('SpacePage')}}
            />
        </View>
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
    marginLeft: 60
  },
  headerTitle: {
      fontSize: 30,
      color: '#184254',
      fontWeight: '500',
      paddingBottom: 12,
  },
  itemNumber: {
    fontSize: 18,
    color: '#4E7580'
  },
  search: {
      width: '90%'
  }
});
