import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F2F0EB',
        borderBottomColor: '#F2F0EB',
        borderTopColor: '#F2F0EB',
    },
    inputContainer: {
        backgroundColor: '#D9DED8',
    }
 })

const Search = ({...rest}) => {
    return (
        <View>
            <SearchBar
                containerStyle={styles.container}
                inputContainerStyle={styles.inputContainer}
                placeholder="Search here..."
                {...rest}
               
            />
        </View>
    );
  }
  
  export default Search;
