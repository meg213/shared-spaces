import React from 'react';
import { ScrollView, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Icon } from 'react-native-elements';
import Item from "../components/Item";
import User from "../components/User";
import Card from "../components/Card";
import Button from "../components/Button";
import RecentMessageShow from "../components/RecentMessageShow"
import { SearchBar } from 'react-native-elements';


export default function SpacePage({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
        <ScrollView scrollEventThrottle={16}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>My Items</Text>
                <Text>35 Items</Text>
            </View>
            <View style={styles.search}>
            <SearchBar
                    placeholder="Type Here..."
                    // onChangeText={this.updateSearch}
                    // value={search}
                    lightTheme
                />
        </View>
            <Item
                listPage
            />
            <Item
                listPage
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
  }
});
