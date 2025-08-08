import React from 'react';
import { StatusBar } from 'react-native';
import { GlobalStyles } from './constants/styles';

// Native Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Inner Navigation
import ExpensesOverview from './ExpensesOverview';
import ManageExpense from './screens/ManageExpenses';

// Navigation
const Stack = createNativeStackNavigator();

// App
export default function App() {
    return (
        <>
            <StatusBar barStyle="light-content" />
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerStyle: { backgroundColor: GlobalStyles.colors.primary500},
                        headerTintColor: 'white',
                    }}
                >
                    <Stack.Screen 
                        name="ExpensesOverview" 
                        component={ExpensesOverview} 
                        options={{headerShown: false}}
                    />
                    <Stack.Screen name="ManageExpenses" component={ManageExpense} options={{
                        presentation: 'modal'
                    }} />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
}

