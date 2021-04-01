import React from 'react';
import PropTypes from 'prop-types';
import { Pressable, Text, View, StyleSheet, Image } from 'react-native';
import { Icon } from 'react-native-elements';

/*
Button is a generic button for major actions such as creating a space, list, or item
Takes in:
    name: {string} text for button
    onClick: {func} button pressed function
*/
const styles = StyleSheet.create({
    button: {
      // minWidth: '95%',
      borderRadius: 20,
      padding: 12,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      flexDirection: 'row'
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
        <View style={[{backgroundColor: props.color}, {minWidth: props.width}, styles.button ]}>
          {props.icon != null ?
                <Icon 
                  style={{
                      marginHorizontal: 4
                    }}
                  size={30} 
                  color={props.iconColor}
                  name={props.icon}
                  onPress={() => {
                      navigation.navigate('ListsList')
                  }}
                  />
          : null }
          <Text style={[styles.text, {color: props.textColor}]}>{props.name}</Text>
        </View>
      </Pressable>
    );
  }

  Button.propTypes = {
    name: PropTypes.string,
    onClick: PropTypes.func,
    color: PropTypes.string,
    width: PropTypes.string,

    // for icons
    icon: PropTypes.string,
    textColor: PropTypes.string,
    iconColor: PropTypes.string,

  };

  Button.defaultProps = {
    name: "Button",
    color: "#D9BD4B",
    width: "95%",
    textColor: '#fff',
    icon: null,
    iconColor: '#000',

    onClick: () => {}
  }
  
  export default Button;
