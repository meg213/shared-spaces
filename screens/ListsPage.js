import React from 'react';
import { ScrollView, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Icon } from 'react-native-elements';
import List from "../components/List";
import User from "../components/User";
import Card from "../components/Card";
import Button from "../components/Button";
import Search from '../components/Search';

export default function ListsPage({navigation}) {
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
                name="Create List"
                onClick={()=> {navigation.navigate('CreateList')}}
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
