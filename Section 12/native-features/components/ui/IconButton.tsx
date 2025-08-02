import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";

interface IconButtonProps {
    icon: keyof typeof Ionicons.glyphMap;
    size: number;
    color: string;
    onPress: () => void;
}

export default function IconButton({ icon, size, color, onPress }: IconButtonProps) {
    return (
        <Pressable 
            onPress={onPress} 
            style={({ pressed }) => [styles.button, pressed && styles.pressed]} 
            android_ripple={{ color: "#ccc" }}
        >
            <Ionicons name={icon} size={size} color={color} />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        padding: 8,
        margin: 4,
        marginRight: 8,
        justifyContent: "center",
        alignItems: "center",
        minWidth: 40,
        minHeight: 40,
    },
    pressed: {
        opacity: 0.7,
    }
})