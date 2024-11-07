/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import Home from './src/screens/Home';
import Icon from 'react-native-vector-icons/Feather';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen 
          options={{
            headerShown: false,
            tabBarIcon: () => <Icon name={"home"} size={25} color="#A43333" />
          }} 
          name="Home" 
          component={Home} 
        />
        <Tab.Screen 
          options={{
            headerShown: false,
            tabBarIcon: () => <Icon name={"list"} size={25} color="#A43333" />
          }} 
          name="List" 
          component={() => <View>List</View>} 
        />
        <Tab.Screen 
          options={{
            headerShown: false,
            tabBarIcon: () => <Icon name={"user"} size={25} color="#A43333" />
          }} 
          name="Profile" 
          component={() => <View>Profile</View>} 
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}


export default App;
