import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Screens
import AllExpenses from './screens/AllExpenses';
import RecentExpenses from './screens/RecentExpenses';
import { GlobalStyles } from './constants/styles';
import { Pressable } from 'react-native';
import IconButton from './components/UI/IconButton';

const BottomTabs = createBottomTabNavigator();

export default function ExpensesOverview({ navigation }: { navigation: any }) {
    return (
        <BottomTabs.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: GlobalStyles.colors.primary500},
                headerTintColor: 'white',
                tabBarStyle: {backgroundColor: GlobalStyles.colors.primary500},
                tabBarActiveTintColor: GlobalStyles.colors.accent500,
                headerRight: ({ tintColor }) => (
                    <IconButton
                        icon="add"
                        size={24} 
                        color={tintColor || 'white'}
                        onPress={() => navigation.navigate('ManageExpenses')}
                    />
                )
            }}
        >
            <BottomTabs.Screen name="RecentExpenses" component={RecentExpenses} options={{
                title: 'Recent Expenses',
                tabBarLabel: 'Recent',
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="hourglass" color={color} size={size} />
                )
            }}/>
            <BottomTabs.Screen name="AllExpenses" component={AllExpenses} options={{
                title: 'All Expenses',
                tabBarLabel: 'All Expenses',
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="calendar" color={color} size={size} />
                )
            }}/>
        </BottomTabs.Navigator>
    );
}