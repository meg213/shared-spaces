
import React, { useState, Component, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, SafeAreaView, Switch, Image} from 'react-native';
import Button from '../components/Button';
import FormInput from '../components/FormInput';
import { createItems } from '../utils/firebaseMethod';
import {db} from '../config/keys';
import * as ImagePicker from 'expo-image-picker'

export default function createItem({route, navigation}) {
    //route params: spaceID, currUser
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [shared, setShared] = useState(false);
    const toggleShared = () => setShared(previousState => ! previousState);
    const currentUser = route.params.currUser;
    const currentSpaceId = route.params.spaceID;
    console.log(currentSpaceId);
    const [image, setImage] = useState(null);
    const [allList, setAllList] = useState([]);


    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
        if (permissionResult.granted === false) {
          alert("Permission to access camera roll is required!");
          return;
        }
    
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowEditing: true,
                aspect: [4,3],
                quality: 1,
        });
        if (!pickerResult.cancelled) {
          setImage(pickerResult.uri);
        }
        console.log(pickerResult);
    }

    return(
        <SafeAreaView style = {[styles.container]}>
            <View>
                <Text style = {[styles.text]}>
                    Add Item
                </Text>
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 4 }}>
                {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                <View style={{ paddingVertical:6}} />
                <Button name="Upload a Photo of Item" onClick={openImagePickerAsync}/>
                
            </View>
            <View style={{
                    paddingVertical:12
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
                    placeholderText="Add to List"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <View style={styles.shared}>
                    <Text style={styles.subtext}>Is this item is shared?</Text>
                    <Switch
                        trackColor={{ false: "#000", true: "#79AAB5" }}
                        thumbColor={ shared ? "#fff" : "#79AAB5"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleShared}
                        value={shared}
                    />
                </View>
            </View>
            <View style={{marginBottom: 50, width: '100%', position: 'absolute', bottom: 0}}>
                <Button
                    name="Create Item"
                    onClick={() => createItems(currentUser, currentSpaceId, name, category, shared, image)}
                />
            </View>
        </SafeAreaView>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F0EB',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingTop:50,
        marginHorizontal: 12,
    },
    text: {
        fontSize: 30,
        textAlign: "left",
        fontWeight: "500",
        color: "#184254",
    },
    subtext: {
        fontSize: 18,
        color: '#4E7580',
    },
    shared: {
        paddingVertical: 12,
        paddingHorizontal: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
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