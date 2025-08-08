import Colors from "@/constants/colors";
import { View, StyleSheet, Dimensions } from "react-native";

interface CardProps {
    children: React.ReactNode;
}

export default function Card({ children }: CardProps) {
    return <View style={styles.card}>{children}</View>;
}

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
    card: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 100,
        marginHorizontal: deviceWidth < 380 ? 18 : 36,
        padding: 16,
        backgroundColor: Colors.primary800,
        borderRadius: 8,
        elevation: 4,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.25,
    },
}); 