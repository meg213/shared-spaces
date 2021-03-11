import React from 'react';
import { ScrollView, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Icon } from 'react-native-elements';
import Button from '../components/Button';
import SpaceCard from '../components/SpaceCard';
import ProfilePage from '../screens/ProfilePage';

export default function MySpacesPage({navigation}){
    return(
        <SafeAreaView style = {[styles.container]}>
            <View style ={{
                flexDirection: 'row',
                marginLeft: 'auto',
                marginRight: 18

            }}>
                <Icon style={{
                    alignSelf: 'center',
                    marginLeft: 40
                    }} 
                    size={50} name='account-circle' color= '#79AAB5'
                    onPress={() => {
                        navigation.navigate('ProfilePage');
                    }}
                />
            </View>
            <View style ={{
                flexDirection: 'row',
                marginRight: 'auto',
                marginLeft: 18,
                paddingBottom: 6   
            }}>
                <Text style = {[styles.text]}>
                    My Spaces
                </Text>
            </View>
            <ScrollView>
                <SpaceCard
                    onClick={() => {
                        navigation.navigate('SpacePage');
                    }}
                />
                <SpaceCard
                    onClick={() => {
                        navigation.navigate('SpacePage');
                    }}
                />
                <Button
                    name = "Create Space"
                    width ="95%"
                    onClick={() => {
                        navigation.navigate('CreateSpaceScreen');
                    }}
                />
            </ScrollView>
        </SafeAreaView>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F0EB',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop:50
    },
    text: {
        fontSize: 30,
        textAlign: "left",
        fontWeight: "500",
        color: "#184254",
    }

})