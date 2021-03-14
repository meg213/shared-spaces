import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Icon } from 'react-native-elements';
import SpacePage from './SpacePage';
import Button from '../components/Button';
import SpaceCard from '../components/SpaceCard';
import firebase from 'firebase/app';
import { db } from '../config/keys';

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
        async function createSpaceCard(currentUser) {
            var spaces = [];
            var names = [];
    
            await userRef.doc(currentUser.uid)
            .get()
            .then(documentSnapshot => spaces = documentSnapshot.get('spaces'));
            for (let i = 0; i < spaces.length; i++) {
                let spaceData = (await spaceRef.doc(spaces[i].substring(7)).get()).data();
                //SpaceData: name, spaceType, items, users
                names.push({currentUser: currUser, spaceData: spaceData, spaceId: spaces[i]});
            }
            if (componentIsMounted.current) {
                setSpaceNames(names)
            }
        }

        createSpaceCard(currUser)
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
                        navigation.navigate('ProfilePage');
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
                <div>
                    {spaceNames.map((space, index) => 
                        <SpaceCard key={index} name={space.spaceData.name} onClick={() => {navigation.navigate('SpacePage', {data:space})}}/>
                    )}
                </div>
                <Button
                    name = "Create Space"
                    onClick={() => {
                        navigation.navigate('CreateSpaceScreen', {currUser: currUser});
                    }}
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