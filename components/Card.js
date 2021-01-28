import React from 'react';
import PropTypes from 'prop-types';
import { Pressable, Text, View, StyleSheet, Image } from 'react-native';

/*
Card is one of the clickable squares to select a category of item
Takes in:
    name: {string}  the name of the card
    source: require(string) the source for the image (MUST HAVE REQURE())
    onClick: {func} the function for onClick
*/

const styles = StyleSheet.create({
    card: {
      backgroundColor: '#FFFFFF',
      minHeight: 100,
      width: 100,
      margin: 6,
      borderRadius: 12,
      padding: 12,
      justifyContent: 'center',
      alignItems: 'center'
    },
    text: {
      fontSize: 18,  
      color: "#4E7580",
      paddingTop: 8
    },
    image: {
        height: 45,
        width: 45,
        alignSelf: 'center',
        paddingTop: 12,
    }
 })

  const Card = (props) => {
    return (
      <View style={[styles.card ]}>
        <Pressable onPress={ props.onClick() } >
            <Image source={props.source} style={[styles.image]}/>
            <Text style={styles.text}>{props.name}</Text>
        </Pressable>
      </View>
    );
  }


  Card.propTypes = {
    name: PropTypes.string,
    source: PropTypes.any,

    onClick: PropTypes.func,
  };

  Card.defaultProps = {
    name: "Shared",
    source: require('../assets/logo.png'),

    onClick: () => {}
  }
  
  export default Card;
