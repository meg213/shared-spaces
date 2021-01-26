import React from 'react';
import PropTypes from 'prop-types';
import { Pressable, Text, View, StyleSheet, Image } from 'react-native';

/*
User is the bubble icon for the users intials (or image)
Takes in:
    initials: {string} the users intials
    backgroundColor: {string} bubble background
    textColor: {string} text color
    onClick: {func} function for what happens when clicked
*/

const styles = StyleSheet.create({
    user: {
      borderRadius: 50,
      height: 55,
      padding: 10,
      backgroundColor: '#56CCF2',
      alignItems: 'center',
      justifyContent: 'center'
    },
    text: {
      fontSize: 22,
      color: '#184254',
    },
 })

  const User = (props) => {
    return (
      <View style={[styles.user] }>
        <Pressable onPress={ props.onClick() } >
          <Text style={styles.text}>{props.initials}</Text>
        </Pressable>
      </View>
    );
  }

  User.propTypes = {
    initials: PropTypes.string,
    backgroundColor: PropTypes.string,
    textColor: PropTypes.string,

    onClick: PropTypes.func,
  };

  User.defaultProps = {
    initials: "MG",
    backgroundColor: '#56CCF2',
    textColor: '#184254',

    onClick: () => {}
  }
  
  export default User;
