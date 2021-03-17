import React, { useState, Component } from 'react';
import { Alert } from 'react-native';
import { ScrollView, StyleSheet, Text, View, SafeAreaView, Switch } from 'react-native';
import Button from '../components/Button';
import FormInput from '../components/FormInput';
import DropDownPicker from 'react-native-dropdown-picker';


export default AddItemScreen = ({navigation}) =>  {
    const [name, setName] = useState("");
    const [list, setList] = useState("");
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);


    return(
        <SafeAreaView style = {[styles.container]}>
            <View style = {{margin: 18}}>
                <Text style = {[styles.text]}>
                    Add Item
                </Text>
            </View>
            <View>
                {/* ADD THE ADD IMAGE HERE ICON/BUTTON.  NOT SURE HOW TO LET USER UPLOAD PHOTOS YET */}
            </View>
            <View style={{
                    paddingVertical:8,
                    backgroundColor: "#FFFFFF",
                    paddingHorizontal: 8,
                    margin: 18,
                    borderRadius: 8
                }}>
                <Text style = {[styles.textsmall]}>
                    Name
                </Text>
                
                <FormInput
                    labelValue={name}
                    onChangeText={(spaceName) => setName(spaceName)}
                    placeholderText="Item Name"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
            </View>


            <View style = {[styles.white]}>
                
                <Text style = {[styles.textsmall]}>
                    Add to list
                </Text>
                <DropDownPicker
                    items={[
                        {label: "Living Room", value: "livingroom"} /*this is a filler one*/
                        /*need to query all the lists available, and make a label and value for each*/
                    ]}
                    containerStyle={{height: 48,
                                     width: 342}}
                    style={{backgroundColor: "#FFFFFF"}}
                    itemStyle={{
                        justifyContent: 'flex-start'
                    }}
                    dropDownStyle={{backgroundColor: '#FFFFFF'}}
                    onChangeItem={item => this.setList({
                        list: item.value
                    })}
                />

            </View>
            <View style={[styles.container], {flexDirection: "row", margin: 18}}>
                <Text style = {{fontSize: 14, textAlign: "left", color: "#184254"}}>
                    Is this item shared?
                </Text>
                <View style = {{paddingHorizontal: 45}} />
                <Switch
                    trackColor={{ false: "#FFFFFF", true: "#D9BD4B"}}
                    thumbColor={isEnabled ? "#4E7580" : "#79AAB5"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>
        </SafeAreaView>



    )

}

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