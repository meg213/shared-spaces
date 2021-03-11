import React, { useState, Component } from 'react';
import { Alert } from 'react-native';
import { ScrollView, StyleSheet, Text, View, SafeAreaView , Pressable, Image } from 'react-native';
import Button from '../components/Button';
import FormInput from '../components/FormInput';
import { CheckBox } from 'react-native-elements'
import User from '../components/User';

const CreateList= ({navigation}) => {
    const [name, setName] = useState("");
    const [icon, setIcon] = useState(require('../assets/kitchen.png'))
    

    return(
        <SafeAreaView style = {[styles.container]}>
            <View>
                <Text style = {[styles.text]}>
                    Create a List
                </Text>
            </View>
            <ScrollView style={{  width: "100%" }}>
                <View style={{  paddingVertical: 12 }}>
                    <FormInput
                        labelValue={name}
                        onChangeText={(spaceName) => setName(spaceName)}
                        placeholderText="List Name"
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </View>
                <Pressable style={({ pressed }) => [{opacity: pressed ? 0.6 : 1}]} >
                    <View style={[styles.itemList, {flexDirection:'row', justifyContent:'space-between', alignItems:'center'}]}>
                        <Text style={styles.itemTitle}>Select Icon</Text> 
                        <Image source={icon} style={styles.icon}/>
                    </View>
                </Pressable>
                <View style={styles.itemList}>
                    <Text style={styles.itemTitle}>Add Items</Text>
                    {/* number of checkboxes per number of items */}
                    <CheckBox />
                </View>
            </ScrollView>
            <View style={{  alignSelf: 'center' }}>
                <Button
                    name="Create List"
                    width="75%"
                    onPress={() => {Alert.alert('Space Created')}}
                />
            </View>
        </SafeAreaView>
        
    );
}
export default CreateList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F0EB',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        margin: 18,
        marginTop: '15%',
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
        borderRadius: 12,
        padding: 12,
        width: '100%',
        marginVertical: 6,
    },
    icon: {
        width: 50,
        height: 50,
        color: "#000000",
        marginLeft: 12,
        marginRight: 18
    },
})