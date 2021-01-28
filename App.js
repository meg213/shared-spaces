import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Item from "./components/Item";
import User from "./components/User";
import Card from "./components/Card";
import Button from "./components/Button";
import SpacePage from './SpacePage';

export default function App() {
  return (
    <View style={styles.container}>
      <SpacePage/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D9DED8',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
