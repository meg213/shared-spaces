import React, {useContext, useState} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import { signUp } from '../utils/firebaseMethod';

const SignupScreen = ({navigation}) => {
  const [lname, setLName] = useState();
  const [fname, setFName] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Let's get started</Text>
      <Text style={styles.subtext}>Tell us a bit about yourself</Text>


      <FormInput
        labelValue={firstname}
        onChangeText={(firstName) => setFirstName(firstName)}
        placeholderText="First Name"
        iconType="user"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FormInput
        labelValue={fname}
        onChangeText={(userFirstName) => setFName(userFirstName)}
        placeholderText="first name"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FormInput
        labelValue={lname}
        onChangeText={(userLastName) => setLName(userLastName)}
        placeholderText="last name"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FormInput
        labelValue={email}
        onChangeText={(userEmail) => setEmail(userEmail)}
        placeholderText="Email"
        iconType="user"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FormInput
        labelValue={phone}
        onChangeText={(phoneNumber) => setPhone(phoneNumber)}
        placeholderText="phone"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FormInput
        labelValue={password}
        onChangeText={(userPassword) => setPassword(userPassword)}
        placeholderText="Password"
        iconType="lock"
        secureTextEntry={true}
      />
      
      <FormInput
        labelValue={confirmPassword}
        onChangeText={(confirmPassword) => { 
          // do the passwords match? In future replace console log with modal
          setConfirmPassword(confirmPassword);
          console.log(confirmPassword);
          console.log(password)
          password === confirmPassword ? setPassword(confirmPassword) : console.log('mismatch password')}}
        placeholderText="Confirm Password"
        iconType="lock"
        secureTextEntry={true}
      />

      <FormButton
        buttonTitle="Sign Up"
        onPress={() => signUp(lname, fname, email, phone, password, confirmPassword)}
      />

      <View style={styles.textPrivate}>
        <Text style={styles.color_textPrivate}>By registering, you confirm that you accept our </Text>
        <TouchableOpacity onPress={() => alert('Terms Clicked!')}>
          <Text style={[styles.color_textPrivate, {color: '#e88832'}]}>Terms of service</Text>
        </TouchableOpacity>
        <Text style={styles.color_textPrivate}> and </Text>
        <Text style={[styles.color_textPrivate, {color: '#e88832'}]}>Privacy Policy</Text>
      </View>

      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.navButtonText}>
          Already have an account?
          <Text style={[styles.navButtonText, {fontWeight: '600'}]}> Sign In</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F2F0EB',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    // fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 36,
    textAlign: 'left',
    alignSelf: 'stretch',
    marginBottom: 12,
    color: '#184254',
    fontWeight: '500'
  },
  subtext: {
    fontSize: 20,
    marginBottom: 24,
    textAlign: 'left',
    alignSelf: 'stretch',
    color: '#184254',
    fontWeight: '300'
  },
  navButton: {
    marginTop: 24,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '300',
    color: '#184254',
    // fontFamily: 'Lato-Regular',
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 35,
    justifyContent: 'center',
  },
  color_textPrivate: {
    fontSize: 13,
    fontWeight: '400',
    // fontFamily: 'Lato-Regular',
    color: 'grey',
  },
});