import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { SearchBar } from 'react-native-elements';


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

const Searchbar = (({labelValue, placeholderText, iconType, ...rest}) => {
    return (
    <View style={styles.container}>
        <SearchBar
            // style={styles.input}
            // inputStyle={styles.inputStyle}
            // numberOfLines={1}
            // value={labelValue}
            // placeholder={placeholderText}
            // onChangeText={text => setText(text)}
            // selectionColor={'#D9BD4B'}
            // underlineColor={'rgba(0, 0, 0, 0)'}
            // theme={{colors: {primary: '#184254'}}}
            {...rest}
        />
    </View>
    );
  })
  
  export default Searchbar;
