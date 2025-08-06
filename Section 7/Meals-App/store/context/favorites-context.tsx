import { createContext, useContext, useState } from "react";

export const FavoritesContext = createContext({
    ids: [] as string[],
    addFavorite: (id: string) => {},
    removeFavorite: (id: string) => {},
});

export default function FavoritesContextProvider({ children }: { children: React.ReactNode }) {
    const [favoriteMealIds, setFavoriteMealIds] = useState<string[]>([]);

    function addFavorite(id: string) {
        setFavoriteMealIds((currentFavIds) => [...currentFavIds, id]);
    }

    function removeFavorite(id: string) {
        setFavoriteMealIds((currentFavIds) => currentFavIds.filter((mealId) => mealId !== id));
    }

    const value = {
        ids: favoriteMealIds,
        addFavorite,
        removeFavorite,
    };

    return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites must be used within a FavoritesContextProvider');
    }
    return context;
}