import { View, Text, StyleSheet } from "react-native";
import Colors from "@/constants/colors";

interface ISubtitleProps {
    children: string;
}

function Subtitle({ children }: ISubtitleProps) {
    return (
        <View style={styles.subtitleContainer}>
            <Text style={styles.subtitle}>{children}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    subtitleContainer: {
        marginHorizontal: 12,
        marginVertical: 4,
        padding: 6,
        borderBottomColor: Colors.accent500,
        borderBottomWidth: 2,
    },
    subtitle: {
        color: Colors.accent500,
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
    },
});

export default Subtitle;
