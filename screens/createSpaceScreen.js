import React, { useState, Component } from 'react';
import { ScrollView, StyleSheet, Text, View, SafeAreaView, Button } from 'react-native';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import { createSpaces } from '../utils/createSpaces';

const CreateSpaceScreen = ({navigation}) => {
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    return(
        <SafeAreaView style = {[styles.container]}>
            <View>
                <Text style = {[styles.text]}>
                    Create a Shared Space
                </Text>
            </View>
            <FormInput
                labelValue={name}
                onChangeText={(spaceName) => setName(spaceName)}
                placeholderText="Space Name"
                autoCapitalize="none"
                autoCorrect={false}
            />
            <FormInput
                labelValue={type}
                onChangeText={(spaceType) => setType(spaceType)}
                placeholderText="Space Type"
                autoCapitalize="none"
                autoCorrect={false}
            />
            <FormButton
                buttonTitle="Create Space"
                onPress={() => createSpaces(name, type)}
            />
        </SafeAreaView>
        
    );
}
export default CreateSpaceScreen;

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