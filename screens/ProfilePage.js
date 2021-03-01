import React from 'react';
import { ScrollView, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Icon } from 'react-native-elements';
import Input from "../components/Input";
import Button from "../components/Button";
import User from "../components/User";

export default function ProfilePage({navigation}) {
    return (
      <SafeAreaView style={styles.container}>
        <View>
            <Text style={styles.profile}>My Profile</Text>
        </View>
            <User
                size="large"
            />
            <View style={styles.subcontainer}>
                <Text style={styles.subtext}>Basic Information</Text>
                <Input
                    label={'first Name'}
                />
                <Input
                    label={'last Name'}
                />
            </View>              
            <View style={styles.subcontainer}>
                <Text style={styles.subtext}>Account Info</Text>
                <Input
                    label={'email'}
                />
                <Input
                    label={'phone'}
                />
                <Input
                    label={'password'}
                    password
                />
            </View>  
            <View>
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
  