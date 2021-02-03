import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import firebase from 'firebase/app';
import firebaseConfig from './config/keys';
import Providers from './navigation'

let firebaseApp

export default class App extends React.Component {
  constructor(props) {
    super(props);
    if (firebase.apps.length == 0) {
      firebase.initializeApp(firebaseConfig.FirebaseConfig);
    }
    
  }
  render() {
    return <Providers />
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
