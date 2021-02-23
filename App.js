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
import firebase from 'firebase/app';
import firebaseConfig from './config/keys';
import Providers from './navigation'

const Stack = createStackNavigator();
let firebaseApp

export default function App() {
  if (firebase.apps.length == 0) {
    firebase.initializeApp(firebaseConfig.FirebaseConfig);
  }

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

// HIEU's branch
// export default class App extends React.Component {
//   constructor(props) {
//     super(props);
//     if (firebase.apps.length == 0) {
//       firebase.initializeApp(firebaseConfig.FirebaseConfig);
//     }
    
//   }
//   render() {
//     return <Providers />
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#D9DED8',
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
// });
