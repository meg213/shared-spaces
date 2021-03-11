import React, {useContext, useState} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import { resetPassword } from '../utils/firebaseMethod';

const ForgotPasswordScreen  = ({navigation}) => {
    const[email, setEmail] = useState();

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Reset Password
            </Text>
            <Text style={styles.subtext}>Enter the email associated with your account and we'll send instructions to reset your password</Text>
            <FormInput
                labelValue={email}
                onChangeText={(userEmail) => setEmail(userEmail)}
                placeholderText="Email"
                iconType="user"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
            />
            <Button
                name = "Send Reset Link"
                onPress={() => resetPassword(email)}
            />
        </View>
    )
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#F2F0EB',
      flex: 1,
      justifyContent: 'flex-start',
      padding: 20,
    },
    text: {
      fontSize: 30,
      color: '#184254',
      fontWeight: '500',
      textAlign:'left',
      marginTop: 24
    },
    subtext: {
        fontSize: 18,
        paddingTop: 12,
        paddingBottom: 60,
        color: '#4E7580'
    }
  });