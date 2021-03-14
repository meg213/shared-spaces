import React, { useContext } from 'react';
import { View, Button } from 'react-native'; 
import { createStackNavigator } from '@react-navigation/stack';
import SpacePage from './../screens/SpacePage';
import ItemListPage from './../screens/itemListPage';
import MyItemsPage from './../screens/MyItemsPage';
import ListsPage from './../screens/ListsPage';
import AllItemsPage from './../screens/AllItemsPage';
import ProfilePage from './../screens/ProfilePage';
import MySpacesPage from './../screens/MySpacesPage';
import CreateSpaceScreen from './../screens/createSpaceScreen';
import CreateList from './../screens/CreateList';
import CreateItem from '../screens/CreateItem';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { logout } from '../utils/firebaseMethod';

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
          name="MySpacesPage"
          component={MySpacesPage}
          options={({navigation}) => ({
            title: '',
            headerStyle: {
              backgroundColor: '#F2F0EB',
              shadowColor: '#F2F0EB',
              elevation: 0,
            },
            headerLeft: () => (
              <View style={{marginLeft: 10}}>
                <FontAwesome.Button 
                  name="long-arrow-left"
                  size={25}
                  backgroundColor="#F2F0EB"
                  color="#333"
                  onPress={() => logout()}
                />
              </View>
            ),
          })}
      />
      <Stack.Screen
        name="SpacePage"
        component={SpacePage}
        options={{ headerShown: false}}
      />
      <Stack.Screen
        name="CreateItem"
        component={CreateItem}
        options={({navigation}) => ({
          title: '',
          headerStyle: {
            backgroundColor: '#F2F0EB',
            shadowColor: '#F2F0EB',
            elevation: 0,
          },
          headerLeft: () => (
            <View style={{marginLeft: 10}}>
              <FontAwesome.Button 
                name="long-arrow-left"
                size={25}
                backgroundColor="#F2F0EB"
                color="#333"
                onPress={() => navigation.navigate('SpacePage')}
              />
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="ProfilePage"
        component={ProfilePage}
        options={{ headerShown: false}}
      />
      <Stack.Screen
        name="ItemList"
        component={ItemListPage}
        options={{ headerShown: false}}
      />
      <Stack.Screen
        name="MyItemList"
        component={MyItemsPage}
        options={{ headerShown: false}}
      />
      <Stack.Screen
        name="ListsList"
        component={ListsPage}
        options={{ headerShown: false}}
      />
      <Stack.Screen
      name="AllItems"
      component={AllItemsPage}
    /> 
      <Stack.Screen
      name="CreateSpaceScreen"
      component={CreateSpaceScreen}
      options={({navigation}) => ({
        title: '',
        headerStyle: {
          backgroundColor: '#F2F0EB',
          shadowColor: '#F2F0EB',
          elevation: 0,
        },
        headerLeft: () => (
          <View style={{marginLeft: 10}}>
            <FontAwesome.Button 
              name="long-arrow-left"
              size={25}
              backgroundColor="#F2F0EB"
              color="#333"
              onPress={() => navigation.navigate('MySpacesPage')}
            />
          </View>
        ),
      })}
    /> 
    <Stack.Screen
      name="CreateList"
      component={CreateList}
      options={{ headerShown: false}}
    /> 
    
  </Stack.Navigator>
  );
}

export default AppStack;