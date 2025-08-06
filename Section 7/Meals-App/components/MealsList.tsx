import { View, FlatList, StyleSheet, Text, ViewStyle } from "react-native";
import Meal from "../models/meal";
import MealItem from "./MealItem";

interface MealsListProps {
  meals: Meal[];
  fallbackText?: string;
  style?: ViewStyle;
}

export default function MealsList({ meals, fallbackText, style }: MealsListProps) {
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

  if (meals.length === 0 && fallbackText) {
    return (
      <View style={[styles.rootContainer, style]}>
        <Text style={styles.text}>{fallbackText}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <FlatList
        data={meals}
        keyExtractor={(item) => item.id}
        renderItem={renderMealItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});