import { View, FlatList, StyleSheet, Text } from "react-native";
import { useLayoutEffect } from "react";
import { CATEGORIES, MEALS } from "../data/dummy-data";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "./CategoriesScreen";
import Meal from "@/models/meal";
import MealItem from "@/components/MealItem";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface IMealsOverviewScreenProps {
    route: RouteProp<RootStackParamList, 'MealsOverview'>;
    navigation: NativeStackNavigationProp<RootStackParamList, 'MealsOverview'>;
}

export default function MealsOverviewScreen({ route, navigation }: IMealsOverviewScreenProps) {
    const categoryId = route.params.categoryId;

    const dispalyedMeals = MEALS.filter((meal) => meal.categoryIds.includes(categoryId));
    //   console.log(dispalyedMeals);
    const categoryTitle = CATEGORIES.find((category) => category.id === categoryId)?.title;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: categoryTitle,
        });
    }, [categoryTitle, navigation]);

    function selectMealItemHandler(mealId: string) {
        navigation.navigate('MealDetails', {
            mealId: mealId,
        });
    }

    function renderMealItem(itemData: { item: Meal }) {
        return (
            <MealItem
                id={itemData.item.id}
                title={itemData.item.title}
                imageUrl={itemData.item.imageUrl}
                duration={itemData.item.duration}
                complexity={itemData.item.complexity}
                affordability={itemData.item.affordability}
            />
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={dispalyedMeals}
                keyExtractor={(item) => item.id}
                renderItem={renderMealItem}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        alignItems: "center",
        justifyContent: "center",
        // backgroundColor: "#fff",
    },
});
