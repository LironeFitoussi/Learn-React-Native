import { View, Text, StyleSheet, Pressable, Image, Platform } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../screens/CategoriesScreen";
import MealDetails from "./MealDetails";

interface MealItemProps {
    id: string;
    title: string;
    imageUrl: string;
    duration: number;
    complexity: string;
    affordability: string;
    onPress?: () => void;
}

export default function MealItem({
    id,
    title,
    imageUrl,
    duration,
    complexity,
    affordability,
}: MealItemProps) {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    function selectMealItemHandler() {
        navigation.navigate('MealDetails', {
            mealId: id,
        });
    }
    return (
        <View style={styles.mealItem}>
            <Pressable
                android_ripple={{ color: "#ccc" }}
                style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
                onPress={selectMealItemHandler}
            >
                <View style={styles.innerContainer}>
                    <View>
                        <Image source={{ uri: imageUrl }} style={styles.image} />
                        <Text style={styles.title}>{title}</Text>
                    </View>
                    <MealDetails 
                        duration={duration} 
                        complexity={complexity} 
                        affordability={affordability}
                    />
                </View>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    mealItem: {
        margin: 16,
        borderRadius: 8,
        backgroundColor: "#fff",
        elevation: 4,
        shadowColor: "black",
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    },
    innerContainer: {
        borderRadius: 8,
        overflow: "hidden",
    },
    button: {
        flex: 1,
    },
    buttonPressed: {
        opacity: 0.5,
    },
    image: {
        width: "100%",
        height: 200,
    },
    title: {
        fontWeight: "bold",
        fontSize: 18,
        textAlign: "center",
        margin: 8,
    },
});
