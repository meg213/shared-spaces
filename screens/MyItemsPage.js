import React from 'react';
import { ScrollView, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Icon } from 'react-native-elements';
import Item from "../components/Item";
import User from "../components/User";
import Card from "../components/Card";
import Button from "../components/Button";
import RecentMessageShow from "../components/RecentMessageShow"


export default function SpacePage({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
        <ScrollView scrollEventThrottle={16}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>My Items</Text>
                <Text>35 Items</Text>
            </View>
            <Text style={styles.sortedLetters}>B</Text>
            <Item
              listPage
              itemName="Blender"
            />
            <Item
              listPage
              itemName="Broom"
            />
            <Text style={styles.sortedLetters}>C</Text>
            <Item
              listPage
              itemName="Chair"
            />
            <Text style={styles.sortedLetters}>L</Text>
           <Item
              listPage
              itemName="Light"
            />
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
  },
  sortedLetters: {
    fontSize: 22,
    color: '#4E7580',
    paddingHorizontal: 12,
    paddingVertical: 6
  }
});
