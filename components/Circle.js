import React from 'react';
import PropTypes from 'prop-types';
import { Pressable, Text, View, StyleSheet, Image } from 'react-native';

const styles = StyleSheet.create({
    circle: {
        flex: 1,
        maxWidth: 30,
        height: 30,
        justifyContent: 'center',
        borderRadius: 35,
        backgroundColor: '#D9BD4B',
    },
    text: {
        fontWeight: "400",
        color: "#184254",
        alignSelf: 'center',
        fontSize: 18,
    }
});



const Circle = (props) => {
    return(
        <View style = {[styles.circle]}>
            <Text style = {[styles.text]}> 
                {props.num}
            </Text>
        </View>
    )
}

Circle.propTypes = {
    num: PropTypes.string
};

export default Circle;