import React, { useContext } from 'react';
import { View, Button } from 'react-native'; 
import { createStackNavigator } from '@react-navigation/stack';
import SpacePage from './../screens/SpacePage'
import ItemListPage from './../screens/itemListPage'
import MyItemsPage from './../screens/MyItemsPage'
import ListsPage from './../screens/ListsPage'
import AllItemsPage from './../screens/AllItemsPage'
import ProfilePage from './../screens/ProfilePage'
import MySpacesPage from './../screens/MySpacesPage';
import CreateSpaceScreen from './../screens/createSpaceScreen';
import CreateList from './../screens/CreateList';
import AddItemScreen from './../screens/AddItemScreen';

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
          name="MySpacesPage"
          component={MySpacesPage}
          options={{ headerShown: false}}
      />
      <Stack.Screen
        name="SpacePage"
        component={SpacePage}
        options={{ headerShown: false}}
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
      options={{ headerShown: false}}
    /> 
      <Stack.Screen
      name="CreateSpaceScreen"
      component={CreateSpaceScreen}
      options={{ headerShown: false}}
    /> 
    <Stack.Screen
      name="CreateList"
      component={CreateList}
      options={{ headerShown: false}}
    /> 

    <Stack.Screen
      name="AddItemScreen"
      component={AddItemScreen}
      options={{ headerShown: false}}
    />
    
  </Stack.Navigator>
  );
}

export default AppStack;