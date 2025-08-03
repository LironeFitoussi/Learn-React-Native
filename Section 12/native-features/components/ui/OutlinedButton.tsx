import { Pressable, StyleSheet, Text } from "react-native";
import { Colors } from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";

interface OutlinedButtonProps {
    onPress: () => void;
    children: React.ReactNode;
    icon: keyof typeof Ionicons.glyphMap;
}

export default function OutlinedButton({ onPress, children, icon }: OutlinedButtonProps) {
    return (
        <Pressable style={({ pressed }) => [styles.button, pressed && styles.pressed]} onPress={onPress}>
            <Ionicons name={icon} size={18} color={Colors.primary500} style={styles.icon} />
            <Text style={styles.text}>{children}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        margin: 4,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: Colors.primary500,
        flexDirection: "row",
    },
    pressed: {
        opacity: 0.7,
    },
    icon: {
        marginRight: 6,
    },
    text: {
        color: Colors.primary500,
    }
})