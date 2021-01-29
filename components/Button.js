import React from 'react';
import PropTypes from 'prop-types';
import { Pressable, Text, View, StyleSheet, Image } from 'react-native';

/*
Button is a generic button for major actions such as creating a space, list, or item
Takes in:
    name: {string} text for button
    onClick: {func} button pressed function
*/
const styles = StyleSheet.create({
    button: {
      backgroundColor: '#D9BD4B',
      minWidth: '90%',
      borderRadius: 20,
      padding: 12,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      margin: 6,
    },
    text: {
      fontSize: 20,  
      color: "#FFFFFF",
      fontWeight: "400",
    },
 })

  const Button = (props) => {
    return (
      <View style={[styles.button ]}>
        <Pressable onPress={ props.onClick() } >
            <Text style={styles.text}>{props.name}</Text>
        </Pressable>
      </View>
    );
  }

  Button.propTypes = {
    name: PropTypes.string,
    onClick: PropTypes.func,
  };

  Button.defaultProps = {
    name: "Button",
    onClick: () => {}
  }
  
  export default Button;
