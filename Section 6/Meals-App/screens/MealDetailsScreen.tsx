import { useLayoutEffect } from "react";
import { View, Text, StyleSheet, Image, ScrollView, Button, Pressable } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "./CategoriesScreen";
import {NativeStackNavigationProp } from '@react-navigation/native-stack'
import { MEALS } from "@/data/dummy-data";
import MealDetails from "@/components/MealDetails";
import Subtitle from "@/components/MealDetail/Subtitle";
import List from "@/components/MealDetail/List";
import IconButton from "@/components/IconButton";
import { Ionicons } from "@expo/vector-icons";

interface IMealDetailsScreenProps {
    route: RouteProp<RootStackParamList, 'MealDetails'>;
    navigation: NativeStackNavigationProp<RootStackParamList, 'MealDetails'>;
}

export default function MealDetailsScreen({ route, navigation }: IMealDetailsScreenProps) {
    const mealId = route.params.mealId
    const selectedMeal = MEALS.find((meal) => meal.id === mealId)


    if (!selectedMeal) {
        return <Text>Meal not found</Text>
    }

    function headerButtonPressHandler () {
        console.log("Button Pressed");
        alert("Button works!");
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return (
                    <IconButton icon="star" size={18} onPress={headerButtonPressHandler} />
                )
            }
        })
    }, [navigation, headerButtonPressHandler])

    return (
        <ScrollView style={styles.rootContainer}>
            <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
            <Text style={styles.title}>{selectedMeal.title}</Text>
            

            <MealDetails
                duration={selectedMeal.duration}
                complexity={selectedMeal.complexity}
                affordability={selectedMeal.affordability}
                textStyle={styles.detailText}
            />

            <View style={styles.listOuterContainer}>
                <View style={styles.listContainer}>
                    <Subtitle>Ingredients</Subtitle>
                    <List data={selectedMeal.ingredients} />
                    
                    <Subtitle>Steps</Subtitle>
                    <List data={selectedMeal.steps} numbered />
                </View>
            </View>
        </ScrollView>

    );
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        marginBottom: 32,
    },
    image: {
        width: "100%",
        height: 350,
    },
    title: {
        fontWeight: "bold",
        fontSize: 24,
        margin: 8,
        textAlign: "center",
        color: "white",
    },
    detailText: {
        color: "white",
    },
    listOuterContainer: {
        alignItems: "center",
    },
    listContainer: {
        width: "80%",
    },
});
