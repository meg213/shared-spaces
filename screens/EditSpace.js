import React, { useState, Component } from 'react';
import { ScrollView, StyleSheet, Text, View, SafeAreaView, Modal} from 'react-native';
import Button from '../components/Button';
import FormInput from '../components/FormInput';
import { Icon } from 'react-native-elements';
import { createItems } from '../utils/firebaseMethod';

export default function editSpace({route, navigation}) {
    //route params: spaceID, currUser
    const [name, setName] = useState(route.params.name);
    const [category, setCategory] = useState("");
    const [shared, setShared] = useState(false);
    const toggleShared = () => setShared(previousState => ! previousState);
    // const currentUser = route.params.currUser;
    const currentSpaceId = route.params.spaceID;
    

    return(
        <SafeAreaView style = {[styles.container]}>
            <View>
                <Text style = {[styles.text]}>
                    Edit Space
                </Text>
            </View>
            <View style={{
                    paddingVertical:12
                }}>
                <Text style={styles.subtext}>Space Name</Text>
                <FormInput
                        labelValue={name}
                        onChangeText={(spaceName) => setName(spaceName)}
                        placeholderText="List Name"
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                <Text style={styles.subtext}>Current Members</Text>
                <Text style={{paddingVertical: 12}}>To Do: Add current list of users</Text>
                <Text style={[styles.subtext, {paddingVertical: 12}]}>Add Members</Text>
                <Button
                    name="Generate Code"
                />
            </View>
            <View style={{marginBottom: 50, width: '100%', position: 'absolute', bottom: 0}}>
                <Button
                    name="Delete Space"
                    color='#EB5757'
                    // onPress={() => createItems(currentUser, currentSpaceId, name, category, shared)}
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

})