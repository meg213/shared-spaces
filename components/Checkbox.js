import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import { CheckBox } from 'react-native-elements';


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        borderColor: '#fff'
    },
    textStyle: {
        color: '#184254',
        fontSize: 18,
        fontWeight: 'normal'
    }
 })

  const Checkbox = (props) => {
    return (
        <CheckBox
            title={props.title}
            containerStyle={styles.container}
            textStyle={styles.textStyle}
            uncheckedColor="#4E7580"
            checkedColor="#4E7580"
            checkedIcon='square'
            {...props}
        />
    );
  }


  Checkbox.propTypes = {
    title: PropTypes.string,
    onClick: PropTypes.func,
  };

  Checkbox.defaultProps = {
    title: "Item",

    onClick: () => {}
  }
  
  export default Checkbox;
