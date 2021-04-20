import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, Text, View, SafeAreaView, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import SpacePage from './SpacePage';
import Button from '../components/Button';
import SpaceCard from '../components/SpaceCard';
import firebase from 'firebase/app';
import { db } from '../config/keys';
import User from '../components/User';


const userRef = db.collection('users');
const spaceRef = db.collection('spaces');

export default function MySpacesPage({navigation}){
    const currUser = firebase.auth().currentUser;
    const[spaceNames, setSpaceNames] = useState([]);

    const componentIsMounted = useRef(true);
    

    useEffect(() => {
        return () => {
          componentIsMounted.current = false;
        };
      }, []);
      
    useEffect(() => {
        const subscriber = userRef.doc(currUser.uid).onSnapshot(documentSnapshot => {createSpaceCard(documentSnapshot)});
        async function createSpaceCard(documentSnapshot) {
          //  console.log(documentSnapshot.data())
            var spaces = documentSnapshot.data().spaces;
            var names = [];
            for (let i = 0; i < spaces.length; i++) {
                let spaceData = (await spaceRef.doc(documentSnapshot.data().spaces[i].substring(7)).get()).data();
                if (spaceData == undefined) {
                    continue
                }
                names.push({spaceData: spaceData, spaceId: spaces[i]});
     
            }
            if (componentIsMounted.current) {
                setSpaceNames(names)
            }
        }
        return () => subscriber;
    }, []);
    
    return (
        <SafeAreaView style = {[styles.container]}>
            <View style ={{
                flexDirection: 'row',
                marginLeft: 'auto',
                marginRight: 18

            }}>
                <Icon style={{
                    alignSelf: 'center',
                    marginLeft: 40
                    }} 
                    size={50} name='account-circle' color= '#79AAB5'
                    onPress={() => {
                        navigation.navigate('ProfilePage', {currUser: currUser});
                    }}
                />
            </View>
            <View style ={{
                flexDirection: 'row',
                marginRight: 'auto',
                marginLeft: 18,
                paddingBottom: 6   
            }}>
                <Text style = {[styles.text]}>
                    My Spaces
                </Text>
            </View>
            <ScrollView>
                {spaceNames.map((space, index) => 
                    <SpaceCard key={index} name={space.spaceData.name} 
                    members={space.spaceData.user.length}
                    onClick={() => {navigation.navigate('SpacePage', {data:space.spaceId, currUser:currUser, name: space.spaceData.name})}}/>
                )}
                <View style={{marginBottom: 12}}>
                    <Button
                        name = "Create Space"
                        width ="95%"
                        onClick={() => {
                        navigation.navigate('CreateSpaceScreen', {currUser: currUser});
                        }}
                    />
                </View>
                <Button 
                    name="Join Space"
                    onClick={() => {navigation.navigate('JoinSpaceScreen', {currUser: currUser})}}
                />
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F0EB',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop:50
    },
    text: {
        fontSize: 30,
        textAlign: "left",
        fontWeight: "500",
        color: "#184254",
    }

})