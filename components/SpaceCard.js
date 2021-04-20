import React from 'react';
import PropTypes from 'prop-types';
import Circle from './Circle';
import { Pressable, Text, View, StyleSheet, Image } from 'react-native';
import { ArrowRight } from 'react-native-feather';


const styles = StyleSheet.create({
    card: {
        backgroundColor: "white",
        minHeight: 120,
        minWidth: "75%",
        margin: 10,
        borderRadius: 4,
        padding: 12,
    },
    text:{
        fontSize: 24,  
        color: "#184254",
        paddingTop: 2,
        flex: 1,
        textAlign: "left",
    },
    row:{
        flexDirection: "row",
    },
    arrow:{
        alignSelf: "flex-end",  //OPTION TO-DO: change the size of the arrow
    }


})

const SpaceCard = (props) => {              //TO-DO: make props
    return(
        <Pressable
             style={({ pressed }) => [{opacity: pressed ? 0.6 : 1}]} 
             onPress={ props.onClick }
        >
            <View style = {[styles.card]}>
                <View style = {[styles.row]}>
                    <Text style = {[styles.text]}>
                        {props.name}
                    </Text>
                </View>
                <View style = {{paddingTop: 5}}>
                    <Text style={{fontSize: 18}}> 
                        {props.number} Member{props.number === 1 ? '' : 's'}
                    </Text>
                </View>
                <View style = {{paddingTop: 12}}>
                    <ArrowRight stroke = "black" style = {[styles.arrow]}/>
                </View>
            </View>
        </Pressable>
    );
}


SpaceCard.propTypes = {
    members: PropTypes.number,

    onClick: PropTypes.func,
  };

SpaceCard.defaultProps = {
    number: 1,

    onClick: () => {}
  }
  

export default SpaceCard;