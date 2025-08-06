
import { useLayoutEffect } from "react";
import { CATEGORIES, MEALS } from "../data/dummy-data";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "./CategoriesScreen";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import MealsList from "../components/MealsList";

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

    return <MealsList meals={dispalyedMeals} />;
}
