import React from 'react';
import PropTypes from 'prop-types';
import { Pressable, Text, View, StyleSheet, Image } from 'react-native';
import logo from "../assets/logo.png"
import { Icon } from 'react-native-elements';
const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    minWidth: '80%',
    margin: 6,
  },
  circle: {
    flex: 1,
    maxWidth: 35,
    height: 35,
    justifyContent: 'center',
    borderRadius: 35,
    backgroundColor: '#D9BD4B',
  },
  text: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: 'black', 
    fontSize: 20,
  },
})

const RecentMessageShow = (props) => {
  return (
    <View style={[styles.item ]}>
      <Text style={{
        flex: 1,
        color: 'black',
        textAlign: 'left',
        fontSize: 20,
      }}>
        Max: 
        <Text style={{
          padding: 10,
          color: '#696969'
        }}>
          {" "}yeah, sure!
        </Text>
      </Text>
      <View style={[styles.circle]}>
        <Text style={[styles.text]}>
          2
        </Text>
      </View>
    </View>
  );
}

export default RecentMessageShow;