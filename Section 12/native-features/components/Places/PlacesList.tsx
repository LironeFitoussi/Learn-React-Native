import { FlatList, View, Text, StyleSheet } from "react-native";
import PlaceItem from "./PlaceItem";
import { Place } from "../../models/place";
import { Colors } from "../../constants/colors";

interface PlacesListProps {
    places: Place[];
}
export default function PlacesList({places}: PlacesListProps) {
    if (!places || places.length === 0) {
        return (
            <View style={styles.fallbackContainer}>
                <Text style={styles.fallbackText}>No places found. Maybe create one?</Text>
            </View>
        )
    }
    
    return (
        <FlatList
            data={places}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => <PlaceItem place={item} onSelect={() => {}} />}
        />
    )
}

const styles = StyleSheet.create({
    fallbackContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        color: Colors.primary200,
    },
    fallbackText: {
        fontSize: 16,
        color: "#666",
    }
})