import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

// Screens
import CategoriesScreen, { RootStackParamList } from "./screens/CategoriesScreen";
import FavoritesScreen from "./screens/FavoritesScreen";

// Drawer 
import { Ionicons } from '@expo/vector-icons';

export default function DrawerNavigator() {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: '#351401' },
                headerTintColor: '#fff',
                drawerContentStyle: { backgroundColor: '#351401' },
                drawerInactiveTintColor: '#fff',
                drawerActiveTintColor: '#351401',
                drawerActiveBackgroundColor: '#e4baa1',
            }}>
            <Drawer.Screen 
                name="Categories" 
                options={{ 
                    title: 'All Categories',
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="list" color={color} size={size} />
                    )
                }} 
                component={CategoriesScreen}
            />
            <Drawer.Screen name="Favorites" options={{ title: 'Favorites',
                drawerIcon: ({ color, size }) => (
                    <Ionicons name="star" color={color} size={size} />
                )
            }} component={FavoritesScreen} />
        </Drawer.Navigator>
    )
}