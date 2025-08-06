import { useFavorites } from "../store/context/favorites-context";
import { MEALS } from "../data/dummy-data";
import MealsList from "../components/MealsList";

function FavoritesScreen() {
  const { ids } = useFavorites();

  const favoriteMeals = MEALS.filter((meal) => ids.includes(meal.id));

  return (
    <MealsList 
      meals={favoriteMeals} 
      fallbackText="Your favorite meals will appear here!" 
      style={{ backgroundColor: "#3f2f25" }}
    />
  );
}

export default FavoritesScreen;
