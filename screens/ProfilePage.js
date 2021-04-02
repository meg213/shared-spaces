import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Icon } from 'react-native-elements';
import Input from "../components/Input";
import Button from "../components/Button";
import User from "../components/User";
import {db} from '../config/keys';
import { logout } from '../utils/firebaseMethod';

export default function ProfilePage({route, navigation}) {
    const userID = route.params.currUser.uid;
    const [firstname, setFirstName] = useState()
    const [lastname, setLastName] = useState()
    const [email, setEmail] = useState()
    const [phone, setPhone] = useState()
    const [initials, setInitials] = useState()
    useEffect(() => {
        (async () => {
          let userData = ((await db.collection("users").doc(userID).get()).data())
          console.log(userData)
          setFirstName(userData.firstname)
          setLastName(userData.lastname)
          setEmail(userData.email)
          setPhone(userData.phone)
          setInitials(userData.firstname[0] + userData.lastname[0]);
        })();
    }, []);
    return (
      <SafeAreaView style={styles.container}>
        <View>
            <Text style={styles.profile}>My Profile</Text>
        </View>
            <User
                initials={initials}
                size="large"
            />
            <View style={styles.subcontainer}>
                <Text style={styles.subtext}>Basic Information</Text>
                <Input
                    label={firstname}
                />
                <Input
                    label={lastname}
                />
            </View>              
            <View style={styles.subcontainer}>
                <Text style={styles.subtext}>Account Info</Text>
                <Input
                    label={email}
                />
                <Input
                    label={phone}
                />
                <Input
                    label={'password'}
                    password
                />
            </View>  
            <View>
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
    }
  });
  