import React, { useState, Component } from 'react';
import { Alert } from 'react-native';
import { ScrollView, StyleSheet, Text, View, SafeAreaView , Pressable, Image} from 'react-native';
import Button from '../components/Button';
import FormInput from '../components/FormInput';
import { CheckBox, BottomSheet , Icon} from 'react-native-elements'

const CreateList= ({navigation}) => {
    const [name, setName] = useState("");
    const [icon, setIcon] = useState(require('../assets/kitchen.png'))
    const [isVisible, setIsVisible] = useState(false);
    const list = [
        { title: 'List Item 1' },
        { title: 'List Item 2' },
        {
          title: 'Cancel',
          containerStyle: { backgroundColor: 'red' },
          titleStyle: { color: 'white' },
          onPress: () => setIsVisible(false),
        },
      ];

    return(
        <SafeAreaView style = {[styles.container]}>
            <View>
                <Text style = {[styles.text]}>
                    Create a List
                </Text>
            </View>
            <ScrollView style={{  width: "100%" }}>
                <View style={{  paddingVertical: 12 }}>
                    <FormInput
                        labelValue={name}
                        onChangeText={(spaceName) => setName(spaceName)}
                        placeholderText="List Name"
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </View>
                <Pressable style={({ pressed }) => [{opacity: pressed ? 0.6 : 1}]}
                    onPress={()=> {setIsVisible(!isVisible)}}
                >
                    <View style={[styles.itemList, {flexDirection:'row', justifyContent:'space-between', alignItems:'center'}]}>
                        <Text style={styles.itemTitle}>Select Icon</Text> 
                        <Image source={icon} style={styles.icon}/>
                    </View>
                </Pressable>
                <View style={styles.itemList}>
                    <Text style={styles.itemTitle}>Add Items</Text>
                    {/* number of checkboxes per number of items */}
                    <CheckBox />
                </View>
            </ScrollView>
            <View style={{  alignSelf: 'center' }}>
                <Button
                    name="Create List"
                    width="75%"
                    onPress={() => {Alert.alert('Space Created')}}
                />
            </View>
            <BottomSheet
                 isVisible={isVisible}
                 style={styles.modalContainer}
            >
                <View style={styles.modal}>
                    <View style={styles.modalHeader}>
                        <Text style={[styles.itemTitle, {padding: 18}]}>Select Icon</Text>
                        <Icon
                            name="close"
                            size={35}
                            onPress={()=> {setIsVisible(false)}}
                            style={{padding: 12}}
                        />
                    </View>
                    <View style={styles.modalIcons}>
                        <Image source={require('../assets/kitchen.png')} style={styles.icons}/>
                        <Image source={require('../assets/chair.png')} style={styles.icons}/>
                        <Image source={require('../assets/coffee-shop.png')} style={styles.icons}/>
                        <Image source={require('../assets/relax.png')} style={styles.icons}/>
                        <Image source={require('../assets/toilet.png')} style={styles.icons}/>
                        <Image source={require('../assets/wardrobe.png')} style={styles.icons}/>
                        <Image source={require('../assets/warehouse.png')} style={styles.icons}/>
                        <Image source={require('../assets/warehouse.png')} style={styles.icons}/>
                        <Image source={require('../assets/warehouse.png')} style={styles.icons}/>
                        <Image source={require('../assets/warehouse.png')} style={styles.icons}/>
                        <Image source={require('../assets/warehouse.png')} style={styles.icons}/>
                        <Image source={require('../assets/warehouse.png')} style={styles.icons}/>
                        
                    </View>
                </View>
            </BottomSheet>
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
        borderRadius: 12,
        padding: 12,
        width: '100%',
        marginVertical: 6,
    },
    icon: {
        width: 50,
        height: 50,
        color: "#000000",
        marginLeft: 12,
        marginRight: 18
    },
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)' ,
        height: '100%'
    },
    modal: {
        backgroundColor: '#fff',
        height: 400,
        width: 350,
        borderRadius: 12,
    },
    modalHeader: {
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'stretch',
    },
    modalIcons: {
        paddingHorizontal: 12,
        flexDirection:'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
    },
    icons: {
        margin: 12,
        width: 60,
        height: 60,
        color: "#000000",
        
    }

})