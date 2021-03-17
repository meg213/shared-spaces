import React, { useState, Component } from 'react';
import { ScrollView, StyleSheet, Text, View, SafeAreaView, Button } from 'react-native';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import { createSpaces } from '../utils/firebaseMethod';

import { ButtonGroup } from 'react-native-elements';

const CreateSpaceScreen = ({route, navigation}) => {
    //route params: currUser
    const [name, setName] = useState("");
    const [type, setType] = useState("");

    //const currentUser = route.params.currUser;
    
    const [index, setIndex] = useState(0);
    const buttons = ['Home', 'Office', 'Other'];

    const updateIndex = (selectedIndex) => {
        setIndex(selectedIndex);
        setType(buttons[selectedIndex]);
    }

    return(
        <SafeAreaView style = {[styles.container]}>
            <View>
                <Text style = {[styles.text]}>
                    Create a Shared Space
                </Text>
            </View>
            <View style={{
                    padding:12
                }}>
                <FormInput
                    labelValue={name}
                    onChangeText={(spaceName) => setName(spaceName)}
                    placeholderText="Space Name"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <Text>Space Type</Text>
                <ButtonGroup
                    buttons={buttons}
                    selectedIndex={index}
                    onPress={updateIndex}
                    selectedButtonStyle={styles.buttonGroupSelected}
                    containerStyle={styles.containerStyle}
                    buttonStyle={styles.buttonGroupStyle}
                    innerBorderStyle={styles.innerBorderStyle}
                />
            </View>
            <View>
             <Text>Members</Text>
            </View>
            <FormButton
                buttonTitle="Create Space"
                onPress={() => {
                   // createSpaces(currentUser, name, type);
                    navigation.navigate('MySpacesPage');
                    }
                }
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