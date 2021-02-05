import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SpacePage from './screens/SpacePage';
import ItemListPage from './screens/itemListPage'
import MyItemsPage from './screens/MyItemsPage'
import ListsPage from './screens/ListsPage'
import AllItemsPage from './screens/AllItemsPage'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SpacePage"
          component={SpacePage}
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
  </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D9DED8',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
