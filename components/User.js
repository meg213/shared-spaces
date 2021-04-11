import React from 'react';
import PropTypes from 'prop-types';
import { Pressable, Text, View, StyleSheet, Image } from 'react-native';
import {Avatar} from 'react-native-elements';

// /*
// User is the bubble icon for the users intials (or image)
// Takes in:
//     initials: {string} the users intials
//     backgroundColor: {string} bubble background
//     textColor: {string} text color
//     size: {string} 
//       'small': for on item cards
//       'medium': for shared space page
//       'large': for profile page
//     onClick: {func} function for what happens when clicked
// */

const styles = StyleSheet.create({
    user: {
      borderRadius: 50,
      padding: 10,
      backgroundColor: '#56CCF2',
      alignItems: 'center',
      justifyContent: 'center'
    },
    text: {

      color: '#184254',
    },
 })

 //{[{backgroundColor: props.color}, styles.button ]}>
  const User = (props) => {
    return (
      <View style={[{ height: props.size === 'medium' ? 55 : (props.size === 'large' ? 100 : 20 )}, 
                    { width:  props.size === 'medium' ? 55 : (props.size === 'large' ? 100 : 20 )}, 
                    styles.user] 
      }>
        {/* <Pressable onPress={ props.onClick() } >
          <Text style={[{fontSize: props.size === 'medium' ? 22: (props.size === 'large' ? 36 : 12 )}, 
                      styles.text]}>
                {props.initials}
          </Text>
        </Pressable> */}
        <Avatar
          size="big"
          rounded
          // title={props.title != null? props.title : null}
          source={{
            uri: props.source != null? props.source : null
          }}
          onPress={props.onClick()}
        />
      </View>
    );
  }

  // User.propTypes = {
  //   initials: PropTypes.string,
  //   backgroundColor: PropTypes.string,
  //   textColor: PropTypes.string,
  //   size: PropTypes.string,

  //   onClick: PropTypes.func,
  // };

  User.propTypes = {
    backgroundColor: PropTypes.string,
    textColor: PropTypes.string,
    // title: PropTypes.string,
    size: PropTypes.string,
    source: PropTypes.string,

    onClick: PropTypes.func,
  };

  User.defaultProps = {
    title: "MG",
    backgroundColor: '#56CCF2',
    textColor: '#184254',
    size: 'medium',
    source: null,

    onClick: () => {}
  }

  // User.defaultProps = {
  //   initials: "MG",
  //   backgroundColor: '#56CCF2',
  //   textColor: '#184254',
  //   size: 'medium',

  //   onClick: () => {}
  // }
  
  export default User;
