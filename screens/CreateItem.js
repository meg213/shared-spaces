import React, { useState, Component } from 'react';
import { ScrollView, StyleSheet, Text, View, SafeAreaView, Switch} from 'react-native';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import { createItems } from '../utils/firebaseMethod';

export default function createItem({route, navigation}) {
    //route params: spaceID, currUser
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [shared, setShared] = useState(false);
    const toggleShared = () => setShared(previousState => ! previousState);
    const currentUser = route.params.currUser;
    const currentSpaceId = route.params.spaceID;

    return(
        <SafeAreaView style = {[styles.container]}>
            <View>
                <Text style = {[styles.text]}>
                    Add Item
                </Text>
            </View>
            <View style={{
                    padding:12
                }}>
                <FormInput
                    labelValue={name}
                    onChangeText={(itemName) => setName(itemName)}
                    placeholderText="Name"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <FormInput
                    labelValue={category}
                    onChangeText={(itemCategory) => setCategory(itemCategory)}
                    placeholderText="Category"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <Text>Is this item is shared?</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={shared ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleShared}
                    value={shared}
                />
                
            </View>
            <FormButton
                buttonTitle="Create Item"
                onPress={() => createItems(currentUser, currentSpaceId, name, category, shared)}
            />
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
    text: {
        fontSize: 30,
        textAlign: "left",
        fontWeight: "500",
        color: "#184254",
    },
    buttonGroupSelected: {
        backgroundColor: '#184254'
    },
    containerStyle: {
        borderRadius: 6,
        height: 60,
        padding: 8,
        width: "100%"
    },
    buttonGroupStyle: {
        height: 30,
        padding: 6,
        borderRadius: 12,
    },
    innerBorderStyle: {
        color: '#FFFFFF',
        backgroundColor: '#FFFFFF'
    }

})