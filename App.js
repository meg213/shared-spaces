import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Item from "./components/Item";
import User from "./components/User";
import Card from "./components/Card";
import Button from "./components/Button";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Components:</Text>
      <Item/>
      <User/>
      <Card/>
      <Button/>
      <StatusBar style="auto" />
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
