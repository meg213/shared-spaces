import React from 'react';
import PropTypes from 'prop-types';
import { Pressable, Text, View, StyleSheet, Image } from 'react-native';
import logo from "../assets/logo.png"

/*
Item contains information about an item stored by the user
Takes in: 
  itemName: {string}     name of the item
  list:     {string}     the list the item belongs to
  owner:    {string}     who the item belongs to
  shared:   {bool}       is the item shared
  onClick:  {func}       onClick function

TODO
  user icon
  list icon
*/
const styles = StyleSheet.create({
    item: {
      borderRadius: 6,
      padding: 12,
      minWidth: '80%',
      marginHorizontal: 12,
      marginVertical: 6
    },
    subSectionGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 6
    },
    subSection: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
       width: 24,
       height: 24,
    },
    sectionText: {
        color: '#4E7580',
        paddingHorizontal: 6,
        fontSize: 16,
    },
    itemName: {
        fontSize: 22,
        color: "#184254"
    }
 })

  const onClickTest = () => {
    console.log('testing');
  }

  const SubSection = (props) => {
    return (
      <View style={[styles.subSection]}>
        <Image source={require("../assets/logo.png")} style={[styles.image]}/>
        <Text style={[styles.sectionText]}>{props.text}</Text>
      </View>
    );
  }

  const Item = (props) => {
    return (
      <View style={[{backgroundColor: props.listPage ? '#FFFFFF' : '#F2F0EB'}, styles.item]}>
         <Pressable 
          onPress={ props.onClick }
          style={({ pressed }) => [{opacity: pressed ? 0.6 : 1}]} >
          <Text style={styles.itemName}>{props.itemName}</Text>
          <View style={styles.subSectionGroup}>
              {props.list ? <SubSection text={props.list} /> : null}  
              {props.owner ? <SubSection text={props.owner}/> : null}  
              {props.shared ? <SubSection text="Shared" image={logo}/> : null}  
          </View>
        </Pressable>
      </View>
    );
  }


  Item.propTypes = {
    itemName: PropTypes.string,
    text: PropTypes.string, //private do not use
    list: PropTypes.string,
    owner: PropTypes.string,
    shared: PropTypes.bool,
    listPage: PropTypes.bool, //is it on a list page?
    
    onClick: PropTypes.func,
  };

  Item.defaultProps = {
    itemName: "Lamp",
    text: "Sample", //private
    list: "Living Room",
    owner: "Morgan",
    shared: true,
    listPage: false,
    
    onClick: () => {}
  }
  
  export default Item;
