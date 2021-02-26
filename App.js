import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Providers from './navigation';
import CreateSpaceScreen from './screens/createSpaceScreen';

let firebaseApp

export default class App extends React.Component {
  render() {
    return <Providers />
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D9DED8',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
