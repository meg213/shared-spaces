import React from 'react';
import { ScrollView, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Icon } from 'react-native-elements';
import Item from "../components/Item";
import Button from "../components/Button";
import { SearchBar } from 'react-native-elements';

export default class ItemListPage extends React.Component {
  state = {
    search: '',
  };

  updateSearch = (search) => {
    this.setState({ search });
  };

    itemList = (list) => {
        //this is where all the items would be sorted
     list.sort(function(a,b){
        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        return 0
        });
    };

  render() {
    const { search } = this.state;

    return (
     <SafeAreaView style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.headerTitle}>My Items</Text>
            <Text style={styles.itemNumber}>24 Items</Text>
        </View>
        <View style={styles.search}>
            <SearchBar
                    placeholder="Type Here..."
                    onChangeText={this.updateSearch}
                    value={search}
                    lightTheme
                />
        </View>
        <ScrollView scrollEventThrottle={16}>
        <View>
            <Item
                listPage
            />
            <Item
                listPage
            />
            <Button
                onClick={()=> {navigation.navigate('SpacePage')}}
            />
        </View>
        </ScrollView>
    </SafeAreaView> 
    );
  }
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
    height: 90,
    width: '100%',
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
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
