import React, { useState, Component } from 'react';
import { ScrollView, StyleSheet, Text, View, SafeAreaView, Switch, Image} from 'react-native';
import Button from '../components/Button';
import User from '../components/User';

export default function ItemDetailScreen ({route, navigation}) {
    const [itemName, setName] = useState(route.params.data.name);
    const [list, setCategory] = useState(route.params.data.listName); //the list or category it's in
    const [shared, setShared] = useState(route.params.data.isShared);
    const [image, setImage] = useState(null);
    const [owner, setOwner] = useState(route.params.data.owner);
    const [initials, setInitials] = useState("MG") //not sure if I need this. Maybe can get it from owner
    
    //Need to query the information above from database based on the Item that was clicked (most of the same information that was on the card clicked to get here)
    //Image is the only thing extra that needs to be queried that was not queried on the item card

    console.log('route.params', route.params.data.name);
    return (
        <SafeAreaView style = {[styles.container]}>
            <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 4,paddingHorizontal: 30, flexDirection: 'row' }}>
                {image && <Image source={{ uri: image }} style={[styles.icon]} />}
                <Image source={require('../assets/icon.png')} style={[styles.icon]}/>
            </View>
            <View style={{paddingVertical: 30, paddingHorizontal: 30}}>
                <Text style={[styles.text]}>
                    {itemName}
                </Text>
                <Text style={[styles.subtext]}>
                    {list}
                </Text>
            </View>
            { shared ?             
            <View style={{paddingVertical: 16, paddingHorizontal: 30, flexDirection: 'row', alignItems: 'center'}}>
                <Image source={require('../assets/logo.png')} style={[styles.image]}/>
                <View style={{paddingHorizontal: 6}}/>
                <Text style={[styles.small]}>
                    This item is {shared ? '' : "not "}
                    shared
                </Text>
            </View> : null}
            <View style={{paddingVertical: 16, paddingHorizontal: 30, flexDirection: 'row', alignItems: 'center'}}>
                <User initials={initials}/>
                <View style={{paddingHorizontal: 6}}/>
                <Text style={[styles.small]}>
                    Maya Gee {/*<--- placeholder now */ owner}
                </Text>
            </View>

            <View style={{ position: 'absolute', bottom: 48, flexDirection: 'row', paddingTop: 48, paddingHorizontal: 30, justifyContent: 'center'}}>
                <Button name="edit" width="55%" textColor="#184254" color="#ffffff" icon='edit' iconColor="#D9BD4B"/>       
                <Button name="delete" width="55%" color="#ffffff" textColor="#184254" icon="close" iconColor="#EB5757"/>
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
        fontSize: 36,
        textAlign: "left",
        fontWeight: "600",
        color: "#184254",
    },
    subtext: {
        fontSize: 24,
        fontWeight: "400",
        color: '#4E7580',
    },
    small: {
        fontSize: 18,
        fontWeight: "400",
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
    },
    image: {
        width: 50,
        height: 50,
    },
    icon: {
        width: 320,
        height: 300
    }


});