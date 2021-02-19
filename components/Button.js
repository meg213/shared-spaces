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
      minWidth: '98%',
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
      <Pressable 
        onPress={ props.onClick }
        style={({ pressed }) => [{opacity: pressed ? 0.6 : 1}]} >
        <View style={[{backgroundColor: props.color}, styles.button ]}>
          <Text style={styles.text}>{props.name}</Text>
        </View>
      </Pressable>
    );
  }

  Button.propTypes = {
    name: PropTypes.string,
    onClick: PropTypes.func,
    color: PropTypes.string,
  };

  Button.defaultProps = {
    name: "Button",
    color: "#D9BD4B",
    onClick: () => {}
  }
  
  export default Button;
