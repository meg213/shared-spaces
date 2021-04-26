import React, { useState, Component } from 'react';
import { Alert } from 'react-native';
import { ScrollView, StyleSheet, Text, View, SafeAreaView, Switch } from 'react-native';
import Button from '../components/Button';
import FormInput from '../components/FormInput';
import {joinSpace} from '../utils/firebaseMethod';


const JoinSpaceScreen = ({route, navigation}) =>  {
    const currUser = route.params.currUser;
    const [joinCode, setJoinCode] = useState()
    return(
        <SafeAreaView style = {[styles.container]}>
            <View style = {{margin: 18}}>
                <Text style = {[styles.text]}>
                    Join a Space
                </Text>
            </View>
            <View style={{
                    paddingVertical:8,
                    backgroundColor: "#FFFFFF",
                    paddingHorizontal: 8,
                    margin: 18,
                    borderRadius: 8
                }}>
                <FormInput
                    labelValue={joinCode}
                    onChangeText={(code) => setJoinCode(code)}
                    placeholderText="Please enter the Join Space Code"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <Button 
                    name="Join Space"
                    onClick={() => {
                        joinSpace(currUser, Number(joinCode))
                        navigation.navigate("MySpacesPage")
                    }}
                />
            </View>
        </SafeAreaView>



    )

}

export default JoinSpaceScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F0EB',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        
        paddingTop: 50
    },
    text: {
        fontSize: 30,
        textAlign: "left",
        fontWeight: "500",
        color: "#184254",
        paddingBottom: 6
    },
    itemTitle: {
        fontSize: 18,
        color: '#4E7580'
    },
    itemList: {
        backgroundColor: '#FFFFFF',
        borderRadius: 6,
        padding: 12,
        width: '100%',
        marginVertical: 6
    },
    textsmall: {
        fontSize: 16,
        textAlign: "left",
        fontWeight: "500",
        color: "#184254",
        paddingBottom: 3
    },

    white: {
        backgroundColor: "#FFFFFF",
        paddingVertical: 14,
        paddingHorizontal: 8,
        margin: 18,
        borderRadius: 8,
    }

})