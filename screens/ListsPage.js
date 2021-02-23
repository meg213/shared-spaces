import React from 'react';
import { ScrollView, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Icon } from 'react-native-elements';
import List from "../components/List";
import User from "../components/User";
import Card from "../components/Card";
import Button from "../components/Button";
import RecentMessageShow from "../components/RecentMessageShow"


export default function ListsPage({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
        <ScrollView scrollEventThrottle={16}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Lists</Text>
                <Text>6 Lists</Text>
            </View>
            <List></List>
            <Button
                onClick={()=> {navigation.navigate('SpacePage')}}
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
