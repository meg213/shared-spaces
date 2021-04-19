import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, SafeAreaView} from 'react-native';
import Input from "../components/Input";
import Button from "../components/Button";
import User from "../components/User";
import { db } from '../config/keys';
import { logout, updateProfileInformation, getImageDownloadURL } from '../utils/firebaseMethod';
import * as ImagePicker from 'expo-image-picker'

export default function ProfilePage({route, navigation}) {
    const currUser = route.params.currUser;
    console.log(currUser)
    const userID = route.params.currUser.uid;
    const [firstname, setFirstName] = useState()
    const [lastname, setLastName] = useState()
    const [email, setEmail] = useState()
    const [phone, setPhone] = useState()
    const [currPassword, setCurrPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [initials, setInitials] = useState()
    const [imgURL, setImgURL] = useState()
    const [imageURI, setImageURI] = useState(null);
    useEffect(() => {
        (async () => {
          let userData = ((await db.collection("users").doc(userID).get()).data())
          console.log(userData)
          setFirstName(userData.firstname)
          setLastName(userData.lastname)
          setEmail(userData.email)
          setPhone(userData.phone)
          setInitials(userData.firstname[0] + userData.lastname[0]);
          setImgURL(await getImageDownloadURL(userID))
        })();
        return;
    }, []);
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
          setImageURI(pickerResult.uri);
        }
    }

    return (
      <SafeAreaView style={styles.container}>
        <View>
            <Text style={styles.profile}>My Profile</Text>
        </View>
            <User
                size="large"
                title={initials}
                source={imageURI != null? imageURI : imgURL}
                onClick={openImagePickerAsync}
            />
          <ScrollView>
            <View style={styles.subcontainer}>
                <Text style={styles.subtext}>Basic Information</Text>
                <Input
                    labelValue={firstname}
                    onChangeText={text => setFirstName(text)}
                />
                <Input
                    labelValue={lastname}
                    onChangeText={text => setLastName(text)}
                />
            </View>              
            <View style={styles.subcontainer}>
                <Text style={styles.subtext}>Account Info</Text>
                <Input
                    labelValue={email}
                    onChangeText={text => setEmail(text)}
                />
                <Input
                    labelValue={phone}
                    onChangeText={text => setPhone(text)}
                />
                 <Input
                    label={'current password'}
                    onChangeText={text => setCurrPassword(text)}
                    secureTextEntry={true}
                />
                <Input
                    label={'new password'}
                    onChangeText={text => setNewPassword(text)}
                    secureTextEntry={true}
                />
            </View>  
            <View>
                <View style={{marginBottom: 12}}>
                    <Button
                        name="Update"
                        color="#EB5757"
                        onClick={() => {updateProfileInformation(currUser, lastname, firstname, email, phone, imageURI, newPassword, currPassword); setCurrPassword(''); setNewPassword('')}}
                    />    
                </View>
                <View style={{marginBottom: 12}}>
                    <Button
                        name="Logout"
                        color="#F2994A"
                        onClick={() => logout()}
                    />
                </View>
                <Button
                    name="Delete Account"
                    color="#EB5757"
                />    
            </View> 
            </ScrollView>
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F2F0EB',
      alignItems: 'center',
      justifyContent: 'center',
    },
    subcontainer: {
        marginVertical: 12
    },
    profile: {
        fontSize: 30,
        color: '#184254',
        fontWeight: '500',
        paddingBottom: 12,
    },
    subtext: {
        fontSize: 18,
        color: '#4E7580',
        marginHorizontal: 12,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }
  });
  