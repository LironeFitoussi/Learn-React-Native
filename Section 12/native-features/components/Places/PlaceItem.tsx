import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { Place } from "../../models/place";

interface PlaceItemProps {
    place: Place;
    onSelect: () => void;
}

export default function PlaceItem({place, onSelect}: PlaceItemProps) {
    return (
        <Pressable onPress={onSelect} style={styles.item}>
            <Image source={{ uri: place.imageUri }} />
            <View>
                <Text>{place.title}</Text>
                <Text>{place.address}</Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    item: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 6,
        marginVertical: 12,
        backgroundColor: "#ccc",
    }
})