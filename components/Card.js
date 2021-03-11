import React from 'react';
import PropTypes from 'prop-types';
import { Pressable, Text, View, StyleSheet, Image } from 'react-native';
import { Icon } from 'react-native-elements';

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
        height: 50,
        width: 50,
        alignSelf: 'center',
        paddingTop: 12,
    },
    icon: {
      padding: 2,
      borderRadius: 6
    }
 })

  const Card = (props) => {
    return (
      <Pressable
        onPress={ props.onClick } 
        style={({ pressed }) => [{opacity: pressed ? 0.6 : 1}]}
        >
        <View style={[styles.card ]}>
          <View style={[{backgroundColor: props.backgroundColor}, (props.icon === null) ? null : styles.icon]}>
            {(props.icon === null) ? <Image source={props.source} style={[styles.image]}/> :
             <Icon name={props.icon} size={45} color="#FFFFFF" /> }
          </View>
          <Text style={styles.text}>{props.name}</Text>
        </View>
      </Pressable>
    );
  }


  Card.propTypes = {
    name: PropTypes.string,
    source: PropTypes.any,
    backgroundColor: PropTypes.string,
    icon: PropTypes.string,

    onClick: PropTypes.func,
  };

  Card.defaultProps = {
    name: "Shared",
    source: require('../assets/logo.png'),
    color: 'rgba(0, 0, 0, 0)', //transparent by default
    icon: null,

    onClick: () => {}
  }
  
  export default Card;
