import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, SafeAreaView, Button } from 'react-native';
import { Icon } from 'react-native-elements';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import SpaceCard from '../components/SpaceCard';

const CreateSpaceScreen = ({navigation}) => {
    const [name, setName] = useState("");
    return(
        <SafeAreaView style = {[styles.container]}>
            <View>
                <Text style = {[styles.text]}>
                    Create a Shared Space
                </Text>
            </View>
            <FormInput
                labelValue={name}
                onChangeText={(spaceName) => setName(spaceName)}
                placeholderText="Space Name"
                autoCapitalize="none"
                autoCorrect={false}
            />
            <FormButton
                buttonTitle="Create Space"
            />
            {/* <ScrollView>
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
                    onClick={() => {
                        navigation.navigate('ProfilePage');
                    }}
                />
            </ScrollView> */}
        </SafeAreaView>
        
    );
}
export default CreateSpaceScreen;
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