import { title } from "process";
import { View, Text, StyleSheet, Pressable, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../screens/CategoriesScreen";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface CategoryGridTileProps {
    id: string;
    title: string;
    color: string;
}

export default function CategoryGridTile({ title, color, id }: CategoryGridTileProps) {
    const navigation = useNavigation<NavigationProp>();

    function pressHandler() {
        navigation.navigate('MealsOverview', {
            categoryId: id
        })
    }
    
    return (
        <View style={styles.gridItem}>
            <Pressable 
                android_ripple={{ color: '#ccc' }} 
                style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]} 
                onPress={pressHandler}
            >
                <View style={[styles.innerContainer, { backgroundColor: color }]}>
                    <Text style={styles.title}>{title}</Text>
                </View>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    gridItem: {
        flex: 1,
        margin: 16,
        height: 150,
        borderRadius: 8,
        elevation: 4,

        // IOS SHADOW
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        backgroundColor: 'white',

        overflow: Platform.OS === 'android' ? 'hidden' : 'visible'
    },
    buttonPressed: {
        opacity: 0.5
    },
    button: {
        flex: 1
    },
    innerContainer: {
        flex: 1,
        padding: 16,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18
    }
})