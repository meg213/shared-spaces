import React from 'react';
import { ScrollView, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Icon } from 'react-native-elements';
import Item from "../components/Item";
import User from "../components/User";
import Card from "../components/Card";
import Button from "../components/Button";
import RecentMessageShow from "../components/RecentMessageShow"


export default function SpacePage() {
  return (
    <SafeAreaView style={styles.container}>
        <View style ={{
            flexDirection: 'row',
            alignItems: 'center',        
        }}>
            <Icon style={{
                justifyContent: 'left'
            }} size={50} name='arrow-left' />
            <Text style={{
                flex: 1,
                paddingRight: 50,
                textAlign: 'center',
                alignContent: 'center',
                fontSize: 30, 
                fontWeight:'500',
                color: "#184254"
                }}>
                The Apartment
            </Text>
        </View>
        <ScrollView scrollEventThrottle={16}>
            <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                margin: 6,
                }}
            >
                <User/>
            </View>
            <View>
                <Text style={{
                    fontSize: 18, 
                    fontWeight: '400',
                    margin: 6,
                    marginHorizontal: 12,
                    color: '#4E7580'
                }}> 
                    Messages 
                </Text>
                <RecentMessageShow/>
            </View>
            <View style={{height: 120, marginTop: 6, marginLeft: 6}}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <Card name="Shared"
                        onClick={() => {console.log('card click test')}}/>
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
                borderRadius: 12,
                marginTop: 6
            }}>
                <Text style={{
                    fontSize: 18, 
                    fontWeight: '400',
                    paddingTop: 12,
                    paddingBottom: 6,
                    color: '#4E7580',
                    marginHorizontal: 12
                }}> 
                    Recently Added Items 
                </Text>
                <Item
                    onClick={()=> {console.log('item click test')}}
                />
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
    backgroundColor: '#F2F0EB',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:50
  },
});