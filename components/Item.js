import React from 'react';
import PropTypes from 'prop-types';
import { Pressable, Text, View, StyleSheet, Image } from 'react-native';
import logo from "../assets/logo.png"

const styles = StyleSheet.create({
    item: {
      backgroundColor: '#F2F0EB',
      borderRadius: 6,
      padding: 12,
      minWidth: '80%',
      margin: 6,
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
      <View style={[styles.item ]}>
        <Pressable>
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
    text: PropTypes.string,
    list: PropTypes.string,
    owner: PropTypes.string,
    shared: PropTypes.bool,
    // image: PropTypes.func,
  };

  Item.defaultProps = {
    itemName: "Lamp",
    text: "Sample",
    list: "Living Room",
    owner: "Morgan",
    shared: true,
    // image: logo,
  }
  
  export default Item;
