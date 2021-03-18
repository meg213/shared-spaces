import React, { useState, Component } from 'react';
import { Alert } from 'react-native';
import { ScrollView, StyleSheet, Text, View, SafeAreaView , Pressable, Image} from 'react-native';
import Button from '../components/Button';
import FormInput from '../components/FormInput';
import CheckBox from '../components/Checkbox';
import { BottomSheet , Icon} from 'react-native-elements'
import { getItems } from '../utils/firebaseMethod';


const CreateList= ({navigation}) => {
    const [name, setName] = useState("");
    const [icon, setIcon] = useState(require('../assets/kitchen.png'))
    const [isVisible, setIsVisible] = useState(false);


    const ImageItem = (props) => {
        return (
            <Pressable onPress={()=> {
                setIsVisible(false)
                setIcon(props.src)
            }}>
                <Image source={props.src} style={styles.icons}/>
            </Pressable>
        )
    }

    return(
        <SafeAreaView style = {[styles.container]}>
            <View  style = {{ flexDirection: 'row', justifyContent: 'center'}}>
                <Icon name='arrow-left' size={40}   onPress={() => {
                navigation.navigate('ListsList');
            }}/>
                <Text style = {[styles.text]}> Create a List </Text>
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
                    <CheckBox 
                        title='test'
                        checked
                        onPress={()=> {console.log('hi')}}
                    />
                    <CheckBox />
                    <CheckBox />
                    <CheckBox />
                    <CheckBox />
                    <CheckBox />
                    <CheckBox />
                    <CheckBox />
                    <CheckBox />
                </View>
            </ScrollView>
            <View style={{  alignSelf: 'center', position: 'absolute', bottom: 0, marginBottom: 18 }}>
                <Button
                    name="Create List"
                    width="75%"
                    onClick={() => {console.log(getItems())}}
                />
            </View>
            <BottomSheet
                 isVisible={isVisible}
                 style={styles.modalContainer}
            >
                <View style={styles.modal}>
                    <View style={styles.modalHeader}>
                        <Text style={[styles.modalText]}>Select Icon</Text>
                        <Icon
                            name="close"
                            size={35}
                            onPress={()=> {setIsVisible(false)}}
                            style={{padding: 12}}
                        />
                    </View>
                    <View style={styles.modalIcons}>
                        <ImageItem src={require('../assets/kitchen.png')} />
                        <ImageItem src={require('../assets/chair.png')} />
                        <ImageItem src={require('../assets/coffee-shop.png')} />
                        <ImageItem src={require('../assets/relax.png')} />
                        <ImageItem src={require('../assets/toilet.png')} />
                        <ImageItem src={require('../assets/wardrobe.png')} />
                        <ImageItem src={require('../assets/chair.png')} />
                        <ImageItem src={require('../assets/warehouse.png')} />
                        <ImageItem src={require('../assets/house.png')} />
                        <ImageItem src={require('../assets/cleaning.png')} />    
                        <ImageItem src={require('../assets/box.png')} />
                        <ImageItem src={require('../assets/desk.png')} />           
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
        marginLeft: 12,
        marginRight: 18
    },
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)' ,
    },
    modal: {
        backgroundColor: '#fff',
        height: 400,
        width: 350,
        borderRadius: 12,
        marginVertical: 150, //might need to be changed, had trouble getting vertically centered
    },
    modalHeader: {
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'stretch',
    },
    modalText: {
        fontSize: 24,
        color: '#4E7580',
        paddingHorizontal: 20,
        paddingTop: 16
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
    }

})