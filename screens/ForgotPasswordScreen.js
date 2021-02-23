import React, {useContext, useState} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import { AuthContext } from '../navigation/AuthProvider';

const ForgotPasswordScreen  = ({navigation}) => {
    const[email, setEmail] = useState()
    const{resetPassword} = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Reset Password
            </Text>
            <FormInput
                labelValue={email}
                onChangeText={(userEmail) => setEmail(userEmail)}
                placeholderText="Email"
                iconType="user"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
            />
            <FormButton
                buttonTitle = "Send a reset link"
                onPress={() => resetPassword(email)}
            />
        </View>
    )
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#f9fafd',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    text: {
      // fontFamily: 'Kufam-SemiBoldItalic',
      fontSize: 28,
      marginBottom: 10,
      color: '#051d5f',
    },
  });