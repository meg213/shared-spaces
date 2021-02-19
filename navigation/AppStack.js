import React, { useContext } from 'react';
import { View, Button } from 'react-native'; 
import { createStackNavigator } from '@react-navigation/stack';
import MySpacesPage  from '../screens/MySpacesPage';
import { AuthContext } from '../navigation/AuthProvider';


const Stack = createStackNavigator();



const AppStack = () => {
  const { logout } = useContext(AuthContext);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SpacesPage"
        component={MySpacesPage}
        options={({navigation}) => ({
          title: '',
          headerStyle: {
            backgroundColor: '#f9fafd',
            shadowColor: '#f9fafd',
            elevation: 0,
          },
          headerLeft: () => (
            <View style={{marginLeft: 10}}>
              <Button 
                name="Log out"
                size={25}
                backgroundColor="#f9fafd"
                color="#333"
                onPress={() => logout()}
              />
            </View>
          ),
        })}
      />
    </Stack.Navigator>
  );
}

export default AppStack;