import React from 'react';
import PropTypes from 'prop-types';
import { View, Pressable, Image, Text, StyleSheet } from 'react-native';

/*
List stores a collection of items sorted by the user
Takes in:
    listName: PropTypes.string,     Name of the list
    numItems: PropTypes.number,     Number of items in list
    icon: PropTypes.object,         Icon for the list

TODO: How do I set an icon from a list?
TODO: Get a view setup
*/

const styles = StyleSheet.create({
    list: {
        borderRadius: 6,
        padding: 12,
        minWidth: '80%',
        marginHorizontal: 12,
        marginVertical: 6
    },    
    icon: {
        width: 24,
        height: 24,
    },
    listHeaderSection: {
        flexDirection: 'column'    
    }
})

const List = (props) => {
    return (
        <View style={styles.list}>
            <Pressable
                onPress={console.log('Pressed List Component')}
                style={({ pressed }) => [{opacity: pressed ? 0.6 : 1}]}>
                <Image source={require("../assets/icon.png")} styles={styles.icon}/>
                <View style={styles.listHeaderSection}>
                    <Text>{props.listName}</Text>
                    <Text>{props.numItems}</Text>
                </View>
            </Pressable>
        </View>
    );
}

List.propTypes = {
    listName: PropTypes.string,
    numItems: PropTypes.number,
    //icon: PropTypes.object,
};

List.defaultProps = {
    listName: 'Test List',
    numItems: 0,
};


export default List;