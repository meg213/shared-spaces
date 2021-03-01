import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Icon } from 'react-native-elements';
import Button from '../components/Button';
import SpaceCard from '../components/SpaceCard';
import ProfilePage from '../screens/ProfilePage';
import firebase from 'firebase/app';
import { db } from '../config/keys';

const userRef = db.collection('users');
const spaceRef = db.collection('spaces');

export default function MySpacesPage({navigation}){
    const currUser = firebase.auth().currentUser;
    console.log(currUser.uid);
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
            
            console.log(spaces);

            for (let i = 0; i < spaces.length; i++) {
                let spaceData = (await spaceRef.doc(spaces[i].substring(7)).get()).data();
                names.push({name: spaceData.name});
            }
            if (componentIsMounted.current) {
                setSpaceNames(names)
            }
        }

        createSpaceCard(currUser)
    }, []);

    return (
        <SafeAreaView style = {[styles.container]}>
            <View>
                <Text style = {[styles.text]}>
                    My Spaces
                </Text>
            </View>
            <ScrollView>
                <div>
                    {spaceNames.map((name, index) => <SpaceCard key={index} name={name.name}/>)}
                </div>
                <Button
                    name = "Create Space"
                    onClick={() => {
                        navigation.navigate('createSpaceScreen');
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