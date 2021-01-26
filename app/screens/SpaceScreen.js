import React from 'react';
import { Text, SafeAreaView, Image, TouchableOpacity, StyleSheet, Platform, View, StatusBar, Button } from 'react-native';

// TODO: Create custom component for title texts
function SpaceScreen(props) {
    return (
       <SafeAreaView style={styles.container}>
           <View style={styles.titleContainer}>
                <TouchableOpacity style={styles.FacebookStyle} activeOpacity={0.5}>
                    <Image
                      source={require('../assets/icon.png')}
                      style={styles.backButtonImage}
                    />
                </TouchableOpacity>
            <Text style={styles.titleText}>Shared Space</Text>
           </View>
       </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D9DED8',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        alignItems: 'center',
    },
    titleContainer: {
        flexDirection: 'row'
    },
    backButtonImage: {
        width: 30,
        height: 30
    },
    titleText: {
        color: '#184254',
        color: '#184254',
        // TODO: Install custom font
        // fontFamily: 'Rubik',
        fontWeight: '500',
        fontSize: 30
    }
})

export default SpaceScreen;