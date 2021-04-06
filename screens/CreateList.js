import React, { useState, useRef, useEffect, Component } from 'react';
import { Alert } from 'react-native';
import { ScrollView, StyleSheet, Text, View, SafeAreaView , Pressable, Image} from 'react-native';
import Button from '../components/Button';
import FormInput from '../components/FormInput';
import CheckBox from '../components/Checkbox';
import { BottomSheet , Icon} from 'react-native-elements'
import { getItems } from '../utils/firebaseMethod';
import { createNewList, moveItemToList } from '../utils/firebaseMethod';
import { db } from '../config/keys';
import { TapGestureHandler } from 'react-native-gesture-handler';

const itemRef = db.collection('items');
const listRef = db.collection('lists');
const userRef = db.collection('users');
const spaceRef = db.collection('spaces');
const CreateList= ({route, navigation}) => {
    const [name, setName] = useState("");
    const [icon, setIcon] = useState(require('../assets/kitchen.png'))
    const [isVisible, setIsVisible] = useState(false);
    const [items, setItems] = useState([]);
    const [checkboxes, setCheckboxes] = useState([]);
    
    const componentIsMounted = useRef(true);
    const currentSpaceId = route.params.spaceID;

    useEffect(() => {
        return () => {
          componentIsMounted.current = false;
        };
      }, []);
    
      useEffect(() => {
        const subscriber = spaceRef.doc(currentSpaceId.substring(7)).onSnapshot(documentSnapshot => {getNoneListItems(documentSnapshot)});
        async function getNoneListItems(documentSnapshot) {
            // get the unordered items
            var unlisted_items = documentSnapshot.data().items; 
            let data = [];
            //get the item objects from each
            for (let i = 0; i < unlisted_items.length; i++) {
            let itemData = (await itemRef.doc(unlisted_items[i].substring(6)).get()).data();
            if (itemData !== undefined) {
                // get the owner
                let owner; 
                if (itemData.userID === undefined) {
                    owner = 'none'
                } else {
                    owner = (await userRef.doc(itemData.userID.substring(6)).get()).data();
                }
                data.push({
                    owner: owner.firstname,
                    category: itemData.category,
                    name: itemData.name,
                    spaceID: itemData.spaceID,
                    userID: itemData.userID, 
                    isShared: itemData.isShared,
                })
                // console.log('data', data);
            }
            }
            if (componentIsMounted.current) {
                setItems(data);

                // add the data to a checkboxes array
                let newdata = [];
                for (var i = 0; i < data.length; i++){
                    newdata.push({value: data[i].name, isChecked: false})
                }
                setCheckboxes(newdata);       
            }
        }
        return () => subscriber;
    }, []);

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

    const handleCheckboxes = (name) => {
        for (var i = 0; i < checkboxes.length; i++){
            if (checkboxes[i].value === name) {
                var newArray = checkboxes;
                newArray[i].isChecked = !checkboxes[i].isChecked;
                setCheckboxes(newArray)
                console.log(checkboxes[i].value, ' is ', checkboxes[i].isChecked )
            }
        }
    }

    const findIfChecked = (name) => {
        for (var i = 0; i < checkboxes.length; i++){
            if (checkboxes[i].value === name) {
              if (checkboxes[i].isChecked){
                  console.log('returned true')
                  return true
              }
              console.log('returned false')
              return false;
            }
        }
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
                        onChangeText={(name) => setName(name)}
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
                    <View>
                        { checkboxes.map((item) => {
                            return (
                                <CheckBox
                                    title={item.value}
                                    onPress={()=> {handleCheckboxes(item.value)}}
                                    checked={findIfChecked(item.value)}
                                />
                            )
                        })
                        }
                    </View>
                </View>
            </ScrollView>
            <View style={{  alignSelf: 'center', position: 'absolute', bottom: 0, marginBottom: 18 }}>
                <Button
                    name="Create List"
                    width="75%"
                    onClick={() => {
                        createNewList(currentSpaceId, name)
                        
                        // move over all items and add them to the newly created list
                        // for (var i = 0; i < checkboxes.length; i++){
                        //     if (checkboxes[i].isChecked){
                        //         moveItemToList(items[i], currentSpaceId, )
                        //     }
                        // }
                        navigation.navigate('ListsList');
                    }}
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