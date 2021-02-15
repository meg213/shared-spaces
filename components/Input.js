import React from 'react';
import PropTypes from 'prop-types';
import { Pressable, Text, View, StyleSheet,} from 'react-native';
import { TextInput } from 'react-native-paper';

/*
Input is a generic button for major actions such as creating a space, list, or item
Takes in:
    name: {string} text for button
    onClick: {func} button pressed function
*/
const styles = StyleSheet.create({
    input: {
      backgroundColor: '#FFFFFF',
      minWidth: '95%',
    //   borderRadius: 12,
    },
    inputStyle: {
        color: "#184254"
    },
    container: {
        height: 50,
        margin: 12
    }
 })

  const Button = (props) => {

    const [text, setText] = React.useState('');

    return (
    <View style={styles.container}>
        <TextInput
            style={styles.input}
            inputStyle={styles.inputStyle}
            label={props.label}
            value={text}
            onChangeText={text => setText(text)}
            selectionColor={"#184254"}
            underlineColor={"#FFFFFF"}
        />
    </View>
    );
  }

  Button.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onClick: PropTypes.func,
  };

  Button.defaultProps = {
    label: "Name",  
    value: "Morgan",
    onClick: () => {}
  }
  
  export default Button;
