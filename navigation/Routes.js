import React, {useContext, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import firebase from 'firebase/app';
import 'firebase/auth';
import AuthStack from './AuthStack';
import AppStack from './AppStack';


const Routes = () => {
    const [user, setUser] = useState();
    const [initializing, setInitializing] = useState(true);
  
    const onAuthStateChanged = (user) => {
      setUser(user);
      if (initializing) setInitializing(false);
    };
  
    useEffect(() => {
      const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber; // unsubscribe on unmount
    }, []);
  
    if (initializing) return null;
  
    return (
      <NavigationContainer>
        {user ?  <AppStack /> : <AuthStack />}
      </NavigationContainer>
    );
};
export default Routes;

// export default function Routes({ navigation }) {
//   useEffect(() => {
//     firebase.auth().onAuthStateChanged((user) => {
//       if (user) {
//         return <NavigationContainer>
//             <AppStack />
//         </NavigationContainer>
//       } else {
//         return <NavigationContainer>
//             <AuthStack />
//         </NavigationContainer>
//       }
//     });
//   });
// }