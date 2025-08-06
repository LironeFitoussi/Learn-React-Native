import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Screens 
import WelcomeScreen from './screens/WelcomeScreen';
import UserScreen from './screens/UserScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Welcome" screenOptions={{
          headerStyle: {
            backgroundColor: '#3c0a6b'
          },
          headerTintColor: '#fff',
          tabBarActiveBackgroundColor: '#f0e1ff',
          tabBarActiveTintColor: '#3c0a6b',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          )
          // drawerStyle: {
          //   // backgroundColor: '#f0e1ff'
          // },
        }}>
        <Tab.Screen name="Welcome" component={WelcomeScreen} />
        <Tab.Screen name="User" component={UserScreen} options={{
          tabBarLabel: 'User Screen',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          )
        }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
