import { Ionicons } from "@expo/vector-icons";
import IconButton from "../components/ui/IconButton";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback } from "react";

interface UseNavProps {
    icon: keyof typeof Ionicons.glyphMap;
    destination: string;
}

export default function useNav({icon, destination}: UseNavProps) {
    const navigation = useNavigation();

    useFocusEffect(
        useCallback(() => {
            navigation.setOptions({
                headerRight: ({ tintColor }: { tintColor?: string }) => (
                    <IconButton
                        icon={icon}
                        size={24}
                        color={tintColor!}
                        onPress={() => navigation.navigate(destination as never)}
                    />
                ),
            });
        }, [navigation, icon, destination])
    );
}
