import { CATEGORIES } from "@/data/dummy-data";
import { FlatList } from "react-native";
import CategoryGridTile from "../components/CategoryGridTile";
// import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface IRenderCategoryItem {
    item: {
        title: string,
        color: string,
        id: string
    }
}

export type RootStackParamList = {
    MealsCategories: undefined;
    MealsOverview: { categoryId: string };
    MealDetails: { mealId: string };
};

// interface ICategoriesScreenProps {
//     navigation: NativeStackNavigationProp<RootStackParamList, 'MealsCategories'>;
// }

export default function CategoriesScreen() {
    function renderCategoryItem(itemData: IRenderCategoryItem) {
        return (
            <CategoryGridTile 
                title={itemData.item.title} 
                color={itemData.item.color} 
                id={itemData.item.id}
            />
        )
    }

    return (
        <FlatList
            style={{ backgroundColor: '#3f2f25' }}
            data={CATEGORIES}
            keyExtractor={(item) => item.id}
            renderItem={renderCategoryItem}
            numColumns={2}
        />
    )
}