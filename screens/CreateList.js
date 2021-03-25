import React, { useState, Component } from 'react';
import { Alert } from 'react-native';
import { ScrollView, StyleSheet, Text, View, SafeAreaView } from 'react-native';
// import Button from '../components/Button';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import { CheckBox } from 'react-native-elements'
import { createNewList } from '../utils/firebaseMethod';

const CreateList= ({route, navigation}) => {
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [index, setIndex] = useState(0);
    const buttons = ['Home', 'Office', 'Other']
    const currentSpaceId = route.params.spaceID;

    const updateIndex = (selectedIndex) => {
        setIndex(selectedIndex);
        setType(buttons[selectedIndex]);
    }

    return(
        <SafeAreaView style = {[styles.container]}>
            <Text style = {[styles.text]}>
                    Create a List
                </Text>
            <View style={{
                    paddingVertical:12
            }}>
                <FormInput
                    labelValue={name}
                    onChangeText={(name) => setName(name)}
                    placeholderText="Type List Name Here"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
            </View>
            <View style={styles.itemList}>
                <Text style={styles.itemTitle}>Add Items</Text>
                {/* number of checkboxes per number of items */}
                {/* <CheckBox

                /> */}
            </View>
            <FormButton
                buttonTitle="Create List"
                onPress={() => { 
                    createNewList(currentSpaceId, name); 
                    navigation.navigate("ListsList")
                }}
            />
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
        borderRadius: 6,
        padding: 12,
        width: '100%',
        marginVertical: 6
    }

})