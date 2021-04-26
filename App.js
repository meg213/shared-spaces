import React from 'react';
import { LogBox } from 'react-native';
import Providers from './navigation';

LogBox.ignoreAllLogs(true)

export default class App extends React.Component {
  render() {
    return <Providers />
  }
}

