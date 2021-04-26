import React, { useState, Component } from 'react';
import { ScrollView, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import Button from '../components/Button';
import FormInput from '../components/FormInput';
import { createSpaces } from '../utils/firebaseMethod';

import { ButtonGroup } from 'react-native-elements';

const CreateSpaceScreen = ({route, navigation}) => {
    //route params: currUser
    const [name, setName] = useState("");
    const [type, setType] = useState("");

    const currentUser = route.params.currUser;
    
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
                    paddingVertical:12
                }}>
                <FormInput
                    labelValue={name}
                    onChangeText={(spaceName) => setName(spaceName)}
                    placeholderText="Space Name"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <Text style={styles.subText}>Space Type</Text>
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
             {/* <Text style={styles.subText}>Members</Text> */}
            </View>
            <View style={styles.buttonStyles}>
                <Button
                    name="Create Space"
                    onClick={() => {
                    createSpaces(currentUser, name, type);
                        navigation.navigate('MySpacesPage');
                        }
                    }
                />
            </View>
        </SafeAreaView>
        
    );
}
export default CreateSpaceScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F0EB',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingTop:50,
        marginHorizontal: 12
    },
    text: {
        fontSize: 30,
        textAlign: "left",
        fontWeight: "500",
        color: "#184254",
    },
    subText: {
        fontSize: 18,
        color: '#4E7580'
    },
    buttonGroupSelected: {
        backgroundColor: '#184254'
    },
    containerStyle: {
        borderRadius: 16,
        height: 60,
        padding: 8,
        alignSelf: 'center',
    },
    buttonGroupStyle: {
        height: 30,
        padding: 6,
        borderRadius: 12,
    },
    innerBorderStyle: {
        color: '#FFFFFF',
        backgroundColor: '#FFFFFF'
    },
    buttonStyles: {
        width: '100%',
        position: 'absolute',
        bottom: 38,
    }

})