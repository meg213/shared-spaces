import React, {useContext, useState} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import { Icon } from 'react-native-elements';
import { signUp } from '../utils/firebaseMethod';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as ImagePicker from 'expo-image-picker';
import { ScrollView } from 'react-native-gesture-handler';

const SignupScreen = ({navigation}) => {
  const [lname, setLName] = useState();
  const [fname, setFName] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [image, setImage] = useState(null);

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
      setImage(pickerResult.uri);
    }
  }

  return (     
<ScrollView>
    <KeyboardAwareScrollView 
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.container}
      scrollEnabled={false}
      enableOnAndroid
      extraHeight={180}   // TODO: Is there a better way than just adding random pixels??
    >

      <Text style={styles.text}>Let's get started</Text>
      <Text style={styles.subtext}>Tell us a bit about yourself</Text>

      <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 4 }}>
                {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                <View style={{ paddingVertical:0}} />
                <Button name="Upload Your Profile Picture" color="#184254" onClick={openImagePickerAsync} />
      </View>

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

        <Button
          name="Sign Up"
          onClick={() => signUp(lname, fname, email, phone, password, confirmPassword, image)}
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

    </KeyboardAwareScrollView>
    </ScrollView>
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
  keyboard_safe_view: {
    backgroundColor: '#F2F0EB',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
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
    marginBottom: 12,
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
    marginVertical: 25,
    justifyContent: 'center',
  },
  color_textPrivate: {
    fontSize: 13,
    fontWeight: '400',
    // fontFamily: 'Lato-Regular',
    color: 'grey',
  },
});