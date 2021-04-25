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
        minWidth: '90%',
        marginHorizontal: 12,
        marginVertical: 6,
        backgroundColor: '#FFFFFF',
        minHeight: 70,
    },    
    pressable: {
        flexDirection: 'row',
    },
    icon: {
        width: 50,
        height: 50,
        //color: "#000000",
        marginLeft: 12,
        marginRight: 18
    },
    listHeaderSection: {
        flexDirection: 'column'    
    },
    listName: {
        fontSize: 22,
        color: "#184254"
    },
    numItems: {
        fontSize: 18,
        color:'#4E7580'
    }
})

const List = (props) => {
    return (
        <View style={styles.list}>
            <Pressable
                onPress={props.onPress}
                style={[styles.pressable, ({ pressed }) => [{opacity: pressed ? 0.6 : 1}]]}>
                <Image source={props.icon} style={styles.icon}/>
                <View style={styles.listHeaderSection}>
                    <Text style={styles.listName}>{props.listName}</Text>
                    <Text style={styles.numItems}>{props.numItems} items</Text>
                </View>
            </Pressable>
        </View>
    );
}

List.propTypes = {
    listName: PropTypes.string,
    numItems: PropTypes.number,
    icon: PropTypes.any,
    onPres: PropTypes.func,
};

List.defaultProps = {
    listName: 'Test List',
    numItems: 0,
    icon: require('../assets/kitchen.png'),

    onPress: () => {}
};


export default List;