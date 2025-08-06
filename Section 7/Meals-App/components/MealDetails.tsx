import { View, Text, StyleSheet, ViewStyle, StyleProp, TextStyle } from "react-native";

interface IMealDetailsProps {
    duration: number;
    complexity: string;
    affordability: string;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
}

function MealDetails({ duration, complexity, affordability, style, textStyle }: IMealDetailsProps) {
    return (
        <View style={[styles.details, style]}>
            <Text style={[styles.detailItem, textStyle]}>{duration}m</Text>
            <Text style={[styles.detailItem, textStyle]}>{complexity.toUpperCase()}</Text>
            <Text style={[styles.detailItem, textStyle]}>{affordability.toUpperCase()}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    details: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 8,
    },
    detailItem: {
        marginHorizontal: 4,
        fontSize: 14,
    },
});

export default MealDetails;