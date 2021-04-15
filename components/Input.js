import React from 'react';
import PropTypes from 'prop-types';
import { Pressable, Text, View, StyleSheet} from 'react-native';
import { TextInput } from 'react-native-paper';

/*
Input is a generic button for major actions such as creating a space, list, or item
Takes in:
    name: {string} text for button
    onClick: {func} button pressed function
    //TODO: add the rest of the props
*/
const styles = StyleSheet.create({
    input: {
      backgroundColor: '#FFFFFF',
      minWidth: '100%',
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      borderBottomRightRadius: 16,
      borderBottomLeftRadius: 16,
      height: 60,
      color: '#000000',
    },
    inputStyle: {
        color: "#184254"
    },
    container: {
        height: 50,
        margin: 12
    }
 })

const Input = (({labelValue, placeholderText, iconType, ...rest}) => {
    return (
    <View style={styles.container}>
        <TextInput
            style={styles.input}
            inputStyle={styles.inputStyle}
            numberOfLines={1}
            value={labelValue}
            placeholder={placeholderText}
            onChangeText={text => setText(text)}
            selectionColor={'#D9BD4B'}
            underlineColor={'rgba(0, 0, 0, 0)'}
            theme={{colors: {primary: '#184254'}}}
            {...rest}
        />
    </View>
    );
  })
  
  export default Input;
