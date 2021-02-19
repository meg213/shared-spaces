import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import SpacePage from './../screens/SpacePage'
import ItemListPage from './../screens/itemListPage'
import MyItemsPage from './../screens/MyItemsPage'
import ListsPage from './../screens/ListsPage'
import AllItemsPage from './../screens/AllItemsPage'
import ProfilePage from './../screens/ProfilePage'
import MySpacesPage from './../screens/MySpacesPage';

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
  </Stack.Navigator>
  );
}

export default AppStack;