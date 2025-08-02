import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";

// Components
import PlacesList from "../components/Places/PlacesList";
import IconButton from "../components/ui/IconButton";

export default function AllPlaces() {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: ({ tintColor }: { tintColor?: string }) => (
                <IconButton
                    icon="add"
                    size={24}
                    color={tintColor!}
                    onPress={() => navigation.navigate("AddPlace" as never)}
                />
            ),
        });
    }, [navigation]);

    return <PlacesList places={[]} />;
}