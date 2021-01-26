import React from 'react';
import PropTypes from 'prop-types';
import { Pressable, Text, View, StyleSheet, Image } from 'react-native';

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
      fontSize: 22,  
      color: "#4E7580",
      paddingTop: 6
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
            <Image source={require("../assets/logo.png")} style={[styles.image]}/>
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
    source: null,

    onClick: () => {}
  }
  
  export default Card;
