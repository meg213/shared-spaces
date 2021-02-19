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

  const Button = (props) => {

    const [text, setText] = React.useState('');

    //keyboard type?
    return (
    <View style={styles.container}>
        <TextInput
            style={styles.input}
            inputStyle={styles.inputStyle}
            label={props.label}
            value={text}
            onChangeText={text => setText(text)}
            selectionColor={'#D9BD4B'}
            underlineColor={'rgba(0, 0, 0, 0)'}
            secureTextEntry={props.password}
            dataDetectorTypes={props.dataDetectorTypes}
            theme={{colors: {primary: '#184254'}}}
        />
    </View>
    );
  }

  Button.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onClick: PropTypes.func,
    password: PropTypes.bool,
    dataDetectorTypes: PropTypes.string
  };

  Button.defaultProps = {
    label: "Name",  
    value: "Morgan",
    password: false,
    dataDetectorTypes: 'all',
    onClick: () => {}
  }
  
  export default Button;
