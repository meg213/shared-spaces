import React from 'react';
import PropTypes from 'prop-types';
import {Avatar} from 'react-native-elements';
import { View, Text } from 'react-native';

const User = (props) => {
    return (
      <View>
        <Avatar
          size={props.size}
          rounded
          title={props.title}
          source={{
            uri: props.source
          }}
          onPress={props.onClick}
          containerStyle={{backgroundColor: '#56CCF2'}}
        />
      </View>
    );
}

  User.propTypes = {
    backgroundColor: PropTypes.string,
    textColor: PropTypes.string,
    title: PropTypes.string,
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
  
  export default User;
