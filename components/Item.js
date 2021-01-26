import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet, Image } from 'react-native';
import logo from "../assets/logo.png"

const styles = StyleSheet.create({
    item: {
      backgroundColor: '#F2F0EB',
      borderRadius: "6px",
      padding: "8px"
    },
    subSectionGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: "6px"
    },
    subSection: {
        flexDirection: 'row',
        textAlignVertical: 'center'
    },
    image: {
       width: "24px",
       height: "24px",
    },
    sectionText: {
        color: '#4E7580',
        paddingLeft: "3px",
        paddingRight: "6px"
    },
    itemName: {
        fontSize: '18px',
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
      <View style={[styles.item, ]}>
        <Text style={styles.itemName}>{props.itemName}</Text>
        <View style={styles.subSectionGroup}>
            {props.list ? <SubSection text={props.list} /> : null}  
            {props.owner ? <SubSection text={props.owner}/> : null}  
            {props.shared ? <SubSection text="Shared" image={logo}/> : null}  
        </View>
      </View>
    );
  }


  Item.propTypes = {
    itemName: PropTypes.string,
    text: PropTypes.string,
    list: PropTypes.string,
    owner: PropTypes.string,
    shared: PropTypes.bool,
    image: PropTypes.image,
  };

  Item.defaultProps = {
    itemName: "Lamp",
    text: "Sample",
    list: "Living Room",
    owner: "Morgan",
    shared: true,
    image: logo,
  }
  
  export default Item;
