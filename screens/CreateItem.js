import React, { useState, Component, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, SafeAreaView, Switch, Image, } from 'react-native';
import Button from '../components/Button';
import FormInput from '../components/FormInput';
import { createItems } from '../utils/firebaseMethod';
import * as ImagePicker from 'expo-image-picker'
import { Dropdown } from 'react-native-material-dropdown-v2-fixed';

export default function createItem({route, navigation}) {
    //route params: spaceID, currUser
    const [name, setName] = useState("");
    const [category, setCategory] = useState("Select List");
    const [shared, setShared] = useState(true);
    const toggleShared = () => setShared(previousState => ! previousState);
    const currentUser = route.params.currUser;
    const currentSpaceId = route.params.spaceID;
    const [image, setImage] = useState(null);    //image needs to be connected to backend
    const data = [{
        value: 'Living Room',
      }, {
        value: 'Kitchen',
      }, {
        value: 'Bathroom',
      },{
        value: 'Patio',
      }
    ];
   

    useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
        })();
      }, []);
    
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowEditing: true,
            aspect: [4,3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
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
                <Button name="Upload a Photo of Item" onClick={pickImage} />
                
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
                <View
                style={{
                    height:80
                }}>
                    <Dropdown
                        label={category}
                        data={data}
                    />
                </View>
                {/* <FormInput
                    labelValue={category}
                    onChangeText={(itemCategory) => setCategory(itemCategory)}
                    placeholderText="Add to List"
                    autoCapitalize="none"
                    autoCorrect={false}
                /> */}
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
                    onPress={() => createItems(currentUser, currentSpaceId, name, category, shared)}
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