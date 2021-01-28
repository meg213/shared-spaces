import React from 'react';
import { ScrollView, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Icon } from 'react-native-elements'
import Item from "./components/Item";
import User from "./components/User";
import Card from "./components/Card";
import Button from "./components/Button";
import RecentMessageShow from "./components/RecentMessageShow"


export default function SpacePage() {
  return (
    <SafeAreaView style={styles.container}>
        <View style={{ flexDirection: 'row' }}>
            <Icon style={{
                flex: 1,
            }} size={50} name='arrow-left' />
            <Text style={{ 
                flex: 1,
                textAlign: 'center',
                fontSize:36, 
                fontWeight:'700'
                }}>
                The Apartment
            </Text>
        </View>
        <ScrollView scrollEventThrottle={16}>
            <View>
                <Text style={{
                    fontSize: 20, 
                    fontWeight: '700',
                    margin: 6
                }}> 
                    Messages 
                </Text>
                <RecentMessageShow/>
            </View>
            <View style={{height: 120, marginTop: 6}}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <Card name="Shared"/>
                    <Card name="My Items"/>
                    <Card name="Lists"/>
                    <Card name="All Items"/>
                    <Card name="All Items"/>
                    <Card name="All Items"/>
                    <Card name="All Items"/>
                </ScrollView>
            </View>
            <Button name="Add an Item"/>
            <View style={{
                backgroundColor: 'white',
                borderRadius: 10,
            }}>
                <Text style={{
                    fontSize: 18, 
                    fontWeight: '700',
                    padding: 10,
                }}> 
                    Recently Added Items 
                </Text>
                <Item/>
                <Item/>
                <Item/>
                <Item/>
                <Item/>
            </View>
        </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D9DED8',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:50
  },
});
