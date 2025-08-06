import { createSlice } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store";

const initialState = {
    ids: [] as string[],
};

export const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        addFavorite: (state, action) => {
            state.ids.push(action.payload.id);
        },
        removeFavorite: (state, action) => {
            state.ids = state.ids.filter((id) => id !== action.payload.id);
        },
    },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;

export const useFavorites = () => {
    const dispatch = useDispatch();
    const favoriteIds = useSelector((state: RootState) => state.favorites.ids);
    
    return {
        ids: favoriteIds,
        addFavorite: (id: string) => dispatch(addFavorite({ id })),
        removeFavorite: (id: string) => dispatch(removeFavorite({ id })),
    };
};