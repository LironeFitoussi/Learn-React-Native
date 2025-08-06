import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

// Screens 
import WelcomeScreen from './screens/WelcomeScreen';
import UserScreen from './screens/UserScreen';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Welcome" screenOptions={{
          headerStyle: {
            backgroundColor: '#3c0a6b'
          },
          headerTintColor: '#fff',
          drawerActiveBackgroundColor: '#f0e1ff',
          drawerActiveTintColor: '#3c0a6b',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          )
          // drawerStyle: {
          //   // backgroundColor: '#f0e1ff'
          // },
        }}>
        <Drawer.Screen name="Welcome" component={WelcomeScreen} />
        <Drawer.Screen name="User" component={UserScreen} options={{
          drawerLabel: 'User Screen',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          )
        }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
